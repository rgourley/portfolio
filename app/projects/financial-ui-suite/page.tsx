import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import type { Metadata } from "next";
import { ArrowUpRight, Check, Github, Terminal } from "lucide-react";

const PAGE_PATH = "/projects/financial-ui-suite";
const PAGE_TITLE = "financial-ui-suite — Claude Code plugin for financial UI";
const PAGE_DESCRIPTION =
  "A Claude Code plugin with two skills, 17 correctness references, and 14 design styles modeled on Bloomberg, TradingView, Kraken Pro, Robinhood, FT, Yahoo Finance, and more. Stops the AI from shipping the same generic dashboard every time.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "financial UI",
    "trading UI",
    "Claude Code plugin",
    "Claude Code skill",
    "AI UI generation",
    "fintech design system",
    "Bloomberg terminal UI",
    "TradingView UI",
    "Kraken Pro UI",
    "Robinhood UI",
    "Yahoo Finance UI",
    "Coinbase Advanced UI",
    "FT design",
    "order book UI",
    "options chain UI",
    "portfolio UI",
    "React financial UI",
    "Tailwind trading UI",
    "AI agent design system",
    "tabular-nums",
    "financial number formatting",
    "Massive",
    "market data API",
    "Robert Gourley",
    "financial-ui-suite",
  ],
  authors: [{ name: "Robert Gourley", url: "https://github.com/rgourley" }],
  creator: "Robert Gourley",
  publisher: "Robert Gourley",
  category: "software",
  alternates: {
    canonical: PAGE_PATH,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Financial UI, 14 styles. No AI defaults.",
    description:
      "A Claude Code plugin that stops the AI from shipping generic financial UI. 14 design styles modeled on real products, 17 correctness references.",
    url: PAGE_PATH,
    siteName: "Robert Gourley",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial UI, 14 styles. No AI defaults.",
    description:
      "Claude Code plugin for shipping financial UI that looks like the product it runs in.",
    creator: "@rgourley",
  },
};

const GITHUB_URL = "https://github.com/rgourley/financial-ui-suite";
const MASSIVE_URL = "https://massive.com";
const MASSIVE_DOCS_URL = "https://massive.com/docs";

const PATTERNS = [
  { file: "typography-and-color", note: "Tokens, type scale, density, motion" },
  { file: "number-formatting", note: "Prices, qty, %, bps, currency" },
  { file: "components", note: "Tables, order books, tickers, pills" },
  { file: "streaming-and-state", note: "Sockets, tick flash, throttling" },
  { file: "accessibility", note: "Color blindness, keyboard, screen readers" },
  { file: "mobile-and-responsive", note: "Phone/tablet, bottom sheets" },
  { file: "industry-patterns", note: "Bloomberg, Kraken, FT conventions" },
  { file: "charts-and-candles", note: "OHLC, volume, indicators (base)" },
  { file: "loading-and-skeletons", note: "First-load + reconnect treatments" },
  { file: "empty-and-error-states", note: "Rejected, closed, rate-limit" },
  { file: "timestamps-and-timezones", note: "Trade times, \"as of\" stamps" },
  { file: "virtualization", note: "100+ streaming rows, trades tape" },
  { file: "chart-interactions", note: "Crosshair, zoom/pan, drawing tools" },
  {
    file: "order-entry-and-lifecycle",
    note: "Forms, preview, pending to filled",
  },
  { file: "alerts-and-disclosures", note: "Price alerts, PDT/wash-sale" },
  {
    file: "data-sources-and-freshness",
    note: "Real-time, delayed, stale",
  },
  { file: "heatmaps-and-density-viz", note: "Sector, options, IV surface" },
];

type StyleTokens = {
  bg: string;
  fg: string;
  fgMuted: string;
  border: string;
  up: string;
  down: string;
  accent: string;
  family: string;
  radius: string;
  density: "tight" | "compact" | "loose";
  weightBig: number;
  letterSpacingBig: string;
};

type Style = {
  slug: string;
  name: string;
  brands: string;
  swatch: [string, string, string];
  vibe: string;
  image?: string;
  tagStyle: string;
  tokens: StyleTokens;
};

const SANS = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const MONO = '"SF Mono", "IBM Plex Mono", Menlo, Consolas, monospace';
const SERIF = 'Georgia, "Times New Roman", serif';

