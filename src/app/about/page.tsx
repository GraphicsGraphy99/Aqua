import type { Metadata } from "next";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = { title: "About Us", description: "Learn about the mission and vision behind GraphicsGraphy." };

export default async function AboutPage() {
  const s = await getSettings();
  return <div className="container">
    <section className="page-intro"><span className="eyebrow">A little about us</span><h1>Visual ideas.<br/>Real personality.</h1><p>{s.about_intro}</p></section>
    <div className="about-grid">
      <section className="info-panel"><span className="eyebrow">Our mission</span><h2>Make creativity discoverable.</h2><p className="prose-block">{s.about_mission}</p></section>
      <section className="info-panel"><span className="eyebrow">Our vision</span><h2>A home for visual stories.</h2><p className="prose-block">{s.about_vision}</p></section>
    </div>
    <section className="section"><span className="eyebrow">Explore the work</span><h2 style={{fontSize:"2rem",letterSpacing:"-.05em"}}>What you’ll find here</h2><p className="prose-block">Browse original graphic designs, digital artwork, posters, social media thumbnails, creative experiments, and videos. The collection is built to make visual work easy to explore, revisit, and share.</p></section>
  </div>;
}
