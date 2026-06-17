const ACCESS_CODE = "toknav-seo";
const STORAGE_KEY = "toknav-seo-admin-v1";

const state = {
  data: null,
  selectedId: null,
  unlocked: false
};

const els = {};

function qs(selector) {
  return document.querySelector(selector);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugId() {
  return `page-${Date.now()}`;
}

async function loadInitialData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    state.data = JSON.parse(saved);
    return;
  }
  const response = await fetch("./seo-data.json", { cache: "no-store" });
  state.data = await response.json();
}

function saveData() {
  state.data.site.updatedAt = new Date().toISOString().slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data, null, 2));
}

function pageScore(page) {
  let score = 0;
  const titleLength = page.seoTitle.trim().length;
  const metaLength = page.metaDescription.trim().length;
  if (page.focusKeyword.trim()) score += 15;
  if (titleLength >= 45 && titleLength <= 65) score += 20;
  else if (titleLength >= 35 && titleLength <= 75) score += 12;
  if (metaLength >= 120 && metaLength <= 165) score += 25;
  else if (metaLength >= 90 && metaLength <= 180) score += 14;
  if (page.h1.trim()) score += 12;
  if (page.cta.trim()) score += 10;
  if (Number(page.internalLinks) >= 3) score += 10;
  if (page.notes.trim()) score += 8;
  return Math.min(score, 100);
}

function getFilteredPages() {
  const search = els.searchInput.value.trim().toLowerCase();
  const type = els.typeFilter.value;
  const status = els.statusFilter.value;
  return state.data.pages.filter((page) => {
    const text = `${page.url} ${page.focusKeyword} ${page.seoTitle} ${page.h1}`.toLowerCase();
    return (!search || text.includes(search)) &&
      (!type || page.type === type) &&
      (!status || page.status === status);
  });
}

function renderMetrics() {
  const pages = state.data.pages;
  const avg = pages.length
    ? Math.round(pages.reduce((sum, page) => sum + pageScore(page), 0) / pages.length)
    : 0;
  els.metricTotal.textContent = pages.length;
  els.metricScore.textContent = avg;
  els.metricHigh.textContent = pages.filter((page) => page.priority === "High").length;
  els.metricDraft.textContent = pages.filter((page) => page.status !== "Live").length;
}

function renderFilters() {
  const types = [...new Set(state.data.pages.map((page) => page.type))].sort();
  const current = els.typeFilter.value;
  els.typeFilter.innerHTML = '<option value="">全部类型</option>' +
    types.map((type) => `<option ${type === current ? "selected" : ""}>${escapeHtml(type)}</option>`).join("");
}

function renderPageList() {
  const pages = getFilteredPages();
  els.pageList.innerHTML = pages.map((page) => {
    const score = pageScore(page);
    return `
      <button class="page-card ${page.id === state.selectedId ? "is-active" : ""}" data-id="${escapeHtml(page.id)}" type="button">
        <strong>${escapeHtml(page.h1 || page.seoTitle || page.url)}</strong>
        <small>${escapeHtml(page.url)}</small>
        <div class="tag-row">
          <span class="tag ${page.priority.toLowerCase()}">${escapeHtml(page.priority)}</span>
          <span class="tag ${page.status.toLowerCase()}">${escapeHtml(page.status)}</span>
          <span class="tag">${score}/100</span>
        </div>
      </button>
    `;
  }).join("");

  els.pageList.querySelectorAll(".page-card").forEach((button) => {
    button.addEventListener("click", () => selectPage(button.dataset.id));
  });
}

function currentPage() {
  return state.data.pages.find((page) => page.id === state.selectedId) || state.data.pages[0];
}

function renderChecklist(page) {
  const items = [
    ["关键词", Boolean(page.focusKeyword.trim())],
    ["Title 长度", page.seoTitle.length >= 45 && page.seoTitle.length <= 65],
    ["Meta 长度", page.metaDescription.length >= 120 && page.metaDescription.length <= 165],
    ["H1", Boolean(page.h1.trim())],
    ["CTA", Boolean(page.cta.trim())],
    ["内链 ≥ 3", Number(page.internalLinks) >= 3],
    ["备注", Boolean(page.notes.trim())]
  ];
  els.seoChecklist.innerHTML = items.map(([label, pass]) => `
    <div class="check-item ${pass ? "pass" : "warn"}">
      <span>${pass ? "✓" : "!"}</span>
      <span>${escapeHtml(label)}</span>
    </div>
  `).join("");
}

