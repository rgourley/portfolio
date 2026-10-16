import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  title: "Projects",
  description:
    "Games, open source tools, and experiments by Robert Gourley: ClawStreet, Amphora, Market City, Git Kingdom, Quant Garage, Financial UI Suite, Proxies, geofaces, and more.",
  openGraph: {
    images: ["/opengraph-image"],
    title: "Projects | Robert Gourley",
    description:
      "Games, open source tools, and experiments by Robert Gourley: ClawStreet, Amphora, Market City, Git Kingdom, Quant Garage, Proxies, and more.",
    url: "/projects",
    type: "website",
  },
};

type Project = {
  name: string;
  tagline: string;
  blurb: string;
  meta: string;
  href: string;
  external?: boolean;
  cta: string;
  image?: string;
  imageAlt?: string;
  position?: string;
};

const FEATURED: Project[] = [
  {
    name: "ClawStreet",
    tagline: "Training flywheel for financial agents.",
    blurb:
      "Train your AI trading agent on live US markets with paper money. Watch it fail, capture the lessons, iterate, and learn. Deploy into real markets once you are ready.",
    meta: "Product · Live markets",
    href: "https://www.clawstreet.io",
    external: true,
    cta: "Visit ClawStreet",
    image: "/images/projects/clawstreet-dashboard-v2.webp",
    imageAlt: "The ClawStreet dashboard comparing AI trading agents against SPY",
    position: "top left",
  },
  {
    name: "Market City",
    tagline: "The stock market as a living 3D city.",
    blurb:
      "Each tower is one of the largest S&P 500 stocks, lit by how it is doing today. Weather follows volatility, traffic follows volume, and the music is generated live from the same Massive market data.",
    meta: "three.js · Tone.js · Massive API · Open source",
    href: "/city",
    cta: "Visit the city",
    image: "/images/projects/market-city.jpg",
    imageAlt: "Market City in the Synthwave theme: neon towers in front of a striped sunset sun",
    position: "center",
  },
];

const PROJECTS: Project[] = [
  {
    name: "Amphora",
    tagline: "Build a merchant dynasty.",
    blurb:
      "A Mediterranean trading simulation of shifting economies, generated cultures, and family dynasties. Trade from local markets to distant shores and build a trading house across generations.",
    meta: "Game · In development",
    href: "/amphora",
    cta: "Visit Amphora",
    image: "/images/projects/amphora-selis.webp",
    imageAlt: "The port town of Selis in Amphora, with its workshops, sanctuary, and granary",
  },
  {
    name: "Git Kingdom",
    tagline: "GitHub as a fantasy RPG world.",
    blurb:
      "Every language becomes a kingdom and every repo a building. Sign in with GitHub and your code joins a shared, procedurally generated pixel-art world.",
    meta: "Phaser · TypeScript · Vercel · AGPL",
    href: "https://gitkingdom.com",
    external: true,
    cta: "Explore the world",
    image: "/images/projects/git-kingdom.webp",
    imageAlt: "The Git Kingdom world map",
  },
  {
    name: "quant-garage",
    tagline: "Analyst workflows as Claude skills.",
    blurb:
      "Forty-one Python tools and eight one-command workflows for equity research, sizing, and risk. Ask Claude or import the same function into a notebook. Every number cites the live API call it came from.",
    meta: "Python · Claude Code · Massive API · MIT",
    href: "/projects/quant-garage",
    cta: "Visit Quant Garage",
    image: "/images/projects/quant-garage.webp",
    imageAlt: "The Quant Garage landing page with market-regime and earnings cards",
  },
  {
    name: "financial-ui-suite",
    tagline: "Build complete financial UIs from a single prompt.",
    blurb:
      "Describe the product once and get a complete, production-grade interface. Two Claude Code skills, 17 reference docs, and 10 visual systems modeled on Bloomberg, TradingView, Kraken Pro, Robinhood, the FT, and more.",
    meta: "Claude Code plugin · React · Tailwind · MIT",
    href: "/projects/financial-ui-suite",
    cta: "Visit Financial UI Suite",
    image: "/images/projects/massive-desk.webp",
    imageAlt: "Massive Desk, a dark trading workspace built with the Financial UI Suite",
    position: "top",
  },
  {
    name: "geofaces",
    tagline: "Deterministic avatars for any project.",
    blurb:
      "Flat-geometric faces generated as SVG from any name or ID. Same name, same face, with zero dependencies and nothing to host.",
    meta: "TypeScript · SVG · Open source",
    href: "https://github.com/rgourley/geofaces",
    external: true,
    cta: "View on GitHub",
    image: "/images/projects/geofaces.webp",
    imageAlt: "A grid of flat geometric geofaces avatars",
  },
  {
    name: "smells-like-alpha",
    tagline: "I hooked a fruit fly brain up to the stock market.",
    blurb:
      "A simulation of a real fruit fly brain smells the market and decides what to buy. It paper-trades $100,000 on ClawStreet, live.",
    meta: "Python · Simulation · Open source",
    href: "https://www.clawstreet.io/fly",
    external: true,
    cta: "Watch the fly",
    image: "/images/projects/fly-002.webp",
    imageAlt: "A simulated fruit fly walking across candlesticks while its brain activity is shown",
  },
  {
    name: "proxies",
    tagline: "Simulated stakeholders for concept review.",
    blurb:
      "Proxies review your concepts, flows, wireframes, and designs inside Claude Code, so feedback arrives before the meeting does.",
    meta: "TypeScript · Claude Code · Open source",
    href: "/projects/proxies",
    cta: "Visit Proxies",
    image: "/images/proxies/art-with-logo.webp",
    imageAlt: "Proxies: flat mid-century illustration of people in red, teal and ochre sitting around an oval table",
    position: "top left",
  },
];

