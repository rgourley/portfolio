import Link from "next/link";
import type { Metadata } from "next";
import Page from "@/components/Page";
import StructuredData from "@/components/StructuredData";
import { pageSchema } from "@/lib/schema";
import { R } from "@/lib/links";
import { agentMarkdown } from "@/lib/agent-views";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services | Product Design and Strategy",
  description: "Product design and strategy consulting by Robert Gourley: strategic direction, product design execution, design systems and team building.",
  openGraph: { title: "Strategic design partnership", description: "Turn complexity into products people love.", url: "/services" },
};

const SERV: [string, string, string[]][] = [
  ["Strategic design direction", "Great products start with clear strategy. I work with your team to align business goals with user needs, creating a roadmap that guides every design decision from concept through launch.", ["Product vision and UX strategy", "Comprehensive design audits", "User research and validation", "Competitive analysis and positioning"]],
  ["Product design execution", "From initial concepts to production-ready designs, I create interfaces that are both intuitive and emotionally resonant. Every interaction is crafted to feel natural while solving real user problems.", ["End-to-end product design", "Complex workflow optimisation", "Responsive and accessible interfaces", "AI-powered feature design"]],
  ["Design systems and team building", "Scale your design capability with systems built to last. I create comprehensive design systems in Figma that serve as a single source of truth, so teams move faster while staying consistent.", ["Component libraries and documentation", "Design system implementation", "Team process and workflow optimisation", "Leadership coaching and mentorship"]],
];
const HOW: [string, string][] = [
  ["Strategic first", "Every design decision rolls up to clear business outcomes. I start by understanding what success looks like for your users and your business, then build toward that north star."],
  ["Cross-functional leadership", "Great design happens where product, engineering and business meet. I work closely with all stakeholders so design decisions support the broader product vision."],
  ["User-centred process", "I bring deep experience researching complex workflows, from insurance underwriters to crypto traders to autonomy engineers. Understanding real user needs drives everything."],
  ["Built to scale", "Whether it is a design system, a product feature or a team process, I design with growth in mind. Solutions work at launch and keep working as your product evolves."],
];

export default function ServicesPage() {
  return (
    <Page agent={agentMarkdown("/services")}>
      <StructuredData data={pageSchema({ path: "/services", name: "Services", description: "Product design and strategy consulting by Robert Gourley." })} />
      <article className="sheet">
        <span className="k lead-k">Product design and strategy</span>
        <h1>Strategic design partnership.</h1>
        <p className="dek">Turn complexity into products people love. I partner with organisations to build intuitive products that solve hard problems, from early-stage startups defining their vision to established companies scaling their design capabilities.</p>
        <div className="body2"><p>Whether you need a strategic UX audit, a complete product redesign, or help building a design team that ships at scale, I bring twenty years of experience turning ambitious ideas into shipping products across consumer, enterprise and cutting-edge autonomy.</p></div>
        <section className="sec">
          <h2><small>01</small>Services</h2>
          {SERV.map(([t, d, inc], i) => (
            <div className="offer" key={t}>
              <div><span className="n">{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3></div>
              <div><p>{d}</p><ul>{inc.map((x) => <li key={x}>{x}</li>)}</ul></div>
            </div>
          ))}
        </section>
        <section className="sec">
          <h2><small>02</small>How I work</h2>
          <div className="eng">{HOW.map(([t, d]) => <div key={t}><b>{t}</b><p>{d}</p></div>)}</div>
        </section>
        <section className="sec">
          <h2><small>03</small>Let&rsquo;s talk about your product</h2>
          <div className="body2"><p>Ready to turn complexity into clarity? Let&rsquo;s discuss how strategic design can drive your business forward.</p></div>
          <Link className="big" href={R.contact}>Get in touch<i>&rarr;</i></Link>
        </section>
      </article>
    </Page>
  );
}
