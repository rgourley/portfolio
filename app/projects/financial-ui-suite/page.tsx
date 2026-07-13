import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import type { Metadata } from "next";
import { ArrowUpRight, Check, Github, Terminal } from "lucide-react";

const PAGE_PATH = "/projects/financial-ui-suite";
const PAGE_TITLE = "financial-ui-suite — Claude Code plugin for financial UI";
const PAGE_DESCRIPTION =
  "A Claude Code plugin with two skills, 17 correctness references, and 10 aesthetic systems modeled on Bloomberg, TradingView, Kraken Pro, Robinhood, FT, and more. Stops the AI from shipping the same generic dashboard every time.";

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
    title: "Financial UI. Ten aesthetics. Zero templates.",
    description:
      "A Claude Code plugin that stops the AI from shipping generic financial UI. Ten aesthetic systems modeled on real products, seventeen correctness references.",
    url: PAGE_PATH,
    siteName: "Robert Gourley",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial UI. Ten aesthetics. Zero templates.",
    description:
      "Claude Code plugin for shipping financial UI that looks like the product it runs in.",
    creator: "@rgourley",
  },
};

const GITHUB_URL = "https://github.com/rgourley/financial-ui-suite";

const PATTERNS = [
  { file: "typography-and-color", note: "Tokens, type scale, density, motion" },
  { file: "number-formatting", note: "Prices, qty, %, bps, currency" },
  { file: "components", note: "Tables, order books, tickers, pills" },
  { file: "streaming-and-state", note: "Sockets, tick flash, throttling" },
  { file: "accessibility", note: "Color blindness, keyboard, SR" },
  { file: "mobile-and-responsive", note: "Phone/tablet, bottom sheets" },
  { file: "industry-patterns", note: "Bloomberg, Kraken, FT conventions" },
  { file: "charts-and-candles", note: "OHLC, volume, indicators (base)" },
  { file: "loading-and-skeletons", note: "First-load + reconnect treatments" },
  { file: "empty-and-error-states", note: "Rejected, closed, rate-limit" },
  { file: "timestamps-and-timezones", note: "Trade times, “as of” stamps" },
  { file: "virtualization", note: "100+ streaming rows, trades tape" },
  { file: "chart-interactions", note: "Crosshair, zoom/pan, drawing tools" },
  {
    file: "order-entry-and-lifecycle",
    note: "Forms, preview, pending→filled",
  },
  { file: "alerts-and-disclosures", note: "Price alerts, PDT/wash-sale" },
  {
    file: "data-sources-and-freshness",
    note: "Real-time→delayed→stale",
  },
  { file: "heatmaps-and-density-viz", note: "Sector, options, IV surface" },
];

type Style = {
  slug: string;
  name: string;
  brands: string;
  swatch: [string, string, string];
  vibe: string;
  image?: string;
  tagStyle: string;
};

