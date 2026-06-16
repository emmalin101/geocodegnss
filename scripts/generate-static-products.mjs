import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();

function loadProductModule() {
  const sourcePath = path.join(root, "app/lib/products.ts");
  let source = fs.readFileSync(sourcePath, "utf8");

  source = source
    .replace(/export type [\s\S]*?};\n\n/g, "")
    .replace(/export const /g, "const ")
    .replace(/export function /g, "function ")
    .replace(/: ProductCategory\[\]/g, "")
    .replace(/: Product\[\]/g, "")
    .replace(/: ProductSpec\[\]/g, "")
    .replace(/: ProductSpecGroup\[\]/g, "")
    .replace(/: Record<string, ProductDownload>/g, "")
    .replace(/: Record<string, ProductDatasheet>/g, "")
    .replace(/: Record<string, \{ title: string; text: string; products: string \}\[\]>/g, "")
    .replace(/: Record<string, ProductSpecGroup\[\]>/g, "")
    .replace(/: Record<string, ProductSpecGroup\[\]\>/g, "")
    .replace(/: string/g, "")
    .replace(/: Product/g, "")
    .replace(/\)([A-Za-z][A-Za-z0-9_]*)\[\]/g, ")")
    .replace(/\(([^()]*?): string([^()]*)\)/g, "($1$2)")
    .replace(/\(([^()]*?): Product([^()]*)\)/g, "($1$2)");

  source += `
globalThis.__toknavProducts = {
  productCategories,
  products,
  getCategory,
  getProductsByCategory,
  getCategoryApplications,
  getProduct,
  getProductSpecGroups,
  getProductInquiryUrl,
  getProductDownloads,
  getProductDatasheet,
  getProductQuickSpecs,
  getProductGallery,
  getProductBuyerBenefits,
  getProductSeoTitle,
  getProductMetaDescription,
  getProductFaqs
};`;

  const context = {
    globalThis: {},
    URLSearchParams
  };
  vm.createContext(context);
  vm.runInContext(source, context, { filename: sourcePath });
  return context.globalThis.__toknavProducts;
}

const {
  productCategories,
  products,
  getProductsByCategory,
  getCategoryApplications,
  getProductSpecGroups,
  getProductDownloads,
  getProductDatasheet,
  getProductQuickSpecs,
  getProductGallery,
  getProductBuyerBenefits,
  getProductSeoTitle,
  getProductMetaDescription,
  getProductFaqs
} = loadProductModule();

