import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Games, open source tools, and experiments by Robert Gourley. Amphora, Git Kingdom, Quant Garage, and the Financial UI Suite.",
  openGraph: {
    title: "Projects | Robert Gourley",
    description:
      "Open source tools and libraries by Robert Gourley.",
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
};

const FEATURED: Project = {
  name: "Amphora",
  tagline: "Build a merchant dynasty.",
  blurb:
    "A Mediterranean trading simulation of shifting economies, generated cultures, and family dynasties. Trade from local markets to distant shores and build a trading house across generations.",
  meta: "Game · In development",
  href: "/amphora",
  cta: "Visit Amphora",
  image: "/amphora/assets/landing-harbor.webp",
  imageAlt: "A Mediterranean harbor from the game Amphora",
};

const PROJECTS: Project[] = [
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
    cta: "Read more",
    image: "/images/projects/quant-garage.webp",
    imageAlt: "The Quant Garage landing page with market-regime and earnings cards",
  },
  {
    name: "financial-ui-suite",
    tagline: "Financial UI that looks like the product it ships in.",
    blurb:
      "Two Claude Code skills, 17 reference docs, and 10 visual systems modeled on Bloomberg, TradingView, Kraken Pro, Robinhood, the FT, and more. Drops generic AI dashboards on the floor.",
    meta: "Claude Code plugin · React · Tailwind · MIT",
    href: "/projects/financial-ui-suite",
    cta: "Read more",
    image: "/images/projects/financial-ui-suite.webp",
    imageAlt: "A dark professional trading dashboard from the Financial UI Suite",
  },
  {
    name: "geofaces",
    tagline: "Same name, same face.",
    blurb:
      "Deterministic flat-geometric avatar faces. Generated as SVG from a name, with nothing to host.",
    meta: "TypeScript · SVG · Open source",
    href: "https://github.com/rgourley/geofaces",
    external: true,
    cta: "View on GitHub",
    image: "/images/projects/geofaces.webp",
    imageAlt: "A grid of flat geometric geofaces avatars",
  },
  {
    name: "smells-like-alpha",
    tagline: "Stock picks by fruit fly nose.",
    blurb:
      "A simulated fruit fly smell circuit that picks stocks by smell and paper-trades them on ClawStreet.",
    meta: "Python · Simulation · Open source",
    href: "https://github.com/rgourley/smells-like-alpha",
    external: true,
    cta: "View on GitHub",
    image: "/images/projects/smells-like-alpha.webp",
    imageAlt: "A simulated fruit fly standing on a candlestick chart",
  },
  {
    name: "proxies",
    tagline: "Simulated stakeholders for design review.",
    blurb:
      "Proxies review your flows, wireframes, and designs inside Claude Code, so feedback arrives before the meeting does.",
    meta: "TypeScript · Claude Code · Open source",
    href: "https://github.com/rgourley/proxies",
    external: true,
    cta: "View on GitHub",
    image: "/images/projects/proxies.webp",
    imageAlt: "A Proxies run showing six simulated stakeholders and ranked findings",
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
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/10" />
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
            Games, tools, and experiments. Each is used in real workflows before it goes public.
          </p>
        </div>

        <CardLink
          p={FEATURED}
          className="group mb-6 grid overflow-hidden rounded-2xl border border-foreground/10 bg-[color:var(--muted)] transition-colors hover:border-foreground/30 md:grid-cols-5"
        >
          <div className="md:col-span-3">
            <div className="relative aspect-[16/10] h-full min-h-[260px] md:aspect-auto">
              <Image
                src={FEATURED.image!}
                alt={FEATURED.imageAlt ?? ""}
                fill
                priority
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
          <div className="flex min-w-0 flex-col justify-center p-8 md:col-span-2 md:p-10">
            <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45">
              Featured · {FEATURED.meta}
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-[1.05] tracking-[-0.02em] mb-4">
              {FEATURED.name}
            </h2>
            <p className="text-lg text-foreground/85 mb-3">{FEATURED.tagline}</p>
            <p className="text-sm text-foreground/60 font-light leading-relaxed mb-8">
              {FEATURED.blurb}
            </p>
            <span className="inline-flex items-center gap-2 text-sm text-foreground/85">
              {FEATURED.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </CardLink>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <CardLink
              key={p.name}
              p={p}
              className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-[color:var(--muted)] transition-colors hover:border-foreground/30"
            >
              <Cover p={p} />
              <div className="flex flex-1 flex-col p-8">
                <div className="mb-5 flex items-center justify-between">
                  <div className="font-mono text-sm text-foreground/85">{p.name}</div>
                  <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-medium leading-[1.1] tracking-[-0.02em] mb-4">
                  {p.tagline}
                </h2>
                <p className="mb-6 flex-1 text-sm text-foreground/60 font-light leading-relaxed">
                  {p.blurb}
                </p>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45">
                  {p.meta}
                </div>
              </div>
            </CardLink>
          ))}
        </div>
      </div>
    </div>
  );
}