function renderEditor() {
  const page = currentPage();
  if (!page) return;
  state.selectedId = page.id;
  els.editorTitle.textContent = page.h1 || page.seoTitle || page.url;
  els.scorePill.textContent = `${pageScore(page)}/100`;
  els.pageEditor.elements.type.value = page.type;
  els.pageEditor.elements.priority.value = page.priority;
  els.pageEditor.elements.status.value = page.status;
  els.pageEditor.elements.url.value = page.url;
  els.pageEditor.elements.focusKeyword.value = page.focusKeyword;
  els.pageEditor.elements.seoTitle.value = page.seoTitle;
  els.pageEditor.elements.metaDescription.value = page.metaDescription;
  els.pageEditor.elements.h1.value = page.h1;
  els.pageEditor.elements.cta.value = page.cta;
  els.pageEditor.elements.internalLinks.value = page.internalLinks;
  els.pageEditor.elements.notes.value = page.notes;
  els.titleCount.textContent = `${page.seoTitle.length} chars`;
  els.metaCount.textContent = `${page.metaDescription.length} chars`;
  els.openPageLink.href = publicPageHref(page.url);
  renderChecklist(page);
  renderPageList();
}

function publicPageHref(url) {
  if (url === "/") return "../index.html";
  const clean = url.replace(/^\/+|\/+$/g, "");
  if (!clean) return "../index.html";
  if (clean.startsWith("products/") && clean.split("/").length === 2) {
    return `../${clean}/index.html`;
  }
  if (clean === "blog") return "../blog/index.html";
  return `../${clean}.html`;
}

function selectPage(id) {
  state.selectedId = id;
  renderEditor();
}

function saveCurrentPage(event) {
  event.preventDefault();
  const page = currentPage();
  if (!page) return;
  const fields = new FormData(els.pageEditor);
  page.type = fields.get("type").trim();
  page.priority = fields.get("priority");
  page.status = fields.get("status");
  page.url = fields.get("url").trim();
  page.focusKeyword = fields.get("focusKeyword").trim();
  page.seoTitle = fields.get("seoTitle").trim();
  page.metaDescription = fields.get("metaDescription").trim();
  page.h1 = fields.get("h1").trim();
  page.cta = fields.get("cta").trim();
  page.internalLinks = Number(fields.get("internalLinks") || 0);
  page.notes = fields.get("notes").trim();
  saveData();
  renderAll();
}

function addPage() {
  const page = {
    id: slugId(),
    type: "Product Page",
    priority: "Medium",
    status: "Draft",
    url: "/new-page/",
    focusKeyword: "",
    seoTitle: "",
    metaDescription: "",
    h1: "New Page",
    cta: "Get a Quote",
    internalLinks: 0,
    notes: ""
  };
  state.data.pages.unshift(page);
  state.selectedId = page.id;
  saveData();
  renderAll();
}

function renderBlogIdeas() {
  els.blogGrid.innerHTML = state.data.blogIdeas.map((item) => `
    <article class="blog-card">
      <div class="tag-row">
        <span class="tag ${item.priority.toLowerCase()}">${escapeHtml(item.priority)}</span>
        <span class="tag">${escapeHtml(item.intent)}</span>
      </div>
      <strong>${escapeHtml(item.title)}</strong>
      <span>Keyword: ${escapeHtml(item.keyword)}</span>
      <span>${escapeHtml(item.notes)}</span>
    </article>
  `).join("");
}

function addBlogIdea() {
  const title = prompt("请输入博客标题");
  if (!title) return;
  state.data.blogIdeas.unshift({
    id: `blog-${Date.now()}`,
    priority: "Medium",
    keyword: "",
    title,
    intent: "SEO content",
    notes: "Add target keyword, CTA and internal links."
  });
  saveData();
  renderBlogIdeas();
}

function renderTechnicalList() {
  els.technicalList.innerHTML = state.data.technicalChecklist
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");
}

function pageSnippet(page) {
  return [
    `URL: ${page.url}`,
    `Focus Keyword: ${page.focusKeyword}`,
    `SEO Title: ${page.seoTitle}`,
    `Meta Description: ${page.metaDescription}`,
    `H1: ${page.h1}`,
    `CTA: ${page.cta}`,
    `Internal Links: ${page.internalLinks}`,
    `Notes: ${page.notes}`
  ].join("\n");
}

function copySnippet() {
  const text = pageSnippet(currentPage());
  navigator.clipboard?.writeText(text);
  els.exportOutput.value = text;
}

function exportRows() {
  return state.data.pages.map((page) => ({
    type: page.type,
    priority: page.priority,
    status: page.status,
    url: page.url,
    focusKeyword: page.focusKeyword,
    seoTitle: page.seoTitle,
    metaDescription: page.metaDescription,
    h1: page.h1,
    cta: page.cta,
    internalLinks: page.internalLinks,
    score: pageScore(page),
    notes: page.notes
  }));
}

