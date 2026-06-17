import { ArrowRight, Boxes, ChevronDown } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { productCategories } from "../lib/products";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/">
        <img src="/assets/toknav-logo-blue.png" alt="TOKNAV" />
      </a>
      <nav className="main-nav" aria-label="Primary navigation">
        <details className="mega-nav-item">
          <summary className="mega-nav-trigger">
            Products <ChevronDown size={15} />
          </summary>
          <div className="mega-menu" aria-label="TOKNAV product categories">
            <div className="mega-menu-panel">
              <div className="mega-menu-intro">
                <span>Product Center</span>
                <strong>High-precision GNSS products for B2B projects</strong>
                <p>
                  Compare RTK receivers, controllers, antennas, machine-control
                  systems and complete GNSS application solutions.
                </p>
                <a href="/products">
                  View All Products <ArrowRight size={16} />
                </a>
              </div>
              <div className="mega-menu-grid">
                {productCategories.map((category) => (
                  <a href={`/products/${category.slug}`} key={category.slug}>
                    <img src={category.image} alt="" />
                    <span>{category.kicker}</span>
                    <strong>{category.name}</strong>
                    <em>{category.buyerIntent}</em>
                  </a>
                ))}
              </div>
              <div className="mega-menu-footer">
                <div>
                  <Boxes size={18} />
                  <span>Catalog downloads, model specs and quote support are available on product pages.</span>
                </div>
                <a href="/inquiry">
                  Send Requirements <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </details>
        <a href="/#solutions" data-i18n="nav.solutions">Solutions</a>
        <a href="/#oem" data-i18n="nav.oem">OEM/ODM</a>
        <a href="/about" data-i18n="nav.about">About</a>
        <a href="/blog" data-i18n="nav.blog">Blog</a>
        <a href="/contact" data-i18n="nav.contact">Contact</a>
      </nav>
      <LanguageSwitcher />
      <a className="header-cta" href="/inquiry">
        <span data-i18n="cta.getQuote">Get a Quote</span> <ArrowRight size={16} />
      </a>
    </header>
  );
}
