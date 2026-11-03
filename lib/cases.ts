/* The eight case studies in the Bloom language. Every fact comes from content/work/<slug>.md; the copy is set in the site's
   voice but nothing is added. Each chapter is a list of blocks: copy as HTML strings, figures that arrive as dots, and the
   dot scenes. Hivemind gets its own scenes; the others wait for theirs, with photographs in the meantime. */
import { R } from "@/lib/links";
import type { SceneKind } from "@/components/PilotsScene";

export interface Img { src: string; w: number; h: number }
export const IMG: Record<string, Img> = {
  "hm-1": { src: "/images/1764702897299-xcvcbMacBook_Air__2022_.png", w: 2004, h: 1503 },
  "kraken-1": { src: "/images/1764914892122-kraken.png", w: 1600, h: 900 },
  "kraken-2": { src: "/images/1764916663818-821512-1741895132-65c29dd2bf5f0d980151c151-648ce8092f428f65d918ed78-cryptowatch-5-p-1080.avif", w: 1080, h: 598 },
  "kraken-3": { src: "/images/jay.jpg", w: 3000, h: 4499 },
  "boombox-1": { src: "/images/1764915348966-Boombox.png", w: 1600, h: 900 },
  "axure-1": { src: "/images/image-48c99627.jpg", w: 1200, h: 841 },
  "axure-4": { src: "/images/czm6ly9waxhwys10zxn0l2nvbs9syxjnzs84mje1mtivmtczmzk0mdi4os0xntq4mjatnjvjmju1y2fmytqwy2e2ogzmndu4mzg5ltywywmzndg5odjmmzdlmmriymqzodu0yy1hehvyzxjwmtatyxqtmngucg5n.jpg", w: 1500, h: 924 },
  "axure-5": { src: "/images/rs-fit-1500-0-3.jpg", w: 1500, h: 901 },
  "axure-6": { src: "/images/czm6ly9waxhwys10zxn0l2nvbs9syxjnzs84mje1mtivmtczmzk0mdi4os0xmza2ntutnjvjmju1y2ezntcyzwm3nmuynmy5zmriltywywmznje1njg1mjiynmrhntrlmdcwzc1hehvyzxjwmtb0d28tyxqtmngucg5n.jpg", w: 1500, h: 898 },
  "axure-7": { src: "/images/czm6ly9waxhwys10zxn0l2nvbs9syxjnzs84mje1mtivmtczmzk0mdi4oc05nty3otutnjvjmju1yzk4yzm0ode1mjjioguzmwjmltywywmznwnin2jmzdzlowm4mty4ztuxny1hehvyzxjwmtbvbmutyxqtmngucg5n.jpg", w: 1500, h: 898 },
  "axure-8": { src: "/images/rs-fit-1500-0-4.jpg", w: 1500, h: 1127 },
  "axure-9": { src: "/images/rs-fit-1500-0-5.jpg", w: 1500, h: 898 },
  "crunchyroll-1": { src: "/images/image-bade02e6.jpg", w: 1200, h: 870 },
  "crunchyroll-2": { src: "/images/crunchyroll-tv-small.jpg", w: 940, h: 1400 },
  "crunchyroll-4": { src: "/images/rs-fit-1500-0-8.jpg", w: 1500, h: 996 },
  "apple-1": { src: "/images/image-77e7275d.jpg", w: 1200, h: 675 },
  "paulfrank-1": { src: "/images/image-43462bec.jpg", w: 1200, h: 900 },
  "paulfrank-4": { src: "/images/rs-fit-1500-0-10.jpg", w: 951, h: 663 },
  "paulfrank-5": { src: "/images/czm6ly9waxhwys10zxn0l2nvbs9syxjnzs84mje1mtivmtczmzk0mjuzmc01mde0otatnjviodq2ztywy2yzotvimdfhn2nimjfkltywywq2zte4nmezztzkmznknze3yjfimc02ztdmmdmzzi0xzjblltqyowmtoty1os5qcgvn.jpg", w: 1000, h: 817 },
  "clawstreet-1": { src: "/images/clawstreet/clawstreet-1.jpg", w: 1400, h: 788 },
  "clawstreet-2": { src: "/images/clawstreet/clawstreet-2.jpg", w: 1400, h: 788 },
  "clawstreet-3": { src: "/images/clawstreet/clawstreet-3.jpg", w: 900, h: 900 },
  "clawstreet-4": { src: "/images/clawstreet/clawstreet-4.jpg", w: 900, h: 900 },
  "clawstreet-5": { src: "/images/clawstreet/clawstreet-5.jpg", w: 1400, h: 800 },
  "w-clawstreet": { src: "/images/clawstreet/w-clawstreet.jpg", w: 900, h: 507 },
  "claw-home": { src: "/images/clawstreet/home.jpg", w: 800, h: 1135 },
  "claw-agent": { src: "/images/clawstreet/agent-page.jpg", w: 800, h: 1135 },
  "claw-board": { src: "/images/clawstreet/leaderboard.jpg", w: 800, h: 1127 },
  "claw-activity": { src: "/images/clawstreet/activity.jpg", w: 800, h: 1135 },
};

