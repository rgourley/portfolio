import Link from "next/link";
import type { Metadata } from "next";
import Page from "@/components/Page";
import StructuredData from "@/components/StructuredData";
import { pageSchema } from "@/lib/schema";
import { PATENTS } from "@/lib/resume";
import { R } from "@/lib/links";
import { BELIEFS } from "@/lib/about";
import { agentMarkdown } from "@/lib/agent-views";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About | Product Designer Building the Agent Layer",
  description: "Background, experience and approach of Robert Gourley, a product designer who builds the agent layer teams run on. Before Massive: Shield AI, Kraken, Crunchyroll, Federato, Axure, Mojave and Apple.",
  openGraph: { title: "About Robert Gourley", description: "A product designer who builds the agent layer teams run on.", url: "/about" },
};

const BUILT: [string, string, string, string][] = [
  ["Claude Code skill", "Proxies", "Puts your stakeholders in the room before the meeting. Six personas who red-team, debate and decide.", R.proxies],
  ["Claude Code skill", "Quant Garage", "Forty-two research tools and thirteen one-command workflows for equity research, sizing and risk, from Claude or Python.", R["quant-garage"]],
  ["Claude Code plugin", "Financial UI Suite", "The patterns, fourteen styles and anti-patterns for financial interfaces, so an agent can build one that holds up.", R["financial-ui-suite"]],
  ["Claude Code skill", "Art Direction", "Thirty-two named design directions and a copy linter, so an agent can hold a look and a voice.", "https://github.com/rgourley/art-direction"],
];
const PRODUCTS: [string, string, string, string][] = [
  ["Product, paying users", "ClawStreet", "A training flywheel for AI financial agents, trading live US markets.", R.projects],
  ["Product", "mdskills.ai", "A marketplace for agent skill files. Skills, not prompts, are how teams share what their agents know.", "https://mdskills.ai"],
  ["Product", "Great Robots", "A job board for robotics and autonomy roles, pulled straight from the hiring systems of the companies building them, with salary benchmarks and alerts.", "https://greatrobots.ai"],
  ["Product", "Made For Space", "Jobs across the space industry: launch, satellites, propulsion, GN&C and mission operations, direct from each employer.", "https://www.madeforspace.io"],
];

