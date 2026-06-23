import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  Construction,
  Factory,
  Globe2,
  Headset,
  Layers3,
  MapPinned,
  Sprout,
  UsersRound,
  Waves
} from "lucide-react";
import InquiryForm from "./components/InquiryForm";
import SiteHeader from "./components/SiteHeader";
import { resolveDownloadHref } from "./lib/assetUrls";
import { getBlockData, getCmsSettings, getPublishedCmsPageByPath } from "./lib/cms/public";
import { productCategories } from "./lib/products";

const heroProducts = [
  { name: "T50Pro", href: "/products/gnss-receivers/t50pro", image: "/assets/products/t50pro.webp" },
  { name: "TR10Pro", href: "/products/gnss-application-solutions/marking-robot", image: "/assets/products/tr10pro-marking-robot-front.png" },
  { name: "U6", href: "/products/gnss-application-solutions/deformation-monitoring", image: "/assets/products/u6.webp" }
];

const whyItems = [
  { title: "OEM/ODM Services", text: "Flexible customization for hardware, firmware and branding to support your market growth.", icon: Factory },
  { title: "15+ Years R&D Experience", text: "Continuous innovation in GNSS algorithms, hardware design and software platforms.", icon: BadgeCheck },
  { title: "60%+ Engineers", text: "A strong R&D team dedicated to high-precision positioning technology.", icon: UsersRound },
  { title: "Global Project Support", text: "Localized technical support and after-sales service across key regions worldwide.", icon: Globe2 }
];

const applications = [
  { title: "Land Surveying & Mapping", href: "/products/gnss-receivers", image: "/assets/home-app-survey.jpg", icon: MapPinned },
  { title: "Construction & Engineering", href: "/products/gnss-receivers", image: "/assets/home-app-construction.jpg", icon: Construction },
  { title: "Precision Agriculture", href: "/products/precision-agriculture-machine-control", image: "/assets/home-app-agriculture.jpg", icon: Sprout },
  { title: "Machine Control", href: "/products/precision-agriculture-machine-control", image: "/assets/home-app-machine.jpg", icon: Waves },
  { title: "Monitoring & Deformation", href: "/products/gnss-application-solutions", image: "/assets/home-app-monitoring.jpg", icon: Headset },
  { title: "GIS Data Collection", href: "/products/rugged-gis", image: "/assets/home-app-gis.jpg", icon: Layers3 }
];

const trustedMetrics = [
  { value: "100+", label: "Countries & Regions", icon: Globe2 },
  { value: "15+", label: "Years of Innovation", icon: Building2 },
  { value: "60%+", label: "R&D Engineers", icon: UsersRound },
  { value: "24/7", label: "Global Support", icon: Headset }
];

const homeFaqs = [
  {
    question: "What accuracy can TOKNAV GNSS receivers achieve?",
    answer: "TOKNAV RTK receivers are designed for centimeter-level positioning when used with suitable correction data, good satellite visibility and correct field setup."
  },
  {
    question: "Do you provide OEM or ODM services?",
    answer: "Yes. TOKNAV supports logo branding, kit configuration, firmware customization and product packaging for distributors and project partners."
  },
  {
    question: "What is the warranty and after-sales support?",
    answer: "Warranty and support terms depend on product model and order plan. Our team can provide datasheets, test guidance and remote technical support."
  },
  {
    question: "Which industries are your products suitable for?",
    answer: "TOKNAV products are used in surveying, mapping, construction, precision agriculture, machine control, monitoring, GIS and solution integration."
  }
];

const fallbackHero = {
  title: "High-Precision GNSS Receivers & RTK Solutions Manufacturer",
  subtitle: "Reliable centimeter-level positioning solutions for surveying, construction, agriculture and industrial applications worldwide.",
  buttonText: "Get a Quote",
  buttonLink: "/inquiry",
  secondaryButtonText: "Explore Products",
  secondaryButtonLink: "/products",
  backgroundImage: "/assets/gnss-receiver-homepage-banner-original.png"
};

