import { ArrowLeft, ArrowRight, CheckCircle2, Download, FileText, HelpCircle, PackageCheck, Send } from "lucide-react";
import { notFound } from "next/navigation";
import SiteHeader from "../../../components/SiteHeader";
import {
  getCategory,
  getProduct,
  getProductDownloads,
  getProductDatasheet,
  getProductBuyerBenefits,
  getProductFaqs,
  getProductInquiryUrl,
  getProductMetaDescription,
  getProductQuickSpecs,
  getProductSeoTitle,
  getProductSpecGroups,
  getProductsByCategory,
  productCategories
} from "../../../lib/products";

type ProductDetailPageProps = {
  params: { category: string; model: string };
};

export function generateStaticParams() {
  return productCategories.flatMap((category) =>
    getProductsByCategory(category.slug).map((product) => ({
      category: category.slug,
      model: product.slug
    }))
  );
}

export function generateMetadata({ params }: ProductDetailPageProps) {
  const product = getProduct(params.category, params.model);
  if (!product) return {};

  return {
    title: getProductSeoTitle(product),
    description: getProductMetaDescription(product)
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const category = getCategory(params.category);
  const product = getProduct(params.category, params.model);
  if (!category || !product) notFound();

  const related = getProductsByCategory(category.slug)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 4);
  const specGroups = getProductSpecGroups(product);
  const downloads = getProductDownloads(product);
  const datasheet = getProductDatasheet(product);
  const quickSpecs = getProductQuickSpecs(product);
  const buyerBenefits = getProductBuyerBenefits(product);
  const inquiryUrl = getProductInquiryUrl(product);
  const faqs = getProductFaqs(product);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: {
      "@type": "Brand",
      name: "TOKNAV"
    },
    category: category.name,
    image: product.image,
    description: product.excerpt,
    manufacturer: {
      "@type": "Organization",
      name: "Guangzhou Toksurvey Information Technology Co., Ltd."
    },
    additionalProperty: specGroups.flatMap((group) =>
      group.specs.map((spec) => ({
        "@type": "PropertyValue",
        name: spec.label,
        value: spec.value
      }))
    )
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <main>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="product-detail-hero">
        <div className="product-detail-copy">
          <a className="back-link" href={`/products/${category.slug}`}>
            <ArrowLeft size={17} /> Back to {category.name}
          </a>
          <span className="contact-label">{product.type}</span>
          <h1>{product.name}</h1>
          <p>{product.excerpt}</p>
          <div className="product-detail-actions">
            <a className="primary-button" href={inquiryUrl}>
              Get a Quote <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href="#downloads">
              Download Catalog
            </a>
          </div>
        </div>
        <div className="product-detail-image">
          <span className="product-image-brand">
            <img src="/assets/toknav-logo-blue.png" alt="TOKNAV" />
          </span>
          <img src={product.image} alt={product.name} />
        </div>
      </section>

      <nav className="product-anchor-nav" aria-label="Product sections">
        <a href="#overview">Overview</a>
        <a href="#applications">Applications</a>
        <a href="#specifications">Specifications</a>
        <a href="#downloads">Downloads</a>
        <a href="#inquiry">Inquiry</a>
      </nav>

      <section className="product-quick-spec-strip">
        {quickSpecs.map((spec) => (
          <div key={spec.label}>
            <strong>{spec.label}</strong>
            <span>{spec.value}</span>
          </div>
        ))}
      </section>

      <section className="product-detail-layout">
        <aside className="product-detail-aside">
          <div className="product-aside-card">
            <PackageCheck size={24} />
            <strong>Recommended for</strong>
            {product.applications.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="product-aside-card muted-card">
            <FileText size={24} />
            <strong>Catalog source</strong>
            <span>{product.source}</span>
            {datasheet ? <span>Latest model file: {datasheet.updated}</span> : null}
          </div>
          <div className="product-aside-card muted-card">
            <Send size={24} />
            <strong>Fast quote checklist</strong>
            <span>Model, quantity, country, application, correction method and required accessories.</span>
          </div>
        </aside>

        <div className="product-detail-main">
          <section id="overview">
            <h2>Key Features</h2>
            <div className="feature-grid">
              {product.highlights.map((feature) => (
                <div key={feature}>
                  <CheckCircle2 size={20} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="product-section-heading">
              <span>Buyer-focused value</span>
              <h2>Why overseas buyers choose this model</h2>
              <p>
                Structured for dealers, contractors and system integrators
                comparing receiver performance, kit completeness and after-sales
                preparation.
              </p>
            </div>
            <div className="product-benefit-grid">
              {buyerBenefits.map((benefit) => (
                <article key={benefit}>
                  <span>✓</span>
                  <p>{benefit}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="applications">
            <div className="product-section-heading">
              <span>Applications</span>
              <h2>Typical project scenarios</h2>
              <p>
                Use the application cards as a quotation starting point. TOKNAV
                can confirm the final kit after checking project environment and
                delivery requirements.
              </p>
            </div>
            <div className="product-application-grid">
              {product.applications.map((item) => (
                <article key={item}>
                  <strong>{item}</strong>
                  <p>
                    Recommended configuration and accessories can be confirmed
                    according to the project site, correction method and buyer's
                    country.
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="specifications">
            <div className="product-section-heading">
              <span>Brochure-based details</span>
              <h2>Complete Specifications</h2>
              <p>
                The table below organizes key parameters from TOKNAV catalogs
                and model datasheets into procurement-friendly groups for easier
                comparison.
              </p>
            </div>
            <div className="spec-group-stack">
              {specGroups.map((group) => (
                <div className="spec-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <div className="spec-table">
                    {group.specs.map((spec) => (
                      <div key={`${group.title}-${spec.label}`}>
                        <strong>{spec.label}</strong>
                        <span>{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="product-download-section" id="downloads">
            <div className="product-section-heading">
              <span>Downloads and inquiry package</span>
              <h2>Get Catalog, Datasheet and Quote Support</h2>
              <p>
                Download the category brochure or send the model requirement
                directly to TOKNAV sales for the latest datasheet, price and
                recommended accessories.
              </p>
            </div>
            <div className="download-grid">
              {downloads.map((item) => (
                <a
                  className={`download-card ${item.kind}`}
                  download={item.kind !== "quote" && item.href.endsWith(".pdf") ? true : undefined}
                  href={item.href}
                  key={item.label}
                >
                  {item.kind === "quote" ? <Send size={22} /> : <Download size={22} />}
                  <strong>{item.label}</strong>
                  <span>{item.description}</span>
                </a>
              ))}
            </div>
            <div className="quote-cta-panel">
              <div>
                <span>Ready for quotation?</span>
                <strong>Send your target quantity and application for {product.name}.</strong>
              </div>
              <a className="primary-button" href={inquiryUrl}>
                Send Requirements <ArrowRight size={18} />
              </a>
            </div>
          </section>

          <section>
            <h2>Buyer Notes</h2>
            <p>
              Parameters may be updated by the manufacturer. For quotation,
              distributor cooperation or OEM/ODM projects, please send your
              target application, quantity, country and required accessories so
              TOKNAV can confirm the latest configuration.
            </p>
          </section>

          <section>
            <div className="product-section-heading">
              <span>Procurement FAQ</span>
              <h2>Common Questions Before Purchase</h2>
            </div>
            <div className="product-faq-list">
              {faqs.map((faq) => (
                <article key={faq.question}>
                  <HelpCircle size={20} />
                  <div>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="product-final-cta" id="inquiry">
            <div>
              <span>Procurement support</span>
              <h2>Need help choosing a complete receiver kit?</h2>
              <p>
                Send your model, target quantity, market country, application
                and accessory preference. TOKNAV can prepare a practical quote
                package for distributor review or project bidding.
              </p>
            </div>
            <a className="primary-button" href={inquiryUrl}>
              Get Model Quote <ArrowRight size={18} />
            </a>
          </section>

          {related.length > 0 && (
            <section>
              <h2>Related Models</h2>
              <div className="related-products">
                {related.map((item) => (
                  <a href={`/products/${category.slug}/${item.slug}`} key={item.slug}>
                    <img src={item.image} alt={item.name} />
                    <strong>{item.name}</strong>
                    <span>{item.type}</span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
