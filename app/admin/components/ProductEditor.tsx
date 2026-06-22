"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { CmsMediaItem, CmsProduct } from "../../lib/cms/types";

const categoryOptions = [
  ["gnss-receivers", "GNSS Receivers"],
  ["rugged-gis", "Rugged & GIS"],
  ["gnss-antennas", "GNSS Antennas"],
  ["precision-agriculture-machine-control", "Precision Agriculture & Machine Control"],
  ["accessories", "Accessories"],
  ["gnss-application-solutions", "GNSS Application Solutions"]
];

const emptyProduct: Partial<CmsProduct> = {
  name: "",
  slug: "",
  summary: "",
  description: "",
  price: "",
  image: "",
  gallery: [],
  category: "gnss-receivers",
  tags: [],
  specs: [],
  status: "draft",
  featured: false,
  seoTitle: "",
  seoDescription: ""
};

function specsToText(specs: CmsProduct["specs"]) {
  return (specs || []).map((spec) => `${spec.label} | ${spec.value}`).join("\n");
}

function textToSpecs(text: string) {
  return text
    .split("\n")
    .map((row) => row.split("|"))
    .map(([label, value]) => ({ label: label?.trim() || "", value: value?.trim() || "" }))
    .filter((item) => item.label && item.value);
}

export default function ProductEditor({ id }: { id?: string }) {
  const router = useRouter();
  const [product, setProduct] = useState<Partial<CmsProduct>>(emptyProduct);
  const [media, setMedia] = useState<CmsMediaItem[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const isEditing = Boolean(id);

  useEffect(() => {
    fetch("/api/cms/media")
      .then((response) => response.json())
      .then((payload) => payload.ok && setMedia(payload.data))
      .catch(() => undefined);

    if (!id) return;
    fetch(`/api/cms/products/${id}`)
      .then((response) => response.json())
      .then((payload) => {
        if (!payload.ok) throw new Error(payload.message || "Failed to load product.");
        setProduct(payload.data);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load product."));
  }, [id]);

  function update<K extends keyof CmsProduct>(key: K, value: CmsProduct[K]) {
    setProduct((current) => ({ ...current, [key]: value }));
  }

  async function save(status?: "draft" | "published") {
    setError("");
    setMessage("");
    const payload = { ...product, status: status || product.status || "draft" };
    const response = await fetch(isEditing ? `/api/cms/products/${id}` : "/api/cms/products", {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok || !result.ok) {
      setError(result.message || "Save failed.");
      return;
    }
    setMessage("Saved successfully.");
    setProduct(result.data);
    if (!isEditing) router.replace(`/admin/products/${result.data.id}/edit`);
  }

  return (
    <>
      <div className="admin-topbar">
        <div className="admin-page-title">
          <h1>{isEditing ? "Edit Product" : "New Product"}</h1>
          <p>Manage product specs, gallery, category, SEO and inquiry landing content.</p>
        </div>
        <div className="admin-actions">
          <button className="admin-button-secondary" type="button" onClick={() => save("draft")}>Save Draft</button>
          <button className="admin-button" type="button" onClick={() => save("published")}>Publish</button>
        </div>
      </div>
      {error ? <div className="admin-error">{error}</div> : null}
      {message ? <div className="admin-success">{message}</div> : null}
      <div className="admin-editor">
        <section className="admin-editor-panel">
          <div className="admin-field-grid">
            <label className="admin-field"><span>Name</span><input className="admin-input" value={product.name || ""} onChange={(event) => update("name", event.target.value)} /></label>
            <label className="admin-field"><span>Slug</span><input className="admin-input" value={product.slug || ""} onChange={(event) => update("slug", event.target.value)} /></label>
            <label className="admin-field"><span>Category</span><select className="admin-select" value={product.category || "gnss-receivers"} onChange={(event) => update("category", event.target.value)}>{categoryOptions.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            <label className="admin-field"><span>Price, optional</span><input className="admin-input" value={product.price || ""} onChange={(event) => update("price", event.target.value)} placeholder="Leave blank for quote" /></label>
            <label className="admin-field"><span>Status</span><select className="admin-select" value={product.status || "draft"} onChange={(event) => update("status", event.target.value as CmsProduct["status"])}><option value="draft">Draft</option><option value="published">Published</option></select></label>
            <label className="admin-field"><span>Featured</span><select className="admin-select" value={product.featured ? "yes" : "no"} onChange={(event) => update("featured", event.target.value === "yes")}><option value="no">No</option><option value="yes">Yes</option></select></label>
          </div>
          <label className="admin-field"><span>Summary</span><textarea className="admin-textarea" value={product.summary || ""} onChange={(event) => update("summary", event.target.value)} /></label>
          <label className="admin-field"><span>Detailed description</span><textarea className="admin-textarea" style={{ minHeight: 260 }} value={product.description || ""} onChange={(event) => update("description", event.target.value)} /></label>
          <label className="admin-field"><span>Tags / applications, comma separated</span><input className="admin-input" value={(product.tags || []).join(", ")} onChange={(event) => update("tags", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} /></label>
          <label className="admin-field"><span>Specs, one row per line: Label | Value</span><textarea className="admin-textarea" value={specsToText(product.specs || [])} onChange={(event) => update("specs", textToSpecs(event.target.value))} /></label>
          <label className="admin-field"><span>Gallery URLs, one per line</span><textarea className="admin-textarea" value={(product.gallery || []).join("\n")} onChange={(event) => update("gallery", event.target.value.split("\n").map((item) => item.trim()).filter(Boolean))} /></label>
          <label className="admin-field"><span>SEO title</span><input className="admin-input" value={product.seoTitle || ""} onChange={(event) => update("seoTitle", event.target.value)} /></label>
          <label className="admin-field"><span>SEO description</span><textarea className="admin-textarea" value={product.seoDescription || ""} onChange={(event) => update("seoDescription", event.target.value)} /></label>
        </section>
        <aside className="admin-editor-panel">
          <label className="admin-field">
            <span>Main image</span>
            <input className="admin-input" value={product.image || ""} onChange={(event) => update("image", event.target.value)} />
            <select className="admin-select" value={product.image || ""} onChange={(event) => update("image", event.target.value)}>
              <option value="">Choose media</option>
              {media.map((item) => <option value={item.url} key={item.id}>{item.filename}</option>)}
            </select>
          </label>
          {product.image ? <img src={product.image} alt="" style={{ width: "100%", borderRadius: 12 }} /> : null}
          {product.slug && product.category ? <a className="admin-button-secondary" href={`/products/${product.category}/${product.slug}`} target="_blank">Open Preview</a> : null}
          <a className="admin-button-secondary" href="/admin/media">Open Media Library</a>
        </aside>
      </div>
    </>
  );
}
