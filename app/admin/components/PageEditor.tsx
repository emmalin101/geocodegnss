"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { CmsBlock, CmsBlockType, CmsMediaItem, CmsPage } from "../../lib/cms/types";
import { blockTypeLabels } from "../../lib/cms/types";

const newPage: Partial<CmsPage> = {
  title: "",
  slug: "",
  path: "/",
  seoTitle: "",
  seoDescription: "",
  ogImage: "",
  status: "draft",
  blocks: []
};

const blockTypes = Object.keys(blockTypeLabels) as CmsBlockType[];

function emptyBlock(type: CmsBlockType): CmsBlock {
  const dataByType: Record<CmsBlockType, Record<string, unknown>> = {
    hero: { title: "", subtitle: "", buttonText: "", buttonLink: "", backgroundImage: "" },
    rich_text: { content: "" },
    image: { image: "", alt: "", caption: "" },
    gallery: { images: [] },
    cta: { title: "", description: "", buttonText: "", buttonLink: "" },
    faq: { items: [] },
    custom: {}
  };
  return {
    id: `block_${crypto.randomUUID()}`,
    type,
    title: blockTypeLabels[type],
    data: dataByType[type]
  };
}

function getValue(block: CmsBlock, key: string) {
  const value = block.data[key];
  return typeof value === "string" ? value : "";
}

function updateBlockData(block: CmsBlock, key: string, value: unknown): CmsBlock {
  return { ...block, data: { ...block.data, [key]: value } };
}

function MediaSelect({ value, media, onChange }: { value: string; media: CmsMediaItem[]; onChange: (value: string) => void }) {
  return (
    <select className="admin-select" value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">Choose media URL</option>
      {media.map((item) => (
        <option value={item.url} key={item.id}>{item.filename}</option>
      ))}
    </select>
  );
}

function BlockFields({
  block,
  media,
  onChange
}: {
  block: CmsBlock;
  media: CmsMediaItem[];
  onChange: (block: CmsBlock) => void;
}) {
  if (block.type === "hero") {
    return (
      <>
        {["title", "subtitle", "buttonText", "buttonLink", "backgroundImage"].map((key) => (
          <label className="admin-field" key={key}>
            <span>{key}</span>
            <input className="admin-input" value={getValue(block, key)} onChange={(event) => onChange(updateBlockData(block, key, event.target.value))} />
            {key.toLowerCase().includes("image") ? <MediaSelect value={getValue(block, key)} media={media} onChange={(value) => onChange(updateBlockData(block, key, value))} /> : null}
          </label>
        ))}
      </>
    );
  }

  if (block.type === "rich_text") {
    return (
      <label className="admin-field">
        <span>Content</span>
        <textarea className="admin-textarea" value={getValue(block, "content")} onChange={(event) => onChange(updateBlockData(block, "content", event.target.value))} />
      </label>
    );
  }

  if (block.type === "image") {
    return (
      <>
        {["image", "alt", "caption"].map((key) => (
          <label className="admin-field" key={key}>
            <span>{key}</span>
            <input className="admin-input" value={getValue(block, key)} onChange={(event) => onChange(updateBlockData(block, key, event.target.value))} />
            {key === "image" ? <MediaSelect value={getValue(block, key)} media={media} onChange={(value) => onChange(updateBlockData(block, key, value))} /> : null}
          </label>
        ))}
      </>
    );
  }

  if (block.type === "gallery") {
    const images = Array.isArray(block.data.images) ? block.data.images.join("\n") : "";
    return (
      <label className="admin-field">
        <span>Images, one URL per line</span>
        <textarea className="admin-textarea" value={images} onChange={(event) => onChange(updateBlockData(block, "images", event.target.value.split("\n").map((item) => item.trim()).filter(Boolean)))} />
      </label>
    );
  }

  if (block.type === "cta") {
    return (
      <>
        {["title", "description", "buttonText", "buttonLink"].map((key) => (
          <label className="admin-field" key={key}>
            <span>{key}</span>
            <input className="admin-input" value={getValue(block, key)} onChange={(event) => onChange(updateBlockData(block, key, event.target.value))} />
          </label>
        ))}
      </>
    );
  }

  if (block.type === "faq") {
    const rows = Array.isArray(block.data.items)
      ? (block.data.items as Array<{ question?: string; answer?: string }>).map((item) => `${item.question || ""} | ${item.answer || ""}`).join("\n")
      : "";
    return (
      <label className="admin-field">
        <span>FAQ, one row per line: Question | Answer</span>
        <textarea
          className="admin-textarea"
          value={rows}
          onChange={(event) =>
            onChange(
              updateBlockData(
                block,
                "items",
                event.target.value
                  .split("\n")
                  .map((row) => row.split("|"))
                  .map(([question, answer]) => ({ question: question?.trim() || "", answer: answer?.trim() || "" }))
                  .filter((item) => item.question && item.answer)
              )
            )
          }
        />
      </label>
    );
  }

  return (
    <label className="admin-field">
      <span>Custom JSON</span>
      <textarea className="admin-textarea" value={JSON.stringify(block.data, null, 2)} onChange={(event) => {
        try {
          onChange({ ...block, data: JSON.parse(event.target.value) });
        } catch {
          onChange({ ...block, data: { raw: event.target.value } });
        }
      }} />
    </label>
  );
}