function toCsv(rows) {
  const headers = Object.keys(rows[0] || {});
  const escapeCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [headers.join(","), ...rows.map((row) => headers.map((header) => escapeCell(row[header])).join(","))].join("\n");
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function exportJson() {
  const content = JSON.stringify(state.data, null, 2);
  els.exportOutput.value = content;
  downloadFile("toknav-seo-admin-backup.json", content, "application/json");
}

function exportCsv() {
  const content = toCsv(exportRows());
  els.exportOutput.value = content;
  downloadFile("toknav-seo-page-list.csv", content, "text/csv;charset=utf-8");
}

function copyAll() {
  const content = state.data.pages.map(pageSnippet).join("\n\n---\n\n");
  els.exportOutput.value = content;
  navigator.clipboard?.writeText(content);
}

async function resetData() {
  if (!confirm("确定恢复初始数据？当前浏览器里的修改会被清除。")) return;
  localStorage.removeItem(STORAGE_KEY);
  await loadInitialData();
  state.selectedId = state.data.pages[0]?.id;
  renderAll();
}

function unlock() {
  if (els.accessCode.value !== ACCESS_CODE) {
    els.accessCode.focus();
    els.accessCode.value = "";
    els.accessCode.placeholder = "访问码不正确";
    return;
  }
  state.unlocked = true;
  localStorage.setItem("toknav-seo-admin-unlocked", "1");
  els.lockedLayer.classList.remove("is-locked");
  els.accessPanel.style.display = "none";
}

function bindEvents() {
  els.unlockButton.addEventListener("click", unlock);
  els.accessCode.addEventListener("keydown", (event) => {
    if (event.key === "Enter") unlock();
  });
  els.searchInput.addEventListener("input", renderPageList);
  els.typeFilter.addEventListener("change", renderPageList);
  els.statusFilter.addEventListener("change", renderPageList);
  els.pageEditor.addEventListener("submit", saveCurrentPage);
  els.addPageButton.addEventListener("click", addPage);
  els.addBlogButton.addEventListener("click", addBlogIdea);
  els.resetButton.addEventListener("click", resetData);
  els.copySnippetButton.addEventListener("click", copySnippet);
  els.downloadJsonButton.addEventListener("click", exportJson);
  els.downloadCsvButton.addEventListener("click", exportCsv);
  els.copyAllButton.addEventListener("click", copyAll);
  ["seoTitle", "metaDescription"].forEach((name) => {
    els.pageEditor.elements[name].addEventListener("input", () => {
      els.titleCount.textContent = `${els.pageEditor.elements.seoTitle.value.length} chars`;
      els.metaCount.textContent = `${els.pageEditor.elements.metaDescription.value.length} chars`;
    });
  });
}

function cacheElements() {
  Object.assign(els, {
    accessPanel: qs("#accessPanel"),
    accessCode: qs("#accessCode"),
    unlockButton: qs("#unlockButton"),
    lockedLayer: qs("#lockedLayer"),
    metricTotal: qs("#metricTotal"),
    metricScore: qs("#metricScore"),
    metricHigh: qs("#metricHigh"),
    metricDraft: qs("#metricDraft"),
    searchInput: qs("#searchInput"),
    typeFilter: qs("#typeFilter"),
    statusFilter: qs("#statusFilter"),
    pageList: qs("#pageList"),
    pageEditor: qs("#pageEditor"),
    editorTitle: qs("#editorTitle"),
    scorePill: qs("#scorePill"),
    titleCount: qs("#titleCount"),
    metaCount: qs("#metaCount"),
    seoChecklist: qs("#seoChecklist"),
    openPageLink: qs("#openPageLink"),
    addPageButton: qs("#addPageButton"),
    addBlogButton: qs("#addBlogButton"),
    resetButton: qs("#resetButton"),
    copySnippetButton: qs("#copySnippetButton"),
    downloadJsonButton: qs("#downloadJsonButton"),
    downloadCsvButton: qs("#downloadCsvButton"),
    copyAllButton: qs("#copyAllButton"),
    exportOutput: qs("#exportOutput"),
    blogGrid: qs("#blogGrid"),
    technicalList: qs("#technicalList")
  });
}

function renderAll() {
  renderFilters();
  renderMetrics();
  renderPageList();
  renderEditor();
  renderBlogIdeas();
  renderTechnicalList();
}

async function init() {
  cacheElements();
  await loadInitialData();
  state.selectedId = state.data.pages[0]?.id;
  els.lockedLayer.classList.add("is-locked");
  if (localStorage.getItem("toknav-seo-admin-unlocked") === "1") {
    state.unlocked = true;
    els.lockedLayer.classList.remove("is-locked");
    els.accessPanel.style.display = "none";
  }
  bindEvents();
  renderAll();
}

init();
