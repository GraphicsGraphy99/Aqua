import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = { title: "Contact Us", description: "Contact GraphicsGraphy about creative work, collaborations, or questions." };

export default async function ContactPage() {
  const s = await getSettings();
  return <div className="container">
    <section className="page-intro"><span className="eyebrow">Let’s talk</span><h1>Contact us.</h1><p>Have a question, a collaboration idea, or feedback about the work? Send a note and we’ll get back to you.</p></section>
    <ContactForm/>
    {s.contact_email && <p style={{marginTop:-30,marginBottom:40,color:"#666"}}>Prefer email? <a className="text-link" href={`mailto:${s.contact_email}`}>{s.contact_email}</a></p>}
  </div>;
}