export type Block =
  | { t: "html"; html: string }
  | { t: "fig"; img: string; cap: string; cls?: "wide" | "narrow"; cell?: number }
  | { t: "grid"; a: string; ca: string; b: string; cb: string }
  | { t: "hold"; label: string }
  | { t: "quote"; img: string; who: string; bio: string; q: string }
  | { t: "scene"; kind: "pilots" | "drone" | "dash" | "flow" | "race" | "lanes"; aria: string; cap: string; aspect: string; title?: { name: string; stats: [string, string][] } };

export interface Chapter { id: string; name: string; blocks: Block[] }
export interface CaseStudy {
  slug: string; title: string; dek: string; facts: [string, string][]; tags: string[];
  hero: string; heroAlt: string; heroCap: string; next: string; chapters: Chapter[];
  /** a dot scene in the hero's place, when the study leads with one; hero then only names the image for cards */
  heroScene?: { kind: SceneKind; aria: string };
}

const html = (s: string): Block => ({ t: "html", html: s });
const fig = (img: string, cap: string, cls: "wide" | "narrow" = "wide", cell = 6): Block => ({ t: "fig", img, cap, cls, cell });
const grid = (a: string, ca: string, b: string, cb: string): Block => ({ t: "grid", a, ca, b, cb });
const quote = (img: string, who: string, bio: string, q: string): Block => ({ t: "quote", img, who, bio, q });

export const CASES: Record<string, CaseStudy> = {};

// ---------- Hivemind ----------
CASES.hivemind = {
  slug: "hivemind", title: "Hivemind Autonomy Platform",
  dek: "Where engineers build, test and deploy AI pilots: the agents that fly autonomous aircraft. The platform that takes an agent from a scenario to a live mission.",
  facts: [["Role", "Director of Product Design"], ["Timeline", "2025 to present"], ["Platform", "Web application, SDK, CLI tools"], ["Client", "Shield AI"], ["Year", "2025"]],
  tags: ["Strategy", "User research", "Prototyping", "UX", "UI design"],
  hero: "hm-1", heroAlt: "Hivemind on a laptop", heroCap: "Hivemind, the platform engineers use to build, test and deploy AI pilots.",
  next: "clawstreet",
  chapters: [
    { id: "challenge", name: "Designing the agent layer", blocks: [
      html(`<p>Shield AI’s Hivemind is the platform engineers use to develop, test and deploy AI pilots for autonomous aircraft, across defense and commercial aviation. It covers the whole life of an agent: simulation, testing, hardware-in-the-loop validation and live operations.</p>
<p>Building an agent is not one task. It is a loop. An engineer designs a scenario, configures the agent, runs it in simulation, reads the metrics, adjusts, and eventually sends it to a physical aircraft. At every step they need to know what the agent is doing and why. Without careful design, people either drown in the technical detail or stop trusting what the system tells them.</p>
<p class="pull">How do you make mission-critical agent development clear, trustworthy and fast, without flattening the workflows that domain experts rely on?</p>`),
      { t: "scene", kind: "pilots", aspect: "16/9", aria: "Five AI pilots flying in loose formation over a terrain of dots", cap: "Five pilots in loose formation. Each is an agent; the trace on the ground is where the lead has been." },
    ] },
    { id: "approach", name: "Approach", blocks: [
      html(`<p>I joined Shield AI to build the product design function from the ground up: the team, and the way the team thinks.</p>
<h3>A team shaped like the agent lifecycle</h3>
<p>I organised design around the three phases an agent moves through. Development, which is scenarios, agents and missions. Testing, which is metrics, dashboards and analysis. Operations, which is hardware-in-the-loop, ground control and deployment. Each designer owns end-to-end experiences inside their phase and works across the full journey with the others. Design systems and research were embedded as core functions from day one.</p>
<h3>Discovery first</h3>
<p>Autonomy engineering is a specialised domain, so the work started with interviews and shadowing sessions with autonomy engineers, test operators and domain experts. The biggest friction was not missing features. It was cognitive overload and opacity. People needed to see the state of the system, trace what an agent had decided, and move between phases without losing their place.</p>
<h3>Principles as decision tools</h3>
<p>Rather than design by feature request, we set five principles and use them to judge every decision. When a design is on the table the questions are plain: does this make it clearer, does it build trust, does it help people move faster?</p>
<ol class="principles">
<li><b>Clarity</b><span>Organise complexity through hierarchy and progressive disclosure.</span></li>
<li><b>Trust</b><span>Make the system’s behaviour transparent and traceable.</span></li>
<li><b>Insight</b><span>Turn data into understanding people can act on.</span></li>
<li><b>Velocity</b><span>Take the friction out of the iteration loop.</span></li>
<li><b>Craft</b><span>Sweat the details, because trust compounds from quality.</span></li>
</ol>`),
    ] },
    { id: "work", name: "The work", blocks: [
      html(`<h3>The agent designer</h3>
<p>A low-code interface where autonomy engineers build, configure and test AI agents without writing code for every parameter change. It balances power-user speed, with keyboard shortcuts and bulk operations, against discoverability for people who come to it less often. This is the heart of the platform: the place an agent takes shape.</p>`),
      { t: "scene", kind: "drone", aspect: "16/8", aria: "A fixed-wing drone built from dots in flight over the field, with six callouts round it: Motion Manager, Behavior Manager, Camera, Garmin500 GPS, Payload, State Estimation", cap: "The agent designer: one agent in flight, with the built-in managers and the blocks an engineer configures called out round it.", title: { name: "Air-Group 3", stats: [["RANGE", "120 km"], ["PAYLOAD", "2.4 kg"], ["FLIGHT TIME", "8 h"], ["CEILING", "4,500 m"]] } },
      html(`<h3>One loop, end to end</h3>
<p>I designed cohesive workflows that carry an agent through simulation, hardware-in-the-loop testing, configuration and mission deployment. The information architecture gives new users a quick-start path and experts a deep one, and navigation is stateful: it remembers where you were as you move from design to test to deployment.</p>
<h3>Reading what the agent did</h3>
<p>Testing an agent produces a flood of telemetry. The analysis tools and dashboards do not hand it over raw. They surface what failed, why it matters and what to investigate next, so an engineer can find patterns, outliers and failure modes quickly and trace an agent’s behaviour back to its cause.</p>`),
      { t: "scene", kind: "dash", aspect: "16/8", aria: "Raw telemetry gathering into a dashboard of charts", cap: "A test run comes back as raw telemetry. It gathers into a dashboard: what failed, why it matters, what to look at next." },
      html(`<h3>The foundation</h3>
<p>A scalable component library in Figma with documented patterns for navigation, data density, error states and real-time status. It cuts implementation time while keeping the platform visually consistent and accessible.</p>`),
    ] },
    { id: "impact", name: "Impact", blocks: [
      html(`<h3>Adoption across the lifecycle</h3>
<p>Adding simulation and hardware-in-the-loop testing, simulation environments and the agent configuration tools expanded platform use across the full development cycle. Engineers iterate faster because they move between design, test and deployment without switching tools.</p>
<h3>Faster iteration loops</h3>
<p>Lower cognitive load and a cleaner information architecture let autonomy engineers run more test cycles in a day. When people can read a test result quickly and trace what the agent did, they spend less time debugging and more time improving the agent.</p>
<h3>A team and an operating model</h3>
<p>A cross-functional design team with designers embedded in product squads, and a discovery-driven process in which design co-owns outcomes with product and engineering. No designs thrown over the wall. The team runs on shared principles, shared components and a culture of craft.</p>`),
      { t: "scene", kind: "flow", aspect: "16/8", aria: "A running mission: phases with their task pools, one branch cancelled, the successful branch carried into the next phase", cap: "How the team sees a mission run: phases, their task pools, what each one did. A task fails, a backup is cancelled, the next backup succeeds and the bus carries it on." },
    ] },
    { id: "reflections", name: "Reflections", blocks: [
      html(`<p>Designing for domain experts takes humility. Early on I learned that autonomy engineers do not need simplification. They need organisation. The goal is not to hide complexity but to structure it so people can navigate it with confidence.</p>
<p class="pull">Trust is not built through polish alone. It is built through transparency.</p>
<p>When an engineer can trace why an agent made a decision, or why a test failed, they trust the system with mission-critical work. That is where principles like trust and insight stop being philosophy and become tactics.</p>
<p>If I were starting over I would invest even more in early prototyping with real users in the loop. We learned the most when engineers used working prototypes in testing sessions, not static mocks. Watching domain experts drive the tools under real conditions showed edge cases and friction we would never have guessed.</p>
<p class="nda">Want to know more? Detailed visuals and specifics are under NDA, but I am glad to go deeper on the design process, the team structure and the strategic decisions. <a href="${R.contact}">Get in touch</a>.</p>`),
    ] },
  ],
};

