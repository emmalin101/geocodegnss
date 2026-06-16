import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Download,
  Factory,
  Globe2,
  Layers3,
  Mail,
  RadioTower,
  Satellite,
  ShieldCheck,
  Wrench
} from "lucide-react";
import SiteHeader from "./components/SiteHeader";
import { productCategories } from "./lib/products";

const heroProducts = [
  { name: "T50Pro GNSS Receiver", href: "/products/gnss-receivers/t50pro", image: "/assets/products/t50pro.webp" },
  { name: "TR10Pro Marking Robot", href: "/products/gnss-application-solutions/marking-robot", image: "/assets/products/tr10pro-marking-robot-front.png" },
  { name: "U6 Monitoring System", href: "/products/gnss-application-solutions/deformation-monitoring", image: "/assets/products/u6.webp" }
];

const featuredProducts = [
  {
    name: "T50Pro GNSS Receiver",
    type: "Professional RTK",
    text: "A premium RTK receiver for survey, mapping and construction crews that need stable centimeter-level positioning.",
    image: "/assets/products/t50pro.webp",
    href: "/products/gnss-receivers/t50pro"
  },
  {
    name: "T30Pro GNSS Receiver",
    type: "Image Survey RTK",
    text: "Designed for overseas dealers selling modern image survey, stakeout and daily field workflows.",
    image: "/assets/products/t30pro.webp",
    href: "/products/gnss-receivers/t30pro"
  },
  {
    name: "TAG66 Auto Steering",
    type: "Precision Agriculture",
    text: "GNSS auto-steering system for farm dealers and smart agriculture projects.",
    image: "/assets/products/tag66.webp",
    href: "/products/precision-agriculture-machine-control/tag66"
  },
  {
    name: "TR10Pro Marking Robot",
    type: "Robotic Marking",
    text: "Automated GNSS line marking solution for sports fields, roads and runway pre-marking.",
    image: "/assets/products/tr10pro-marking-robot.png",
    href: "/products/gnss-application-solutions/marking-robot"
  }
];

const industries = [
  ["Surveying & Mapping", "RTK receivers, controllers and antennas for field survey teams.", "/products/gnss-receivers", Satellite],
  ["Machine Control", "Guidance and positioning systems for construction equipment.", "/products/precision-agriculture-machine-control", Wrench],
  ["Precision Agriculture", "Auto-steering, land leveling and farm positioning solutions.", "/products/precision-agriculture-machine-control", Layers3],
  ["Monitoring & CORS", "Base stations, CORS/VRS and deformation monitoring packages.", "/products/gnss-application-solutions", RadioTower]
] as const;

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
    href: "/blog/how-to-choose-rtk-gnss-receiver-surveying-construction"
  },
  {
    title: "CORS/VRS vs Base-Rover RTK GNSS Correction",
    text: "Compare correction options before planning a receiver, base station or network project.",
    href: "/blog/cors-vrs-vs-base-rover-rtk-gnss-correction"
  },
  {
    title: "GNSS Auto-Steering and Machine Control Buying Guide",
    text: "A practical overview for agriculture dealers and construction solution providers.",
    href: "/blog/gnss-auto-steering-machine-control-buying-guide"
  }
];