const STYLES: Style[] = [
  {
    slug: "modern-pro-dark",
    name: "Modern Pro Dark",
    brands: "TradingView, Kraken Pro, Hyperliquid",
    swatch: ["#0b0f17", "#22c55e", "#ef4444"],
    vibe: "Cool charcoal, neon ladders, hairline grids",
    tagStyle: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
    tokens: {
      bg: "#0b0f17",
      fg: "#e5e7eb",
      fgMuted: "rgba(229,231,235,0.5)",
      border: "rgba(255,255,255,0.06)",
      up: "#22c55e",
      down: "#ef4444",
      accent: "#22d3ee",
      family: SANS,
      radius: "0",
      density: "tight",
      weightBig: 500,
      letterSpacingBig: "-0.02em",
    },
  },
  {
    slug: "pro-terminal",
    name: "Pro Terminal",
    brands: "Bloomberg, IBKR TWS, ThinkOrSwim",
    swatch: ["#0a0a0a", "#fbbf24", "#22c55e"],
    vibe: "Amber on black, monospaced, dense",
    tagStyle: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    tokens: {
      bg: "#0a0a0a",
      fg: "#fbbf24",
      fgMuted: "rgba(251,191,36,0.55)",
      border: "rgba(251,191,36,0.15)",
      up: "#22c55e",
      down: "#ef4444",
      accent: "#fbbf24",
      family: MONO,
      radius: "0",
      density: "tight",
      weightBig: 500,
      letterSpacingBig: "0",
    },
  },
  {
    slug: "tasty-pro",
    name: "Tasty Pro",
    brands: "TastyTrade",
    swatch: ["#0f1419", "#f97316", "#06b6d4"],
    vibe: "Options-first, BWB curves, big buttons",
    tagStyle: "bg-orange-500/10 text-orange-300 border border-orange-500/20",
    tokens: {
      bg: "#0f1419",
      fg: "#f8fafc",
      fgMuted: "rgba(248,250,252,0.55)",
      border: "rgba(255,255,255,0.08)",
      up: "#10b981",
      down: "#ef4444",
      accent: "#f97316",
      family: SANS,
      radius: "6px",
      density: "compact",
      weightBig: 700,
      letterSpacingBig: "-0.02em",
    },
  },
  {
    slug: "crypto-exchange",
    name: "Crypto Exchange",
    brands: "Coinbase Advanced, Binance, Bybit",
    swatch: ["#10121a", "#f0b90b", "#2ebd85"],
    vibe: "Saturated highlights, deep book, perp tabs",
    tagStyle: "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20",
    tokens: {
      bg: "#10121a",
      fg: "#f5f5f5",
      fgMuted: "rgba(245,245,245,0.5)",
      border: "rgba(255,255,255,0.06)",
      up: "#2ebd85",
      down: "#f6465d",
      accent: "#f0b90b",
      family: SANS,
      radius: "2px",
      density: "compact",
      weightBig: 600,
      letterSpacingBig: "-0.01em",
    },
  },
  {
    slug: "retail-polish-dark",
    name: "Retail Polish Dark",
    brands: "Robinhood, Public",
    swatch: ["#000000", "#00c805", "#ff5000"],
    vibe: "Friendly geometry, oversized type, soft motion",
    tagStyle: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    tokens: {
      bg: "#000000",
      fg: "#ffffff",
      fgMuted: "rgba(255,255,255,0.55)",
      border: "rgba(255,255,255,0.08)",
      up: "#00c805",
      down: "#ff5000",
      accent: "#00c805",
      family: SANS,
      radius: "16px",
      density: "loose",
      weightBig: 700,
      letterSpacingBig: "-0.03em",
    },
  },
  {
    slug: "retail-polish-light",
    name: "Retail Polish Light",
    brands: "Wise, Revolut, Cash App, Monzo",
    swatch: ["#f7f7f5", "#163300", "#9fe870"],
    vibe: "Bright off-white, rounded, lifestyle illustration",
    tagStyle: "bg-lime-500/10 text-lime-300 border border-lime-500/20",
    tokens: {
      bg: "#f7f7f5",
      fg: "#163300",
      fgMuted: "rgba(22,51,0,0.55)",
      border: "rgba(22,51,0,0.1)",
      up: "#163300",
      down: "#dc2626",
      accent: "#9fe870",
      family: SANS,
      radius: "16px",
      density: "loose",
      weightBig: 700,
      letterSpacingBig: "-0.02em",
    },
  },
  {
    slug: "editorial-financial",
    name: "Editorial Financial",
    brands: "FT, Bloomberg.com, WSJ",
    swatch: ["#fff1e5", "#0f172a", "#bb1a4f"],
    vibe: "Salmon paper, serif headlines, restrained chrome",
    tagStyle: "bg-rose-500/10 text-rose-300 border border-rose-500/20",
    tokens: {
      bg: "#fff1e5",
      fg: "#0f172a",
      fgMuted: "rgba(15,23,42,0.55)",
      border: "rgba(15,23,42,0.12)",
      up: "#14532d",
      down: "#bb1a4f",
      accent: "#bb1a4f",
      family: SERIF,
      radius: "0",
      density: "compact",
      weightBig: 700,
      letterSpacingBig: "-0.02em",
    },
  },
  {
    slug: "api-dashboard",
    name: "API Dashboard",
    brands: "Massive, Stripe, Vercel, Linear",
    swatch: ["#0a0a0a", "#ffffff", "#635bff"],
    vibe: "Crisp grids, gradient accents, doc-first",
    tagStyle: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
    tokens: {
      bg: "#0a0a0a",
      fg: "#f5f5f5",
      fgMuted: "rgba(255,255,255,0.5)",
      border: "rgba(255,255,255,0.08)",
      up: "#22c55e",
      down: "#ef4444",
      accent: "#635bff",
      family: SANS,
      radius: "8px",
      density: "compact",
      weightBig: 600,
      letterSpacingBig: "-0.02em",
    },
  },
  {
    slug: "defi-native",
    name: "DeFi Native",
    brands: "Uniswap, Jupiter, Aave, Phantom",
    swatch: ["#0b0a1a", "#ff007a", "#7d5cff"],
    vibe: "Glassy panes, hot-pink primaries, wallet chips",
    tagStyle: "bg-pink-500/10 text-pink-300 border border-pink-500/20",
    tokens: {
      bg: "#0b0a1a",
      fg: "#e9d5ff",
      fgMuted: "rgba(233,213,255,0.55)",
      border: "rgba(125,92,255,0.25)",
      up: "#ff007a",
      down: "#7d5cff",
      accent: "#ff007a",
      family: SANS,
      radius: "18px",
      density: "loose",
      weightBig: 700,
      letterSpacingBig: "-0.02em",
    },
  },
  {
    slug: "apple-native",
    name: "Apple Native",
    brands: "iOS Stocks, macOS widget",
    swatch: ["#000000", "#ffffff", "#fb2c36"],
    vibe: "SF Pro, exact whitespace, calm gain/loss",
    tagStyle: "bg-sky-500/10 text-sky-300 border border-sky-500/20",
    tokens: {
      bg: "#000000",
      fg: "#ffffff",
      fgMuted: "rgba(255,255,255,0.5)",
      border: "rgba(255,255,255,0.08)",
      up: "#34c759",
      down: "#fb2c36",
      accent: "#0a84ff",
      family: SANS,
      radius: "14px",
      density: "loose",
      weightBig: 600,
      letterSpacingBig: "-0.03em",
    },
  },
  {
    slug: "yahoo-prosumer",
    name: "Yahoo Prosumer",
    brands: "Yahoo Finance, Seeking Alpha, Investing.com",
    swatch: ["#ffffff", "#0f69ff", "#028a4e"],
    vibe: "White quote pages, tab strips, trending rail",
    tagStyle: "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20",
    tokens: {
      bg: "#ffffff",
      fg: "#151b24",
      fgMuted: "rgba(21,27,36,0.55)",
      border: "rgba(21,27,36,0.1)",
      up: "#028a4e",
      down: "#d81f2a",
      accent: "#0f69ff",
      family: SANS,
      radius: "8px",
      density: "compact",
      weightBig: 600,
      letterSpacingBig: "-0.02em",
    },
  },
  {
    slug: "alphaspace",
    name: "AlphaSpace",
    brands: "Yahoo Finance AlphaSpace, TradingView desktop",
    swatch: ["#0a0e16", "#52e077", "#ef4e4e"],
    vibe: "Slate panels, green accent, AI agent rail",
    tagStyle: "bg-green-500/10 text-green-300 border border-green-500/20",
    tokens: {
      bg: "#0a0e16",
      fg: "#e8edf6",
      fgMuted: "rgba(232,237,246,0.55)",
      border: "rgba(255,255,255,0.08)",
      up: "#26c87a",
      down: "#ef4e4e",
      accent: "#52e077",
      family: SANS,
      radius: "8px",
      density: "compact",
      weightBig: 600,
      letterSpacingBig: "-0.02em",
    },
  },
  {
    slug: "research-terminal",
    name: "Research Terminal",
    brands: "AlphaSense, Visible Alpha, FactSet, Tegus",
    swatch: ["#fcfcfd", "#083c8c", "#fde047"],
    vibe: "Document-first, yellow keyword hits, AI summaries",
    tagStyle: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
    tokens: {
      bg: "#fcfcfd",
      fg: "#151a26",
      fgMuted: "rgba(21,26,38,0.55)",
      border: "rgba(21,26,38,0.1)",
      up: "#0a8a4f",
      down: "#c82632",
      accent: "#083c8c",
      family: SANS,
      radius: "6px",
      density: "compact",
      weightBig: 600,
      letterSpacingBig: "-0.01em",
    },
  },
  {
    slug: "retro-tui",
    name: "Retro TUI",
    brands: "Gloomberb, lazygit, k9s, btop",
    swatch: ["#000000", "#cccccc", "#00cc66"],
    vibe: "Tiled mono panes, :: titles, optional CRT mode",
    tagStyle: "bg-neutral-500/10 text-neutral-300 border border-neutral-500/20",
    tokens: {
      bg: "#000000",
      fg: "#cccccc",
      fgMuted: "rgba(204,204,204,0.5)",
      border: "#333333",
      up: "#00cc66",
      down: "#ff3333",
      accent: "#ffffff",
      family: MONO,
      radius: "0",
      density: "tight",
      weightBig: 500,
      letterSpacingBig: "0",
    },
  },
];

const HERO_PREVIEW_STYLES = [
  "modern-pro-dark",
  "pro-terminal",
  "editorial-financial",
  "retail-polish-dark",
] as const;

type Trigger = {
  say: string;
  loads: string;
  loadStyle: string;
};

const TRIGGERS: Trigger[] = [
  {
    say: "build a portfolio holdings table",
    loads: "financial-ui-patterns",
    loadStyle: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
  },
  {
    say: "design an options chain in TradingView style",
    loads: "patterns + modern-pro-dark",
    loadStyle: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
  },
  {
    say: "make it look like Bloomberg terminal",
    loads: "pro-terminal",
    loadStyle: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
  },
  {
    say: "render an FT-style market wrap",
    loads: "editorial-financial",
    loadStyle: "bg-rose-500/10 text-rose-300 border border-rose-500/20",
  },
];

const ANTI_PATTERNS = [
  {
    bad: "text-emerald-400",
    why: "Raw color values instead of semantic up/down tokens.",
  },
  {
    bad: "price.toFixed(2)",
    why: "Breaks BTC (no decimals at $100K) and SHIB (needs eight).",
  },
  {
    bad: "bg-${color}-500/10",
    why: "Dynamic Tailwind classes silently dropped by JIT.",
  },
  {
    bad: "<td>{price}</td>",
    why: "No tabular-nums. Digits jitter on every tick.",
  },
  {
    bad: "ws.onmessage = render",
    why: "No throttle, no staleness, no reconnect indicator.",
  },
  {
    bad: "color === 'green' ? ↑ : ↓",
    why: "Red/green only fails 8% of male users.",
  },
];

export default function FinancialUISuitePage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.robertcreative.com";
  const pageUrl = `${siteUrl}${PAGE_PATH}`;
  const ogImageUrl = `${pageUrl}/opengraph-image`;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "financial-ui-suite",
    alternateName: "Financial UI Suite",
    description: PAGE_DESCRIPTION,
    url: pageUrl,
    image: ogImageUrl,
    codeRepository: GITHUB_URL,
    programmingLanguage: ["TypeScript", "React"],
    runtimePlatform: ["Claude Code"],
    license: "https://opensource.org/licenses/MIT",
    keywords: [
      "financial UI",
      "trading UI",
      "Claude Code plugin",
      "Bloomberg UI",
      "TradingView UI",
      "AI UI generation",
    ],
    author: {
      "@type": "Person",
      name: "Robert Gourley",
      url: siteUrl,
      worksFor: {
        "@type": "Organization",
        name: "Massive",
        url: MASSIVE_URL,
      },
      sameAs: [
        "https://github.com/rgourley",
        "https://www.linkedin.com/in/rob-gourley/",
      ],
    },
    maintainer: {
      "@type": "Person",
      name: "Robert Gourley",
      url: siteUrl,
    },
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteUrl}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "financial-ui-suite",
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="pt-24 pb-24">
      <Script
        id="ld-fui-software"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(softwareSchema)}
      </Script>
      <Script
        id="ld-fui-breadcrumb"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(breadcrumbSchema)}
      </Script>

      <Hero />
      <Composition />
      <AntiPatternsSection />
      <PatternsSection />
      <StylesSection />
      <TriggersSection />
      <InstallSection />
      <DataSection />
      <FinalCTA />
    </div>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1360px] mx-auto px-6 sm:px-12 lg:px-16">
      {children}
    </div>
  );
}

// The Massive M-symbol. The paths come from the official asset in
// massive-design-system. The symbol keeps its own blue tile in both themes.
function MassiveSymbol({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="200" height="200" rx="16" fill="#155DFC" />
      <path
        d="M38.0005 63.9961L38.0005 137.987L65.1901 137.987L65.1901 91.2559L86.5534 137.987L113.743 137.987L135.106 91.2559L135.106 137.987L162.296 137.987L162.296 63.9961L121.511 63.9961L100.148 110.727L78.7849 63.9961L38.0005 63.9961Z"
        fill="white"
      />
    </svg>
  );
}

