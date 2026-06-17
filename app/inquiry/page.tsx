import { Clock, Mail, MapPinned, MessageCircle, ShieldCheck } from "lucide-react";
import InquiryForm from "../components/InquiryForm";
import SiteHeader from "../components/SiteHeader";

export default function InquiryPage() {
  return (
    <main>
      <SiteHeader />

      <section className="inquiry-page-shell">
        <div className="inquiry-intro-panel">
          <span className="contact-label">B2B Inquiry</span>
          <h1 data-i18n="inquiry.title">Request a GNSS Receiver Quote</h1>
          <p data-i18n="inquiry.text">
            Send your project details to TOKNAV. Our team will help match the
            right GNSS receiver, antenna, CORS/VRS solution or OEM/ODM plan for
            your market.
          </p>
          <div className="inquiry-contact-list">
            <div>
              <Mail size={20} />
              <span>emma@toknav.cn</span>
            </div>
            <div>
              <MessageCircle size={20} />
              <span>WhatsApp consultation available</span>
            </div>
            <div>
              <MapPinned size={20} />
              <span data-i18n="home.location.address">No. 9 Caipin Road, Huangpu District, Guangzhou, China</span>
            </div>
            <div>
              <Clock size={20} />
              <span>Business-day reply within 24 hours</span>
            </div>
          </div>
          <div className="inquiry-trust-box">
            <ShieldCheck size={22} />
              <span data-i18n="inquiry.privacy">
              Required fields are clearly marked. Your information is used only
              for quotation and project communication.
            </span>
          </div>
        </div>

        <div className="inquiry-form-panel">
          <InquiryForm />
        </div>
      </section>
    </main>
  );
}
