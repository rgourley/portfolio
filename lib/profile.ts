/* The positioning, in one place: the summary line and the "what I do" block that llms.txt and the home /md document
   share, and the one-line footer under every other page's agent text. The lists mirror the About page's final copy. */
import { SITE_URL } from "@/lib/site-url";
import { BELIEFS } from "@/lib/about";
import { R } from "@/lib/links";

export const POSITIONING =
  "Robert Gourley, CXO, Agentic Systems. Product designer who builds the agent systems teams ship with. Principal Product Engineer at Massive, designing and building the Claude Code skills, subagents and workflows a product team runs on, then using them to ship real products faster and better. Before that Director of Product Design at Shield AI (Hivemind), and design leadership at Kraken, Crunchyroll, Federato, Axure and Apple.";

/** The open-source work, as the About page lists it: kind, name, one line, URL. */
export const OPEN_SOURCE: [string, string, string, string][] = [
  ["Claude Code skill", "Proxies", "Puts your stakeholders in the room before the meeting. Six personas who red-team, debate and decide.", `${SITE_URL}${R.proxies}`],
  ["Claude Code skill", "Quant Garage", "Forty-two research tools and thirteen one-command workflows for equity research, sizing and risk, from Claude or Python.", `${SITE_URL}${R["quant-garage"]}`],
  ["Claude Code plugin", "Financial UI Suite", "The patterns, fourteen styles and anti-patterns for financial interfaces, so an agent can build one that holds up.", `${SITE_URL}${R["financial-ui-suite"]}`],
  ["Claude Code skill", "Art Direction", "Thirty-two named design directions and a copy linter, so an agent can hold a look and a voice.", "https://github.com/rgourley/art-direction"],
];

/** The products, as the About page lists them. */
export const PRODUCTS: [string, string, string, string][] = [
  ["Product, paying users", "ClawStreet", "A training flywheel for AI financial agents, trading live US markets.", "https://www.clawstreet.io"],
  ["Product", "mdskills.ai", "A marketplace for agent skill files. Skills, not prompts, are how teams share what their agents know.", "https://mdskills.ai"],
  ["Product", "Great Robots", "A job board for robotics and autonomy roles, pulled straight from the hiring systems of the companies building them, with salary benchmarks and alerts.", "https://greatrobots.ai"],
  ["Product", "Made For Space", "Jobs across the space industry: launch, satellites, propulsion, GN&C and mission operations, direct from each employer.", "https://www.madeforspace.io"],
];

/** The "what I do" block: the Massive work, the open source, the products and the beliefs, as markdown sections. */
export function profileBlock(): string {
  return `## What I do
- Massive: the agentic layer for the people who use Massive's financial data: Claude Code skills, subagents and workflows that turn the API into answers an analyst can act on
- The Massive Claude skill, in internal testing with the team, so an analyst can ask for research, sizing and risk in plain language and get cited numbers back
- The agent layer does not replace the team; it lets a small team ship like a bigger one, and every run feeds the evals that make the next one better
- The flywheel: real runs become test cases, fixes are graded against them, and the next run improves. Nothing ships without an eval

## Open source
${OPEN_SOURCE.map(([k, n, d, u]) => `- ${n} (${k}): ${d} ${u}`).join("\n")}

## Products
${PRODUCTS.map(([k, n, d, u]) => `- ${n}: ${d}${k === "Product, paying users" ? " Created and run by Rob, with paying users." : ""} ${u}`).join("\n")}

## Beliefs
${BELIEFS.map(([t]) => `- ${t}`).join("\n")}`;
}

/** The one line under every page's agent text but the home: the positioning, the overview, the index. */
export const FOOTER_LINE =
  `Robert Gourley, CXO, Agentic Systems: product designer who builds the agent systems teams ship with. Overview: ${SITE_URL}/md. Index: ${SITE_URL}/llms.txt.`;
