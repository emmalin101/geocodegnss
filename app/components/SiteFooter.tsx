import { Mail } from "lucide-react";
import SocialLinks from "./SocialLinks";
import { getCmsSettings } from "../lib/cms/public";

const footerColumns = [
  {
    title: "Products",
    links: [
      ["GNSS Receiver", "/products/gnss-receivers"],
      ["Rugged & GIS", "/products/rugged-gis"],
      ["GNSS Antenna", "/products/gnss-antennas"],
      ["Precision Agriculture", "/products/precision-agriculture-machine-control"],
      ["Machine Control", "/products/precision-agriculture-machine-control"],
      ["VRS Solution", "/products/gnss-application-solutions"]
    ]
  },
  {
    title: "Solutions",
    links: [
      ["Land Surveying & Mapping", "/products/gnss-receivers"],
      ["Construction & Engineering", "/products/gnss-receivers"],
      ["Precision Agriculture", "/products/precision-agriculture-machine-control"],
      ["Monitoring & Deformation", "/products/gnss-application-solutions"],
      ["GIS Data Collection", "/products/rugged-gis"]
    ]
  },
  {
    title: "Support",
    links: [
      ["Download", "/products"],
      ["Knowledge Base", "/blog"],
      ["Video Tutorials", "https://www.youtube.com/@Toknav2024"],
      ["Warranty Policy", "/contact"],
      ["Contact Support", "/contact"]
    ]
  },
  {
    title: "About Us",
    links: [
      ["Company Profile", "/about"],
      ["News", "/news"],
      ["Careers", "/about"],
      ["Contact Us", "/contact"]
    ]
  }
];

export default function SiteFooter() {
  const settings = getCmsSettings();
  const contactEmail = settings.contactEmail || "emma@toknav.cn";

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <a href="/" aria-label="TOKNAV home">
            <img src="/assets/toknav-logo-white.png" alt="TOKNAV" />
          </a>
          <p>{settings.footerText || "High-precision positioning solutions for a smarter world."}</p>
          <div className="site-footer-icons">
            <SocialLinks />
            <a className="social-link social-link-email" href={`mailto:${contactEmail}`} aria-label="Email TOKNAV" title="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="site-footer-columns">
          {footerColumns.map((column) => (
            <nav aria-label={column.title} className="site-footer-column" key={column.title}>
              <strong>{column.title}</strong>
              {column.links.map(([label, href]) => (
                <a
                  href={href}
                  key={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {label}
                </a>
              ))}
            </nav>
          ))}

          <div className="site-footer-column site-footer-contact">
            <strong>Contact Us</strong>
            <span>Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a></span>
            <span>WhatsApp: <a href="https://wa.me/8619195346957" target="_blank" rel="noopener noreferrer">+86 191 9534 6957</a></span>
            <span>Address: No. 9 Caipin Road, Huangpu District, Guangzhou, China</span>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>© 2026 Guangzhou Toksurvey Information Technology Co., Ltd. All rights reserved.</span>
        <div>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}