// ---------- Kraken ----------
CASES.kraken = {
  slug: "kraken", title: "Asset trading for advanced traders",
  dek: "Designing powerful tools for beginner to institutional traders. One trading platform that feels approachable to a first-time buyer and fast enough for a professional.",
  facts: [["Role", "Director of Product Design"], ["Timeline", "2022 to 2025"], ["Platform", "Web, desktop, mobile"], ["Client", "Kraken"], ["Year", "2022"]],
  tags: ["Strategy", "Technical design", "UX", "UI design"], hero: "kraken-1", heroAlt: "The Kraken trading terminal on a laptop",
  heroCap: "The trading terminal.", next: "boombox",
  chapters: [
    { id: "challenge", name: "The challenge", blocks: [
      html(`<p>Kraken is one of the world’s largest cryptocurrency exchanges, with over $200B in trading volume. The platform serves everyone from first-time crypto buyers to institutional traders moving millions of dollars per trade.</p>
<p>These users have completely different needs. A beginner wants simplicity, and confidence that they will not lose money by accident. An institutional trader wants speed, precision and advanced tools: margin trading, futures, algorithmic order types. Most platforms pick a side. They either dumb things down for beginners or build complex interfaces that intimidate casual users.</p>
<p class="pull">How do you design a trading platform that feels approachable to beginners while giving professional traders the power and speed they demand?</p>`),
      quote("kraken-3", "Jay F.", "Day trader", "The interface on Cryptowatch is my favorite UI I have ever used as a trader."),
    ] },
    { id: "approach", name: "Approach", blocks: [
      html(`<h3>Understanding the user spectrum</h3>
<p>I led the design team responsible for the trading experience across web, desktop and mobile. Early on we mapped the full journey, from someone buying their first Bitcoin to institutional traders running sophisticated strategies. The insight was not that we needed two separate products. It was that we needed adaptive interfaces that scale with user expertise.</p>
<h3>Progressive disclosure at scale</h3>
<p>Not progressive disclosure in the traditional sense. We did not just hide advanced features behind menus. We designed the information architecture so beginners could complete core tasks without meeting complexity they did not need, while power users could reach everything without friction.</p>
<p>That meant rethinking navigation, order entry flows and how market data is surfaced. A first-time user should be able to buy Bitcoin in three clicks. An institutional trader should be able to place a stop-limit order with custom triggers without leaving the keyboard.</p>
<h3>Cross-platform consistency</h3>
<p>Trading happens everywhere. Some users monitor positions on mobile and execute on desktop. Others run real-time analysis on web and use mobile for alerts. We could not design three separate experiences. The mental model, the interaction patterns and the visual language had to be consistent across platforms while respecting the constraints and affordances of each.</p>
<h3>Iterative validation</h3>
<p>We ran continuous user testing with both novice and expert traders. The most valuable sessions were watching traders use the platform under real market conditions, not controlled test scenarios. When markets are volatile and money is on the line, you see which design decisions hold up and which fall apart.</p>`),
      fig("kraken-2", "Cryptowatch: the chart, the order book and the depth chart in one workspace, the kind of screen a professional lives in."),
    ] },
    { id: "work", name: "The work", blocks: [
      html(`<h3>Smart order entry</h3>
<p>Order entry adapts to user behaviour and market conditions. For beginners it guides a simple buy or sell decision with clear explanations. For advanced traders the same interface expands to limit orders, stop losses, margin options and order book depth, without a second screen.</p>
<h3>Real-time market data</h3>
<p>Visualisation systems that make market movement, order book dynamics and volume legible at a glance. The challenge was density. Professional traders want as much data as possible. Beginners drown in it. The answer was layered interfaces, where a user reveals more detail as they need it.</p>
<h3>Portfolio management</h3>
<p>Portfolio views that work across asset classes and account types. Users see total holdings, track performance and understand risk exposure without a finance degree. For institutional users the same views support multi-account management, margin tracking and P&amp;L attribution.</p>
<h3>Mobile trading</h3>
<p>A mobile experience that does not compromise on functionality while staying touch-friendly and legible on a small screen. Mobile is not just for monitoring. Many users execute real trades there, so the interface had to be fast and forgiving of touch errors that could be expensive.</p>`),
    ] },
    { id: "impact", name: "Impact", blocks: [
      html(`<ul class="stats">
<li><b>$200B</b><span>in trading volume, serving the full spectrum from retail to institutional, without sacrificing accessibility for newcomers.</span></li>
<li><b>24%</b><span>more new user profiles created, after UX work on onboarding clarity and friction made first trades less intimidating.</span></li>
<li><b>100%</b><span>on-time delivery for two consecutive quarters, from aligning design, product and engineering on what to build first.</span></li>
<li><b>Favourite</b><span>trading UI, in the words of professional traders who trade for a living and have used every major platform.</span></li>
</ul>
<p>When an interface becomes a competitive advantage for professional users while remaining accessible to beginners, the core tension is solved.</p>`),
    ] },
    { id: "reflections", name: "Reflections", blocks: [
      html(`<p>The hardest part was not designing for beginners or experts separately. It was designing one system that served both without compromising either. Early versions tried to be everything to everyone and ended up mediocre for both. The breakthrough was accepting that different users would see different versions of the same underlying system.</p>
<p class="pull">Speed matters more than you think. No amount of polish saves a slow interface when money is moving.</p>
<p>Professional traders will forgive visual quirks if the platform is fast and reliable. Performance became a design constraint, not an engineering afterthought. We designed with latency budgets in mind and optimised for perceived speed: skeleton states, optimistic updates, immediate feedback.</p>
<p>If I were starting over I would invest more in the emotional side of trading. It is stressful, emotionally charged, and mistakes are costly. The best interfaces acknowledge that by adding friction at the right moments, such as a confirmation before a large trade, and removing it everywhere else: instant access to account status, clear error recovery.</p>`),
    ] },
  ],
};

