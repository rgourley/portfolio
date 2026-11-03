import type { Metadata } from "next";
import Page from "@/components/Page";
import StructuredData from "@/components/StructuredData";
import { pageSchema } from "@/lib/schema";
import { ISSUES } from "@/lib/newsletter";
import { agentView } from "@/lib/agent-views";

export const metadata: Metadata = {
  alternates: { canonical: "/newsletter" },
  title: "The Autonomy Report | A Weekly Briefing on Agentic AI",
  description: "A weekly briefing on agentic AI by Robert Gourley. Agent releases worth your attention, model launches and what they unlock, infrastructure changes that matter for builders. Read by 2,000+ builders.",
  openGraph: { title: "The Autonomy Report", description: "A weekly briefing on agentic AI by Robert Gourley.", url: "/newsletter" },
};

const FOR = ["You are building with agents, not just reading about them", "You ship products in agentic AI, autonomous systems or developer tools", "You want signal from someone in the work, not commentary from the sidelines", "You would rather read a five-minute briefing than a forty-tweet thread"];
const NOT = ["You want hot takes and AGI predictions", "You are looking for VC commentary or hype cycles", "You prefer LinkedIn motivation over what works in production", "You want long-form theory over tested practice"];
export default function NewsletterPage() {
  const view = agentView("/newsletter");
  return (
    <Page agentTitle={view.title} agent={view.body}>
      <StructuredData data={pageSchema({ path: "/newsletter", name: "The Autonomy Report", description: "A weekly briefing on agentic AI by Robert Gourley." })} />
      <article className="sheet">
        <span className="k lead-k">A weekly briefing on agentic AI</span>
        <h1>The Autonomy Report</h1>
        <p className="dek">I have spent two decades designing and shipping products: at Apple, running my own agency, and leading design at startups building AI and autonomous systems. The best signal comes from people building, not just talking.</p>
        <div className="body2"><p>Every week I share what is actually moving in agentic AI. Agent releases worth your attention versus the demos that will not ship. Model launches and what they unlock. Infrastructure changes that matter for builders. The work transition ahead, from someone living it.</p></div>
        <a className="big" href="https://www.theautonomyreport.com/" target="_blank" rel="noopener">Subscribe to The Autonomy Report<i>&rarr;</i></a>
        <p className="k" style={{ marginTop: 18 }}>Join 2,000+ builders. Read by operators at Google, Microsoft, Shield AI, and startups everywhere.</p>
        <section className="sec">
          <div className="two">
            <div><h3>For you if</h3><ul>{FOR.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div><h3>Not for you if</h3><ul>{NOT.map((x) => <li key={x}>{x}</li>)}</ul></div>
          </div>
        </section>
        <section className="sec">
          <h2><small>Recent issues</small></h2>
          <ol className="issues">{ISSUES.map((x, i) => <li key={x}><i>{String(i + 1).padStart(2, "0")}</i>{x}</li>)}</ol>
        </section>
      </article>
    </Page>
  );
}
