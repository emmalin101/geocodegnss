import { ArrowRight } from "lucide-react";
import SiteHeader from "../components/SiteHeader";

const newsItems = [
  {
    title: "GNSS and RTK workflows continue to move toward cloud-connected field teams",
    source: "Inside GNSS",
    link: "https://insidegnss.com/",
    image: "/assets/products/gnss-receiver-series-combo.webp",
    summary:
      "Industry buyers are watching RTK receivers, correction services and field software become more connected across surveying and construction workflows."
  },
  {
    title: "Geospatial teams are using LiDAR, UAV mapping and mobile scanning for faster site documentation",
    source: "Geo Week News",
    link: "https://www.geoweeknews.com/news",
    image: "/assets/products/tsr20.webp",
    summary:
      "LiDAR scanning, reality capture and drone mapping are practical tools for project inspection, digital twins and faster field documentation."
  },
  {
    title: "Hydrographic survey projects increasingly use compact USVs for safer water data collection",
    source: "GIM International",
    link: "https://www.gim-international.com/news",
    image: "/assets/products/tboat20.webp",
    summary:
      "Unmanned surface vessels can help teams collect bathymetry and water-monitoring data while reducing manual work in difficult water environments."
  }
];

export const metadata = {
  title: "TOKNAV News | GNSS and Geospatial Industry Updates",
  description: "Read concise GNSS, RTK, surveying, GIS, LiDAR, USV and machine-control industry updates from TOKNAV."
};

export default function NewsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="blog-hero">
        <div>
          <span className="contact-label">News</span>
          <h1>GNSS and Geospatial Industry Updates</h1>
          <p>Short, easy-to-read updates for surveying, mapping, construction, machine control and positioning buyers.</p>
        </div>
      </section>
      <section className="blog-index section">
        <div className="blog-card-grid">
          {newsItems.map((item) => (
            <article className="blog-card" key={item.title}>
              <img src={item.image} alt="" style={{ width: "100%", borderRadius: 12, marginBottom: 18, aspectRatio: "16 / 9", objectFit: "cover" }} />
              <div className="blog-card-meta">
                <span>Industry</span>
                <span>{item.source}</span>
              </div>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Source Link <ArrowRight size={17} />
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
