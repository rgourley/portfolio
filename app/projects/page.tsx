import Link from "next/link";
import type { Metadata } from "next";
import Page from "@/components/Page";
import DotImage from "@/components/DotImage";
import StructuredData from "@/components/StructuredData";
import { pageSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { R } from "@/lib/links";

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  title: "Projects | Tools, Plugins and Experiments",
  description: "Tools, plugins, games and experiments by Robert Gourley: ClawStreet, Market City, Amphora, Git Kingdom, quant-garage, financial-ui-suite, geofaces, smells-like-alpha and Proxies.",
  openGraph: { title: "Projects | Tools, Plugins and Experiments", description: "Things I build outside work, mostly for agents and markets.", url: "/projects" },
};

const PROJ: { name: string; tag: string; blurb: string; meta: string; url: string; cta: string; img: string; w: number; h: number; internal?: boolean }[] = [
  { name: "ClawStreet", tag: "Training flywheel for financial agents.", blurb: "Train your AI trading agent on live US markets with paper money. Watch it fail, capture the lessons, iterate, and learn. Deploy into real markets once you are ready.", meta: "Product, live markets", url: "https://www.clawstreet.io", cta: "Visit ClawStreet", img: "/images/projects/clawstreet-dashboard-v2.webp", w: 1600, h: 914 },
  { name: "Market City", tag: "The stock market as a living 3D city.", blurb: "Each tower is one of the largest S&P 500 stocks, lit by how it is doing today. Weather follows volatility, traffic follows volume, and the music is generated live from the same Massive market data.", meta: "three.js, Tone.js, Massive API, open source", url: "https://www.robertcreative.com/city", cta: "Enter the city", img: "/images/projects/market-city.jpg", w: 1600, h: 900 },
  { name: "Amphora", tag: "Build a merchant dynasty.", blurb: "A Mediterranean trading simulation of shifting economies, generated cultures, and family dynasties. Trade from local markets to distant shores and build a trading house across generations.", meta: "Game, in development", url: "https://www.robertcreative.com/amphora", cta: "Play Amphora", img: "/images/projects/amphora-selis.webp", w: 1131, h: 825 },
  { name: "Git Kingdom", tag: "GitHub as a fantasy RPG world.", blurb: "Every language becomes a kingdom and every repo a building. Sign in with GitHub and your code joins a shared, procedurally generated pixel-art world.", meta: "Phaser, TypeScript, Vercel, AGPL", url: "https://gitkingdom.com", cta: "Visit Git Kingdom", img: "/images/projects/git-kingdom.webp", w: 1400, h: 863 },
  { name: "quant-garage", tag: "Analyst workflows as Claude skills.", blurb: "Forty-one Python tools and eight one-command workflows for equity research, sizing, and risk. Ask Claude or import the same function into a notebook. Every number cites the live API call it came from.", meta: "Python, Claude Code, Massive API, MIT", url: R["quant-garage"], cta: "Read about quant-garage", img: "/images/projects/quant-garage.webp", w: 1360, h: 850, internal: true },
  { name: "financial-ui-suite", tag: "Build complete financial UIs from a single prompt.", blurb: "Describe the product once and get a complete, production-grade interface. Two Claude Code skills, 17 reference docs, and 10 visual systems modeled on Bloomberg, TradingView, Kraken Pro, Robinhood, the FT, and more.", meta: "Claude Code plugin, React, Tailwind, MIT", url: R["financial-ui-suite"], cta: "Read about the suite", img: "/images/projects/massive-desk.webp", w: 1600, h: 906, internal: true },
  { name: "geofaces", tag: "Deterministic avatars for any project.", blurb: "Flat-geometric faces generated as SVG from any name or ID. Same name, same face, with zero dependencies and nothing to host.", meta: "TypeScript, SVG, open source", url: "https://github.com/rgourley/geofaces", cta: "See geofaces on GitHub", img: "/images/projects/geofaces.webp", w: 1200, h: 630 },
  { name: "smells-like-alpha", tag: "I hooked a fruit fly brain up to the stock market.", blurb: "A simulation of a real fruit fly brain smells the market and decides what to buy. It paper-trades $100,000 on ClawStreet, live.", meta: "Python, simulation, open source", url: "https://www.clawstreet.io/fly", cta: "Watch the fly", img: "/images/projects/fly-002.webp", w: 1600, h: 799 },
  { name: "proxies", tag: "Simulated stakeholders for concept review.", blurb: "Proxies review your concepts, flows, wireframes, and designs inside Claude Code, so feedback arrives before the meeting does.", meta: "TypeScript, Claude Code, open source", url: R.proxies, cta: "Visit Proxies", img: "/images/proxies/art-with-logo.webp", w: 1456, h: 816, internal: true },
];

export default function ProjectsPage() {
  const agent = `GET ${SITE_URL}/api/projects\n\n` + PROJ.map((p) => `- ${p.name}: ${p.tag} ${p.internal ? SITE_URL + p.url : p.url}`).join("\n");
  return (
    <Page agentTitle="Projects, as the agent sees it" agent={agent}>
      <StructuredData data={pageSchema({ type: "CollectionPage", path: "/projects", name: "Projects", description: "Tools, plugins and experiments by Robert Gourley.", extra: { mainEntity: { "@type": "ItemList", itemListElement: PROJ.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: p.internal ? SITE_URL + p.url : p.url, name: p.name })) } } })} />
      <header className="hd">
        <h1>Projects</h1>
        <div className="k"><span><b>9</b> projects</span><span>Tools, plugins, games and experiments</span></div>
        <p>Things I build outside work, mostly for agents and markets. Most are open source. All of them taught me something I used the next week.</p>
      </header>
      <div className="cards">
        {PROJ.map((p, i) => {
          const inner = (
            <>
              <DotImage src={p.img} w={p.w} h={p.h} cell={4} alt={p.name} className="same" aspect="16/10" priority={i === 0} sizes="(max-width: 760px) 100vw, 570px" />
              <div className="meta"><i>{p.name}</i> &nbsp; {p.meta}</div>
              <h3>{p.tag}</h3>
              <p>{p.blurb}</p>
              <span className="go">{p.cta} &rarr;</span>
            </>
          );
          return p.internal
            ? <Link key={p.name} className="card" href={p.url}>{inner}</Link>
            : <a key={p.name} className="card" href={p.url} target="_blank" rel="noopener">{inner}</a>;
        })}
      </div>
      <section className="sec">
        <h2><small>Also</small></h2>
        <ul className="links">
          <li><Link href={R.coaster}><span>Market Coaster</span>Ride a real stock chart as a 3D roller coaster</Link></li>
          <li><Link href={R["font-sizes"]}><span>Font size checker</span>Every font size, weight and line height on any page, one click</Link></li>
        </ul>
      </section>
    </Page>
  );
}