const fallbackCta = {
  title: "Need a GNSS Solution?",
  description: "Tell us your product, quantity, country and application. TOKNAV will recommend a practical quote package.",
  buttonText: "Get a Quote",
  buttonLink: "/inquiry",
  secondaryButtonText: "Download Catalog",
  secondaryButtonLink: "/assets/downloads/catalogs/gnss-receiver.pdf"
};

function HomeSectionTitle({ title, text }: { title: string; text?: string }) {
  return (
    <div className="home-section-title compact">
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export default function Home() {
  const cmsPage = getPublishedCmsPageByPath("/");
  const hero = getBlockData(cmsPage, "hero", fallbackHero, "home-hero");
  const cta = getBlockData(cmsPage, "cta", fallbackCta, "home-cta");
  const heroImage = String(hero.backgroundImage).includes("gnss-receiver-homepage-banner-original")
    ? "/assets/home-app-construction.jpg"
    : String(hero.backgroundImage);

  return (
    <main className="home-page">
      <SiteHeader />

      <section className="home-hero simple">
        <div className="home-hero-copy">
          <h1>{String(hero.title)}</h1>
          <p>{String(hero.subtitle)}</p>
          <div className="home-hero-actions">
            <a className="home-primary-button" href={String(hero.buttonLink)}>
              {String(hero.buttonText)} <ArrowRight size={18} />
            </a>
            <a className="home-secondary-button" href={String(hero.secondaryButtonLink)}>
              {String(hero.secondaryButtonText)} <ChevronRight size={18} />
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
          <img className="home-hero-banner-clean" src={heroImage} alt="TOKNAV GNSS receiver product banner" />
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
          {whyItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title}>
                <Icon size={32} strokeWidth={1.8} />
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="home-applications" id="solutions">
        <HomeSectionTitle title="Applications" text="High-precision positioning empowers a wide range of industries." />
        <div className="home-application-strip">
          {applications.map((item) => {
            const Icon = item.icon;
            return (
              <a href={item.href} key={item.title}>
                <img src={item.image} alt={item.title} />
                <span>
                  <Icon size={42} strokeWidth={1.7} />
                  <strong>{item.title}</strong>
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="home-trusted-band" id="about">
        <div>
          <h2>Trusted by Professionals Around the World</h2>
          <p>TOKNAV products are widely used in more than 100 countries and regions, helping clients improve efficiency and accuracy in every project.</p>
          <a href="/about">Learn More About Us</a>
        </div>
        <div className="home-trusted-metrics">
          {trustedMetrics.map((item) => {
            const Icon = item.icon;
            return (
              <strong key={item.label}>
                <Icon size={48} strokeWidth={1.6} />
                {item.value}
                <span>{item.label}</span>
              </strong>
            );
          })}
        </div>
      </section>

      <section className="home-faq-inquiry" id="contact">
        <div className="home-faq-panel">
          <h2>FAQ</h2>
          <div className="home-faq-list">
            {homeFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span>+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
          <a className="home-download-card" href={resolveDownloadHref(String(cta.secondaryButtonLink))}>
            <Layers3 size={36} />
            <span>
              <strong>Download Product Catalog</strong>
              <small>Get the latest product brochure and technical information.</small>
            </span>
          </a>
        </div>

        <div className="home-quote-panel">
          <h2>Get a Quote</h2>
          <p>Tell us about your project needs. Our team will respond within 24 hours.</p>
          <InquiryForm />
        </div>
      </section>

    </main>
  );
}

export function generateMetadata() {
  const cmsPage = getPublishedCmsPageByPath("/");
  const settings = getCmsSettings();
  return {
    title: cmsPage?.seoTitle || settings.defaultSeoTitle,
    description: cmsPage?.seoDescription || settings.defaultSeoDescription,
    openGraph: cmsPage?.ogImage ? { images: [cmsPage.ogImage] } : undefined
  };
}