// ---------- Boombox ----------
CASES.boombox = {
  slug: "boombox", title: "Artist-first AI for musicians",
  dek: "An AI music production platform that clears the tedious work so artists can focus on creativity and collaboration.",
  facts: [["Role", "Director of Product Design"], ["Platform", "iPhone, web"], ["Client", "Boombox"], ["Year", "2024"]],
  tags: ["Product design", "Design systems", "Community"], hero: "boombox-1", heroAlt: "Boombox on a laptop and an iPhone",
  heroCap: "Boombox on the desktop and in the pocket.", next: "axure",
  chapters: [
    { id: "brief", name: "The brief", blocks: [
      html(`<p>Boombox is a platform for musicians and music creators. As Director of Product Design I led a comprehensive redesign of it, to serve the way musicians actually work: the unique workflows of the music industry, where collaboration, creativity and productivity all have to happen in one place.</p>
<p class="pull">A seamless, user-friendly environment tailored to how musicians work, with tools that make collaboration and creativity easier rather than adding to the admin.</p>`),
    ] },
    { id: "work", name: "The work", blocks: [
      html(`<h3>iPhone and web</h3>
<p>Intuitive features for iPhone and for the web, so an artist can move between the studio and the phone without the platform getting in the way.</p>
<h3>A design system</h3>
<p>A robust design system to keep the platform consistent across every surface as it grew, and to let the team ship faster.</p>
<h3>An artists’ network</h3>
<p>The launch of an artists’ network, to foster a vibrant community on the platform and give musicians people to make things with.</p>
<p class="nda">Want to know more? I am glad to go deeper on the design process and the decisions behind it. <a href="${R.contact}">Get in touch</a>.</p>`),
    ] },
  ],
};

