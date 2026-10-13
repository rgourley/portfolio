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
  cover?: "terminal" | "faces" | "alpha" | "proxies";
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
    cover: "terminal",
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
    cover: "faces",
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
    cover: "alpha",
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
    cover: "proxies",
  },
];

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return h >>> 0;
}

const FACE_BG = ["#f4a261", "#2a9d8f", "#e76f51", "#8ab4f8", "#e9c46a", "#b8a1e3"];
const SKIN = ["#f1c9a5", "#d9a077", "#b9805a", "#9a6342", "#f7dcc4"];

function Face({ name, size = 88 }: { name: string; size?: number | string }) {
  const h = hash(name);
  const bg = FACE_BG[h % FACE_BG.length];
  const skin = SKIN[(h >>> 3) % SKIN.length];
  const eye = 26 + ((h >>> 6) % 3) * 4;
  const mouth = (h >>> 9) % 3;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="100" height="100" fill={bg} />
      <rect x="22" y="70" width="56" height="40" rx="20" fill="#171717" opacity="0.85" />
      <rect x="28" y="18" width="44" height="54" rx="20" fill={skin} />
      <rect x="28" y="14" width="44" height={14 + ((h >>> 12) % 3) * 4} rx="10" fill="#171717" opacity="0.9" />
      <circle cx={50 - eye / 2.2} cy="46" r="3" fill="#171717" />
      <circle cx={50 + eye / 2.2} cy="46" r="3" fill="#171717" />
      {mouth === 0 && <rect x="42" y="60" width="16" height="3" rx="1.5" fill="#171717" />}
      {mouth === 1 && <path d="M40 59 Q50 68 60 59" stroke="#171717" strokeWidth="3" fill="none" strokeLinecap="round" />}
      {mouth === 2 && <circle cx="50" cy="61" r="4" fill="#171717" />}
    </svg>
  );
}

function FacesCover() {
  const names = ["Ada", "Grace", "Linus", "Margaret", "Alan", "Hedy", "Dennis", "Radia"];
  return (
    <div className="absolute inset-0 bg-[#0a0a0a]" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(2, 1fr)", gap: 1 }}>
      {names.map((n) => (
        <div key={n} className="overflow-hidden" style={{ minHeight: 0 }}>
          <Face name={n} size="100%" />
        </div>
      ))}
    </div>
  );
}

function AlphaCover() {
  const nodes = Array.from({ length: 28 }, (_, i) => {
    const h = hash("alpha" + i);
    return { x: 20 + (h % 360), y: 15 + ((h >>> 9) % 170), r: 2 + ((h >>> 4) % 4) };
  });
  return (
    <div className="absolute inset-0 bg-[#0a0a0a]">
      <svg viewBox="0 0 400 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {nodes.map((a, i) => {
          const b = nodes[(i * 7 + 3) % nodes.length];
          return <line key={"l" + i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#34d399" strokeOpacity="0.18" />;
        })}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={i % 5 === 0 ? "#34d399" : "#d1d1d1"} opacity={i % 5 === 0 ? 0.95 : 0.35} />
        ))}
        <polyline points="0,170 60,150 110,158 170,120 230,128 290,80 350,60 400,30" fill="none" stroke="#34d399" strokeWidth="2" />
      </svg>
    </div>
  );
}

function ProxiesCover() {
  const people = ["Design lead", "PM", "Engineer", "Customer"];
  return (
    <div className="absolute inset-0 bg-[#0a0a0a]" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 12, padding: 24 }}>
      {people.map((n, i) => (
        <div key={n} className="flex items-center gap-3">
          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
            <Face name={n} size={32} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{ height: 10, borderRadius: 9999, background: "rgba(209,209,209,0.2)", width: `${88 - i * 16}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TerminalCover() {
  return (
    <div className="absolute inset-0 bg-[#0a0a0a] p-6 font-mono text-[12px] leading-relaxed text-foreground/70">
      <div className="mb-4 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
      </div>
      <p><span className="text-emerald-400">❯</span> claude</p>
      <p className="text-foreground/50">&gt; review my book</p>
      <p className="mt-3 text-foreground/45">Pulling positions, factor exposure, risk…</p>
      <p className="text-foreground/45">✓ 14 holdings · beta 1.12 · top weight 18.4%</p>
      <p className="text-foreground/45">✓ source: /v2/aggs/ticker/NVDA/range</p>
    </div>
  );
}

function Cover({ p, priority }: { p: Project; priority?: boolean }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--muted)]">
      {p.image ? (
        <Image
          src={p.image}
          alt={p.imageAlt ?? ""}
          fill
          priority={priority}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <>
          {p.cover === "terminal" && <TerminalCover />}
          {p.cover === "faces" && <FacesCover />}
          {p.cover === "alpha" && <AlphaCover />}
          {p.cover === "proxies" && <ProxiesCover />}
        </>
      )}
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
