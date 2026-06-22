import SocialLinks from "./SocialLinks";
import { getCmsSettings } from "../lib/cms/public";

export default function SiteFooter() {
  const settings = getCmsSettings();
  return (
    <footer className="site-footer">
      <div className="site-footer-brand">
        <strong>{settings.siteName || "TOKNAV"}</strong>
        <span>{settings.footerText || "High-precision GNSS positioning solutions for a smarter world."}</span>
      </div>
      <div className="site-footer-info">
        <span>Guangzhou Toksurvey Information Technology Co., Ltd.</span>
        <span>No. 9 Caipin Road, Huangpu District, Guangzhou, China</span>
        <span>GNSS Receiver Manufacturer · Professional OEM & ODM</span>
        <span>{settings.contactEmail}</span>
      </div>
      <SocialLinks />
    </footer>
  );
}
