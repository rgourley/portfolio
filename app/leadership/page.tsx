import Link from "next/link";
import type { Metadata } from "next";
import Page from "@/components/Page";
import StructuredData from "@/components/StructuredData";
import { pageSchema } from "@/lib/schema";
import { R } from "@/lib/links";
import { agentMarkdown } from "@/lib/agent-views";

export const metadata: Metadata = {
  alternates: { canonical: "/leadership" },
  title: "Design Leadership | Fractional Leadership and Advisory",
  description: "Fractional design leadership, strategic advisory and design systems by Robert Gourley. Build design teams that ship products at scale.",
  openGraph: { title: "Strategic design leadership", description: "Fractional design leadership, strategic advisory and design systems by Robert Gourley.", url: "/leadership" },
};

const FAQ: [string, string][] = [
  ["How is fractional leadership different from consulting?", "Fractional leadership means I am actually making decisions and leading your team, not just providing recommendations. I attend your meetings, make hiring decisions, set priorities, and am accountable for outcomes, just as a full-time leader would be."],
  ["Do you work with startups or established companies?", "Both. Early-stage companies typically need help establishing design as a function. Growth-stage companies need help scaling. Established companies often need specialised expertise or interim leadership during transitions."],
  ["What if we are not sure what we need?", "That is common. We start with a discovery phase where I assess your situation and recommend the right approach. Sometimes what you think you need is not actually the core problem."],
  ["Can you help us hire a full-time design leader?", "Yes. I often serve as interim leadership while running the search for a permanent hire at the same time. I can define the role, interview candidates, and help onboard your new leader."],
  ["Do you take equity?", "For early-stage startups I am open to equity as part of the compensation for longer-term advisory relationships. For fractional leadership or project work I typically work on a day rate or a monthly retainer."],
  ["What industries do you specialise in?", "I have designed products across fintech and crypto, insurance and underwriting, streaming media, developer tools and autonomous systems. I am particularly strong with complex technical products that need sophisticated capabilities made accessible."],
  ["How quickly can you start?", "Depending on current commitments, typically two to four weeks. For urgent situations I can sometimes begin with an initial assessment sooner."],
];
const OFFERS: [string, string, string[], string][] = [
  ["Fractional design leadership", "Step in as your interim Head of Design or Design Director while you search for a permanent hire, restructure your team, or navigate a critical product phase.",
    ["You need senior design leadership but are not ready for a full-time hire", "Your design leader left and you need continuity during the search", "You are launching a strategic initiative that needs dedicated design leadership", "Your team needs mentorship and process while you build out the function"],
    "I typically engage two to three days a week: attending key meetings, making strategic decisions, mentoring your team, and establishing processes that outlast my engagement. Engagements run three to six months with clear success metrics defined up front."],
  ["Design strategy and advisory", "Strategic guidance for organisations with existing design teams who need an outside perspective on major decisions, roadmap planning, or organisational challenges.",
    ["You are deciding whether to build or buy: design systems, tools, capabilities", "Your design team needs direction on a major product initiative", "You want an experienced view on how to structure and grow the design function", "You are planning a redesign or a new product and want to get the strategy right first"],
    "Monthly strategy sessions with your leadership and design team, reviews of key decisions and artefacts, and ad-hoc access when something comes up. Advisory relationships run six to twelve months."],
  ["Design systems and infrastructure", "Build the systems and processes that let your design team scale: design systems, documentation, component libraries, and the workflows that connect design to code.",
    ["Your design is inconsistent across products and platforms", "Engineers rebuild the same components over and over", "Design hand-off is slow and error-prone", "Design capacity does not match the pace of engineering"],
    "I audit your current design processes, tools and systems, then build the infrastructure you need: design systems in Figma, documentation, component libraries, design-to-code workflows, and team processes that scale."],
];
const WHY: [string, string][] = [
  ["I have done the work.", "I am not a consultant who stopped designing ten years ago. I currently lead design at Shield AI for one of the most complex products in autonomy. I have shipped products across consumer, enterprise and defense. I know what works because I am still doing it."],
  ["Strategy meets execution.", "I do not just provide recommendations and leave. I help you implement them. Whether it is building your design system, hiring your team, or establishing your design process, I stay engaged until it is working."],
  ["Cross-functional by default.", "Great design leadership means working well with product, engineering and business stakeholders. I have spent twenty years building those relationships and know how to make design a valued partner, not a service function."],
  ["Domain expertise that matters.", "I have designed products for crypto trading with $200B in volume, machine learning underwriting platforms, autonomous robotics systems, and streaming platforms with millions of users. I understand complex technical products and can translate that complexity into intuitive experiences."],
];
const STEPS: [string, string][] = [
  ["Week 1: Discovery", "A deep dive into your product, team, processes and challenges. I interview stakeholders, review your product and design artefacts, and assess the current state."],
  ["Week 2: Strategy", "Findings and recommendations with clear priorities and success metrics. We align on scope, timeline, and how success will be measured."],
  ["Weeks 3 on: Execution", "I embed with your team: making decisions, shipping work, establishing processes, and building capability. Regular check-ins keep us on track and adjust as needed."],
  ["Transition", "Whether I am interim leadership or advisory, I plan for a clean hand-off from day one. Documentation, knowledge transfer and sustainability are built into every engagement."],
];
const MODELS: [string, string, string, string][] = [
  ["Interim design leadership", "3 to 6 months", "2 to 3 days a week", "Organisations between hires or navigating major transitions"],
  ["Strategic advisory", "6 to 12 months", "1 to 2 days a month plus ad-hoc access", "Organisations with design teams who need strategic guidance"],
  ["Project-based", "2 to 4 months", "Varies by project", "Specific initiatives such as a design system, hiring, or organisational design"],
];
const ENG: [string, string, string][] = [
  ["Shield AI", "Director of Product Design, 2025 to present", "Built the design team and established the UX strategy for the Hivemind autonomy platform, creating developer-focused interfaces for complex AI systems across simulation, testing and deployment."],
  ["Kraken", "Director of Product Design", "Led the design team for an institutional trading platform handling $200B in volume. Increased profile creation 24% through strategic UX improvements while maintaining 100% on-time delivery."],
  ["Federato", "Head of Product Design", "Established the design function from scratch for an ML underwriting platform. Created a comprehensive design system that cut implementation time from six-plus months to eight weeks."],
  ["Crunchyroll", "Director of Product Design", "Built and led a ten-person creative team through rapid growth and a $1.2B acquisition by Sony. Established design processes and systems that scaled across mobile, web and living room platforms."],
];

