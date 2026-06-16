import { ArrowRight, ChevronRight } from "lucide-react";
import SiteHeader from "./components/SiteHeader";
import { productCategories } from "./lib/products";

const heroProducts = [
  { name: "T50Pro", href: "/products/gnss-receivers/t50pro", image: "/assets/products/t50pro.webp" },
  { name: "TR10Pro", href: "/products/gnss-application-solutions/marking-robot", image: "/assets/products/tr10pro-marking-robot-front.png" },
  { name: "U6", href: "/products/gnss-application-solutions/deformation-monitoring", image: "/assets/products/u6.webp" }
];

const whyItems = [
  ["OEM/ODM", "Flexible customization"],
  ["15+ Years R&D", "GNSS experience"],
  ["60%+ Engineers", "Technical support"],
  ["Global Projects", "Export service"]
];

const applications = [
  ["Land Surveying", "/products/gnss-receivers", "/assets/rtk-field-use-1.jpg"],
  ["Construction", "/products/gnss-receivers", "/assets/gnss-receiver-homepage-banner-original.png"],
  ["Precision Agriculture", "/products/precision-agriculture-machine-control", "/assets/products/tag66.webp"],
  ["Machine Control", "/products/precision-agriculture-machine-control", "/assets/products/tmc20.webp"],
  ["Monitoring", "/products/gnss-application-solutions", "/assets/products/u6.webp"],
  ["GIS Data Collection", "/products/rugged-gis", "/assets/products/pcr500.webp"]
];

function HomeSectionTitle({ title, text }: { title: string; text?: string }) {
  return (
    <div className="home-section-title compact">
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <main className="home-page">
      <SiteHeader />

      <section className="home-hero simple">
        <div className="home-hero-copy">
          <h1>High-Precision GNSS Receivers & RTK Solutions Manufacturer</h1>
          <p>Reliable centimeter-level positioning solutions for surveying, construction, agriculture and industrial applications worldwide.</p>
          <div className="home-hero-actions">
            <a className="home-primary-button" href="/inquiry">
              Get a Quote <ArrowRight size={18} />
            </a>
            <a className="home-secondary-button" href="/products">
              Explore Products <ChevronRight size={18} />
            </a>
          </div>
          <div className="home-hero-proof mini">
            <span>OEM/ODM</span>
            <span>15+ Years R&D</span>
            <span>60%+ Engineers</span>
            <span>Global Support</span>
          </div>
        </div>
        <div className="home-hero-stage">
          <img className="home-hero-banner-clean" src="/assets/gnss-receiver-homepage-banner-original.png" alt="TOKNAV GNSS receiver product banner" />
          <div className="home-hero-product-row simple">
            {heroProducts.map((item) => (
              <a href={item.href} key={item.name}>
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-products compact" id="products">
        <HomeSectionTitle title="Our Product Categories" text="Professional GNSS and positioning solutions for diverse industries and applications." />
        <div className="home-category-grid compact">
          {productCategories.map((category) => (
            <a href={`/products/${category.slug}`} className="home-category-card compact" key={category.slug}>
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
              <strong>View More <ChevronRight size={15} /></strong>
            </a>
          ))}
        </div>
      </section>

      <section className="home-section home-why">
        <HomeSectionTitle title="Why Choose TOKNAV" text="Built on innovation. Backed by experience. Trusted worldwide." />
        <div className="home-why-grid">
          {whyItems.map(([title, text]) => (
            <div key={title}>
              <span>◎</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-applications" id="solutions">
        <HomeSectionTitle title="Applications" text="High-precision positioning empowers a wide range of industries." />
        <div className="home-application-strip">
          {applications.map(([title, href, image]) => (
            <a href={href} key={title}>
              <img src={image} alt={title} />
              <span>{title}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="home-trusted-band" id="about">
        <div>
          <h2>Trusted by Professionals Around the World</h2>
          <p>TOKNAV products support reliable positioning work across surveying, construction, agriculture and monitoring projects.</p>
          <a href="/contact">Learn More About Us</a>
        </div>
        <div className="home-trusted-metrics">
          <strong>100+<span>Countries & Regions</span></strong>
          <strong>15+<span>Years of Innovation</span></strong>
          <strong>60%+<span>R&D Engineers</span></strong>
          <strong>24/7<span>Global Support</span></strong>
        </div>
      </section>

      <section className="home-section home-cta compact" id="contact">
        <div>
          <h2>Need a GNSS Solution?</h2>
          <p>Tell us your product, quantity, country and application. TOKNAV will recommend a practical quote package.</p>
        </div>
        <div className="home-cta-actions">
          <a className="home-primary-button" href="/inquiry">
            Get a Quote <ArrowRight size={18} />
          </a>
          <a className="home-secondary-button" href="/assets/downloads/catalogs/gnss-receiver.pdf">
            Download Catalog
          </a>
        </div>
      </section>

      <footer>
        <strong>TOKNAV</strong>
        <span>Guangzhou Toksurvey Information Technology Co., Ltd.</span>
        <span>No. 9 Caipin Road, Huangpu District, Guangzhou, China</span>
        <span>GNSS Receiver Manufacturer · Professional OEM & ODM</span>
      </footer>
    </main>
  );
}
