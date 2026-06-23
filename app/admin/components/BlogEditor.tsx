"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CmsBlogPost, CmsMediaItem } from "../../lib/cms/types";

const emptyPost: Partial<CmsBlogPost> = {
  title: "",
  slug: "",
  summary: "",
  body: "",
  coverImage: "",
  category: "GNSS",
  tags: [],
  seoTitle: "",
  seoDescription: "",
  publishedAt: new Date().toISOString(),
  author: "TOKNAV",
  status: "draft"
};

export default function BlogEditor({ id }: { id?: string }) {
  const router = useRouter();
  const [post, setPost] = useState<Partial<CmsBlogPost>>(emptyPost);
  const [media, setMedia] = useState<CmsMediaItem[]>([]);
  const [bodyImageUrl, setBodyImageUrl] = useState("");
  const [bodyImageAlt, setBodyImageAlt] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);
  const isEditing = Boolean(id);

  useEffect(() => {
    fetch("/api/cms/media")
      .then((response) => response.json())
      .then((payload) => payload.ok && setMedia(payload.data))
      .catch(() => undefined);

    if (!id) return;
    fetch(`/api/cms/blog/${id}`)
      .then((response) => response.json())
      .then((payload) => {
        if (!payload.ok) throw new Error(payload.message || "Failed to load blog.");
        setPost(payload.data);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load blog."));
  }, [id]);

  function update<K extends keyof CmsBlogPost>(key: K, value: CmsBlogPost[K]) {
    setPost((current) => ({ ...current, [key]: value }));
  }

  function insertBodyImage() {
    const imageUrl = bodyImageUrl.trim();
    if (!imageUrl) {
      setError("Please choose an image before inserting it into the article body.");
      return;
    }
    setError("");
    const alt = bodyImageAlt.trim() || "TOKNAV product image";
    const imageMarkdown = `\n\n![${alt}](${imageUrl})\n\n`;
    const currentBody = post.body || "";
    const textarea = bodyRef.current;
    const start = textarea?.selectionStart ?? currentBody.length;
    const end = textarea?.selectionEnd ?? currentBody.length;
    const nextBody = `${currentBody.slice(0, start)}${imageMarkdown}${currentBody.slice(end)}`;
    update("body", nextBody);
    window.setTimeout(() => {
      bodyRef.current?.focus();
      const cursor = start + imageMarkdown.length;
      bodyRef.current?.setSelectionRange(cursor, cursor);
    }, 0);
  }

  async function save(status?: "draft" | "published") {
    setError("");
    setMessage("");
    const payload = { ...post, status: status || post.status || "draft" };
    const response = await fetch(isEditing ? `/api/cms/blog/${id}` : "/api/cms/blog", {
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
    setPost(result.data);
    if (!isEditing) router.replace(`/admin/blog/${result.data.id}/edit`);
  }

  return (
    <>
      <div className="admin-topbar">
        <div className="admin-page-title">
          <h1>{isEditing ? "Edit Blog Post" : "New Blog Post"}</h1>
          <p>Create SEO posts with markdown-style body content.</p>
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
            <label className="admin-field"><span>Title</span><input className="admin-input" value={post.title || ""} onChange={(event) => update("title", event.target.value)} /></label>
            <label className="admin-field"><span>Slug</span><input className="admin-input" value={post.slug || ""} onChange={(event) => update("slug", event.target.value)} /></label>
            <label className="admin-field"><span>Category</span><input className="admin-input" value={post.category || ""} onChange={(event) => update("category", event.target.value)} /></label>
            <label className="admin-field"><span>Author</span><input className="admin-input" value={post.author || ""} onChange={(event) => update("author", event.target.value)} /></label>
            <label className="admin-field"><span>Published at</span><input className="admin-input" value={post.publishedAt || ""} onChange={(event) => update("publishedAt", event.target.value)} /></label>
            <label className="admin-field"><span>Status</span><select className="admin-select" value={post.status || "draft"} onChange={(event) => update("status", event.target.value as CmsBlogPost["status"])}><option value="draft">Draft</option><option value="published">Published</option></select></label>
          </div>
          <label className="admin-field"><span>Summary</span><textarea className="admin-textarea" value={post.summary || ""} onChange={(event) => update("summary", event.target.value)} /></label>
          <div className="admin-help-card">
            <strong>Insert image inside the article</strong>
            <p>Upload images in Media Library first, choose one here, then click Insert image. It will add Markdown image code at the current cursor position in the Body field.</p>
            <div className="admin-inline-tools">
              <select className="admin-select" value={bodyImageUrl} onChange={(event) => setBodyImageUrl(event.target.value)}>
                <option value="">Choose body image</option>
                {media.map((item) => <option value={item.url} key={item.id}>{item.filename}</option>)}
              </select>
              <input className="admin-input" value={bodyImageAlt} onChange={(event) => setBodyImageAlt(event.target.value)} placeholder="Image ALT text / caption" />
              <button className="admin-button-secondary" type="button" onClick={insertBodyImage}>Insert image</button>
            </div>
            {bodyImageUrl ? <img src={bodyImageUrl} alt="" style={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 12 }} /> : null}
          </div>
          <label className="admin-field"><span>Body</span><textarea ref={bodyRef} className="admin-textarea" style={{ minHeight: 360 }} value={post.body || ""} onChange={(event) => update("body", event.target.value)} /></label>
          <label className="admin-field"><span>Tags, comma separated</span><input className="admin-input" value={(post.tags || []).join(", ")} onChange={(event) => update("tags", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} /></label>
          <label className="admin-field"><span>SEO title</span><input className="admin-input" value={post.seoTitle || ""} onChange={(event) => update("seoTitle", event.target.value)} /></label>
          <label className="admin-field"><span>SEO description</span><textarea className="admin-textarea" value={post.seoDescription || ""} onChange={(event) => update("seoDescription", event.target.value)} /></label>
        </section>
        <aside className="admin-editor-panel">
          <label className="admin-field">
            <span>Cover image</span>
            <input className="admin-input" value={post.coverImage || ""} onChange={(event) => update("coverImage", event.target.value)} />
            <select className="admin-select" value={post.coverImage || ""} onChange={(event) => update("coverImage", event.target.value)}>
              <option value="">Choose media</option>
              {media.map((item) => <option value={item.url} key={item.id}>{item.filename}</option>)}
            </select>
          </label>
          {post.coverImage ? <img src={post.coverImage} alt="" style={{ width: "100%", borderRadius: 12 }} /> : null}
          {post.slug ? <a className="admin-button-secondary" href={`/blog/${post.slug}`} target="_blank">Open Preview</a> : null}
        </aside>
      </div>
    </>
  );
}