export default function LeadershipPage() {
  return (
    <Page agent={agentMarkdown("/leadership")}>
      <StructuredData data={pageSchema({ path: "/leadership", name: "Design leadership", description: "Fractional design leadership, strategic advisory and design systems by Robert Gourley." })} />
      <article className="sheet">
        <span className="k lead-k">Design leadership and consulting</span>
        <h1>Strategic design leadership.</h1>
        <p className="dek">Build design teams that ship products at scale. I partner with founders, executives and product leaders to establish design as a strategic function: an interim design leader, strategic guidance for your existing team, or help building design capability from the ground up.</p>
        <section className="sec">
          <h2><small>01</small>When organisations bring me in</h2>
          <div className="body2">
            <p>You are at an inflection point. Your product is gaining traction, but design is becoming a bottleneck. Your team is talented but lacks direction. You are hiring your first design leader and need someone who has been there before. You are scaling quickly and need design systems and processes that will not break as you grow.</p>
            <p>I have built and led design teams through acquisition (Crunchyroll&rsquo;s $1.2B exit), rapid scaling (Kraken&rsquo;s trading platform) and cutting-edge product development (Shield AI&rsquo;s autonomy platform). I know what works at different stages and can help you avoid the expensive mistakes most companies make.</p>
          </div>
        </section>
        <section className="sec">
          <h2><small>02</small>What design leadership looks like</h2>
          {OFFERS.map(([t, d, solves, how], i) => (
            <div className="offer" key={t}>
              <div><span className="n">{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3></div>
              <div><p>{d}</p><ul>{solves.map((x) => <li key={x}>{x}</li>)}</ul><p className="how"><b>How it works.</b> {how}</p></div>
            </div>
          ))}
        </section>
        <section className="sec">
          <h2><small>03</small>Why organisations work with me</h2>
          <div className="eng">{WHY.map(([t, d]) => <div key={t}><b>{t}</b><p>{d}</p></div>)}</div>
        </section>
        <section className="sec">
          <h2><small>04</small>How we would work together</h2>
          <ol className="steps">{STEPS.map(([t, d]) => <li key={t}><b>{t}</b><p>{d}</p></li>)}</ol>
        </section>
        <section className="sec">
          <h2><small>05</small>Common engagement models</h2>
          <div className="models">{MODELS.map(([a, b, c, d]) => <div key={a}><b>{a}</b><dl><dt>Duration</dt><dd>{b}</dd><dt>Commitment</dt><dd>{c}</dd><dt>Best for</dt><dd>{d}</dd></dl></div>)}</div>
        </section>
        <section className="sec">
          <h2><small>06</small>Recent leadership engagements</h2>
          {ENG.map(([co, role, d]) => <div className="job" key={co}><div className="when">{role}</div><div><h3>{co}</h3><ul><li>{d}</li></ul></div></div>)}
        </section>
        <section className="sec">
          <h2><small>07</small>Let&rsquo;s talk about your design challenge</h2>
          <div className="body2"><p>Whether you are hiring your first designer, scaling an existing team, or navigating a complex product challenge, I can help you build design capability that drives business outcomes.</p></div>
          <Link className="big" href={R.contact}>Schedule a consultation<i>&rarr;</i></Link>
        </section>
        <section className="sec">
          <h2><small>08</small>Frequently asked questions</h2>
          <div className="faq">{FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </section>
      </article>
    </Page>
  );
}