export default function PageEditor({ id }: { id?: string }) {
  const router = useRouter();
  const [page, setPage] = useState<Partial<CmsPage>>(newPage);
  const [media, setMedia] = useState<CmsMediaItem[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const isEditing = Boolean(id);

  const blocks = useMemo(() => page.blocks || [], [page.blocks]);

  useEffect(() => {
    fetch("/api/cms/media")
      .then((response) => response.json())
      .then((payload) => payload.ok && setMedia(payload.data))
      .catch(() => undefined);

    if (!id) return;
    fetch(`/api/cms/pages/${id}`)
      .then((response) => response.json())
      .then((payload) => {
        if (!payload.ok) throw new Error(payload.message || "Failed to load page.");
        setPage(payload.data);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load page."));
  }, [id]);

  function updateField<K extends keyof CmsPage>(key: K, value: CmsPage[K]) {
    setPage((current) => ({ ...current, [key]: value }));
  }

  async function save(status?: "draft" | "published") {
    setError("");
    setMessage("");
    const payload = { ...page, status: status || page.status || "draft" };
    const response = await fetch(isEditing ? `/api/cms/pages/${id}` : "/api/cms/pages", {
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
    setPage(result.data);
    if (!isEditing) router.replace(`/admin/pages/${result.data.id}/edit`);
  }

  function updateBlock(index: number, block: CmsBlock) {
    const next = [...blocks];
    next[index] = block;
    updateField("blocks", next);
  }

  return (
    <>
      <div className="admin-topbar">
        <div className="admin-page-title">
          <h1>{isEditing ? "Edit Page" : "New Page"}</h1>
          <p>Manage page SEO fields and editable content blocks.</p>
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
            <label className="admin-field"><span>Page title</span><input className="admin-input" value={page.title || ""} onChange={(event) => updateField("title", event.target.value)} /></label>
            <label className="admin-field"><span>Path</span><input className="admin-input" value={page.path || ""} onChange={(event) => updateField("path", event.target.value)} placeholder="/" /></label>
            <label className="admin-field"><span>Slug</span><input className="admin-input" value={page.slug || ""} onChange={(event) => updateField("slug", event.target.value)} /></label>
            <label className="admin-field"><span>Status</span><select className="admin-select" value={page.status || "draft"} onChange={(event) => updateField("status", event.target.value as CmsPage["status"])}><option value="draft">Draft</option><option value="published">Published</option></select></label>
          </div>
          <label className="admin-field"><span>SEO title</span><input className="admin-input" value={page.seoTitle || ""} onChange={(event) => updateField("seoTitle", event.target.value)} /></label>
          <label className="admin-field"><span>SEO description</span><textarea className="admin-textarea" value={page.seoDescription || ""} onChange={(event) => updateField("seoDescription", event.target.value)} /></label>
          <label className="admin-field"><span>OG image</span><input className="admin-input" value={page.ogImage || ""} onChange={(event) => updateField("ogImage", event.target.value)} /><MediaSelect value={page.ogImage || ""} media={media} onChange={(value) => updateField("ogImage", value)} /></label>

          <div className="admin-block-top">
            <h2>Blocks</h2>
            <button className="admin-button-secondary" type="button" onClick={() => updateField("blocks", [...blocks, emptyBlock("hero")])}>Add Block</button>
          </div>
          {blocks.map((block, index) => (
            <div className="admin-block" key={block.id}>
              <div className="admin-block-top">
                <select className="admin-select" value={block.type} onChange={(event) => updateBlock(index, emptyBlock(event.target.value as CmsBlockType))}>
                  {blockTypes.map((type) => <option value={type} key={type}>{blockTypeLabels[type]}</option>)}
                </select>
                <div className="admin-actions">
                  <button className="admin-button-secondary" type="button" onClick={() => index > 0 && updateField("blocks", blocks.map((item, itemIndex) => itemIndex === index - 1 ? block : itemIndex === index ? blocks[index - 1] : item))}>Up</button>
                  <button className="admin-button-secondary" type="button" onClick={() => index < blocks.length - 1 && updateField("blocks", blocks.map((item, itemIndex) => itemIndex === index + 1 ? block : itemIndex === index ? blocks[index + 1] : item))}>Down</button>
                  <button className="admin-danger-button" type="button" onClick={() => updateField("blocks", blocks.filter((_, itemIndex) => itemIndex !== index))}>Remove</button>
                </div>
              </div>
              <label className="admin-field"><span>Block label</span><input className="admin-input" value={block.title || ""} onChange={(event) => updateBlock(index, { ...block, title: event.target.value })} /></label>
              <BlockFields block={block} media={media} onChange={(next) => updateBlock(index, next)} />
            </div>
          ))}
        </section>
        <aside className="admin-editor-panel">
          <h2>Preview</h2>
          <p className="admin-muted">Published pages can be viewed on the same path after save.</p>
          {page.path ? <a className="admin-button-secondary" href={page.path} target="_blank">Open Preview</a> : null}
          <a className="admin-button-secondary" href="/admin/media">Open Media Library</a>
        </aside>
      </div>
    </>
  );
}