const css = fs.readFileSync(path.join(root, "app/globals.css"), "utf8");

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function attr(value) {
  return esc(value).replace(/'/g, "&#39;");
}

function relAsset(src, depth) {
  const clean = src.replace(/^\//, "");
  return `${"../".repeat(depth)}public/${clean}`;
}

function relDownload(href, depth) {
  if (href.startsWith("/inquiry?")) {
    return `${"../".repeat(depth)}inquiry.html${href.slice("/inquiry".length)}`;
  }
  const clean = href.replace(/^\//, "");
  return `${"../".repeat(depth)}public/${clean}`;
}

function homeIndex() {
  const heroProducts = [
    { name: "T50Pro GNSS Receiver", href: "products/gnss-receivers/t50pro.html", image: "/assets/products/t50pro.webp" },
    { name: "TR10Pro Marking Robot", href: "products/gnss-application-solutions/marking-robot.html", image: "/assets/products/tr10pro-marking-robot-front.png" },
    { name: "U6 Monitoring System", href: "products/gnss-application-solutions/deformation-monitoring.html", image: "/assets/products/u6.webp" }
  ];
  const featuredProducts = [
    {
      name: "T50Pro GNSS Receiver",
      type: "Professional RTK",
      text: "A premium RTK receiver for survey, mapping and construction crews that need stable centimeter-level positioning.",
      image: "/assets/products/t50pro.webp",
      href: "products/gnss-receivers/t50pro.html"
    },
    {
      name: "T30Pro GNSS Receiver",
      type: "Image Survey RTK",
      text: "Designed for overseas dealers selling modern image survey, stakeout and daily field workflows.",
      image: "/assets/products/t30pro.webp",
      href: "products/gnss-receivers/t30pro.html"
    },
    {
      name: "TAG66 Auto Steering",
      type: "Precision Agriculture",
      text: "GNSS auto-steering system for farm dealers and smart agriculture projects.",
      image: "/assets/products/tag66.webp",
      href: "products/precision-agriculture-machine-control/tag66.html"
    },
    {
      name: "TR10Pro Marking Robot",
      type: "Robotic Marking",
      text: "Automated GNSS line marking solution for sports fields, roads and runway pre-marking.",
      image: "/assets/products/tr10pro-marking-robot.png",
      href: "products/gnss-application-solutions/marking-robot.html"
    }
  ];
  const industries = [
    ["Surveying & Mapping", "RTK receivers, controllers and antennas for field survey teams.", "products/gnss-receivers/index.html", "◉"],
    ["Machine Control", "Guidance and positioning systems for construction equipment.", "products/precision-agriculture-machine-control/index.html", "⚙"],
    ["Precision Agriculture", "Auto-steering, land leveling and farm positioning solutions.", "products/precision-agriculture-machine-control/index.html", "▦"],
    ["Monitoring & CORS", "Base stations, CORS/VRS and deformation monitoring packages.", "products/gnss-application-solutions/index.html", "⌁"]
  ];
  const proofPoints = [
    ["OEM/ODM Ready", "Product configuration, branding and channel cooperation for overseas partners."],
    ["Factory Testing", "Receiver kits, radios, accessories and complete systems prepared before shipment."],
    ["Global Project Fit", "Built for distributors, contractors, system integrators and government projects."],
    ["Catalog + Datasheets", "Category pages support model comparison, downloads and fast quote requests."]
  ];
  const blogCards = [
    {
      title: "How to Choose an RTK GNSS Receiver for Surveying and Construction",
      text: "A buyer-focused guide for selecting receiver models, correction workflows and accessory kits.",
      href: "blog/how-to-choose-rtk-gnss-receiver-surveying-construction.html"
    },
    {
      title: "CORS/VRS vs Base-Rover RTK GNSS Correction",
      text: "Compare correction options before planning a receiver, base station or network project.",
      href: "blog/cors-vrs-vs-base-rover-rtk-gnss-correction.html"
    },
    {
      title: "GNSS Auto-Steering and Machine Control Buying Guide",
      text: "A practical overview for agriculture dealers and construction solution providers.",
      href: "blog/gnss-auto-steering-machine-control-buying-guide.html"
    }
  ];
  const sectionTitle = (label, title, text) => `<div class="home-section-title"><span>${esc(label)}</span><h2>${esc(title)}</h2><p>${esc(text)}</p></div>`;
  const categoryCards = productCategories.map((category) => `<a href="products/${category.slug}/index.html" class="home-category-card">
      <img src="${relAsset(category.image, 0)}" alt="${attr(category.name)}">
      <div><span>${esc(category.kicker)}</span><h3>${esc(category.name)}</h3><p>${esc(category.buyerIntent)}</p></div>
      <span class="home-card-arrow">›</span>
    </a>`).join("");
  const heroProductCards = heroProducts.map((item) => `<a href="${item.href}">
      <img src="${relAsset(item.image, 0)}" alt="${attr(item.name)}">
      <span>${esc(item.name)}</span>
    </a>`).join("");
  const featuredCards = featuredProducts.map((product) => `<a href="${product.href}" class="home-featured-card">
      <div class="home-featured-image"><img src="${relAsset(product.image, 0)}" alt="${attr(product.name)}"></div>
      <div class="home-featured-content"><span>${esc(product.type)}</span><h3>${esc(product.name)}</h3><p>${esc(product.text)}</p><strong>View model details →</strong></div>
    </a>`).join("");
  const industryCards = industries.map(([title, text, href, icon]) => `<a href="${href}">
      <span class="home-industry-icon">${icon}</span>
      <div><strong>${esc(title)}</strong><span>${esc(text)}</span></div>
      <span class="home-card-arrow">›</span>
    </a>`).join("");
  const proofCards = proofPoints.map(([title, text]) => `<div><span class="home-check">✓</span><strong>${esc(title)}</strong><span>${esc(text)}</span></div>`).join("");
  const blogHtml = blogCards.map((post) => `<a href="${post.href}">
      <span>Buying Guide</span><h3>${esc(post.title)}</h3><p>${esc(post.text)}</p><strong>Read article →</strong>
    </a>`).join("");

  return shell({
    title: "TOKNAV GNSS Receiver Manufacturer | RTK, CORS/VRS and Machine Control Solutions",
    description: "TOKNAV supplies high-precision GNSS receivers, RTK antennas, CORS/VRS systems, precision agriculture and machine-control solutions for global B2B buyers.",
    body: `<section class="home-hero">
      <div class="home-hero-bg" aria-hidden="true"></div>
      <div class="home-hero-copy">
        <h1>High-Precision GNSS &amp; RTK Solutions Manufacturer</h1>
        <p>TOKNAV supplies RTK GNSS receivers, antennas, CORS/VRS systems, precision agriculture and robotic marking solutions for overseas distributors, contractors and system integrators.</p>
        <div class="home-hero-actions"><a class="home-primary-button" href="inquiry.html">Get a Quote →</a><a class="home-secondary-button" href="products.html">Explore Products ›</a></div>
        <div class="home-hero-proof"><span>OEM/ODM Manufacturing</span><span>RTK + CORS/VRS</span><span>Surveying · Agriculture · Construction</span></div>
      </div>
      <div class="home-hero-visual">
        <img class="home-hero-banner" src="public/assets/gnss-receiver-homepage-banner-original.png" alt="TOKNAV GNSS receiver product banner">
        <div class="home-hero-product-row">${heroProductCards}</div>
      </div>
    </section>
    <section class="home-metrics" aria-label="Company capability overview">
      <div><strong>15+ Years</strong><span>GNSS R&D and product experience</span></div>
      <div><strong>OEM/ODM</strong><span>Support for distributors and brand partners</span></div>
      <div><strong>Full Range</strong><span>Receivers, antennas, controllers and solutions</span></div>
      <div><strong>Global B2B</strong><span>Built for export inquiries and project delivery</span></div>
    </section>
    <section class="home-section home-products" id="products">
      ${sectionTitle("Product Center", "Choose Products by Buyer Intent", "A CHCNAV-style homepage needs fast category access: product families first, then model details, downloads and inquiry CTAs.")}
      <div class="home-category-grid">${categoryCards}</div>
    </section>
    <section class="home-section home-featured">
      ${sectionTitle("Featured Models", "Popular Models for Quotation Pages and Paid Traffic", "These entrances lead buyers from broad homepage interest into specific model pages with specifications, downloads and inquiry actions.")}
      <div class="home-featured-grid">${featuredCards}</div>
    </section>
    <section class="home-section home-industries" id="solutions">
      <div class="home-industries-copy">
        ${sectionTitle("Industries", "Application Entrances for SEO, GEO and Ads", "The homepage now gives overseas buyers a clearer path by application, so Google traffic and paid clicks land closer to the solution they need.")}
        <div class="home-industries-list">${industryCards}</div>
      </div>
      <div class="home-field-panel"><img src="public/assets/rtk-field-use-1.jpg" alt="TOKNAV GNSS receiver used in field surveying"><div><strong>Field-ready positioning workflows</strong><span>RTK survey, base-rover setup, CORS/VRS correction and project configuration support.</span></div></div>
    </section>
    <section class="home-section home-oem" id="oem">
      <div class="home-proof-visual"><img src="public/assets/customer-visit.jpg" alt="TOKNAV customer visit and business cooperation"></div>
      <div class="home-proof-copy">
        ${sectionTitle("OEM / ODM", "Make the Website Feel Like a Real Manufacturer", "For B2B buyers, trust comes from product range, technical people, shipment preparation and visible cooperation proof.")}
        <div class="home-proof-grid">${proofCards}</div>
        <a class="home-secondary-button" href="contact.html">Contact TOKNAV →</a>
      </div>
    </section>
    <section class="home-section home-trust" id="about">
      ${sectionTitle("Why TOKNAV", "Trust Signals for Overseas Procurement", "The homepage combines product proof, people proof and project proof so new visitors can decide whether to send requirements.")}
      <div class="home-trust-grid">
        <div><span class="home-trust-icon">⌂</span><strong>Manufacturing Capability</strong><span>GNSS receiver kits, antennas, controllers, accessories and solution packages for export orders.</span></div>
        <div><span class="home-trust-icon">✓</span><strong>Quality and Testing</strong><span>Use product testing, inspection and datasheet downloads to support serious procurement decisions.</span></div>
        <div><span class="home-trust-icon">◎</span><strong>Distributor Support</strong><span>OEM/ODM cooperation, catalog support and application-based quotation for global partners.</span></div>
        <div><span class="home-trust-icon">⌖</span><strong>Guangzhou Office</strong><span>No. 9 Caipin Road, Huangpu District, Guangzhou, Guangdong, China.</span></div>
      </div>
    </section>
    <section class="home-section home-news">
      ${sectionTitle("Resources", "SEO Content That Supports Buyer Decisions", "Blog content should answer product selection, comparison and application questions that overseas buyers ask before inquiry.")}
      <div class="home-news-grid">${blogHtml}</div>
    </section>
    <section class="home-section home-cta" id="contact">
      <div><span class="home-cta-icon">✓</span><h2>Send Your Product Requirements and Get a Faster TOKNAV Quotation</h2><p>Share your target product, quantity, country, application and correction method. TOKNAV can recommend receiver kits, antennas, accessories and solution packages.</p></div>
      <div class="home-cta-actions"><a class="home-primary-button" href="inquiry.html">Submit Inquiry →</a><a class="home-secondary-button" href="public/assets/downloads/catalogs/gnss-receiver.pdf">↓ Download Catalog</a><a class="home-text-link" href="mailto:info@toknavgnss.com">✉ info@toknavgnss.com</a></div>
    </section>`
  });
}

function shell({ title, description, depth = 0, body, schema = "" }) {
  const prefix = "../".repeat(depth);
  const megaGrid = productCategories.map((category) => `<a href="${prefix}products/${category.slug}/index.html">
        <img src="${prefix}public${category.image}" alt="">
        <span>${esc(category.kicker)}</span>
        <strong>${esc(category.name)}</strong>
        <em>${esc(category.buyerIntent)}</em>
      </a>`).join("");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${attr(description)}">
<style>${css}</style>
${schema}
</head>
<body>
<main>
  <header class="site-header">
    <a class="brand" href="${prefix}index.html"><img src="${prefix}public/assets/toknav-logo-blue.png" alt="TOKNAV"></a>
    <nav class="main-nav" aria-label="Primary navigation">
      <details class="mega-nav-item">
        <summary class="mega-nav-trigger">Products <span>⌄</span></summary>
        <div class="mega-menu" aria-label="TOKNAV product categories">
          <div class="mega-menu-panel">
            <div class="mega-menu-intro">
              <span>Product Center</span>
              <strong>High-precision GNSS products for B2B projects</strong>
              <p>Compare RTK receivers, controllers, antennas, machine-control systems and complete GNSS application solutions.</p>
              <a href="${prefix}products.html">View All Products →</a>
            </div>
            <div class="mega-menu-grid">${megaGrid}</div>
            <div class="mega-menu-footer">
              <div><span>▣</span><span>Catalog downloads, model specs and quote support are available on product pages.</span></div>
              <a href="${prefix}inquiry.html">Send Requirements →</a>
            </div>
          </div>
        </div>
      </details>
      <a href="${prefix}index.html#solutions">Solutions</a>
      <a href="${prefix}index.html#oem">OEM/ODM</a>
      <a href="${prefix}index.html#about">About</a>
      <a href="${prefix}blog.html">Blog</a>
      <a href="${prefix}contact.html">Contact</a>
    </nav>
    <a class="header-cta" href="${prefix}inquiry.html"><span>Get a Quote</span> →</a>
  </header>
${body}
  <footer><strong>TOKNAV</strong><span>Guangzhou Toksurvey Information Technology Co., Ltd.</span><span>No. 9 Caipin Road, Huangpu District, Guangzhou, China</span><span>GNSS Receiver Manufacturer · Professional OEM & ODM</span></footer>
</main>
<a aria-label="Contact TOKNAV on WhatsApp" class="whatsapp-float" href="https://wa.me/8619195346957?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20Please%20send%20me%20more%20details." rel="noopener noreferrer" target="_blank" title="Contact TOKNAV on WhatsApp"><svg aria-hidden="true" viewBox="0 0 32 32"><path d="M16.02 4.2c-6.45 0-11.7 5.14-11.7 11.46 0 2.18.64 4.29 1.84 6.11L4.2 27.8l6.28-1.91a11.98 11.98 0 0 0 5.54 1.37c6.45 0 11.7-5.14 11.7-11.46S22.47 4.2 16.02 4.2Zm0 20.99c-1.78 0-3.52-.49-5.04-1.42l-.36-.22-3.72 1.13 1.16-3.56-.24-.37a9.33 9.33 0 0 1-1.43-4.95c0-5.18 4.32-9.39 9.63-9.39s9.63 4.21 9.63 9.39-4.32 9.39-9.63 9.39Zm5.29-7.04c-.29-.14-1.71-.83-1.98-.92-.27-.1-.46-.14-.66.14-.19.28-.76.92-.93 1.11-.17.19-.34.21-.63.07-.29-.14-1.22-.44-2.32-1.41-.86-.75-1.44-1.68-1.61-1.96-.17-.28-.02-.43.13-.57.13-.13.29-.33.44-.49.15-.16.19-.28.29-.47.1-.19.05-.35-.02-.49-.07-.14-.66-1.55-.9-2.13-.24-.56-.48-.48-.66-.49h-.56c-.19 0-.51.07-.78.35-.27.28-1.02.98-1.02 2.39s1.05 2.77 1.2 2.96c.15.19 2.07 3.1 5.02 4.34.7.3 1.25.48 1.68.61.71.22 1.35.19 1.86.12.57-.08 1.71-.69 1.95-1.35.24-.66.24-1.23.17-1.35-.07-.12-.27-.19-.56-.33Z"/></svg></a>
</body>
</html>`;
}

function productsIndex() {
  const cards = productCategories.map((category) => {
    const count = products.filter((item) => item.categorySlug === category.slug).length;
    return `<a class="product-category-card" href="products/${category.slug}/index.html">
      <div class="product-card-image"><img src="${relAsset(category.image, 0)}" alt="${attr(category.name)}"></div>
      <span>${esc(category.kicker)}</span>
      <h2>${esc(category.name)}</h2>
      <p>${esc(category.description)}</p>
      <div class="product-card-footer"><strong>${count} items</strong><em>View category →</em></div>
    </a>`;
  }).join("");

  return shell({
    title: "TOKNAV Products | GNSS Receivers and RTK Solutions",
    description: "Explore TOKNAV GNSS receivers, antennas, controllers, machine-control systems, accessories and application solutions.",
    body: `<section class="product-hero">
      <div><span class="contact-label">Product Center</span><h1>TOKNAV Product Categories for High-Precision Positioning</h1><p>Browse product lines from TOKNAV brochures: GNSS receivers, rugged controllers, antennas, precision agriculture, accessories and GNSS application solutions.</p><div class="product-hero-actions"><a class="primary-button" href="inquiry.html">Get a Quote →</a><a class="secondary-button" href="contact.html">Contact Sales</a></div></div>
      <div class="product-hero-panel"><strong>${products.length}+ listed products and solutions</strong><span>Structured from TOKNAV product brochures and product asset folders.</span></div>
    </section>
    <section class="product-section"><div class="product-category-grid">${cards}</div></section>`
  });
}

function categoryPage(category) {
  const categoryProducts = getProductsByCategory(category.slug);
  const applications = getCategoryApplications(category.slug);
  const cards = categoryProducts.map((product) => `<a class="product-list-card" href="${"../".repeat(2)}products/${category.slug}/${product.slug}.html">
    <div class="product-list-image"><img src="${relAsset(product.image, 2)}" alt="${attr(product.name)}"></div>
    <div class="product-list-copy"><span>${esc(product.type)}</span><h3>${esc(product.name)}</h3><p>${esc(product.excerpt)}</p><div class="product-mini-specs">${product.highlights.slice(0, 3).map((item) => `<em>${esc(item)}</em>`).join("")}</div><strong>View model details →</strong></div>
  </a>`).join("");
  const applicationHtml = applications.map((item) => `<article><strong>${esc(item.title)}</strong><p>${esc(item.text)}</p><span>${esc(item.products)}</span></article>`).join("");

  return shell({
    title: `${category.name} | TOKNAV Product Category`,
    description: category.description,
    depth: 2,
    body: `<section class="product-category-hero">
      <div><a class="back-link" href="../../products.html">← All Products</a><span class="contact-label">${esc(category.kicker)}</span><h1>${esc(category.title)}</h1><p>${esc(category.description)}</p><div class="product-meta-row"><span>${categoryProducts.length} products</span><span>Source: ${esc(category.sourcePdf)}</span></div></div>
      <div class="category-visual-card"><img src="${relAsset(category.image, 2)}" alt="${attr(category.name)}"></div>
    </section>
    ${applicationHtml ? `<section class="category-application-section"><div class="product-index-top"><div><h2>Application Scenarios</h2><p>Typical buying contexts for this product category, organized for overseas distributors, contractors and system integrators.</p></div></div><div class="category-application-grid">${applicationHtml}</div></section>` : ""}
    <section class="product-section"><div class="product-index-top"><div><h2>${esc(category.name)} Lineup</h2><p>${esc(category.buyerIntent)}</p></div><a class="secondary-button" href="../../inquiry.html">Send Requirements →</a></div><div class="product-list-grid">${cards}</div></section>
    <section class="product-cta-band"><span>⌕</span><div><strong>Not sure which model fits your project?</strong><span>Send your country, application, quantity and preferred correction method. TOKNAV can recommend a suitable product package.</span></div><a href="../../inquiry.html">Get Recommendation →</a></section>`
  });
}

function detailPage(category, product) {
  const related = getProductsByCategory(category.slug).filter((item) => item.slug !== product.slug).slice(0, 4);
  const specGroups = getProductSpecGroups(product);
  const downloads = getProductDownloads(product);
  const quickSpecs = getProductQuickSpecs(product);
  const datasheet = getProductDatasheet(product);
  const gallery = getProductGallery(product);
  const buyerBenefits = getProductBuyerBenefits(product);
  const faqs = getProductFaqs(product);
  const inquiryHref = relDownload(downloads.find((item) => item.kind === "quote")?.href ?? "/inquiry", 2);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: "TOKNAV" },
    category: category.name,
    image: product.image,
    description: product.excerpt,
    manufacturer: { "@type": "Organization", name: "Guangzhou Toksurvey Information Technology Co., Ltd." },
    additionalProperty: specGroups.flatMap((group) => group.specs.map((spec) => ({ "@type": "PropertyValue", name: spec.label, value: spec.value })))
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } }))
  };

  const specHtml = specGroups.map((group) => `<div class="spec-group"><h3>${esc(group.title)}</h3><div class="spec-table">${group.specs.map((spec) => `<div><strong>${esc(spec.label)}</strong><span>${esc(spec.value)}</span></div>`).join("")}</div></div>`).join("");
  const downloadHtml = downloads.map((item) => {
    const href = relDownload(item.href, 2);
    const downloadAttr = item.kind !== "quote" && href.endsWith(".pdf") ? " download" : "";
    return `<a class="download-card ${item.kind}" href="${attr(href)}"${downloadAttr}><span>${item.kind === "quote" ? "↗" : "↓"}</span><strong>${esc(item.label)}</strong></a>`;
  }).join("");
  const faqHtml = faqs.map((faq) => `<article><span>?</span><div><h3>${esc(faq.question)}</h3><p>${esc(faq.answer)}</p></div></article>`).join("");
  const relatedHtml = related.map((item) => `<a href="${item.slug}.html"><img src="${relAsset(item.image, 2)}" alt="${attr(item.name)}"><strong>${esc(item.name)}</strong><span>${esc(item.type)}</span></a>`).join("");
  const relatedBlock = related.length ? `\n        <section><h2>Related Models</h2><div class="related-products">${relatedHtml}</div></section>` : "";
  const quickSpecHtml = quickSpecs.map((spec) => `<div><strong>${esc(spec.label)}</strong><span>${esc(spec.value)}</span></div>`).join("");
  const benefitHtml = buyerBenefits.map((benefit) => `<article><span>✓</span><p>${esc(benefit)}</p></article>`).join("");
  const appHtml = product.applications.map((app) => `<article><strong>${esc(app)}</strong><p>Recommended configuration and accessories can be confirmed according to the project site, correction method and buyer's country.</p></article>`).join("");
  const robotStory = product.slug === "marking-robot" ? `<section class="robot-story-section"><div class="robot-story-copy"><h2>From design file to field marking</h2><p>The TR10Pro workflow is built around practical marking work: import a design file, calculate the task, plan the route, locate with RTK and let the robot mark repeatable lines on the field.</p><div class="robot-steps"><span>Import DXF / CSV</span><span>Plan route</span><span>RTK locate</span><span>Automatic marking</span></div></div><div class="robot-gallery">${gallery.slice(1).map((src) => `<figure><img src="${relAsset(src, 2)}" alt="${attr(product.name)} product view"></figure>`).join("")}</div></section>` : "";

  return shell({
    title: getProductSeoTitle(product),
    description: getProductMetaDescription(product),
    depth: 2,
    schema: `<script type="application/ld+json">${JSON.stringify(productSchema)}</script><script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`,
    body: `<section class="product-detail-hero ${product.slug === "marking-robot" ? "robot-detail-hero" : ""}">
      <div class="product-detail-copy"><a class="back-link" href="index.html">← Back to ${esc(category.name)}</a><span class="contact-label">${esc(product.type)}</span><h1>${esc(product.name)}</h1><p>${esc(product.excerpt)}</p><div class="product-detail-actions"><a class="primary-button" href="${attr(inquiryHref)}">Get a Quote →</a><a class="secondary-button" href="#downloads">Download Catalog</a></div></div>
      <div class="product-detail-image"><span class="product-image-brand"><img src="${"../".repeat(2)}public/assets/toknav-logo-blue.png" alt="TOKNAV"></span><img src="${relAsset(product.image, 2)}" alt="${attr(product.name)}"></div>
    </section>
    <nav class="product-anchor-nav" aria-label="Product sections"><a href="#overview">Overview</a><a href="#applications">Applications</a><a href="#specifications">Specifications</a><a href="#downloads">Downloads</a><a href="#inquiry">Inquiry</a></nav>
    <section class="product-quick-spec-strip">${quickSpecHtml}</section>
${robotStory}
    <section class="product-detail-layout">
      <div class="product-detail-main">
        <section id="overview"><h2>Key Features</h2><div class="feature-grid">${product.highlights.map((feature) => `<div><span>✓</span><span>${esc(feature)}</span></div>`).join("")}</div></section>
        <section><div class="product-section-heading"><span>Buyer-focused value</span><h2>Why overseas buyers choose this model</h2><p>Structured for dealers, contractors and system integrators comparing receiver performance, kit completeness and after-sales preparation.</p></div><div class="product-benefit-grid">${benefitHtml}</div></section>
        <section id="applications"><div class="product-section-heading"><span>Applications</span><h2>Typical project scenarios</h2><p>Use the application cards as a quotation starting point. TOKNAV can confirm the final kit after checking project environment and delivery requirements.</p></div><div class="product-application-grid">${appHtml}</div></section>
        <section id="specifications"><div class="product-section-heading"><span>Brochure-based details</span><h2>Complete Specifications</h2><p>The table below organizes key parameters from TOKNAV catalogs and model datasheets into procurement-friendly groups for easier comparison.</p></div><div class="spec-group-stack">${specHtml}</div></section>
        <section class="product-download-section" id="downloads"><div class="product-section-heading"><span>Downloads and inquiry package</span><h2>Get Catalog, Datasheet and Quote Support</h2><p>Download the category brochure or send the model requirement directly to TOKNAV sales for the latest datasheet, price and recommended accessories.</p></div><div class="download-grid">${downloadHtml}</div><div class="quote-cta-panel"><div><span>Ready for quotation?</span><strong>Send your target quantity and application for ${esc(product.name)}.</strong></div><a class="primary-button" href="${attr(inquiryHref)}">Send Requirements →</a></div></section>
        <section><h2>Buyer Notes</h2><p>Parameters may be updated by the manufacturer. For quotation, distributor cooperation or OEM/ODM projects, please send your target application, quantity, country and required accessories so TOKNAV can confirm the latest configuration.</p></section>
        <section><div class="product-section-heading"><span>Procurement FAQ</span><h2>Common Questions Before Purchase</h2></div><div class="product-faq-list">${faqHtml}</div></section>
        <section class="product-final-cta" id="inquiry"><div><span>Procurement support</span><h2>Need help choosing a complete receiver kit?</h2><p>Send your model, target quantity, market country, application and accessory preference. TOKNAV can prepare a practical quote package for distributor review or project bidding.</p></div><a class="primary-button" href="${attr(inquiryHref)}">Get Model Quote →</a></section>
${relatedBlock}
      </div>
    </section>`
  });
}

fs.rmSync(path.join(root, "products"), { recursive: true, force: true });
fs.mkdirSync(path.join(root, "products"), { recursive: true });
fs.writeFileSync(path.join(root, "index.html"), homeIndex());
fs.writeFileSync(path.join(root, "products.html"), productsIndex());

for (const category of productCategories) {
  const categoryDir = path.join(root, "products", category.slug);
  fs.mkdirSync(categoryDir, { recursive: true });
  fs.writeFileSync(path.join(categoryDir, "index.html"), categoryPage(category));
  for (const product of getProductsByCategory(category.slug)) {
    fs.writeFileSync(path.join(categoryDir, `${product.slug}.html`), detailPage(category, product));
  }
}

console.log(`Generated ${productCategories.length} category pages and ${products.length} product detail pages.`);