// ---------- Axure ----------
CASES.axure = {
  slug: "axure", title: "Transformative redesign of Axure RP",
  dek: "A ground-up redesign of Axure RP 10: usability, workflow and the feature set, aligned with where the product was going next.",
  facts: [["Role", "VP of Product Design"], ["Timeline", "2017 to 2022"], ["Platform", "Desktop"], ["Client", "Axure"]],
  tags: ["Product design", "UX design", "Strategy"], hero: "axure-1", heroAlt: "Axure RP 10 on a laptop",
  heroCap: "Axure RP 10.", next: "crunchyroll",
  chapters: [
    { id: "challenge", name: "The challenge", blocks: [
      html(`<p>Axure RP is the prototyping tool UX teams use to build prototypes that work like the real thing. The challenge was to lead a transformative redesign of Axure RP 10, focused on usability, workflow and the feature set. That meant a comprehensive re-evaluation of the existing tool: fixing the user experience problems while aligning the product with Axure’s future vision and strategy.</p>
<p class="pull">A ground-up redesign of a tool that thousands of designers already relied on every day.</p>`),
    ] },
    { id: "work", name: "The redesign", blocks: [
      html(`<p>The scope ran from a complete audit of existing features and user research to find the experience issues, to a future product vision and strategy, to new features shipped and outdated ones sunset.</p>`),
      grid("axure-4", "The redesigned editor: a working budget prototype with its pages, outline and interactions beside it.", "axure-5", "An event page in the editor, with the inspector for the selected button on the right."),
      html(`<h3>Prototypes that work like the real thing</h3>
<p>Working forms, sortable grids and dynamic interfaces, built from unlimited combinations of interactions, and imported from Adobe XD, Figma and Sketch.</p>`),
      fig("axure-7", "Build UX prototypes that work like the real thing: working forms, sortable grids, dynamic interfaces."),
      html(`<h3>Faster where it counts</h3>
<p>The refreshed design came with improved performance and new features: multiple dynamic panel states visible at once, widgets converted to repeaters, resizing with constraints.</p>`),
      fig("axure-6", "Axure RP 10: multiple dynamic panel states at once, widgets converted to repeaters, resize using constraints."),
      html(`<h3>All-in-one UX prototyping</h3>
<p>Diagrams, customer journeys, wireframes and other UX documentation live beside the rich, functional prototype. Comments and feedback, developer inspect, notes and specifications, and plugins for Jira, Confluence, Teams and Slack.</p>`),
      grid("axure-9", "Comments and feedback, developer inspect, notes and specifications, next to the prototype.", "axure-8", "The component sheets and colour palette behind the redesign."),
    ] },
    { id: "role", name: "The role", blocks: [
      html(`<p>As the hands-on VP of Product Design I led the product design of Axure RP 10. I worked closely with the founders to develop and refine the product’s vision and strategy, led the redesign process, and made sure the product met our goals for improvement and innovation.</p>`),
    ] },
  ],
};

// ---------- Crunchyroll ----------
CASES.crunchyroll = {
  slug: "crunchyroll", title: "Crunchyroll video streaming",
  dek: "Product design for the Crunchyroll streaming platform: easy navigation and personalised content discovery for anime enthusiasts around the world.",
  facts: [["Timeline", "2015 to 2017"], ["Platform", "Tablet, TV"], ["Client", "Crunchyroll"]],
  tags: ["Product design", "UX design"], hero: "crunchyroll-1", heroAlt: "Crunchyroll on a tablet on a desk",
  heroCap: "Crunchyroll on a tablet.", next: "apple",
  chapters: [
    { id: "overview", name: "Overview", blocks: [
      html(`<p>Crunchyroll is the streaming video platform for anime. I designed the product, and through careful research and an iterative design process created an interface for easy navigation and personalised content discovery, to make the experience better for anime enthusiasts globally.</p>
<p class="pull">Find the next thing to watch without the catalogue getting in the way.</p>`),
    ] },
    { id: "screens", name: "On the big screen", blocks: [
      html(`<p>The same discovery experience on the television, where browsing happens from the sofa and the interface has to read from across the room.</p>`),
      fig("crunchyroll-4", "The TV app in a living room: the featured series, and the row of what to watch next."),
      fig("crunchyroll-2", "The TV app on a smaller set, with a featured exclusive and the series rows below.", "narrow", 5),
    ] },
  ],
};

// ---------- Apple ----------
CASES.apple = {
  slug: "apple", title: "Apple",
  dek: "Visual design for key sections of the Apple website, from the first Apple.com of the Steve Jobs return to product sites for Final Cut Pro and Logic Pro.",
  facts: [["Role", "Lead designer"], ["Platform", "Web"], ["Client", "Apple"]],
  tags: ["Visual design", "Web"], hero: "apple-1", heroAlt: "Apple keynote artwork",
  heroCap: "Apple.", next: "paul-frank-industries",
  chapters: [
    { id: "work", name: "The work", blocks: [
      html(`<p class="links">As a lead designer I directed visual design projects for key sections of the Apple website, including the design of <a href="https://www.apple.com/">Apple.com</a>’s first website on Steve Jobs’s return, and the creation of one of the first iTunes e-commerce apps on Facebook.</p>
<p class="links">The work spanned <a href="https://www.apple.com/education/">Apple Education</a>, <a href="https://www.apple.com/diversity/">Diversity initiatives</a>, and product sites for <a href="https://www.apple.com/final-cut-pro/">Final Cut Pro</a> and <a href="https://www.apple.com/logic-pro/">Logic Pro</a>.</p>`),
      html(`<p class="nda">I have worked on a number of projects with Apple, remotely and in-house, but due to confidentiality the work cannot be shown online. Feel free to <a href="${R.contact}">reach out</a> to learn more.</p>`),
    ] },
  ],
};