function SectionEyebrow({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-8 text-[11px] uppercase tracking-[0.18em] text-foreground/45 font-mono">
      <span className="text-foreground/70">{number}</span>
      <span className="h-px w-8 bg-foreground/20" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

function BackdropGrid() {
  return (
    <div
      className="absolute inset-0 -z-10 pointer-events-none opacity-[0.07]"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 75%)",
      }}
    />
  );
}

function Hero() {
  const previewStyles = HERO_PREVIEW_STYLES.map(
    (slug) => STYLES.find((s) => s.slug === slug)!,
  );

  return (
    <section className="relative overflow-hidden border-b border-foreground/10 pb-20 pt-12">
      <BackdropGrid />
      <Container>
        <div className="relative mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--accent-cyan)]" />
            <span>open source · Claude Code plugin</span>
          </div>
          <h1 className="font-display font-black leading-[0.88] tracking-[-0.055em] text-6xl sm:text-7xl md:text-8xl lg:text-[128px]">
            <span className="block">Financial UI,</span>
            <span className="block">14 styles.</span>
            <span className="block">No AI defaults.</span>
          </h1>
        </div>

        <div className="relative grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-start">
          <div>
            <div className="max-w-2xl mb-10 space-y-4">
              <p className="text-lg md:text-xl text-foreground/70 font-normal leading-relaxed">
                A Claude Code plugin with two skills.{" "}
                <code className="font-mono text-foreground/90">
                  financial-ui-patterns
                </code>{" "}
                covers the correctness rules AI tools usually miss: tabular-nums, per-asset number formatting, streaming state, timezone-aware timestamps, and colorblind-safe up/down colors.{" "}
                <code className="font-mono text-foreground/90">
                  financial-ui-styles
                </code>{" "}
                picks one of 14 design styles, each modeled on a real trading product.
              </p>
              <p className="text-lg md:text-xl text-foreground/70 font-normal leading-relaxed">
                The skills load on their own whenever Claude touches prices, P&amp;L, order books, holdings, or streaming market data. No slash commands, no special syntax. Ask what you&apos;d ask a designer.
              </p>
              <p className="text-lg md:text-xl text-foreground/90 font-semibold leading-snug tracking-tight">
                Stops the AI from shipping the same dashboard every time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                <Github className="w-4 h-4" />
                View on GitHub
                <ArrowUpRight className="w-4 h-4 -mr-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#install"
                className="inline-flex items-center gap-2 border border-foreground/20 px-5 py-3 text-sm font-light text-foreground/80 hover:border-foreground/40 hover:text-foreground transition-colors"
              >
                <Terminal className="w-4 h-4" />
                Install
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/50">
              <span>
                <span className="text-foreground/90 mr-1.5 tabular-nums">2</span>
                skills
              </span>
              <span className="text-foreground/20">·</span>
              <span>
                <span className="text-foreground/90 mr-1.5 tabular-nums">17</span>
                references
              </span>
              <span className="text-foreground/20">·</span>
              <span>
                <span className="text-foreground/90 mr-1.5 tabular-nums">14</span>
                styles
              </span>
              <span className="text-foreground/20">·</span>
              <span>MIT</span>
              <span className="text-foreground/20">·</span>
              <a
                href={MASSIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
              >
                <MassiveSymbol className="h-3.5 w-3.5" />
                built for Massive
              </a>
            </div>
          </div>

          <HeroPreviewMosaic styles={previewStyles} />
        </div>
      </Container>
    </section>
  );
}

function HeroPreviewMosaic({ styles }: { styles: Style[] }) {
  return (
    <div className="relative flex flex-col gap-3">
      <TickerPageMock />
      <div className="grid grid-cols-2 gap-3">
        <OrderBookMock />
        <HoldingsMock />
      </div>
      <div className="mt-2 text-xs text-foreground/45 font-light text-center lg:text-right">
        Same data on three screens.
      </div>
    </div>
  );
}

function MockShell({
  slug,
  meta,
  dot,
  children,
}: {
  slug: string;
  meta?: string;
  dot: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a] text-[#d4d4d4]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
        <span className="flex items-center gap-2">
          <span
            className="inline-flex h-1.5 w-1.5 rounded-full"
            style={{ background: dot }}
          />
          {slug}
        </span>
        {meta && <span className="tabular-nums text-white/50">{meta}</span>}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

function TickerPageMock() {
  const bars = [12, 14, 11, 15, 17, 16, 19, 18, 21, 20, 23, 22, 25, 24, 27];
  const max = Math.max(...bars);
  const stats = [
    { label: "vol", value: "45.2M" },
    { label: "mkt cap", value: "$1.85T" },
    { label: "p/e", value: "72.3" },
    { label: "iv 30d", value: "34%" },
    { label: "52w hi", value: "$761" },
    { label: "beta", value: "1.68" },
  ];
  const tape = [
    { time: "09:31:22", price: "755.10", size: "120", side: "up" },
    { time: "09:31:18", price: "754.90", size: "200", side: "down" },
    { time: "09:31:15", price: "754.95", size: "350", side: "up" },
  ];
  return (
    <MockShell slug="ticker · NVDA" meta="09:31:22 EDT" dot="#22d3ee">
      <div className="grid grid-cols-[1.2fr_1fr] gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-end gap-3">
            <div className="font-mono text-2xl tabular-nums text-white leading-none">
              $754.95
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="font-mono text-[11px] text-emerald-400 tabular-nums leading-none">
                +$17.68
              </div>
              <div className="font-mono text-[11px] text-emerald-400 tabular-nums leading-none">
                +2.40%
              </div>
            </div>
          </div>
          <div className="flex items-end gap-[2px] h-10">
            {bars.map((b, i) => (
              <div
                key={i}
                className="flex-1 bg-[#22d3ee]/70"
                style={{ height: `${(b / max) * 100}%` }}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-x-2 gap-y-1 font-mono text-[10.5px]">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="text-white/40 uppercase tracking-[0.1em] text-[9.5px]">
                  {s.label}
                </span>
                <span className="text-white/90 tabular-nums">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1.5 border-l border-white/[0.06] pl-4">
          <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/40">
            trades tape
          </div>
          {tape.map((t, i) => (
            <div
              key={i}
              className="grid grid-cols-[auto_1fr_auto] gap-2 items-center font-mono text-[10.5px]"
            >
              <span className="text-white/40 tabular-nums">{t.time}</span>
              <span
                className={`tabular-nums text-right ${
                  t.side === "up" ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {t.price}
              </span>
              <span className="text-white/50 tabular-nums text-right w-8">
                {t.size}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

function OrderBookMock() {
  const asks = [
    { p: "755.30", s: "420" },
    { p: "755.20", s: "180" },
    { p: "755.10", s: "62" },
  ];
  const bids = [
    { p: "754.80", s: "155" },
    { p: "754.70", s: "310" },
    { p: "754.60", s: "540" },
  ];
  return (
    <MockShell slug="order-book" meta="NVDA" dot="#fbbf24">
      <div className="flex flex-col gap-0.5">
        {asks.map((r, i) => (
          <div
            key={`a${i}`}
            className="relative grid grid-cols-2 gap-2 font-mono text-[10.5px] px-1"
          >
            <div
              className="absolute inset-0 bg-rose-500/10"
              style={{ width: `${parseInt(r.s) / 6}%`, right: 0, left: "auto" }}
              aria-hidden="true"
            />
            <span className="text-rose-300 tabular-nums relative">{r.p}</span>
            <span className="text-white/60 tabular-nums text-right relative">
              {r.s}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between font-mono text-[10px] text-white/70 py-1 my-0.5 border-y border-white/[0.06] px-1">
          <span className="text-white/40">spread</span>
          <span className="tabular-nums">0.30</span>
        </div>
        {bids.map((r, i) => (
          <div
            key={`b${i}`}
            className="relative grid grid-cols-2 gap-2 font-mono text-[10.5px] px-1"
          >
            <div
              className="absolute inset-0 bg-emerald-500/10"
              style={{ width: `${parseInt(r.s) / 6}%`, left: 0 }}
              aria-hidden="true"
            />
            <span className="text-emerald-300 tabular-nums relative">
              {r.p}
            </span>
            <span className="text-white/60 tabular-nums text-right relative">
              {r.s}
            </span>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

function HoldingsMock() {
  const rows = [
    { t: "NVDA", pnl: "+2.4%", val: "$68.2K", side: "up" },
    { t: "AAPL", pnl: "+0.8%", val: "$41.5K", side: "up" },
    { t: "ALLO", pnl: "-1.9%", val: "$8.1K", side: "down" },
    { t: "MSFT", pnl: "+1.1%", val: "$29.4K", side: "up" },
    { t: "GOOGL", pnl: "-0.2%", val: "$22.0K", side: "down" },
  ];
  return (
    <MockShell slug="holdings" meta="5 positions" dot="#22c55e">
      <div className="flex flex-col gap-0.5">
        <div className="grid grid-cols-[1fr_auto_auto] gap-3 font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/40 pb-1 border-b border-white/[0.05]">
          <span>ticker</span>
          <span className="text-right">day p/l</span>
          <span className="text-right w-14">value</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.t}
            className="grid grid-cols-[1fr_auto_auto] gap-3 font-mono text-[10.5px] items-center py-0.5"
          >
            <span className="text-white/85">{r.t}</span>
            <span
              className={`tabular-nums text-right ${
                r.side === "up" ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {r.pnl}
            </span>
            <span className="text-white/70 tabular-nums text-right w-14">
              {r.val}
            </span>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

function Composition() {
  return (
    <section className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="01" label="How it composes" />
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              Two skills. One purpose.
            </h2>
            <p className="text-lg text-foreground/65 font-light leading-relaxed max-w-xl mb-6">
              <code className="font-mono text-foreground/90">
                financial-ui-patterns
              </code>{" "}
              always loads. It holds the correctness rules every serious trading product follows.{" "}
              <code className="font-mono text-foreground/90">
                financial-ui-styles
              </code>{" "}
              picks one of 14 design styles, so the result doesn&apos;t look like every other AI dashboard.
            </p>
            <p className="text-sm text-foreground/55 font-light leading-relaxed max-w-xl">
              Patterns load every time. One style per product. Combine them in plain English: &quot;build an options chain in TradingView style.&quot;
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 font-mono text-[13px] leading-relaxed">
            <div className="text-foreground/40 mb-3">$ tree skills/</div>
            <div className="text-foreground/85">
              <div>
                <span className="text-foreground/40">├─</span>{" "}
                <span className="text-[color:var(--accent-cyan)]">
                  financial-ui-patterns
                </span>
                <span className="text-foreground/40">
                  {"  // correctness, always on"}
                </span>
              </div>
              <div>
                <span className="text-foreground/40">└─</span>{" "}
                <span className="text-[color:var(--accent-cyan)]">
                  financial-ui-styles
                </span>
                <span className="text-foreground/40">
                  {"     // pick exactly one"}
                </span>
              </div>
              <div className="text-foreground/40 mt-4">
                {"# loads on its own when the agent sees:"}
              </div>
              <div className="text-foreground/70">
                {"# prices, P&L, order books, holdings, charts, ticks, watchlists"}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function AntiPatternsSection() {
  return (
    <section className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="02" label="What it prevents" />
        <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-4 max-w-3xl">
          Six bugs Claude writes on its own.
        </h2>
        <p className="text-lg text-foreground/65 font-light leading-relaxed max-w-2xl mb-12">
          Ask Claude for a trading UI without the plugin and it writes every line below. Each one breaks something real users see.
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {ANTI_PATTERNS.map((p) => (
            <div
              key={p.bad}
              className="group bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-xl p-6 md:p-7 flex flex-col gap-3 transition-colors"
            >
              <div className="flex items-center gap-2 font-mono text-sm">
                <span className="text-rose-400/80">✖</span>
                <span className="text-rose-300">{p.bad}</span>
              </div>
              <div className="text-sm text-foreground/60 font-light leading-relaxed pl-6">
                {p.why}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PatternsSection() {
  return (
    <section className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="03" label="financial-ui-patterns" />
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-4">
              17 references for the parts AI tools miss.
            </h2>
            <p className="text-lg text-foreground/65 font-light leading-relaxed">
              Pulled from how Bloomberg, Kraken, TradingView, Coinbase, FT, Robinhood, and TastyTrade actually ship. Not opinion. Conventions.
            </p>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
            skills/financial-ui-patterns/references/
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {PATTERNS.map((p, i) => (
            <div
              key={p.file}
              className="group bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-xl p-5 flex flex-col gap-2 min-h-[130px] transition-colors"
            >
              <div className="flex items-center gap-3 text-[11px] font-mono text-foreground/40">
                <span className="tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-foreground/[0.08]" />
              </div>
              <div className="font-mono text-sm text-foreground/95">
                {p.file}.md
              </div>
              <div className="text-xs text-foreground/55 font-light leading-relaxed">
                {p.note}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function StylesSection() {
  const featuredSlugs = new Set([
    "modern-pro-dark",
    "pro-terminal",
    "retail-polish-dark",
    "editorial-financial",
  ]);
  const featured = STYLES.filter((s) => featuredSlugs.has(s.slug));
  const rest = STYLES.filter((s) => !featuredSlugs.has(s.slug));

  return (
    <section id="styles" className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="04" label="financial-ui-styles" />
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-4">
              Every style is modeled on a real product.
            </h2>
            <p className="text-lg text-foreground/65 font-light leading-relaxed">
              Four featured styles rendered as full product screens on the same NVDA ticker. Ten more ship in the plugin as complete reference sets.
            </p>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
            skills/financial-ui-styles/references/
          </div>
        </div>

        <div className="flex flex-col gap-6 mb-16">
          {featured.map((s) => (
            <FullScreenMock key={s.slug} style={s} />
          ))}
        </div>

        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-4">
          Ten more in the plugin
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-3">
          {rest.map((s) => (
            <StyleCallout key={s.slug} style={s} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function StyleCallout({ style }: { style: Style }) {
  return (
    <div className="group bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-xl p-5 flex flex-col gap-4 transition-colors">
      <div
        className="flex h-9 rounded-md overflow-hidden border border-white/[0.08]"
        aria-hidden="true"
      >
        {style.swatch.map((c, i) => (
          <div key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span
          className={`font-mono text-[10.5px] uppercase tracking-[0.16em] rounded-md px-2 py-0.5 leading-tight self-start ${style.tagStyle}`}
        >
          {style.slug}
        </span>
        <div>
          <div className="font-display text-base font-bold tracking-tight mb-0.5">
            {style.name}
          </div>
          <div className="text-xs text-foreground/55 font-light leading-relaxed">
            {style.brands}
          </div>
        </div>
        <div className="text-xs text-foreground/50 font-light leading-relaxed">
          {style.vibe}
        </div>
      </div>
    </div>
  );
}

function FullScreenMock({ style }: { style: Style }) {
  return (
    <div className="group rounded-xl overflow-hidden border border-white/[0.08]">
      <div style={{ background: style.tokens.bg }}>
        {style.slug === "modern-pro-dark" && (
          <ModernProFullScreen tokens={style.tokens} />
        )}
        {style.slug === "pro-terminal" && (
          <ProTerminalFullScreen tokens={style.tokens} />
        )}
        {style.slug === "retail-polish-dark" && (
          <RobinhoodFullScreen tokens={style.tokens} />
        )}
        {style.slug === "editorial-financial" && (
          <FTFullScreen tokens={style.tokens} />
        )}
      </div>
      <div className="flex items-center justify-between gap-6 px-6 py-4 border-t border-white/[0.05] bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <span
            className={`font-mono text-[11px] uppercase tracking-[0.18em] rounded-md px-2 py-0.5 leading-tight ${style.tagStyle}`}
          >
            {style.slug}
          </span>
          <div>
            <div className="font-display text-base font-bold tracking-tight leading-tight">
              {style.name}
            </div>
            <div className="text-xs text-foreground/55 font-light">
              {style.brands}
            </div>
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          {style.swatch.map((c, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-sm border border-white/10"
              style={{ background: c }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ModernProFullScreen({ tokens }: { tokens: StyleTokens }) {
  const candles = Array.from({ length: 36 }, (_, i) => {
    const base = 720 + i * 1.2 + Math.sin(i * 0.7) * 6;
    const o = base + (i % 3 === 0 ? -2 : 3);
    const c = base + (i % 5 === 0 ? -3 : 4);
    const h = Math.max(o, c) + 3;
    const l = Math.min(o, c) - 3;
    return { o, c, h, l, up: c >= o };
  });
  const minP = Math.min(...candles.map((c) => c.l)) - 4;
  const maxP = Math.max(...candles.map((c) => c.h)) + 4;
  const range = maxP - minP;
  const y = (v: number) => 100 - ((v - minP) / range) * 100;
  const cW = 100 / candles.length;
  const watchlist = [
    { t: "NVDA", p: "754.95", c: "+2.40", up: true },
    { t: "TSLA", p: "412.30", c: "-1.12", up: false },
    { t: "SPY", p: "612.44", c: "+0.35", up: true },
    { t: "AAPL", p: "231.10", c: "+0.88", up: true },
    { t: "MSFT", p: "451.20", c: "-0.24", up: false },
    { t: "AMZN", p: "228.75", c: "+1.55", up: true },
  ];

  return (
    <div
      style={{
        fontFamily: tokens.family,
        color: tokens.fg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: `1px solid ${tokens.border}`,
          fontSize: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: tokens.accent,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: 2,
                background: tokens.accent,
              }}
            />
            proview
          </span>
          <span style={{ color: tokens.fgMuted }}>Markets</span>
          <span style={{ color: tokens.fgMuted }}>Screener</span>
          <span style={{ color: tokens.fgMuted }}>Ideas</span>
          <span style={{ color: tokens.fgMuted }}>Alerts</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              padding: "4px 12px",
              border: `1px solid ${tokens.border}`,
              borderRadius: 4,
              fontSize: 11,
              color: tokens.fgMuted,
            }}
          >
            Search symbol...
          </span>
          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: 999,
              background: tokens.accent,
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", height: 340 }}>
        <div
          style={{
            width: 180,
            borderRight: `1px solid ${tokens.border}`,
            padding: "12px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: tokens.fgMuted,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 4,
            }}
          >
            Watchlist
          </div>
          {watchlist.map((w) => (
            <div
              key={w.t}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                columnGap: 6,
                rowGap: 1,
                fontSize: 11,
                padding: "4px 6px",
                borderRadius: 3,
                background:
                  w.t === "NVDA" ? "rgba(34,211,238,0.08)" : "transparent",
              }}
            >
              <span style={{ color: tokens.fg, fontWeight: 600 }}>{w.t}</span>
              <span
                style={{
                  color: tokens.fg,
                  fontFeatureSettings: '"tnum" 1',
                  textAlign: "right",
                }}
              >
                {w.p}
              </span>
              <span></span>
              <span
                style={{
                  color: w.up ? tokens.up : tokens.down,
                  fontSize: 10,
                  fontFeatureSettings: '"tnum" 1',
                  textAlign: "right",
                }}
              >
                {w.c}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "12px 20px",
              borderBottom: `1px solid ${tokens.border}`,
              display: "flex",
              alignItems: "baseline",
              gap: 20,
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              NVDA{" "}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 400,
                  color: tokens.fgMuted,
                  letterSpacing: 0,
                }}
              >
                NVIDIA · NASDAQ
              </span>
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 500,
                fontFeatureSettings: '"tnum" 1',
                letterSpacing: "-0.02em",
              }}
            >
              754.95
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
                color: tokens.up,
                fontSize: 12,
                fontFeatureSettings: '"tnum" 1',
              }}
            >
              <span>+17.68</span>
              <span>+2.40%</span>
            </div>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: 6,
                fontSize: 10,
              }}
            >
              {["1m", "5m", "15m", "1h", "4h", "1D", "1W"].map((tf) => (
                <span
                  key={tf}
                  style={{
                    padding: "3px 8px",
                    border: `1px solid ${tokens.border}`,
                    borderRadius: 3,
                    color: tf === "1h" ? tokens.accent : tokens.fgMuted,
                    borderColor: tf === "1h" ? tokens.accent : tokens.border,
                  }}
                >
                  {tf}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              flex: 1,
              padding: "12px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ position: "relative", height: 220 }}>
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                style={{ width: "100%", height: "100%", display: "block" }}
              >
                {[0, 25, 50, 75, 100].map((pct) => (
                  <line
                    key={pct}
                    x1="0"
                    x2="100"
                    y1={pct}
                    y2={pct}
                    stroke={tokens.border}
                    strokeWidth="0.15"
                  />
                ))}
                {candles.map((c, i) => (
                  <g key={i}>
                    <line
                      x1={i * cW + cW / 2}
                      x2={i * cW + cW / 2}
                      y1={y(c.h)}
                      y2={y(c.l)}
                      stroke={c.up ? tokens.up : tokens.down}
                      strokeWidth="0.15"
                    />
                    <rect
                      x={i * cW + 0.2}
                      y={y(Math.max(c.o, c.c))}
                      width={cW - 0.4}
                      height={Math.max(
                        0.5,
                        y(Math.min(c.o, c.c)) - y(Math.max(c.o, c.c)),
                      )}
                      fill={c.up ? tokens.up : tokens.down}
                    />
                  </g>
                ))}
              </svg>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                height: 30,
                gap: 2,
              }}
            >
              {candles.map((c, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${20 + (i % 7) * 8}%`,
                    background: c.up ? `${tokens.up}66` : `${tokens.down}66`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            width: 200,
            borderLeft: `1px solid ${tokens.border}`,
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontSize: 11,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: tokens.fgMuted,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Key stats
          </div>
          {[
            ["Open", "738.20"],
            ["Prev close", "737.27"],
            ["Day range", "733.10 – 761.15"],
            ["52w range", "512.20 – 761.15"],
            ["Volume", "45.2M"],
            ["Avg volume", "38.4M"],
            ["Market cap", "$1.85T"],
            ["P/E", "72.3"],
            ["Beta", "1.68"],
          ].map((row) => (
            <div
              key={row[0]}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFeatureSettings: '"tnum" 1',
              }}
            >
              <span style={{ color: tokens.fgMuted }}>{row[0]}</span>
              <span style={{ color: tokens.fg }}>{row[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProTerminalFullScreen({ tokens }: { tokens: StyleTokens }) {
  const bidAskRows = [
    { bs: "8,420", bp: "754.80", ap: "754.95", as: "1,205" },
    { bs: "12,510", bp: "754.70", ap: "755.00", as: "3,860" },
    { bs: "6,285", bp: "754.60", ap: "755.10", as: "9,120" },
    { bs: "18,420", bp: "754.50", ap: "755.20", as: "5,308" },
    { bs: "4,110", bp: "754.40", ap: "755.30", as: "2,940" },
  ];
  const tape = [
    { t: "09:31:22.418", p: "754.95", s: "120", side: "B" },
    { t: "09:31:22.271", p: "754.90", s: "200", side: "S" },
    { t: "09:31:22.104", p: "754.95", s: "350", side: "B" },
    { t: "09:31:21.860", p: "754.85", s: "1000", side: "S" },
    { t: "09:31:21.622", p: "754.95", s: "60", side: "B" },
    { t: "09:31:21.401", p: "754.90", s: "180", side: "S" },
  ];
  const news = [
    { t: "09:22", h: "NVDA UPGRADED AT MS: PT RAISED TO 820 FROM 760" },
    { t: "08:15", h: "TSMC CONFIRMS BLACKWELL YIELDS AHEAD OF SCHEDULE" },
    { t: "07:44", h: "NVIDIA H100 PRICING FIRM AS HYPERSCALERS RENEW" },
    { t: "07:12", h: "MEG WHITMAN JOINS NVIDIA ADVISORY BOARD" },
  ];

  const cellStyle = {
    fontFeatureSettings: '"tnum" 1',
    fontFamily: MONO,
  };

  return (
    <div
      style={{
        fontFamily: MONO,
        color: tokens.fg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          borderBottom: `1px solid ${tokens.border}`,
          fontSize: 11,
          letterSpacing: "0.08em",
        }}
      >
        <span style={{ color: tokens.fg, fontWeight: 700 }}>
          NVDA US EQUITY&nbsp;&nbsp;&nbsp;DES&nbsp;&nbsp;<span style={{ color: tokens.fgMuted }}>&lt;GO&gt;</span>
        </span>
        <span style={{ color: tokens.fgMuted }}>09:31:22 EDT · MKT OPEN</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        <div
          style={{
            padding: "10px 14px",
            borderRight: `1px solid ${tokens.border}`,
            borderBottom: `1px solid ${tokens.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: tokens.accent,
              letterSpacing: "0.14em",
              fontWeight: 600,
            }}
          >
            ORDER BOOK · L2
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              fontSize: 10,
              color: tokens.fgMuted,
              letterSpacing: "0.1em",
            }}
          >
            <span>BSIZE</span>
            <span>BID</span>
            <span style={{ textAlign: "right" }}>ASK</span>
            <span style={{ textAlign: "right" }}>ASIZE</span>
          </div>
          {bidAskRows.map((r, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                fontSize: 11,
                ...cellStyle,
              }}
            >
              <span style={{ color: tokens.fgMuted }}>{r.bs}</span>
              <span style={{ color: tokens.up }}>{r.bp}</span>
              <span style={{ textAlign: "right", color: tokens.down }}>
                {r.ap}
              </span>
              <span style={{ textAlign: "right", color: tokens.fgMuted }}>
                {r.as}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "10px 14px",
            borderBottom: `1px solid ${tokens.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: tokens.accent,
              letterSpacing: "0.14em",
              fontWeight: 600,
            }}
          >
            TAPE · LAST 6
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto auto",
              fontSize: 10,
              color: tokens.fgMuted,
              letterSpacing: "0.1em",
              columnGap: 10,
            }}
          >
            <span>TIME</span>
            <span>PRICE</span>
            <span>SIZE</span>
            <span>SIDE</span>
          </div>
          {tape.map((r, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto auto",
                fontSize: 11,
                columnGap: 10,
                ...cellStyle,
              }}
            >
              <span style={{ color: tokens.fgMuted }}>{r.t}</span>
              <span style={{ color: tokens.fg }}>{r.p}</span>
              <span style={{ color: tokens.fgMuted, textAlign: "right" }}>
                {r.s}
              </span>
              <span
                style={{
                  color: r.side === "B" ? tokens.up : tokens.down,
                  fontWeight: 700,
                }}
              >
                {r.side}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "10px 14px",
            borderRight: `1px solid ${tokens.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: tokens.accent,
              letterSpacing: "0.14em",
              fontWeight: 600,
            }}
          >
            KEY STATS
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto 1fr",
              fontSize: 11,
              columnGap: 10,
              rowGap: 3,
              ...cellStyle,
            }}
          >
            {[
              ["LAST", "754.95", "CHG", "+17.68"],
              ["OPEN", "738.20", "PCLS", "737.27"],
              ["HIGH", "761.15", "LOW", "733.10"],
              ["VOL", "45.2M", "AVG", "38.4M"],
              ["MKT", "1.85T", "P/E", "72.3"],
              ["BID", "754.80", "ASK", "754.95"],
              ["EPS", "3.42", "DIV", "0.04"],
            ].map((row, i) => (
              <div key={i} style={{ display: "contents" }}>
                <span style={{ color: tokens.fgMuted }}>{row[0]}</span>
                <span
                  style={{
                    color: tokens.fg,
                    textAlign: "right",
                    paddingRight: 8,
                  }}
                >
                  {row[1]}
                </span>
                <span style={{ color: tokens.fgMuted }}>{row[2]}</span>
                <span
                  style={{
                    color: row[2] === "CHG" ? tokens.up : tokens.fg,
                    textAlign: "right",
                  }}
                >
                  {row[3]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: "10px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: tokens.accent,
              letterSpacing: "0.14em",
              fontWeight: 600,
            }}
          >
            NEWS · N&lt;GO&gt;
          </div>
          {news.map((n, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                columnGap: 10,
                fontSize: 10.5,
                letterSpacing: "0.05em",
                ...cellStyle,
              }}
            >
              <span style={{ color: tokens.fgMuted }}>{n.t}</span>
              <span style={{ color: tokens.fg }}>{n.h}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 4,
          padding: "8px 14px",
          borderTop: `1px solid ${tokens.border}`,
          fontSize: 10,
          letterSpacing: "0.08em",
        }}
      >
        {[
          "1<HELP>",
          "2<CANCEL>",
          "GP<GO>",
          "N<GO>",
          "MO<GO>",
          "OMON<GO>",
        ].map((k) => (
          <span
            key={k}
            style={{
              padding: "2px 8px",
              border: `1px solid ${tokens.border}`,
              color: tokens.fgMuted,
            }}
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

function RobinhoodFullScreen({ tokens }: { tokens: StyleTokens }) {
  const news = [
    {
      src: "Reuters",
      time: "1h",
      h: "Nvidia climbs as AI demand outpaces Street forecasts",
    },
    {
      src: "The Verge",
      time: "3h",
      h: "TSMC confirms Blackwell yields ahead of schedule",
    },
    {
      src: "Bloomberg",
      time: "5h",
      h: "Morgan Stanley raises NVDA price target to $820",
    },
  ];
  return (
    <div
      style={{
        fontFamily: tokens.family,
        color: tokens.fg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 24px",
          borderBottom: `1px solid ${tokens.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: tokens.up,
            }}
          >
            hood
          </span>
          <span style={{ fontSize: 13, color: tokens.fgMuted }}>Investing</span>
          <span style={{ fontSize: 13, color: tokens.fg, fontWeight: 600 }}>
            Stocks
          </span>
          <span style={{ fontSize: 13, color: tokens.fgMuted }}>Options</span>
          <span style={{ fontSize: 13, color: tokens.fgMuted }}>Crypto</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.05)",
              fontSize: 12,
              color: tokens.fgMuted,
            }}
          >
            Search
          </span>
          <span
            style={{
              display: "inline-block",
              width: 32,
              height: 32,
              borderRadius: 999,
              background: tokens.up,
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: 0,
        }}
      >
        <div
          style={{
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            borderRight: `1px solid ${tokens.border}`,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: tokens.fgMuted,
              letterSpacing: "0.02em",
            }}
          >
            NVIDIA Corporation · NVDA
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              fontFeatureSettings: '"tnum" 1',
              lineHeight: 1,
            }}
          >
            $754.95
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: tokens.up,
              fontSize: 14,
              fontWeight: 600,
              fontFeatureSettings: '"tnum" 1',
            }}
          >
            <span>▲</span>
            <span>$17.68 (+2.40%)</span>
            <span style={{ color: tokens.fgMuted, fontWeight: 400 }}>
              Today
            </span>
          </div>

          <svg
            viewBox="0 0 400 120"
            style={{ width: "100%", height: 140 }}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="rh-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={tokens.up} stopOpacity="0.24" />
                <stop offset="100%" stopColor={tokens.up} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 105 L 24 100 L 48 96 L 72 92 L 96 87 L 120 82 L 144 78 L 168 73 L 192 69 L 216 63 L 240 55 L 264 48 L 288 40 L 312 31 L 336 24 L 360 18 L 384 12 L 400 8 L 400 120 L 0 120 Z"
              fill="url(#rh-fill)"
            />
            <path
              d="M 0 105 L 24 100 L 48 96 L 72 92 L 96 87 L 120 82 L 144 78 L 168 73 L 192 69 L 216 63 L 240 55 L 264 48 L 288 40 L 312 31 L 336 24 L 360 18 L 384 12 L 400 8"
              fill="none"
              stroke={tokens.up}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div
            style={{
              display: "flex",
              gap: 6,
              fontSize: 11,
              color: tokens.fgMuted,
            }}
          >
            {["1D", "1W", "1M", "3M", "YTD", "1Y", "5Y"].map((tf) => (
              <span
                key={tf}
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  color: tf === "1D" ? "#000" : tokens.fgMuted,
                  background: tf === "1D" ? tokens.up : "transparent",
                  fontWeight: tf === "1D" ? 700 : 400,
                }}
              >
                {tf}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                padding: "14px 0",
                borderRadius: 999,
                background: tokens.up,
                color: "#000",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Buy
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                padding: "14px 0",
                borderRadius: 999,
                border: `1.5px solid ${tokens.fg}`,
                color: tokens.fg,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Sell
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700 }}>Your position</div>
            <div
              style={{
                padding: 14,
                borderRadius: 16,
                background: "rgba(255,255,255,0.04)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                rowGap: 8,
                columnGap: 12,
                fontSize: 12,
              }}
            >
              <span style={{ color: tokens.fgMuted }}>Shares</span>
              <span
                style={{
                  textAlign: "right",
                  fontFeatureSettings: '"tnum" 1',
                }}
              >
                24
              </span>
              <span style={{ color: tokens.fgMuted }}>Equity</span>
              <span
                style={{
                  textAlign: "right",
                  fontFeatureSettings: '"tnum" 1',
                }}
              >
                $18,118.80
              </span>
              <span style={{ color: tokens.fgMuted }}>Today's return</span>
              <span
                style={{
                  textAlign: "right",
                  color: tokens.up,
                  fontFeatureSettings: '"tnum" 1',
                }}
              >
                +$424.32
              </span>
              <span style={{ color: tokens.fgMuted }}>Total return</span>
              <span
                style={{
                  textAlign: "right",
                  color: tokens.up,
                  fontFeatureSettings: '"tnum" 1',
                }}
              >
                +$6,208.12
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700 }}>News</div>
            {news.map((n, i) => (
              <div
                key={i}
                style={{
                  padding: 12,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: tokens.fgMuted,
                    letterSpacing: "0.04em",
                  }}
                >
                  {n.src} · {n.time}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{n.h}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FTFullScreen({ tokens }: { tokens: StyleTokens }) {
  const related = [
    "AI vendor lock-in worries loom as GPU premium widens",
    "TSMC yield report lifts semiconductor supply optimism",
    "How the ‘AI hyperscaler’ trade reshapes S&P weightings",
    "Q4 revenue guides for the Magnificent Seven",
  ];

  return (
    <div
      style={{
        fontFamily: tokens.family,
        color: tokens.fg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 28px",
          borderBottom: `1px solid ${tokens.border}`,
          fontFamily: SANS,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span
            style={{
              fontFamily: tokens.family,
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              fontStyle: "italic",
            }}
          >
            FT
          </span>
          <span
            style={{
              fontSize: 12,
              color: tokens.fgMuted,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Financial Times
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 18,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <span>Home</span>
          <span style={{ color: tokens.accent }}>Markets</span>
          <span>Companies</span>
          <span>Opinion</span>
          <span>Lex</span>
          <span>Alphaville</span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          padding: "28px 32px 24px",
          columnGap: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.16em",
              color: tokens.accent,
              fontWeight: 700,
              textTransform: "uppercase",
              fontFamily: SANS,
            }}
          >
            Markets · US Equities
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 620,
            }}
          >
            Nvidia climbs 2.4% as AI demand outpaces Street forecasts
          </div>
          <div
            style={{
              fontSize: 11,
              color: tokens.fgMuted,
              fontFamily: SANS,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            By Reuters · 09:31 EDT · 3 min read
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 24,
              rowGap: 8,
              fontSize: 13,
              lineHeight: 1.55,
              marginTop: 12,
            }}
          >
            <div>
              Shares of Nvidia gained $17.68 in early trade to $754.95, extending a rally that has added roughly a fifth to the chipmaker&rsquo;s valuation this quarter. Traders pointed to renewed hyperscaler ordering as the immediate catalyst.
            </div>
            <div>
              &ldquo;The pull-through from AI capex remains stronger than consensus,&rdquo; wrote Morgan Stanley&rsquo;s Joe Moore in a note lifting his price target to $820 from $760, citing checks with cloud operators renewing H100 pricing.
            </div>
          </div>

          <div
            style={{
              padding: 16,
              marginTop: 12,
              border: `1px solid ${tokens.border}`,
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "flex-end",
              columnGap: 20,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  fontSize: 9.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: tokens.fgMuted,
                  fontFamily: SANS,
                  fontWeight: 700,
                }}
              >
                NVDA · NASDAQ
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 26,
                    fontWeight: 700,
                    fontFeatureSettings: '"tnum" 1',
                  }}
                >
                  754.95
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    color: tokens.up,
                    fontFeatureSettings: '"tnum" 1',
                  }}
                >
                  +17.68 (+2.40%)
                </div>
              </div>
              <svg
                viewBox="0 0 260 40"
                style={{ width: "100%", height: 34, marginTop: 4 }}
              >
                <path
                  d="M 0 33 L 20 30 L 40 29 L 60 26 L 80 24 L 100 22 L 120 20 L 140 17 L 160 14 L 180 12 L 200 8 L 220 6 L 240 4 L 260 3"
                  fill="none"
                  stroke={tokens.accent}
                  strokeWidth="1.4"
                />
              </svg>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                fontSize: 11,
                fontFamily: MONO,
                fontFeatureSettings: '"tnum" 1',
              }}
            >
              {[
                ["Open", "738.20"],
                ["Vol", "45.2M"],
                ["Mkt", "$1.85T"],
                ["P/E", "72.3"],
              ].map((r) => (
                <div
                  key={r[0]}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto",
                    gap: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ color: tokens.fgMuted }}>{r[0]}</span>
                  <span>{r[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            borderLeft: `1px solid ${tokens.border}`,
            paddingLeft: 24,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.16em",
              color: tokens.accent,
              fontWeight: 700,
              textTransform: "uppercase",
              fontFamily: SANS,
            }}
          >
            More on this
          </div>
          {related.map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                paddingBottom: 10,
                borderBottom:
                  i === related.length - 1
                    ? "none"
                    : `1px solid ${tokens.border}`,
              }}
            >
              <div style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.3 }}>
                {r}
              </div>
              <div
                style={{
                  fontSize: 9.5,
                  color: tokens.fgMuted,
                  fontFamily: SANS,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Markets · 2h ago
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StyleAssetCard({ style }: { style: Style }) {
  return (
    <div className="group bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-xl overflow-hidden transition-colors">
      <div style={{ background: style.tokens.bg }} className="p-5">
        <StylePreview style={style} />
      </div>
      <div className="p-5 border-t border-white/[0.05] flex items-start justify-between gap-6">
        <div className="min-w-0 flex flex-col gap-3">
          <span
            className={`font-mono text-[11px] uppercase tracking-[0.18em] rounded-md px-2 py-0.5 leading-tight self-start ${style.tagStyle}`}
          >
            {style.slug}
          </span>
          <div>
            <div className="font-display text-xl font-bold tracking-tight mb-1.5">
              {style.name}
            </div>
            <div className="text-sm text-foreground/60 font-light">
              {style.brands}
            </div>
          </div>
        </div>
        <div className="flex gap-1 shrink-0 pt-1">
          {style.swatch.map((c, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-sm border border-white/10"
              style={{ background: c }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StylePreview({ style }: { style: Style }) {
  switch (style.slug) {
    case "pro-terminal":
      return <ProTerminalLayout tokens={style.tokens} />;
    case "retail-polish-dark":
      return <RobinhoodLayout tokens={style.tokens} />;
    case "defi-native":
      return <UniswapLayout tokens={style.tokens} />;
    case "editorial-financial":
      return <FTEditorialLayout tokens={style.tokens} />;
    case "api-dashboard":
      return <StripeAPILayout tokens={style.tokens} />;
    default:
      return <GenericAssetPreview tokens={style.tokens} />;
  }
}

function GenericAssetPreview({ tokens }: { tokens: StyleTokens }) {
  const bars = [12, 14, 11, 15, 17, 16, 19, 18, 21, 20, 23, 22, 25, 24, 27, 26];
  const max = Math.max(...bars);
  const gap =
    tokens.density === "tight" ? 8 : tokens.density === "compact" ? 12 : 16;
  const priceSize = tokens.density === "loose" ? 36 : 30;
  const symbolSize = tokens.density === "loose" ? 15 : 13;
  const isSerif = tokens.family === SERIF;
  const isMono = tokens.family === MONO;

  return (
    <div
      style={{
        fontFamily: tokens.family,
        color: tokens.fg,
        display: "flex",
        flexDirection: "column",
        gap,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 11,
          color: tokens.fgMuted,
          textTransform: isSerif ? "none" : "uppercase",
          letterSpacing: isSerif ? "0" : "0.14em",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              display: "inline-flex",
              width: 6,
              height: 6,
              borderRadius: 3,
              background: tokens.accent,
            }}
          />
          <span>{isMono ? "NVDA · NASDAQ" : "NVIDIA · NVDA"}</span>
        </div>
        <span style={{ fontFamily: MONO }}>09:31 EDT</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: priceSize,
            fontWeight: tokens.weightBig,
            letterSpacing: tokens.letterSpacingBig,
            fontFeatureSettings: '"tnum" 1',
            lineHeight: 1,
          }}
        >
          $754.95
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 2,
            color: tokens.up,
            fontSize: 12,
            fontFeatureSettings: '"tnum" 1',
          }}
        >
          <span>+$17.68</span>
          <span
            style={{
              padding: tokens.density === "loose" ? "3px 8px" : "1px 6px",
              borderRadius: tokens.radius,
              background: `${tokens.up}22`,
              fontWeight: 600,
              fontSize: symbolSize,
            }}
          >
            +2.40%
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 2,
          height: 44,
        }}
      >
        {bars.map((b, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${(b / max) * 100}%`,
              background: tokens.accent,
              opacity: 0.75,
              borderRadius: tokens.radius === "0" ? "0" : "2px",
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
          fontSize: 11,
          borderTop: `1px solid ${tokens.border}`,
          paddingTop: gap - 4,
        }}
      >
        {[
          { label: "vol", value: "45.2M" },
          { label: "mkt cap", value: "1.85T" },
          { label: "p/e", value: "72.3" },
        ].map((s) => (
          <div
            key={s.label}
            style={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <span
              style={{
                fontSize: 9.5,
                color: tokens.fgMuted,
                textTransform: isSerif ? "none" : "uppercase",
                letterSpacing: isSerif ? "0" : "0.1em",
                fontFamily: isSerif ? SERIF : tokens.family,
              }}
            >
              {s.label}
            </span>
            <span
              style={{
                fontFeatureSettings: '"tnum" 1',
                fontWeight: isSerif ? 600 : 500,
              }}
            >
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProTerminalLayout({ tokens }: { tokens: StyleTokens }) {
  const rows: [string, string, string, string][] = [
    ["LAST", "754.95", "CHG", "+17.68"],
    ["BID", "754.80", "ASK", "755.10"],
    ["OPEN", "738.20", "PCLS", "737.27"],
    ["HIGH", "761.15", "LOW", "733.10"],
    ["VOL", "45.2M", "AVG", "38.4M"],
  ];
  return (
    <div
      style={{
        fontFamily: tokens.family,
        color: tokens.fg,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        fontFeatureSettings: '"tnum" 1',
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${tokens.border}`,
          paddingBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.12em",
          }}
        >
          NVDA US EQUITY
        </span>
        <span style={{ fontSize: 10, color: tokens.fgMuted }}>
          09:31:22 EDT
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto 1fr",
          columnGap: 10,
          rowGap: 4,
          fontSize: 12,
        }}
      >
        {rows.map((r, i) => (
          <div key={i} style={{ display: "contents" }}>
            <span style={{ color: tokens.fgMuted }}>{r[0]}</span>
            <span style={{ color: tokens.fg, textAlign: "right" }}>{r[1]}</span>
            <span style={{ color: tokens.fgMuted }}>{r[2]}</span>
            <span
              style={{
                color: r[2] === "CHG" ? tokens.up : tokens.fg,
                textAlign: "right",
              }}
            >
              {r[3]}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: 4,
          marginTop: 2,
          paddingTop: 6,
          borderTop: `1px solid ${tokens.border}`,
          fontSize: 9,
        }}
      >
        {["<GO>", "<HELP>", "GP<GO>", "N<GO>"].map((k) => (
          <span
            key={k}
            style={{
              padding: "2px 6px",
              border: `1px solid ${tokens.border}`,
              color: tokens.fgMuted,
              letterSpacing: "0.06em",
            }}
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

function RobinhoodLayout({ tokens }: { tokens: StyleTokens }) {
  return (
    <div
      style={{
        fontFamily: tokens.family,
        color: tokens.fg,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "stretch",
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: tokens.fgMuted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        NVIDIA · NVDA
      </div>
      <div
        style={{
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          fontFeatureSettings: '"tnum" 1',
        }}
      >
        $754.95
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: tokens.up,
          fontSize: 13,
          fontFeatureSettings: '"tnum" 1',
        }}
      >
        <span>▲</span>
        <span>$17.68 (+2.40%)</span>
        <span style={{ color: tokens.fgMuted }}>Today</span>
      </div>
      <svg viewBox="0 0 200 44" style={{ width: "100%", height: 44 }}>
        <path
          d="M 0 34 L 15 32 L 30 30 L 45 27 L 60 24 L 75 22 L 90 20 L 105 17 L 120 14 L 135 11 L 150 9 L 165 7 L 180 5 L 195 3 L 200 2"
          fill="none"
          stroke={tokens.up}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        style={{
          display: "flex",
          width: "100%",
          padding: "10px 0",
          borderRadius: 999,
          background: tokens.up,
          color: "#000000",
          fontSize: 14,
          fontWeight: 700,
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        Trade
      </div>
    </div>
  );
}

function UniswapLayout({ tokens }: { tokens: StyleTokens }) {
  return (
    <div
      style={{
        fontFamily: tokens.family,
        color: tokens.fg,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 14,
          fontSize: 11,
          marginBottom: 2,
        }}
      >
        <span style={{ color: tokens.fg, fontWeight: 700 }}>Swap</span>
        <span style={{ color: tokens.fgMuted }}>Limit</span>
        <span style={{ color: tokens.fgMuted }}>Send</span>
      </div>

      <div
        style={{
          padding: 12,
          borderRadius: 14,
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${tokens.border}`,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 10, color: tokens.fgMuted }}>You pay</span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              fontFeatureSettings: '"tnum" 1',
            }}
          >
            1.0
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                borderRadius: 6,
                background: "#627eea",
              }}
            />
            ETH
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "-8px 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            padding: "3px 7px",
            borderRadius: 999,
            background: tokens.bg,
            border: `1px solid ${tokens.border}`,
            fontSize: 10,
            color: tokens.fgMuted,
          }}
        >
          ↓
        </span>
      </div>

      <div
        style={{
          padding: 12,
          borderRadius: 14,
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${tokens.border}`,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 10, color: tokens.fgMuted }}>You receive</span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              fontFeatureSettings: '"tnum" 1',
            }}
          >
            2,850.42
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                borderRadius: 6,
                background: "#2775ca",
              }}
            />
            USDC
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          padding: "10px 0",
          borderRadius: 14,
          background: tokens.accent,
          color: "#ffffff",
          fontSize: 14,
          fontWeight: 700,
          textAlign: "center",
          justifyContent: "center",
          marginTop: 4,
        }}
      >
        Swap
      </div>
    </div>
  );
}

function FTEditorialLayout({ tokens }: { tokens: StyleTokens }) {
  return (
    <div
      style={{
        fontFamily: tokens.family,
        color: tokens.fg,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.16em",
          color: tokens.accent,
          fontWeight: 700,
          textTransform: "uppercase",
          fontFamily: SANS,
        }}
      >
        Markets · Equities
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
        }}
      >
        Nvidia climbs 2.4% as AI demand outpaces Street forecasts
      </div>
      <div
        style={{
          fontSize: 10,
          color: tokens.fgMuted,
          fontFamily: SANS,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        By Reuters · 09:31 EDT
      </div>
      <div style={{ fontSize: 12, lineHeight: 1.55, color: tokens.fg }}>
        Shares gained $17.68 in early trade to $754.95, extending a rally that has added roughly a fifth to the chipmaker&rsquo;s valuation this quarter.
      </div>
      <svg
        viewBox="0 0 200 32"
        style={{ width: "100%", height: 30, marginTop: 2 }}
      >
        <path
          d="M 0 26 L 20 23 L 40 21 L 60 19 L 80 17 L 100 14 L 120 12 L 140 10 L 160 7 L 180 5 L 200 3"
          fill="none"
          stroke={tokens.accent}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

function StripeAPILayout({ tokens }: { tokens: StyleTokens }) {
  return (
    <div
      style={{
        fontFamily: tokens.family,
        color: tokens.fg,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
          }}
        >
          <span
            style={{
              padding: "2px 8px",
              borderRadius: 4,
              background: `${tokens.accent}22`,
              color: tokens.accent,
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "0.06em",
            }}
          >
            GET
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: tokens.fgMuted,
            }}
          >
            /v3/reference/tickers/NVDA
          </span>
        </div>
        <span
          style={{
            padding: "2px 6px",
            borderRadius: 999,
            background: `${tokens.up}22`,
            color: tokens.up,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.06em",
          }}
        >
          200 OK
        </span>
      </div>
      <pre
        style={{
          margin: 0,
          padding: 12,
          borderRadius: 8,
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${tokens.border}`,
          fontFamily: MONO,
          fontSize: 10.5,
          lineHeight: 1.65,
          color: tokens.fg,
          whiteSpace: "pre",
        }}
      >
{`{
  "ticker": "NVDA",
  "price": 754.95,
  "change": 17.68,
  "change_pct": 2.40,
  "volume": 45230918,
  "as_of": "2026-07-13T09:31:22-04:00"
}`}
      </pre>
    </div>
  );
}

function TriggersSection() {
  return (
    <section className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="05" label="Triggers" />
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              Talk to it like a person.
            </h2>
            <p className="text-lg text-foreground/65 font-light leading-relaxed">
              No special syntax. The agent reads the request, loads the right reference, and writes against it. Name a brand to pick a style.
            </p>
          </div>
          <div className="space-y-2">
            {TRIGGERS.map((t) => (
              <div
                key={t.say}
                className="group bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-lg px-5 py-4 grid md:grid-cols-[1fr_auto] gap-4 items-center transition-colors"
              >
                <div className="text-foreground/90 text-[15px] font-light">
                  &quot;{t.say}&quot;
                </div>
                <div className="flex items-center gap-2 md:justify-end">
                  <span className="font-mono text-[11px] text-foreground/35">
                    →
                  </span>
                  <span
                    className={`font-mono text-[11px] rounded-md px-2 py-0.5 leading-tight ${t.loadStyle}`}
                  >
                    {t.loads}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function InstallSection() {
  return (
    <section id="install" className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="06" label="Install" />
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              Two commands.
            </h2>
            <p className="text-lg text-foreground/65 font-light leading-relaxed mb-6">
              Add the marketplace, then install the plugin. The skills load on their own whenever Claude touches financial UI.
            </p>
            <ul className="space-y-3 text-sm text-foreground/70 font-light">
              {[
                "Works on any Claude Code project",
                "React + Tailwind examples, framework-agnostic rules",
                "Includes a verify script that flags the common mistakes",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[color:var(--accent-cyan)] mt-0.5 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <CodeBlock />
        </div>
      </Container>
    </section>
  );
}

function CodeBlock() {
  const lines: Array<
    | { kind: "comment"; text: string }
    | { kind: "cmd"; text: string }
    | { kind: "prompt"; text: string }
    | { kind: "blank" }
  > = [
    { kind: "comment", text: "# Add the marketplace from GitHub" },
    {
      kind: "cmd",
      text: "claude plugin marketplace add https://github.com/rgourley/financial-ui-suite",
    },
    { kind: "blank" },
    { kind: "comment", text: "# Install the plugin" },
    {
      kind: "cmd",
      text: "/plugin install financial-ui-suite@financial-ui-suite-dev",
    },
    { kind: "blank" },
    { kind: "comment", text: "# Then ask Claude in plain language" },
    { kind: "prompt", text: "build a portfolio holdings table" },
    { kind: "prompt", text: "make it look like Bloomberg terminal" },
    { kind: "blank" },
    { kind: "comment", text: "# Optional: verify an existing codebase" },
    { kind: "cmd", text: "./scripts/verify-financial-ui.sh ../my-app/src" },
  ];

  return (
    <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
        <span className="flex items-center gap-2">
          <Terminal className="w-3 h-3" />
          terminal
        </span>
        <span>zsh</span>
      </div>
      <pre className="p-5 text-[13px] leading-relaxed font-mono overflow-x-auto text-[#d4d4d4]">
        {lines.map((l, i) => {
          if (l.kind === "blank") return <div key={i}>&nbsp;</div>;
          if (l.kind === "comment") {
            return (
              <div key={i} className="text-white/40">
                {l.text}
              </div>
            );
          }
          if (l.kind === "prompt") {
            return (
              <div key={i} className="text-white/85">
                <span className="text-[#c084fc] mr-2">&gt;</span>
                {l.text}
              </div>
            );
          }
          return (
            <div key={i} className="text-white/90">
              <span className="text-[#22d3ee] mr-2">$</span>
              {l.text}
            </div>
          );
        })}
      </pre>
    </div>
  );
}

function DataSection() {
  return (
    <section id="data" className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="07" label="Data" />
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
            The NVDA prices on this page are fake. Massive&apos;s aren&apos;t.
          </h2>
          <p className="text-lg text-foreground/65 font-light leading-relaxed max-w-2xl mb-4">
            A real build needs real trades, quotes, and bars behind it. Massive serves that data: real-time and historical trades, quotes, OHLC bars, options chains, futures, and fundamentals across stocks, crypto, FX, and indices. There&apos;s a free tier, so the first build can run on a real feed.
          </p>
          <p className="text-sm text-foreground/55 font-light leading-relaxed max-w-2xl mb-10">
            The plugin&apos;s{" "}
            <code className="font-mono text-foreground/80">api-dashboard</code>{" "}
            style is modeled in part on the Massive dashboard.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={MASSIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-foreground/20 px-5 py-3 text-sm font-medium text-foreground/90 hover:border-foreground/40 hover:text-foreground transition-colors"
            >
              <MassiveSymbol className="h-4 w-4" />
              massive.com
              <ArrowUpRight className="w-4 h-4 -mr-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={MASSIVE_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-foreground/20 px-5 py-3 text-sm font-light text-foreground/80 hover:border-foreground/40 hover:text-foreground transition-colors"
            >
              Read the API docs
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-32">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-6">
            MIT · by Robert Gourley, principal product engineer at{" "}
            <a
              href={MASSIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground underline underline-offset-4 decoration-foreground/25 hover:decoration-foreground/60 transition-colors"
            >
              Massive
            </a>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-black leading-[1.0] tracking-[-0.04em] mb-8">
            Ship something that doesn&apos;t look generated.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              <Github className="w-4 h-4" />
              github.com/rgourley/financial-ui-suite
              <ArrowUpRight className="w-4 h-4 -mr-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-3.5 text-sm font-light text-foreground/80 hover:border-foreground/40 hover:text-foreground transition-colors"
            >
              See more work
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
