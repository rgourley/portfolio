import Link from "next/link";
import type { Metadata } from "next";
import Page from "@/components/Page";
import StructuredData from "@/components/StructuredData";
import { pageSchema } from "@/lib/schema";
import { JOBS, PATENTS } from "@/lib/resume";
import { R } from "@/lib/links";

export const metadata: Metadata = {
  alternates: { canonical: "/resume" },
  title: "Resume | Product Design Leader",
  description: "Resume of Robert Gourley, Director of Product Design at Shield AI. Award-winning product design leader specialising in scalable SaaS platforms, developer tools and consumer products.",
  openGraph: { title: "Resume | Product Design Leader", description: "Resume of Robert Gourley, Director of Product Design at Shield AI.", url: "/resume" },
};

export default function ResumePage() {
  const agent = "# Robert Gourley\n\n" + JOBS.map(([co, role, when, bullets]) => `## ${co}, ${role} (${when})\n` + bullets.map((b) => "- " + b).join("\n")).join("\n\n") + "\n\n## Patents\n" + PATENTS.map(([t, n]) => `- ${t}, ${n}`).join("\n");
  return (
    <Page agentTitle="Resume, as markdown" agent={agent.replace(/^# Robert Gourley\n\n/, "")}>
      <StructuredData data={pageSchema({ type: "ProfilePage", path: "/resume", name: "Resume", description: "Resume of Robert Gourley, Director of Product Design at Shield AI." })} />
      <article className="sheet">
        <h1>Resume</h1>
        <p className="dek">Award-winning product design leader specialising in scalable SaaS platforms, developer tools and consumer products. Currently leading design for the AI autonomy platform at Shield AI.</p>
        <p className="dek" style={{ fontSize: 17 }}>A record of user-centred solutions for complex technical products that drive measurable business outcomes, across UX and UI strategy, responsive design systems, team building, mentorship and cross-functional leadership. Products scaled from startup to a $1.2B acquisition.</p>
        <div className="facts">
          <div><span className="k">Now</span><b>Director of Product Design, Shield AI</b></div>
          <div><span className="k">Experience</span><b>20+ years</b></div>
          <div><span className="k">Patents</span><b>3 granted</b></div>
          <div><span className="k">Contact</span><b><Link href={R.contact}>robertcreative.com/contact</Link></b></div>
        </div>
        <section className="sec">
          <h2><small>01</small>Experience</h2>
          {JOBS.map(([co, role, when, bullets]) => (
            <div className="job" key={co}>
              <div className="when">{when}</div>
              <div><h3>{co}</h3><p className="role">{role}</p><ul>{bullets.map((b) => <li key={b}>{b}</li>)}</ul></div>
            </div>
          ))}
        </section>
        <section className="sec">
          <h2><small>02</small>Patents</h2>
          <div className="pat">{PATENTS.map(([t, n, d]) => <div key={n}><b>{t}</b><span>{n}</span><p>{d}</p></div>)}</div>
        </section>
        <section className="sec">
          <h2><small>03</small>Education and tools</h2>
          <div className="facts" style={{ margin: 0, padding: 0, border: 0 }}>
            <div><span className="k">Certifications</span><b>Google UX Design, Atlassian Agile, Stock Valuation</b></div>
            <div><span className="k">Tools</span><b>Figma, Sketch, Adobe Creative Suite, Axure, prototyping tools, AI-assisted design workflows</b></div>
            <div><span className="k">Industries</span><b>Autonomous systems, fintech and crypto, streaming media, insurance tech, developer tools</b></div>
            <div><span className="k">Also</span><b>Writes The Autonomy Report, a weekly briefing on agentic AI for 2,000+ builders</b></div>
          </div>
        </section>
      </article>
    </Page>
  );
}