// ---------- Paul Frank ----------
CASES["paul-frank-industries"] = {
  slug: "paul-frank-industries", title: "Paul Frank Industries",
  dek: "A fun-loving line of environmentally friendly water bottles, and a site where fans design their own.",
  facts: [["Platform", "Web"], ["Client", "Paul Frank Industries"]],
  tags: ["Web", "E-commerce", "Visual design"], hero: "paulfrank-1", heroAlt: "A personalised Paul Frank water bottle held up in front of a shop window",
  heroCap: "Katie’s Sipper.", next: "hivemind",
  chapters: [
    { id: "brief", name: "The brief", blocks: [
      html(`<p>Paul Frank Industries is the popular lifestyle brand behind Julius the Monkey. I helped them unveil a fun-loving line of environmentally friendly water bottles.</p>
<p class="pull">Fans create their own one-of-a-kind reusable bottle from a variety of playful Julius designs.</p>`),
    ] },
    { id: "site", name: "The site", blocks: [
      html(`<p>A landing page that sets the tone, and a configurator where a fan picks a character, personalises the bottle and sees it before they buy.</p>`),
      grid("paulfrank-4", "Personalise a Paul Frank bottle in seconds: the landing page.", "paulfrank-5", "The configurator: pick a character, preview the design, add to cart."),
    ] },
  ],
};

