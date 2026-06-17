import { ArrowRight, BadgeCheck, CalendarDays, Globe2, ShieldCheck, UsersRound } from "lucide-react";
import SiteHeader from "../components/SiteHeader";

const timeline = [
  ["2020", "GNSS RTK T5", "TOKNAV launched its T5 RTK receiver line for practical field surveying."],
  ["2022.4", "T10Pro GNSS Receiver", "T10Pro was launched as a professional RTK receiver for survey and mapping teams."],
  ["2022.6", "NET660i CORS/VRS", "VRS CORS NET660i expanded TOKNAV's base-station and correction-service portfolio."],
  ["2022.11", "U6 Monitoring", "U6 deformation monitoring solution was launched for structural and slope monitoring projects."],
  ["2023.3", "T20Pro Receiver", "T20Pro entered the receiver family for higher-performance GNSS field applications."],
  ["2023.8", "P8 / P8Pro", "Rugged controller products supported integrated field data workflows."],
  ["2023.11", "Marking Robot", "TOKNAV launched the marking robot solution for automated field marking."],
  ["2024.2", "tBase", "tBase was introduced for compact base-station and RTK correction work."],
  ["2024.3", "P8Glo", "P8Glo was launched for portable GNSS and GIS data collection."],
  ["2024.5", "NET660", "NET660 strengthened the CORS and base-station receiver range."],
  ["2024.7", "T30 / T30Pro", "T30 and T30Pro added AR stakeout, laser measurement and photogrammetry options."],
  ["2024.7", "NET660i-1U", "NET660i-1U was released for rack-mounted CORS infrastructure."],
  ["2025.1", "TAG66 System", "Electric steering wheel autonomous driving system expanded agricultural automation."],
  ["2025.2", "T40 Series", "T40 Series was launched for next-generation RTK receiver projects."],
  ["2025.8", "Unmanned Surface Vehicle", "TOKNAV extended GNSS applications into unmanned water-surface survey scenarios."],
  ["2025.11", "Handheld LiDAR Scanner", "Handheld LiDAR scanner was added to the spatial data capture portfolio."]
];

const feedbackPhotos = [
  ["/assets/about/feedback-las-vegas-demo.webp", "Product demonstration at a Las Vegas exhibition booth"],
  ["/assets/about/feedback-las-vegas-talk.webp", "Customer discussion around TOKNAV GNSS solutions"],
  ["/assets/about/feedback-las-vegas-booth.webp", "Overseas visitors reviewing TOKNAV products"],
  ["/assets/about/feedback-las-vegas-field.webp", "TR10 Pro field-marking demonstration with customers"],
  ["/assets/about/feedback-las-vegas-group.webp", "Customer meeting at TOKNAV booth"],
  ["/assets/about/feedback-russia-group.webp", "Partner feedback at Russia CTT Expo"],
  ["/assets/about/feedback-saudi-storefront.webp", "TOKNAV partner storefront in Saudi Arabia"],
  ["/assets/about/feedback-cameroon-office.webp", "Customer office display with TOKNAV equipment"]
];

const certificates = [
  ["/assets/about/cert-ce-p8.webp", "CE certificate for P8 series"],
  ["/assets/about/cert-ce-t10pro.webp", "CE certificate for T10Pro"],
  ["/assets/about/cert-fcc-t30.webp", "FCC grant for T30 series"],
  ["/assets/about/cert-igs-t10pro.webp", "IGS certification for T10Pro"],
  ["/assets/about/cert-ngs.webp", "NGS calibration certificate"],
  ["/assets/about/cert-kc.webp", "KC certification"],
  ["/assets/about/cert-iso9001.webp", "ISO9001 company certificate"]
];

export const metadata = {
  title: "About TOKNAV | GNSS Receiver Manufacturer, Certifications and Global Customers",
  description:
    "Learn about TOKNAV's GNSS product history, latest company video, overseas customer feedback and certification portfolio including CE, FCC, IGS, NGS, KC and ISO9001."
};

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />

      <section className="about-hero">
        <div className="about-hero-copy">
          <span className="contact-label">About TOKNAV</span>
          <h1>High-Precision GNSS Innovation Built for Global B2B Projects</h1>
          <p>
            TOKNAV develops GNSS receivers, CORS/VRS systems, rugged controllers,
            precision agriculture products and application solutions for surveying,
            construction, machine control and monitoring customers worldwide.
          </p>
          <div className="about-hero-actions">
            <a className="primary-button" href="/inquiry">
              Send Requirements <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href="https://www.youtube.com/@Toknav2024" target="_blank" rel="noopener noreferrer">
              Visit YouTube Channel
            </a>
          </div>
          <div className="about-proof-row">
            <span><Globe2 size={18} /> Global projects</span>
            <span><UsersRound size={18} /> Distributor support</span>
            <span><ShieldCheck size={18} /> Certified products</span>
          </div>
        </div>
        <div className="about-video-card">
          <iframe
            src="https://www.youtube.com/embed/sTQLH1sJG7g"
            title="TOKNAV TR10 Pro: A New Era of Field Marking"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <div>
            <strong>Latest company video from TOKNAV YouTube</strong>
            <span>Published on June 16, 2026</span>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-heading">
          <span>Product Roadmap</span>
          <h2>Product Launch Timeline</h2>
          <p>Structured from the latest TOKNAV company profile material in the shared company folder.</p>
        </div>
        <div className="about-timeline">
          {timeline.map(([date, title, text]) => (
            <article key={`${date}-${title}`}>
              <div><CalendarDays size={18} /><strong>{date}</strong></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section about-blue-band">
        <div className="about-section-heading light">
          <span>Customer Feedback</span>
          <h2>Field Photos from Global Customers and Exhibitions</h2>
          <p>Selected photos emphasize real customer visits, booth discussions, overseas storefronts and product demonstrations.</p>
        </div>
        <div className="about-photo-wall">
          {feedbackPhotos.map(([src, alt], index) => (
            <figure className={index === 3 ? "wide" : ""} key={src}>
              <img src={src} alt={alt} loading="lazy" />
              <figcaption>{alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-heading">
          <span>Quality and Compliance</span>
          <h2>Certification Gallery</h2>
          <p>Selected certificate covers from TOKNAV shared certification folders, including product and company-level compliance materials.</p>
        </div>
        <div className="about-cert-grid">
          {certificates.map(([src, alt]) => (
            <figure key={src}>
              <img src={src} alt={alt} loading="lazy" />
              <figcaption><BadgeCheck size={16} /> {alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="about-final-cta">
        <div>
          <span>Work with TOKNAV</span>
          <h2>Need product documents, certificates or distributor support?</h2>
          <p>Send your market, target product line and project requirements. TOKNAV can prepare a practical quotation and document package.</p>
        </div>
        <a className="primary-button" href="/inquiry">Get a Quote <ArrowRight size={18} /></a>
      </section>
    </main>
  );
}
