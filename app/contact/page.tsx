import {
  ArrowRight,
  Building2,
  Clock,
  Handshake,
  ListChecks,
  Globe2,
  Mail,
  MapPinned,
  MessageCircle,
  Search,
  ShieldCheck,
  Store
} from "lucide-react";
import SiteHeader from "../components/SiteHeader";

const mapSrc =
  "https://www.openstreetmap.org/export/embed.html?bbox=113.4245982%2C23.1616848%2C113.4345982%2C23.1676848&layer=mapnik&marker=23.1646848%2C113.4295982";
const inquiryFormAction = "https://formsubmit.co/emma@toknav.cn";

const contactEntries = [
  {
    href: "#locations",
    title: "Locations",
    text: "TOKNAV Guangzhou office and OpenStreetMap location.",
    icon: MapPinned
  },
  {
    href: "#dealer-support",
    title: "Find a Dealer",
    text: "Contact TOKNAV for regional distributor and local support guidance.",
    icon: Search
  },
  {
    href: "#inquiry",
    title: "Product Inquiry",
    text: "Send GNSS receiver, antenna, CORS/VRS or machine-control requirements.",
    icon: ListChecks
  },
  {
    href: "#dealer-support",
    title: "Become a Dealer",
    text: "Apply for OEM/ODM, channel cooperation and catalog support.",
    icon: Store
  }
];

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />

      <section className="contact-hero">
        <span className="contact-label">Contact TOKNAV</span>
        <h1>How Can We Help?</h1>
        <p>
          Reach TOKNAV for GNSS product quotation, distributor cooperation,
          OEM/ODM projects and technical solution support.
        </p>
        <div className="contact-quick-grid" aria-label="TOKNAV contact options">
          {contactEntries.map((item) => {
            const Icon = item.icon;
            return (
              <a href={item.href} key={item.title}>
                <Icon size={46} strokeWidth={1.8} />
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="contact-section" id="locations">
        <div className="contact-info-panel">
          <span className="contact-label" data-i18n="contact.location.label">Company Location</span>
          <div className="contact-company-heading">
            <h2 data-i18n="contact.location.title">Guangzhou Toksurvey Information Technology Co., Ltd.</h2>
            <span>广州市图科信息技术有限公司</span>
          </div>
          <div className="contact-info-list">
            <div>
              <MapPinned size={22} />
              <span data-i18n="home.location.address">
                Room 801-6, Building B, No. 9 Caipin Road, Huangpu District,
                Guangzhou, China 510000
              </span>
            </div>
            <div>
              <Mail size={22} />
              <a href="mailto:emma@toknav.cn">emma@toknav.cn</a>
            </div>
            <div>
              <MessageCircle size={22} />
              <a href="https://wa.me/8619195346957?text=Hello%2C%20I%20am%20interested%20in%20your%20products.%20Please%20send%20me%20more%20details." target="_blank" rel="noopener noreferrer">
                WhatsApp: +86 191 9534 6957
              </a>
            </div>
            <div>
              <Clock size={22} />
              <span data-i18n="contact.location.reply">We usually reply within 24 hours on business days.</span>
            </div>
          </div>
          <div className="contact-proof-row">
            <span>
              <Building2 size={18} /> Source manufacturer
            </span>
            <span>
              <ShieldCheck size={18} /> OEM/ODM support
            </span>
            <span>
              <Globe2 size={18} /> Global project support
            </span>
          </div>
          <div className="contact-panel-actions">
            <a href="#inquiry">Product Inquiry <ArrowRight size={16} /></a>
            <a href="mailto:emma@toknav.cn">Email TOKNAV</a>
          </div>
        </div>

        <div className="osm-card" aria-label="OpenStreetMap company location">
          <iframe
            src={mapSrc}
            title="TOKNAV location on OpenStreetMap"
            loading="lazy"
          />
          <div className="map-overlay">
            <strong>TOKNAV Guangzhou Office</strong>
            <span>No. 9 Caipin Road, Huangpu District</span>
          </div>
        </div>
      </section>

      <section className="dealer-support-section" id="dealer-support">
        <div>
          <span className="contact-label">Dealer Cooperation</span>
          <h2>Distributor and OEM/ODM Support</h2>
          <p>
            TOKNAV supports overseas dealers, project contractors and system
            integrators with product catalogs, model selection, technical
            matching, sample orders and market cooperation.
          </p>
        </div>
        <div className="dealer-support-grid">
          <article>
            <Handshake size={30} />
            <strong>Become a Dealer</strong>
            <span>Tell us your country, customer type and target product line.</span>
          </article>
          <article>
            <Building2 size={30} />
            <strong>OEM/ODM Cooperation</strong>
            <span>Discuss branding, firmware, packaging and market customization.</span>
          </article>
          <article>
            <Globe2 size={30} />
            <strong>Regional Support</strong>
            <span>Request channel materials, catalogs and solution documents.</span>
          </article>
        </div>
      </section>

      <section className="inquiry contact-inquiry" id="inquiry">
        <div>
          <div className="section-title">
            <h2 data-i18n="contact.form.title">Tell Us About Your Project</h2>
            <p data-i18n="contact.form.text">
              Share your country, application, product category and estimated
              quantity. Our team can recommend the suitable GNSS receiver,
              antenna or solution package.
            </p>
          </div>
          <div className="location-card contact-page-address">
            <div className="contact-bilingual-card">
              <MapPinned size={22} />
              <div className="contact-bilingual-list">
                <article>
                  <strong>Company Name</strong>
                  <span>Guangzhou Toksurvey Information Technology Co., Ltd.</span>
                </article>
                <article>
                  <strong>公司名称</strong>
                  <span lang="zh-CN">广州市图科信息技术有限公司</span>
                </article>
                <article>
                  <strong>Address in English</strong>
                  <span>Room 801-6, Building B, No. 9 Caipin Road, Huangpu District, Guangzhou, China 510000</span>
                </article>
                <article>
                  <strong>中文地址</strong>
                  <span lang="zh-CN">广州市黄埔区彩频路9号B栋801-6室</span>
                </article>
              </div>
            </div>
          </div>
        </div>
        <form action={inquiryFormAction} className="quote-form" method="POST">
          <input type="hidden" name="_subject" value="New TOKNAV Contact Page Inquiry" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="https://www.geocodegnss.com/thanks.html" />
          <input type="text" name="_honey" className="honeypot" tabIndex={-1} autoComplete="off" />
          <label>
            <span data-i18n="form.name">Name</span>
            <input name="name" placeholder="Your name" data-i18n-placeholder="form.placeholder.name" required />
          </label>
          <label>
            <span data-i18n="form.email">Email</span>
            <input name="email" placeholder="name@company.com" data-i18n-placeholder="form.placeholder.email" type="email" required />
          </label>
          <label>
            <span data-i18n="form.whatsapp">WhatsApp</span>
            <input name="whatsapp" placeholder="+86 191 9534 6957" data-i18n-placeholder="form.placeholder.whatsapp" type="tel" required />
          </label>
          <label>
            <span data-i18n="form.country">Country</span>
            <input name="country" placeholder="Your country or region" data-i18n-placeholder="form.placeholder.country" />
          </label>
          <label>
            <span data-i18n="form.product">Product Requirement</span>
            <select name="product" defaultValue="">
              <option value="" disabled>
                Select a category
              </option>
              <option>GNSS Receiver</option>
              <option>GNSS Antenna</option>
              <option>CORS / VRS Solution</option>
              <option>Precision Agriculture</option>
              <option>Machine Control</option>
              <option>OEM / ODM Project</option>
            </select>
          </label>
          <label>
            <span data-i18n="form.message">Message</span>
            <textarea name="message" placeholder="Tell us your application, quantity and timeline." data-i18n-placeholder="form.placeholder.message" />
          </label>
          <button type="submit">
            <span data-i18n="form.submit">Submit Inquiry</span> <ArrowRight size={18} />
          </button>
        </form>
      </section>

    </main>
  );
}