// ---------- ClawStreet ----------
// The numbers are from clawstreet.io on Nov 3, 2026. Rob's own agents stay anonymous: no names, no count. The model and
// strategy data is described as what the platform records and shows, not as something offered elsewhere.
CASES.clawstreet = {
  slug: "clawstreet", title: "A training flywheel for AI financial agents",
  dek: "ClawStreet is where AI agents learn to trade live US markets. An agent connects, trades with no money at risk, is measured in public, is improved from what the runs show, and only then is taken to real markets. I built it and run it, with paying users.",
  facts: [["Role", "Founder, designer, builder"], ["Timeline", "2026 to present"], ["Platform", "Web, API, Claude Code skill"], ["Live", "clawstreet.io"], ["Year", "2026"]],
  tags: ["Agent systems", "Product design", "API design", "Financial data"],
  hero: "clawstreet-5", heroAlt: "The ClawStreet dashboard", heroCap: "Oracle and Disruptor against the S&P 500: two agents' returns over nineteen weeks, same $100k from the same day.",
  heroScene: { kind: "race", aria: "The equity curves of Oracle, Disruptor and the S&P 500 drawn week by week" },
  next: "kraken",
  chapters: [
    { id: "problem", name: "Where agents learn from experience", blocks: [
      html(`<p>Agentic trading means letting an AI agent research, decide and place trades on its own. In 2026 most large US retail brokers opened their accounts to agents, so the question stopped being whether an agent can trade and became whether it should, with this strategy, on this model, with this much at stake. Nobody could answer that from a backtest. A model has read the news, so a test on 2020 prices tells you what it remembered, not what it will do. An agent gets better the way a trader does: by running on live prices it has never seen, being wrong in public, and keeping the lesson for the next run.</p>
<p>ClawStreet is that test. I created it and I run it. An agent connects, gets $100,000 of simulated capital, trades 1,400 or so US stocks plus crypto at live prices with fees and slippage applied, and publishes its reasoning for every trade. A public leaderboard ranks it against every other agent and against the S&amp;P 500 over its own window. The owner watches it fail, captures the lessons, iterates, and takes a strategy to a broker only once it has proven itself. 303 agents have registered and 137 of them have traded, for $330.3M of volume all time. It has paying users: a free plan covers one agent with delayed prices; Plus covers three agents with real-time prices.</p>
<p class="pull">Watch it fail, capture the lessons, iterate and learn. Deploy into real markets once you are ready.</p>`),
    ] },
    { id: "connect", name: "An agent connects by reading", blocks: [
      html(`<p>ClawStreet has no sign-up form for its main user. An agent is onboarded by one sentence pasted into whatever runs it, Claude Code, Cowork, Codex CLI, Cursor or a loop of its own: read the skill manifest at api.clawstreet.io/v1/skill, pick a unique name, register, and after a human claims the agent you can start trading. The manifest is the product’s front door, written for something that believes every word: what to ask the owner before registering, how to store the API key before doing anything else, how to hand the owner the claim link, and what to do while waiting.</p>
<p>Registration is one request. The agent names itself, states its strategy and personality, and may disclose its model and framework. The response carries an API key shown once and a claim link. A human opens the link, signs in and presses Claim, the only step that needs a person. The agent then asks the API who it is, sees that it is claimed with $100,000 of cash, and places its first order with a reason attached. Every order carries that reason, and every fill records the price, the commission and the slippage, so the record an agent builds is one it cannot embellish.</p>`),
      fig("claw-home", "The front door. One sentence to paste into an agent, and the three steps that follow: connect, claim, first trade.", "narrow", 5),
    ] },
    { id: "flywheel", name: "The flywheel", blocks: [
      html(`<p>A run on ClawStreet leaves three kinds of evidence. The trades and fills, which no one can edit after the fact. The thoughts and the reasoning, posted to a public feed where other agents and people comment and vote. And the numbers: total return since the first fill, alpha against the S&amp;P 500 over the same window, Sharpe, Sortino, Calmar, drawdown recovery, expectancy per trade, and fees as a share of notional, eight rankings for the same record.</p>
<p>The loop closes on the owner’s side. ClawStreet keeps four versioned files for each agent: the owner’s prompt, the playbook the agent wrote to follow it, a lessons file the agent may only add to when its own record has proved something three times or more, and its schedule and limits. The owner reads the trades, leaves notes in a journal and can rate a single decision from one to five, rating the decision rather than the result. An agent can propose a change to its own prompt, and the owner accepts or rejects it with a reason. When a strategy changes, the agent is forked into a new version, so the old record stands and the new one starts clean.</p>`),
      { t: "scene", kind: "lanes", aspect: "16/8", aria: "Seven agents' equity curves in lanes against the index, each logging a lesson when it falls", cap: "Agents against the index. A fall costs a lesson, and the lesson travels with the agent into the next run." },
      html(`<p>Seasons gave the first agents a deadline. Season One ran for 45 days in spring 2026 with prizes from Massive; its winner placed 20 trades and did nothing for 37 of the 45 days. The site then moved to continuous play, because 45 days is too short to see a strategy through more than one kind of market. The leaderboard is a training reference, not a contest.</p>`),
      fig("claw-agent", "An agent’s page: the equity curve, the risk figures beside it, the thoughts it posted and the trades behind them.", "narrow", 5),
    ] },
    { id: "race", name: "Oracle versus Disruptor", blocks: [
      html(`<p>I gave one agent Buffett&rsquo;s rules and another Cathie Wood&rsquo;s. Same $100k. Same day. Opposite playbooks. Both run on live market data with no money at risk, and every trade and the reasoning behind it is public.</p>`),
      html(`<ul class="stats">
<li><b>+14.5%</b><span>Oracle, on Buffett&rsquo;s rules, after 19 weeks. It never dropped more than 0.5% below its starting $100k.</span></li>
<li><b>+4.8%</b><span>Disruptor, on Cathie Wood&rsquo;s rules. It was up 20.6% on 5 October and gave most of it back in four weeks.</span></li>
<li><b>+2.5%</b><span>the S&amp;P 500 over the same days, 23 June to 2 November 2026, price return only.</span></li>
<li><b>-8.4%</b><span>Disruptor&rsquo;s low, on 29 July, before the run that took it to the top.</span></li>
</ul>`),
      grid("clawstreet-3", "Oracle. Buffett’s rules.", "clawstreet-4", "Disruptor. Cathie Wood’s rules."),
      fig("clawstreet-2", "The scoreboard, published every Monday: Oracle, Disruptor and the S&P 500 from 23 June to 2 November 2026."),
    ] },
    { id: "design", name: "The design", blocks: [
      html(`<p>The site is built for two readers at once. People get a ticker, a leaderboard, agent pages and an activity view; agents get the same facts as JSON, markdown and a skill file. The design rules came out of watching the agents.</p>
<p>The ticker runs the symbols the agents are actually holding. The leaderboard shows each agent’s model and framework as a chip, so a reader can compare a model’s agents rather than one lucky run, and every figure carries its sample size and date. An agent page opens on the equity curve and the risk numbers, Sharpe, drawdown, win rate, profit factor, average hold, then its thoughts and its trades, so the reasoning sits next to the result it produced. The activity view shows what every agent did in the last day: the fills, the busiest symbol, where they agree and where they are on opposite sides of the same trade.</p>`),
      fig("clawstreet-5", "The ClawStreet dashboard: every agent against SPY."),
      grid("claw-board", "The leaderboard: every public agent ranked by return since its first trade, with its model and framework beside it.", "claw-activity", "Agent activity: every fill in the last day, the busiest symbol, and where agents took opposite sides."),
    ] },
    { id: "data", name: "What the platform records", blocks: [
      html(`<p>Every agent that discloses its model and framework becomes a data point. ClawStreet records, per trade, the symbol, side, size, limit, the written reason, and then the fill: price, bid and ask at fill, commission, slippage. Per agent it keeps the model, the framework, the strategy tags, every thought, the owner’s journal, the risk statistics and daily equity. Aggregated and shown on the site, that is a live record of how models and strategies trade on prices they have never seen: average return by model, the share of a model’s agents beating the S&amp;P 500, Sharpe and drawdown by model, the same by framework, and by strategy. On Nov 3, 2026, 58% of the agents that had traded were ahead of the S&amp;P 500 over their own window and 42% were in profit; momentum agents had a typical return of +0.01% and mean reversion agents of -1.00%; the busiest quarter of agents were down 1.94% and the quietest quarter up 0.04%.</p>
<p>The figures carry their caveats on the page: model and framework are self-disclosed, a model gets an average only when three or more of its agents have traded, and each agent’s window starts on its own first trade.</p>
<p class="pull">Every trade has a cost, so more trading has to earn more just to break even.</p>`),
    ] },
    { id: "lessons", name: "What the agents taught me", blocks: [
      html(`<p>I run agents of my own on the platform alongside everyone else’s, and the product changed under them.</p>
<p>An agent sent a bad registration, got back an error with a sample request, and sent the sample back as its own registration, name and all. The fix was one sentence in the error: the example shows format only, make up your own name, and sending it will fail. A trading agent asked for news on four stocks, got an empty response each time and reported no news; there was news, the docs had described the endpoint in one line and never shown a response. The fix was a real response in the docs and a sentence saying empty does not mean no news. An order with a limit price and no type was treated as a market order and filled above the limit the agent had named; thirteen filled that way across seven agents before the rule changed to reject anything ambiguous. A field the API quietly ignored looked, to an agent, exactly like a field it had saved. The rule now is that unknown fields fail loudly.</p>
<p>Then the behaviour itself. Fifteen agents bought the same stock on the first day of Season One, because they shared a signal, and the consensus trade is also the crowded trade. The agents that traded most were not the agents that returned most. An agent with a thousand dollars of cash asked to buy twenty-four thousand dollars of a stock, with its cash, positions and rules all in its prompt. One wrote a confident note about a profit on a fill that was a small loss. Nineteen of the first seventy-five agents never traded at all, because their owners claimed them and thought they were done.</p>
<p>None of those are bugs in a screen. They are the behaviour of a user who takes every word literally, never skims and never asks when confused. Designing for that user, the text in the errors, the shape of a response, what the API refuses, is the work. It is the same job it always was: take the technical thing and make it feel effortless.</p>
<p class="pull">Every product with an API now has two front doors, one for people and one for agents.</p>
<p>The longer version of what the first weeks taught is in <a href="${R.blog}/your-next-user-is-an-ai-agent">Your next user is an AI agent</a>.</p>`),
    ] },
  ],
};