function Rows({ items }: { items: [string, string, string, string][] }) {
  return (
    <ul className="links">
      {items.map(([k, n, d, u]) => (
        <li key={n}>
          {u.startsWith("http") ? <a href={u}><span>{k}</span><span className="t"><b>{n}</b> {d}</span></a> : <Link href={u}><span>{k}</span><span className="t"><b>{n}</b> {d}</span></Link>}
        </li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  const md = agentMarkdown("/about");
  return (
    <Page agent={md}>
      <StructuredData data={pageSchema({ type: "AboutPage", path: "/about", name: "About Robert Gourley", description: "Background, experience and approach of Robert Gourley, a product designer who builds the agent layer teams run on." })} />
      <article className="sheet">
        <h1>About</h1>
        <p className="dek">I have led design across autonomous systems, fintech platforms and products used by millions. I establish design as a strategic function: building teams, creating systems, and shipping products that turn complexity into experiences people actually understand.</p>
        <div className="body2">
          <p>I am a product designer who builds the agent layer teams run on. At Massive I design and build the skills, subagents and workflows the team ships with, on financial data, then use them to ship real products with fewer people. Before that I led design at Shield AI, where we built the platform for autonomous systems in defense and commercial aviation, built design teams at Kraken handling $200B in trading volume, led design through Crunchyroll&rsquo;s $1.2B acquisition by Sony, and helped insurance carriers adopt machine learning at Federato.</p>
          <p>My work spans the full spectrum of product design, from early-stage strategy and user research through detailed interaction design and design system creation, and now the behaviour of the agents that do part of the building. I lead by doing, working across product, engineering and business so that design drives measurable outcomes. The medium has changed. The question has not: is the product actually good.</p>
        </div>
        <section className="sec">
          <h2><small>01</small>What I believe</h2>
          <ol className="principles wide">{BELIEFS.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}</ol>
          <div className="body2"><p>At Massive the agent layer does not replace the team; it lets a small team ship like a bigger one, and every run feeds the evals that make the next one better. At Shield AI the autonomy platform does not replace engineers; it gives them tools to build, test and deploy AI pilots. At Federato the ML platform did not replace underwriters; it gave them better data for faster, more confident decisions. We spent more than 1,200 hours interviewing underwriters before designing a single screen. At Kraken I worked alongside traders to understand the split-second decisions that move millions. I have built design systems that cut implementation time from six months to eight weeks, and led design teams from two to more than ten people.</p></div>
        </section>
        <section className="sec">
          <h2><small>02</small>Background</h2>
          <div className="body2">
            <p>I started at the intersection of design and technology, working on everything from Apple website sections to digital experiences for National Geographic. In 2008 I founded Mojave, a design agency recognised as one of the top 99 product agencies globally. We created the National Geographic Facebook app, which grew to 50 million followers, and worked with brands from startups to the Fortune 500.</p>
            <p>The agency taught me to work across industries and to tell what clients need from what they ask for. It also taught me that I am most energised going deep on complex products. That led to product design leadership roles where I could embed with teams and see products through from concept to scale: Crunchyroll, Kraken, Federato and Shield AI, where the interfaces are for building autonomous systems that make life-or-death decisions.</p>
            <p>In 2025 I started building the tools I had been designing for. On my own time I publish Claude Code skills and plugins as open source, to help other people with agentic workflows. And ClawStreet, a product with paying users. Both are listed below. Then Massive asked me to build the same kind of layer for their team.</p>
            <p>I keep learning: agents and the models under them, since they are reshaping who and what does the building; design systems; team leadership; and the business realities my designs operate in, from stock valuation to agile certification. Design decisions that ignore business constraints do not ship.</p>
          </div>
        </section>
        <section className="sec">
          <h2><small>03</small>Open source</h2>
          <div className="body2"><p>Claude Code skills and plugins I publish to help others with agentic workflows.</p></div>
          <Rows items={BUILT} />
        </section>
        <section className="sec">
          <h2><small>04</small>Products</h2>
          <Rows items={PRODUCTS} />
        </section>
        <section className="sec">
          <h2><small>05</small>Patents</h2>
          <div className="pat">{PATENTS.map(([t, n, d]) => <div key={n}><b>{t}</b><span>{n}</span><p>{d}</p></div>)}</div>
          <div className="body2" style={{ marginTop: "2em" }}><p>These are not academic exercises. They are solutions to problems I met while building design tools and shipping products with cross-functional teams.</p></div>
        </section>
        <section className="sec">
          <h2><small>06</small>What drives me</h2>
          <div className="body2">
            <p>Hard problems that matter. Products where, if the design fails, people cannot do their jobs. Interfaces where complexity cannot be avoided, only organised. Agent systems where, if the behaviour is not designed, nobody can tell what went wrong. Teams where design thinking has to be established, not just applied. And doing the work with people who take craft seriously.</p>
            <p>When my schedule allows I take on select consulting engagements: fractional leadership, strategic advisory, or specific initiatives like design system creation or team building. If you are working on complex products that need strategic design leadership, <Link href={R.contact}>let&rsquo;s talk</Link>.</p>
          </div>
        </section>
        <div className="facts">
          <div><span className="k">Role</span><b>Principal Product Engineer, Massive</b></div>
          <div><span className="k">Before</span><b>Director of Product Design, Shield AI</b></div>
          <div><span className="k">Focus</span><b>Agent systems and workflows, AI and ML products, design systems, complex platforms</b></div>
          <div><span className="k">Industries</span><b>Financial data, autonomous systems, fintech and crypto, streaming media, insurance tech, developer tools</b></div>
        </div>
      </article>
    </Page>
  );
}