const STYLES: Style[] = [
  {
    slug: "modern-pro-dark",
    name: "Modern Pro Dark",
    brands: "TradingView, Kraken Pro, Hyperliquid",
    swatch: ["#0b0f17", "#22c55e", "#ef4444"],
    vibe: "Cool charcoal, neon ladders, hairline grids",
    image: "/images/fui/modern-pro-dark.png",
    tagStyle: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
  },
  {
    slug: "pro-terminal",
    name: "Pro Terminal",
    brands: "Bloomberg, IBKR TWS, ThinkOrSwim",
    swatch: ["#0a0a0a", "#fbbf24", "#22c55e"],
    vibe: "Amber on black, monospaced, dense",
    image: "/images/fui/pro-terminal.png",
    tagStyle: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
  },
  {
    slug: "tasty-pro",
    name: "Tasty Pro",
    brands: "TastyTrade",
    swatch: ["#0f1419", "#f97316", "#06b6d4"],
    vibe: "Options-first, BWB curves, big buttons",
    tagStyle: "bg-orange-500/10 text-orange-300 border border-orange-500/20",
  },
  {
    slug: "crypto-exchange",
    name: "Crypto Exchange",
    brands: "Coinbase Advanced, Binance, Bybit",
    swatch: ["#10121a", "#f0b90b", "#2ebd85"],
    vibe: "Saturated highlights, deep book, perp tabs",
    tagStyle: "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20",
  },
  {
    slug: "retail-polish-dark",
    name: "Retail Polish Dark",
    brands: "Robinhood, Public",
    swatch: ["#000000", "#00c805", "#ff5000"],
    vibe: "Friendly geometry, oversized type, soft motion",
    image: "/images/fui/retail-polish-dark.png",
    tagStyle: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
  },
  {
    slug: "retail-polish-light",
    name: "Retail Polish Light",
    brands: "Wise, Revolut, Cash App, Monzo",
    swatch: ["#f7f7f5", "#163300", "#9fe870"],
    vibe: "Bright off-white, rounded, lifestyle illustration",
    tagStyle: "bg-lime-500/10 text-lime-300 border border-lime-500/20",
  },
  {
    slug: "editorial-financial",
    name: "Editorial Financial",
    brands: "FT, Bloomberg.com, WSJ",
    swatch: ["#fff1e5", "#0f172a", "#bb1a4f"],
    vibe: "Salmon paper, serif headlines, restrained chrome",
    image: "/images/fui/editorial-financial.png",
    tagStyle: "bg-rose-500/10 text-rose-300 border border-rose-500/20",
  },
  {
    slug: "api-dashboard",
    name: "API Dashboard",
    brands: "Massive, Stripe, Vercel, Linear",
    swatch: ["#0a0a0a", "#ffffff", "#635bff"],
    vibe: "Crisp grids, gradient accents, doc-first",
    image: "/images/fui/api-dashboard.png",
    tagStyle: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
  },
  {
    slug: "defi-native",
    name: "DeFi Native",
    brands: "Uniswap, Jupiter, Aave, Phantom",
    swatch: ["#0b0a1a", "#ff007a", "#7d5cff"],
    vibe: "Glassy panes, hot-pink primaries, wallet chips",
    tagStyle: "bg-pink-500/10 text-pink-300 border border-pink-500/20",
  },
  {
    slug: "apple-native",
    name: "Apple Native",
    brands: "iOS Stocks, macOS widget",
    swatch: ["#000000", "#ffffff", "#fb2c36"],
    vibe: "SF Pro, exact whitespace, calm gain/loss",
    tagStyle: "bg-sky-500/10 text-sky-300 border border-sky-500/20",
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
            <span className="block">Financial UI.</span>
            <span className="block">Ten aesthetics.</span>
            <span className="block">Zero templates.</span>
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
                covers the correctness rules AI tools usually miss: tabular-nums, per-asset number formatting, streaming state, timezone-aware timestamps, colorblind-safe up/down.{" "}
                <code className="font-mono text-foreground/90">
                  financial-ui-styles
                </code>{" "}
                picks one of ten visual systems, each modeled on how a real trading product actually ships.
              </p>
              <p className="text-lg md:text-xl text-foreground/70 font-normal leading-relaxed">
                Skills load automatically whenever Claude touches prices, P&amp;L, order books, holdings, or streaming market data. No slash commands, no invocation grammar. Ask what you&rsquo;d ask a designer.
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
                <span className="text-foreground/90 mr-1.5 tabular-nums">10</span>
                styles
              </span>
              <span className="text-foreground/20">·</span>
              <span>MIT</span>
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
    <div className="relative">
      <div className="grid grid-cols-2 gap-3">
        {styles.map((s, i) => (
          <a
            href="#styles"
            key={s.slug}
            className={`group relative block overflow-hidden rounded-lg border border-white/[0.08] bg-[color:var(--muted)] ${
              i === 0
                ? "translate-y-0"
                : i === 1
                  ? "translate-y-6"
                  : i === 2
                    ? "-translate-y-2"
                    : "translate-y-4"
            }`}
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={s.image!}
                alt={`${s.name} example`}
                fill
                sizes="(max-width: 1024px) 50vw, 320px"
                className="object-cover object-left-top group-hover:opacity-95 transition-opacity"
                quality={85}
                priority={i < 2}
              />
            </div>
            <div className="absolute left-0 right-0 bottom-0 px-3 py-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                {s.slug}
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-4 text-xs text-foreground/45 font-light text-center lg:text-right">
        Same data. Four visual systems. Pick one per product.
      </div>
    </div>
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
                product-design
              </code>{" "}
              handles atomic decisions for any SaaS UI.{" "}
              <code className="font-mono text-foreground/90">
                financial-ui-patterns
              </code>{" "}
              is mandatory: the correctness rules every serious trading product ships.{" "}
              <code className="font-mono text-foreground/90">
                financial-ui-styles
              </code>{" "}
              picks one of ten aesthetics so the surface doesn&rsquo;t blur into every other AI-generated dashboard.
            </p>
            <p className="text-sm text-foreground/55 font-light leading-relaxed max-w-xl">
              Patterns always loaded. One style per product. Combine in plain English: &ldquo;build an options chain in TradingView style.&rdquo;
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 font-mono text-[13px] leading-relaxed">
            <div className="text-foreground/40 mb-3">$ tree skills/</div>
            <div className="text-foreground/85">
              <div>
                <span className="text-foreground/40">├─</span>{" "}
                <span className="text-foreground">product-design</span>
                <span className="text-foreground/40">
                  {"  // atomic SaaS decisions"}
                </span>
              </div>
              <div>
                <span className="text-foreground/40">├─</span>{" "}
                <span className="text-[color:var(--accent-cyan)]">
                  financial-ui-patterns
                </span>
                <span className="text-foreground/40">
                  {"  // correctness, mandatory"}
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
                {"# triggered automatically when the agent sees:"}
              </div>
              <div className="text-foreground/70">
                {"# prices, P&L, order books, holdings, charts, ticks, watchlists…"}
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
          The defaults that ship without it.
        </h2>
        <p className="text-lg text-foreground/65 font-light leading-relaxed max-w-2xl mb-12">
          Every line below is something Claude wrote on its own when asked for a trading UI. Each one is a bug in a serious product.
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
  const withImages = STYLES.filter((s) => s.image);
  const withoutImages = STYLES.filter((s) => !s.image);

  return (
    <section id="styles" className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="04" label="financial-ui-styles" />
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-4">
              Ten aesthetics. Each modeled on something real.
            </h2>
            <p className="text-lg text-foreground/65 font-light leading-relaxed">
              Pick one per product. Each reference encodes the color token, type system, density, and chart treatment of the brand it&rsquo;s named after.
            </p>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
            skills/financial-ui-styles/references/
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {withImages.map((s) => (
            <StyleImageCard key={s.slug} style={s} />
          ))}
        </div>

        <div className="mt-12">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-6">
            and five more in the plugin
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {withoutImages.map((s) => (
              <StyleSwatchCard key={s.slug} style={s} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StyleImageCard({ style }: { style: Style }) {
  return (
    <div className="group bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-xl overflow-hidden transition-colors">
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{ background: style.swatch[0] }}
      >
        <Image
          src={style.image!}
          alt={`${style.name} chart example`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-left-top"
          quality={88}
        />
      </div>
      <div className="p-6 border-t border-white/[0.05] flex items-start justify-between gap-6">
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

function StyleSwatchCard({ style }: { style: Style }) {
  return (
    <div className="group bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-xl p-5 flex flex-col gap-4 transition-colors">
      <div
        className="flex h-10 rounded-md overflow-hidden border border-white/[0.08]"
        aria-hidden="true"
      >
        {style.swatch.map((c, i) => (
          <div key={i} className="flex-1" style={{ background: c }} />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.18em] rounded-md px-2 py-0.5 leading-tight self-start ${style.tagStyle}`}
        >
          {style.slug}
        </span>
        <div>
          <div className="font-display text-lg font-bold tracking-tight mb-1">
            {style.name}
          </div>
          <div className="text-xs text-foreground/55 font-light leading-relaxed">
            {style.brands}
          </div>
        </div>
      </div>
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
              No invocation grammar. The agent sees the request, loads the right reference, and writes against it. Mention a brand to pick a style.
            </p>
          </div>
          <div className="space-y-2">
            {TRIGGERS.map((t) => (
              <div
                key={t.say}
                className="group bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-lg px-5 py-4 grid md:grid-cols-[1fr_auto] gap-4 items-center transition-colors"
              >
                <div className="text-foreground/90 text-[15px] font-light">
                  &ldquo;{t.say}&rdquo;
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
              Add the marketplace, install the plugin. Skills auto-load whenever Claude touches financial UI. No slash commands, no invocation grammar.
            </p>
            <ul className="space-y-3 text-sm text-foreground/70 font-light">
              {[
                "Works on any Claude Code project",
                "React + Tailwind examples, framework-agnostic rules",
                "Includes a verify script that fails on the common anti-patterns",
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

function FinalCTA() {
  return (
    <section className="py-32">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-6">
            MIT · by Robert Gourley
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-black leading-[1.0] tracking-[-0.04em] mb-8">
            Ship something that doesn&rsquo;t look generated.
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
