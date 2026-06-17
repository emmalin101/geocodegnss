import {
  ArrowRight,
  Building2,
  Clock,
  Globe2,
  Mail,
  MapPinned,
  MessageCircle,
  ShieldCheck
} from "lucide-react";
import SiteHeader from "../components/SiteHeader";

const mapSrc =
  "https://www.openstreetmap.org/export/embed.html?bbox=113.4245982%2C23.1616848%2C113.4345982%2C23.1676848&layer=mapnik&marker=23.1646848%2C113.4295982";

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />

      <section className="contact-hero">
        <div className="contact-hero-copy">
          <h1 data-i18n="contact.hero.title">Visit TOKNAV in Guangzhou</h1>
          <p data-i18n="contact.hero.text">
            Contact our team for GNSS receiver quotations, OEM/ODM cooperation,
            distributor support and high-precision positioning solution
            projects.
          </p>
          <div className="contact-hero-actions">
            <a className="primary-button" href="#inquiry">
              <span data-i18n="cta.sendInquiry">Send Inquiry</span> <ArrowRight size={18} />
            </a>
            <a
              className="secondary-button"
              href="https://www.openstreetmap.org/?mlat=23.1646848&mlon=113.4295982#map=17/23.1646848/113.4295982"
              rel="noreferrer"
              target="_blank"
            >
              <span data-i18n="contact.map.open">Open in OpenStreetMap</span>
            </a>
          </div>
        </div>
        <div className="contact-photo-card">
          <img src="/assets/jeffrey.jpg" alt="TOKNAV GNSS project contact" />
          <div className="photo-badge">TOKNAV</div>
          <div className="photo-caption">
            <strong>GNSS Project Contact</strong>
            <span>Quotation, distributor cooperation and technical matching</span>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-info-panel">
          <span className="contact-label" data-i18n="contact.location.label">Company Location</span>
          <h2 data-i18n="contact.location.title">Guangzhou Toksurvey Information Technology Co., Ltd.</h2>
          <div className="contact-info-list">
            <div>
              <MapPinned size={22} />
              <span data-i18n="home.location.address">
                No. 9 Caipin Road, Huangpu District, Guangzhou, Guangdong,
                China
              </span>
            </div>
            <div>
              <Mail size={22} />
              <a href="mailto:info@toknavgnss.com">info@toknavgnss.com</a>
            </div>
            <div>
              <MessageCircle size={22} />
              <span>WhatsApp consultation available</span>
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
        </div>

        <div className="osm-card" aria-label="OpenStreetMap company location">
          <iframe
            src={mapSrc}
            title="TOKNAV location on OpenStreetMap"
            loading="lazy"
          />
          <div className="map-overlay">
            <strong>TOKNAV Guangzhou Office</strong>
            <span>Caipin Road, Huangpu District</span>
          </div>
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
            <div>
              <MapPinned size={22} />
              <strong>Address in Chinese</strong>
              <span>广州市黄埔区彩频路9号</span>
            </div>
          </div>
        </div>
        <form className="quote-form">
          <label>
            <span data-i18n="form.name">Name</span>
            <input placeholder="Your name" data-i18n-placeholder="form.placeholder.name" />
          </label>
          <label>
            <span data-i18n="form.email">Email</span>
            <input placeholder="name@company.com" data-i18n-placeholder="form.placeholder.email" type="email" />
          </label>
          <label>
            <span data-i18n="form.country">Country</span>
            <input placeholder="Your country or region" data-i18n-placeholder="form.placeholder.country" />
          </label>
          <label>
            <span data-i18n="form.product">Product Requirement</span>
            <select defaultValue="">
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
            <textarea placeholder="Tell us your application, quantity and timeline." data-i18n-placeholder="form.placeholder.message" />
          </label>
          <button type="button">
            <span data-i18n="form.submit">Submit Inquiry</span> <ArrowRight size={18} />
          </button>
        </form>
      </section>

    </main>
  );
}