function HomeSectionTitle({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <div className="home-section-title">
      <span>{label}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="home-page">
      <SiteHeader />

      <section className="home-hero">
        <div className="home-hero-bg" aria-hidden="true" />
        <div className="home-hero-copy">
          <h1>High-Precision GNSS & RTK Solutions Manufacturer</h1>
          <p>
            TOKNAV supplies RTK GNSS receivers, antennas, CORS/VRS systems, precision agriculture
            and robotic marking solutions for overseas distributors, contractors and system integrators.
          </p>
          <div className="home-hero-actions">
            <a className="home-primary-button" href="/inquiry">
              Get a Quote <ArrowRight size={18} />
            </a>
            <a className="home-secondary-button" href="/products">
              Explore Products <ChevronRight size={18} />
            </a>
          </div>
          <div className="home-hero-proof">
            <span>OEM/ODM Manufacturing</span>
            <span>RTK + CORS/VRS</span>
            <span>Surveying · Agriculture · Construction</span>
          </div>
        </div>

        <div className="home-hero-visual">
          <img className="home-hero-banner" src="/assets/gnss-receiver-homepage-banner-original.png" alt="TOKNAV GNSS receiver product banner" />
          <div className="home-hero-product-row">
            {heroProducts.map((item) => (
              <a href={item.href} key={item.name}>
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="home-metrics" aria-label="Company capability overview">
        <div>
          <strong>15+ Years</strong>
          <span>GNSS R&D and product experience</span>
        </div>
        <div>
          <strong>OEM/ODM</strong>
          <span>Support for distributors and brand partners</span>
        </div>
        <div>
          <strong>Full Range</strong>
          <span>Receivers, antennas, controllers and solutions</span>
        </div>
        <div>
          <strong>Global B2B</strong>
          <span>Built for export inquiries and project delivery</span>
        </div>
      </section>

      <section className="home-section home-products" id="products">
        <HomeSectionTitle
          label="Product Center"
          title="Choose Products by Buyer Intent"
          text="A CHCNAV-style homepage needs fast category access: product families first, then model details, downloads and inquiry CTAs."
        />
        <div className="home-category-grid">
          {productCategories.map((category) => (
            <a href={`/products/${category.slug}`} className="home-category-card" key={category.slug}>
              <img src={category.image} alt={category.name} />
              <div>
                <span>{category.kicker}</span>
                <h3>{category.name}</h3>
                <p>{category.buyerIntent}</p>
              </div>
              <ChevronRight size={18} />
            </a>
          ))}
        </div>
      </section>

      <section className="home-section home-featured">
        <HomeSectionTitle
          label="Featured Models"
          title="Popular Models for Quotation Pages and Paid Traffic"
          text="These entrances lead buyers from broad homepage interest into specific model pages with specifications, downloads and inquiry actions."
        />
        <div className="home-featured-grid">
          {featuredProducts.map((product) => (
            <a href={product.href} className="home-featured-card" key={product.name}>
              <div className="home-featured-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="home-featured-content">
                <span>{product.type}</span>
                <h3>{product.name}</h3>
                <p>{product.text}</p>
                <strong>View model details <ArrowRight size={16} /></strong>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="home-section home-industries" id="solutions">
        <div className="home-industries-copy">
          <HomeSectionTitle
            label="Industries"
            title="Application Entrances for SEO, GEO and Ads"
            text="The homepage now gives overseas buyers a clearer path by application, so Google traffic and paid clicks land closer to the solution they need."
          />
          <div className="home-industries-list">
            {industries.map(([title, text, href, Icon]) => (
              <a href={href} key={title}>
                <Icon size={24} />
                <div>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
                <ChevronRight size={18} />
              </a>
            ))}
          </div>
        </div>
        <div className="home-field-panel">
          <img src="/assets/rtk-field-use-1.jpg" alt="TOKNAV GNSS receiver used in field surveying" />
          <div>
            <strong>Field-ready positioning workflows</strong>
            <span>RTK survey, base-rover setup, CORS/VRS correction and project configuration support.</span>
          </div>
        </div>
      </section>

      <section className="home-section home-oem" id="oem">
        <div className="home-proof-visual">
          <img src="/assets/customer-visit.jpg" alt="TOKNAV customer visit and business cooperation" />
        </div>
        <div className="home-proof-copy">
          <HomeSectionTitle
            label="OEM / ODM"
            title="Make the Website Feel Like a Real Manufacturer"
            text="For B2B buyers, trust comes from product range, technical people, shipment preparation and visible cooperation proof."
          />
          <div className="home-proof-grid">
            {proofPoints.map(([title, text]) => (
              <div key={title}>
                <CheckCircle2 size={22} />
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <a className="home-secondary-button" href="/contact">
            Contact TOKNAV <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="home-section home-trust" id="about">
        <HomeSectionTitle
          label="Why TOKNAV"
          title="Trust Signals for Overseas Procurement"
          text="The homepage combines product proof, people proof and project proof so new visitors can decide whether to send requirements."
        />
        <div className="home-trust-grid">
          <div>
            <Factory size={30} />
            <strong>Manufacturing Capability</strong>
            <span>GNSS receiver kits, antennas, controllers, accessories and solution packages for export orders.</span>
          </div>
          <div>
            <ShieldCheck size={30} />
            <strong>Quality and Testing</strong>
            <span>Use product testing, inspection and datasheet downloads to support serious procurement decisions.</span>
          </div>
          <div>
            <Globe2 size={30} />
            <strong>Distributor Support</strong>
            <span>OEM/ODM cooperation, catalog support and application-based quotation for global partners.</span>
          </div>
          <div>
            <Building2 size={30} />
            <strong>Guangzhou Office</strong>
            <span>No. 9 Caipin Road, Huangpu District, Guangzhou, Guangdong, China.</span>
          </div>
        </div>
      </section>

      <section className="home-section home-news">
        <HomeSectionTitle
          label="Resources"
          title="SEO Content That Supports Buyer Decisions"
          text="Blog content should answer product selection, comparison and application questions that overseas buyers ask before inquiry."
        />
        <div className="home-news-grid">
          {blogCards.map((post) => (
            <a href={post.href} key={post.title}>
              <span>Buying Guide</span>
              <h3>{post.title}</h3>
              <p>{post.text}</p>
              <strong>Read article <ArrowRight size={16} /></strong>
            </a>
          ))}
        </div>
      </section>

      <section className="home-section home-cta" id="contact">
        <div>
          <BadgeCheck size={34} />
          <h2>Send Your Product Requirements and Get a Faster TOKNAV Quotation</h2>
          <p>
            Share your target product, quantity, country, application and correction method.
            TOKNAV can recommend receiver kits, antennas, accessories and solution packages.
          </p>
        </div>
        <div className="home-cta-actions">
          <a className="home-primary-button" href="/inquiry">
            Submit Inquiry <ArrowRight size={18} />
          </a>
          <a className="home-secondary-button" href="/assets/downloads/catalogs/gnss-receiver.pdf">
            <Download size={18} /> Download Catalog
          </a>
          <a className="home-text-link" href="mailto:info@toknavgnss.com">
            <Mail size={18} /> info@toknavgnss.com
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
