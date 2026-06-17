import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import SiteHeader from "../components/SiteHeader";

export default function ThanksPage() {
  return (
    <main>
      <SiteHeader />
      <section className="thanks-page-shell">
        <div className="thanks-card">
          <CheckCircle2 size={54} />
          <span className="contact-label">Inquiry Submitted</span>
          <h1>Thank You for Contacting TOKNAV</h1>
          <p>
            Your project requirements have been sent to our sales team. We will
            review your message and reply by email or WhatsApp within one
            business day.
          </p>
          <div className="thanks-actions">
            <a className="primary-button" href="/products.html">Explore Products</a>
            <a className="secondary-button" href="/contact.html">Contact Page</a>
          </div>
          <div className="thanks-contact-row">
            <span><Mail size={18} /> emma@toknav.cn</span>
            <span><MessageCircle size={18} /> WhatsApp: +86 191 9534 6957</span>
          </div>
        </div>
      </section>
    </main>
  );
}
