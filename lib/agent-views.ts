/* Every page's text for agents, keyed by route. The valve on the page shows it; /md/<route> serves it as markdown;
   llms-full.txt collects it. One source, so the two views cannot drift. */
import { SITE_URL } from "@/lib/site-url";
import { CONTACT_EMAIL } from "@/lib/contact";
import { getAllBlogPosts } from "@/lib/content";
import { WORK_LIST } from "@/lib/cases";
import { JOBS, PATENTS } from "@/lib/resume";
import { BELIEFS } from "@/lib/about";
import { ISSUES } from "@/lib/newsletter";
import { PROJ } from "@/lib/projects";
import { GH as PROXIES_GH, CMDS, PSTEPS } from "@/lib/proxies";
import { GH as QUANT_GH, WFL, TOOLS } from "@/lib/quant-garage";
import { GH as SUITE_GH, PATT, STY } from "@/lib/financial-ui-suite";
import { CTRL } from "@/lib/coaster-about";
import { R } from "@/lib/links";
import type { MdRoute } from "@/lib/md-routes";

export interface AgentView {
  /** the heading, set after a hash */
  title: string;
  /** the plain text under the heading */
  body: string;
}

const VIEWS: Record<MdRoute, () => AgentView> = {
  "/about": () => ({
    title: "About Robert Gourley",
    body: `- role: Principal Product Engineer, Massive; builds the team agent layer (skills, subagents, workflows) on financial data
- open_source (own time, to help others with agentic workflows): Claude Code skills Proxies, Quant Garage, Art Direction; plugin Financial UI Suite
- products: ClawStreet (created and run, paying users), mdskills.ai, Great Robots (greatrobots.ai), Made For Space (madeforspace.io)
- before: Director of Product Design at Shield AI (Hivemind), Kraken ($200B volume), Crunchyroll ($1.2B acquisition by Sony), Federato, Axure, Mojave (founder), Apple
- beliefs: ${BELIEFS.map(([t]) => t).join("; ")}
- patents: ${PATENTS.map(([, n]) => n).join(", ")}
- consulting: fractional leadership, strategic advisory, design systems, team building
- contact: ${SITE_URL}${R.contact}`,
  }),

  "/resume": () => ({
    title: "Resume, as markdown",
    body:
      JOBS.map(([co, role, when, bullets]) => `## ${co}, ${role} (${when})\n` + bullets.map((b) => "- " + b).join("\n")).join("\n\n") +
      "\n\n## Patents\n" +
      PATENTS.map(([t, n]) => `- ${t}, ${n}`).join("\n"),
  }),

  "/contact": () => ({
    title: "Contact Robert Gourley",
    body: `- email: ${CONTACT_EMAIL}
- linkedin: https://www.linkedin.com/in/rob-gourley/
- github: https://github.com/rgourley
- medium: https://uxcreative.medium.com/
- newsletter: https://www.theautonomyreport.com/
- offers: fractional design leadership, strategic advisory, design systems, team building`,
  }),

  "/newsletter": () => ({
    title: "The Autonomy Report",
    body: `- what: a weekly briefing on agentic AI by Robert Gourley
- subscribe: https://www.theautonomyreport.com/
- readers: 2,000+ builders
- recent issues:
${ISSUES.map((x) => "  - " + x).join("\n")}`,
  }),

  "/leadership": () => ({
    title: "Design leadership and consulting",
    body: `- what: fractional design leadership, design strategy and advisory, team building and hiring, design operations and systems
- for: founders, executives and product leaders establishing design as a strategic function, or scaling one that has become the bottleneck
- fractional_leadership: interim Head of Design or Design Director; 2 to 3 days a week; 3 to 6 months; success metrics set upfront
- advisory: monthly or quarterly strategy sessions with the leadership team plus ad-hoc access; 6 to 12 months; 1 to 2 days a month
- project_based: 2 to 4 months; design system creation, hiring, organisational design
- process: week 1 discovery (stakeholder interviews, product and design review); week 2 strategy (findings, priorities, success metrics); weeks 3+ execution embedded with the team; handoff planned from day one
- track_record: Shield AI (built the design team and UX strategy for the Hivemind autonomy platform); Kraken ($200B in trading volume, profile creation up 24%, 100% on-time delivery); Federato (design function from scratch, design system cut implementation from 6+ months to 8 weeks); Crunchyroll (10-person team through the $1.2B acquisition by Sony)
- industries: fintech and crypto, insurance and underwriting, streaming media, developer tools, autonomous systems
- start: typically 2 to 4 weeks out; day rate or monthly retainer; equity considered for longer advisory with early-stage startups
- contact: ${SITE_URL}${R.contact}`,
  }),

  "/services": () => ({
    title: "Product design and strategy consulting",
    body: `- what: strategic design direction, end-to-end product design execution, design systems and team building
- strategic_direction: product vision and UX strategy, design audits, user research and validation, competitive analysis and positioning
- execution: end-to-end product design, complex workflow optimisation, responsive and accessible interfaces, AI-powered feature design
- systems_and_teams: component libraries and documentation, design system implementation, team process and workflow, leadership coaching and mentorship
- approach: every decision rolls up to a business outcome; cross-functional with product, engineering and business; research into complex workflows (underwriters, traders, autonomy engineers); built to keep working as the product grows
- experience: 20+ years across Shield AI, Kraken, Crunchyroll and Federato; consumer, enterprise and autonomy
- contact: ${SITE_URL}${R.contact}`,
  }),

  "/projects": () => ({
    title: "Projects, as the agent sees it",
    body: `GET ${SITE_URL}/api/projects\n\n` + PROJ.map((p) => `- ${p.name}: ${p.tag} ${p.internal ? SITE_URL + p.url : p.url}`).join("\n"),
  }),

  "/projects/proxies": () => ({
    title: "Proxies, a Claude Code skill",
    body: [
      "- what: simulated stakeholder personas review an idea, prototype or design and say where it breaks for them",
      `- repo: ${PROXIES_GH}`,
      "- commands: " + CMDS.map(([c, d]) => `/proxies ${c}: ${d}`).join("; "),
      "- steps: " + PSTEPS.map(([t]) => t).join("; "),
      "- licence: PolyForm Shield 1.0.0",
    ].join("\n"),
  }),

  "/projects/quant-garage": () => ({
    title: "Quant Garage",
    body: `- what: 42 tools and 13 one-command workflows for equity research, sizing and risk; Claude Code skills and a Python library; every number cites the live API call it came from
- repo: ${QUANT_GH}
- workflows: ${WFL.map(([n]) => n).join(", ")}
- tools: ${TOOLS.map(([g, ts]) => `${g}: ${ts.join(", ")}`).join("; ")}
- key: Massive API, free tier runs 21 tools`,
  }),

  "/projects/financial-ui-suite": () => ({
    title: "Financial UI Suite, a Claude Code plugin",
    body: [
      "- what: two skills, financial-ui-patterns (17 correctness references) and financial-ui-styles (14 design styles modelled on real products)",
      `- repo: ${SUITE_GH}`,
      `- references: ${PATT.map(([f]) => f).join(", ")}`,
      `- styles: ${STY.map(([, n, b]) => `${n} (${b})`).join(", ")}`,
      `- install: claude plugin marketplace add ${SUITE_GH}; /plugin install financial-ui-suite@financial-ui-suite-dev`,
    ].join("\n"),
  }),

  "/coaster/about": () => ({
    title: "Market Coaster",
    body: `- what: a 3D roller coaster built from real market data; ride the GME squeeze, the Flash Crash, or any US stock's last session minute by minute
- ride: ${SITE_URL}/coaster
- data: Massive, split-adjusted, finished sessions only
- controls: ${CTRL.map(([k, t]) => `${k}: ${t}`).join("; ")}`,
  }),

  "/tools/font-sizes": () => ({
    title: "Font size checker bookmarklet",
    body: `- what: lists every font size, weight, family and line height on any web page, with counts; copy as CSS or JSON
- where: ${SITE_URL}/tools/font-sizes
- finding: median software pricing page uses 13 distinct font sizes (95 pages, range 6 to 29)`,
  }),

  "/work": () => ({
    title: "Work, as the agent sees it",
    body: `GET ${SITE_URL}/api/work\n\n` + WORK_LIST.map((w) => `- ${w.title} (${w.client}${w.year ? ", " + w.year : ""}): ${SITE_URL}/work/${w.key}`).join("\n"),
  }),

  "/blog": () => {
    const posts = getAllBlogPosts();
    return {
      title: "Writing, as the agent sees it",
      body:
        `GET ${SITE_URL}/api/blog\nAccept: application/json\n\n[\n` +
        posts.map((p) => `  {"slug": "${p.slug}", "date": "${p.date}", "title": "${p.title.replace(/"/g, '\\"')}",\n   "markdown": "${SITE_URL}/md/blog/${p.slug}"}`).join(",\n") +
        "\n]\n\n# Every post has a markdown twin at /md/blog/{slug}. Same words, no layout.",
    };
  },
};

/** The agent view of a page. */
export function agentView(route: MdRoute): AgentView {
  return VIEWS[route]();
}

/** The agent view as a markdown document: heading, the page it belongs to, the text. Served at /md/<route>. */
export function agentMarkdown(route: MdRoute): string {
  const { title, body } = agentView(route);
  return `# ${title}\n\nURL: ${SITE_URL}${route}\n\n${body}\n`;
}