export const NEXT_META: Record<string, [string, string, string]> = {
  hivemind: ["Hivemind Autonomy Platform", "Where engineers build, test and deploy AI pilots.", "Shield AI, 2025"],
  clawstreet: ["A training flywheel for AI financial agents", "Where AI agents learn to trade live US markets, scored in public.", "ClawStreet, 2026"],
  kraken: ["Asset trading for advanced traders", "Designing powerful tools for beginner to institutional traders.", "Kraken, $200B in volume"],
  boombox: ["Artist-first AI for musicians", "An AI music production platform that clears the tedious work.", "Boombox, 2024"],
  axure: ["Transformative redesign of Axure RP", "A ground-up redesign of Axure RP 10.", "Axure, 2017 to 2022"],
  crunchyroll: ["Crunchyroll video streaming", "Easy navigation and personalised discovery for anime fans.", "Crunchyroll, 2015 to 2017"],
  apple: ["Apple", "Visual design for key sections of the Apple website.", "Apple"],
  "paul-frank-industries": ["Paul Frank Industries", "A line of water bottles fans design themselves.", "Paul Frank"],
};

/** The work index, in order: key, title, client, year, image, blurb. */
export const WORK_LIST: { key: string; title: string; client: string; year: string; img: string }[] = [
  { key: "hivemind", title: "Hivemind Autonomy Platform", client: "Shield AI", year: "2025", img: "hm-1" },
  { key: "clawstreet", title: "A training flywheel for AI financial agents", client: "ClawStreet", year: "2026", img: "w-clawstreet" },
  { key: "kraken", title: "Asset trading for advanced traders", client: "Kraken", year: "2022", img: "kraken-1" },
  { key: "boombox", title: "Artist-first AI for musicians", client: "Boombox", year: "2024", img: "boombox-1" },
  { key: "axure", title: "Transformative redesign of Axure RP", client: "Axure", year: "2017 to 2022", img: "axure-1" },
  { key: "crunchyroll", title: "Crunchyroll video streaming", client: "Crunchyroll", year: "2015 to 2017", img: "crunchyroll-1" },
  { key: "apple", title: "Apple", client: "Apple", year: "", img: "apple-1" },
  { key: "paul-frank-industries", title: "Paul Frank Industries", client: "Paul Frank", year: "", img: "paulfrank-1" },
];

function unescape(s: string) {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&rsquo;/g, "’").replace(/&ldquo;/g, "“").replace(/&rdquo;/g, "”");
}

/** The case study as markdown, for the agent view: the same copy, no layout, the figures left out. */
export function caseMarkdown(c: CaseStudy): string {
  const md = ["# " + c.title, "", c.dek, ""];
  md.push(...c.facts.map(([a, b]) => `**${a}:** ${b}  `), "");
  for (const ch of c.chapters) {
    md.push("## " + ch.name, "");
    // a blank line after every paragraph, heading and list, so each stays its own paragraph as markdown
    const s = ch.blocks.filter((b): b is Extract<Block, { t: "html" }> => b.t === "html").map((b) => b.html).join("\n")
      .replace(/<\/(p|h3|ol|ul)>/g, "$&\n")
      .replace(/<h3>(.*?)<\/h3>/g, "**$1**")
      .replace(/<li><b>(.*?)<\/b><span>(.*?)<\/span><\/li>/g, "- $1 $2")
      .replace(/<[^>]+>/g, "");
    md.push(unescape(s).replace(/\n{3,}/g, "\n\n").trim(), "");
  }
  return md.join("\n");
}
