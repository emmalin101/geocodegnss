import SocialLinks from "./SocialLinks";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-brand">
        <strong>TOKNAV</strong>
        <span>High-precision GNSS positioning solutions for a smarter world.</span>
      </div>
      <div className="site-footer-info">
        <span>Guangzhou Toksurvey Information Technology Co., Ltd.</span>
        <span>No. 9 Caipin Road, Huangpu District, Guangzhou, China</span>
        <span>GNSS Receiver Manufacturer · Professional OEM & ODM</span>
      </div>
      <SocialLinks />
    </footer>
  );
}