function Cover({ p, priority }: { p: Project; priority?: boolean }) {
  return (
    <div className="relative aspect-[40/21] overflow-hidden bg-[color:var(--muted)]">
      {p.image ? (
        <Image
          src={p.image}
          alt={p.imageAlt ?? ""}
          fill
          priority={priority}
          sizes="(min-width: 768px) 50vw, 100vw"
          style={p.position ? { objectPosition: p.position } : undefined}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border" />
    </div>
  );
}

function CardLink({
  p,
  className,
  children,
}: {
  p: Project;
  className: string;
  children: React.ReactNode;
}) {
  // /amphora is a static HTML page rewritten in next.config.js, so use a plain anchor.
  if (p.external || p.href === "/amphora") {
    return (
      <a
        href={p.href}
        className={className}
        {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={p.href} className={className}>
      {children}
    </Link>
  );
}

export default function ProjectsIndexPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="mb-14 max-w-3xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-6">
            Projects
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.0] tracking-[-0.02em] mb-6">
            The tools I wanted didn't exist.<br />So I built them.
          </h1>
          <p className="text-lg text-foreground/65 font-light leading-relaxed">
            Games, tools, and experiments.
          </p>
        </div>

        {FEATURED.map((f, i) => (
          <CardLink
            key={f.name}
            p={f}
            className="group mb-6 grid overflow-hidden rounded-2xl border border-border bg-[color:var(--muted)] transition-colors hover:border-grey-600 md:grid-cols-5"
          >
            <div className={`md:col-span-3 ${i % 2 ? "md:order-2" : ""}`}>
              <div className="relative aspect-[16/10] h-full min-h-[260px] md:aspect-auto">
                <Image
                  src={f.image!}
                  alt={f.imageAlt ?? ""}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 768px) 60vw, 100vw"
                  style={f.position ? { objectPosition: f.position } : undefined}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
            <div className="flex min-w-0 flex-col justify-center p-8 md:col-span-2 md:p-10">
              <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45">
                Featured · {f.meta}
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-medium leading-[1.05] tracking-[-0.02em] mb-4">
                {f.name}
              </h2>
              <p className="text-lg text-foreground/85 mb-3">{f.tagline}</p>
              <p className="text-sm text-foreground/60 font-light leading-relaxed mb-8">
                {f.blurb}
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-foreground/85">
                {f.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </CardLink>
        ))}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <CardLink
              key={p.name}
              p={p}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-[color:var(--muted)] transition-colors hover:border-grey-600"
            >
              <Cover p={p} />
              <div className="flex flex-1 flex-col p-8">
                <div className="mb-5 font-mono text-sm text-foreground/85">{p.name}</div>
                <h2 className="font-display text-2xl md:text-3xl font-medium leading-[1.1] tracking-[-0.02em] mb-4">
                  {p.tagline}
                </h2>
                <p className="mb-6 flex-1 text-sm text-foreground/60 font-light leading-relaxed">
                  {p.blurb}
                </p>
                <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45">
                  {p.meta}
                </div>
                <span className="inline-flex items-center gap-2 text-sm text-foreground/85">
                  {p.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </CardLink>
          ))}
        </div>
      </div>
    </div>
  );
}
