import type { Metadata } from "next";
import Page from "@/components/Page";
import EmailLink from "@/components/EmailLink";
import StructuredData from "@/components/StructuredData";
import { pageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact | Let's Work Together",
  description: "Contact Robert Gourley for product design consulting, fractional design leadership, and design strategy services. Specializing in complex technical products, AI/ML interfaces, fintech platforms, and building design teams. Let's discuss how strategic design can drive your business forward.",
  keywords: ["contact design consultant", "hire design leader", "design consulting contact", "product design services", "fractional design leadership", "get in touch", "design strategy consultation"],
  openGraph: { title: "Contact | Let's Work Together", description: "Ready to turn complexity into clarity? Let's discuss how strategic design can drive your business forward.", url: "/contact" },
};

const EMAIL = "rgourley@gmail.com";

export default function ContactPage() {
  const agent = `- email: ${EMAIL}
- linkedin: https://www.linkedin.com/in/rob-gourley/
- github: https://github.com/rgourley
- medium: https://uxcreative.medium.com/
- newsletter: https://www.theautonomyreport.com/
- offers: fractional design leadership, strategic advisory, design systems, team building`;
  return (
    <Page agentTitle="Contact Robert Gourley" agent={agent}>
      <StructuredData data={pageSchema({ type: "ContactPage", path: "/contact", name: "Contact Robert Gourley", description: "Get in touch about product design, design leadership and consulting." })} />
      <article className="sheet">
        <h1>Let&rsquo;s talk.</h1>
        <p className="dek">Ready to turn complexity into clarity? Product design, design leadership, consulting: fractional roles, strategic advisory, design systems, team building.</p>
        <ul className="links">
          <li><EmailLink email={EMAIL} location="contact_page"><span>Email</span>{EMAIL}</EmailLink></li>
          <li><a href="https://www.linkedin.com/in/rob-gourley/" target="_blank" rel="noopener"><span>LinkedIn</span>linkedin.com/in/rob-gourley</a></li>
          <li><a href="https://github.com/rgourley" target="_blank" rel="noopener"><span>GitHub</span>github.com/rgourley</a></li>
          <li><a href="https://uxcreative.medium.com/" target="_blank" rel="noopener"><span>Medium</span>uxcreative.medium.com</a></li>
          <li><a href="https://www.instagram.com/whats.up.rob/" target="_blank" rel="noopener"><span>Instagram</span>whats.up.rob</a></li>
          <li><a href="https://www.theautonomyreport.com/" target="_blank" rel="noopener"><span>Newsletter</span>The Autonomy Report</a></li>
        </ul>
        <section className="sec">
          <h2><small>How I work with teams</small></h2>
          <div className="body2"><p>Fractional leadership means I make decisions and lead your team, not just advise: I attend your meetings, make hiring decisions, set priorities and am accountable for outcomes. Early-stage companies usually need design established as a function; growth-stage companies need it scaled; established companies often need an interim leader or specialist expertise. If you are not sure what you need, we start with a discovery phase.</p></div>
        </section>
      </article>
    </Page>
  );
}
