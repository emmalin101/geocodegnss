import { ArrowRight, FileText, Layers3, Search } from "lucide-react";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import { getCategory, getCategoryApplications, getProductsByCategory, productCategories } from "../../lib/products";

type CategoryPageProps = {
  params: { category: string };
};

export function generateStaticParams() {
  return productCategories.map((category) => ({ category: category.slug }));
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = getCategory(params.category);
  if (!category) return {};

  return {
    title: `${category.name} | TOKNAV Product Category`,
    description: category.description
  };
}

export default function ProductCategoryPage({ params }: CategoryPageProps) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(category.slug);
  const categoryApplications = getCategoryApplications(category.slug);

  return (
    <main>
      <SiteHeader />

      <section className="product-category-hero">
        <div>
          <a className="back-link" href="/products">
            <ArrowRight size={16} className="reverse-icon" /> All Products
          </a>
          <span className="contact-label">{category.kicker}</span>
          <h1>{category.title}</h1>
          <p>{category.description}</p>
          <div className="product-meta-row">
            <span><Layers3 size={16} /> {categoryProducts.length} products</span>
            <span><FileText size={16} /> Source: {category.sourcePdf}</span>
          </div>
        </div>
        <div className="category-visual-card">
          <img src={category.image} alt={category.name} />
        </div>
      </section>

      {categoryApplications.length > 0 && (
        <section className="category-application-section">
          <div className="product-index-top">
            <div>
              <h2>Application Scenarios</h2>
              <p>Typical buying contexts for this product category, organized for overseas distributors, contractors and system integrators.</p>
            </div>
          </div>
          <div className="category-application-grid">
            {categoryApplications.map((item) => (
              <article key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
                <span>{item.products}</span>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="product-section">
        <div className="product-index-top">
          <div>
            <h2>{category.name} Lineup</h2>
            <p>{category.buyerIntent}</p>
          </div>
          <a className="secondary-button" href="/inquiry">
            Send Requirements <ArrowRight size={18} />
          </a>
        </div>

        <div className="product-list-grid">
          {categoryProducts.map((product) => (
            <a className="product-list-card" href={`/products/${category.slug}/${product.slug}`} key={product.slug}>
              <div className="product-list-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-list-copy">
                <span>{product.type}</span>
                <h3>{product.name}</h3>
                <p>{product.excerpt}</p>
                <div className="product-mini-specs">
                  {product.highlights.slice(0, 3).map((item) => (
                    <em key={item}>{item}</em>
                  ))}
                </div>
                <strong>
                  View model details <ArrowRight size={16} />
                </strong>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="product-cta-band">
        <Search size={28} />
        <div>
          <strong>Not sure which model fits your project?</strong>
          <span>Send your country, application, quantity and preferred correction method. TOKNAV can recommend a suitable product package.</span>
        </div>
        <a href="/inquiry">Get Recommendation <ArrowRight size={17} /></a>
      </section>
    </main>
  );
}
