import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { ArrowUpRight, Check, Github, Terminal } from "lucide-react";

const PAGE_PATH = "/projects/quant-garage";
const PAGE_TITLE = "Quant Garage — Pro market research, no terminal";
const PAGE_DESCRIPTION =
  "Forty-one tools and eight one-command workflows for equity research, sizing, and risk. Ask Claude \"review my book\" or import the same function into a Python notebook. Every number cites the live API call it came from.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "quant research",
    "Claude Code plugin",
    "Claude Code skill",
    "AI finance research",
    "LLM finance tools",
    "market data API",
    "Massive API",
    "Polygon API",
    "portfolio review",
    "earnings preview",
    "factor research",
    "options flow",
    "risk report",
    "sector rotation",
    "sell-side research",
    "individual investor research",
    "retail investing tools",
    "Python quant library",
    "Robert Gourley",
    "quant-garage",
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
    title: "Quant Garage. Pro research. No terminal.",
    description:
      "Trade like a pro. Without the terminal. Forty-one tools, eight workflows, one Massive key. Ask from Claude or call from Python.",
    url: PAGE_PATH,
    siteName: "Robert Gourley",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quant Garage. Pro research. No terminal.",
    description:
      "Trade like a pro. Without the terminal. 41 tools, 8 workflows. Ask from Claude or import into Python.",
    creator: "@rgourley",
  },
};

const GITHUB_URL = "https://github.com/rgourley/quant-garage";

type Workflow = {
  slug: string;
  name: string;
  runtime: string;
  kind: string;
  kindStyle: string;
  blurb: string;
};

const WORKFLOWS: Workflow[] = [
  {
    slug: "portfolio-review",
    name: "portfolio-review",
    runtime: "~90s",
    kind: "deep dive",
    kindStyle: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
    blurb:
      "The full book review in one call. Chains market-regime, sector rotation, risk report, earnings blackout, macro calendar, 8-K scanner, rebalancer.",
  },
  {
    slug: "weekly-brief",
    name: "weekly-brief",
    runtime: "~30s",
    kind: "weekly",
    kindStyle: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    blurb:
      "Sunday-night watchlist prep. Regime, rotation, macro calendar, earnings blackout across a 7-day window. Frames the week.",
  },
  {
    slug: "morning-brief",
    name: "morning-brief",
    runtime: "~15s",
    kind: "daily",
    kindStyle: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    blurb:
      "60-second daily open. Regime, macro today plus tomorrow, news scan per watchlist ticker. Cron it at 8am.",
  },
  {
    slug: "preflight-trade",
    name: "preflight-trade",
    runtime: "~30s",
    kind: "pre-trade",
    kindStyle: "bg-orange-500/10 text-orange-300 border border-orange-500/20",
    blurb:
      "Before you hit execute. Ticker plus intent. Technical read, earnings blackout, news, corporate actions. Verdict: go, wait, review.",
  },
  {
    slug: "earnings-week-prep",
    name: "earnings-week-prep",
    runtime: "~2 min",
    kind: "earnings",
    kindStyle: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    blurb:
      "For weeks where four of your names print in five days. Earnings blackout on the watchlist, then drilldown plus technical read for the top prints.",
  },
  {
    slug: "historical-comparison",
    name: "historical-comparison",
    runtime: "~20s",
    kind: "analog",
    kindStyle: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
    blurb:
      "Twin decision support. Event study on the specific event plus historical analogs on the market regime. Two anchors, not one.",
  },
  {
    slug: "scan-and-frame",
    name: "scan-and-frame",
    runtime: "~30s",
    kind: "discovery",
    kindStyle: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
    blurb:
      "Regime-framed idea generation. Regime context, universe screen, relative-strength rank on the top N. Factor pass optional.",
  },
  {
    slug: "stock-one-pager",
    name: "stock-one-pager",
    runtime: "~10s",
    kind: "single-name",
    kindStyle: "bg-sky-500/10 text-sky-300 border border-sky-500/20",
    blurb:
      "Retail-tier single-name card. Technical read plus earnings blackout plus regime, translated into plain language. Every claim gated to data.",
  },
];

type ToolGroup = {
  label: string;
  tag: string;
  dot: string;
  tools: string[];
};

const TOOL_GROUPS: ToolGroup[] = [
  {
    label: "Earnings",
    tag: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    dot: "bg-amber-400",
    tools: ["earnings-drilldown", "event-study", "earnings-blackout"],
  },
  {
    label: "Equity research & valuation",
    tag: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
    dot: "bg-cyan-400",
    tools: ["pitch-comps", "valuation-sanity-check", "position-sizer"],
  },
  {
    label: "Quant & screening",
    tag: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
    dot: "bg-violet-400",
    tools: [
      "technical-briefing",
      "universe-builder",
      "factor-research",
      "relative-strength",
      "pairs-scanner",
      "hurst-exponent",
      "change-point-detector",
      "signal-decay",
      "rough-vol-forecast",
    ],
  },
  {
    label: "Market context",
    tag: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    dot: "bg-emerald-400",
    tools: [
      "market-regime",
      "sector-rotation-signal",
      "macro-event-calendar",
      "historical-analog-finder",
    ],
  },
  {
    label: "Trading & execution",
    tag: "bg-orange-500/10 text-orange-300 border border-orange-500/20",
    dot: "bg-orange-400",
    tools: [
      "options-flow",
      "zero-dte-gamma",
      "news-scanner",
      "slippage-cost",
      "options-structure-analyzer",
    ],
  },
  {
    label: "Risk & ops",
    tag: "bg-rose-500/10 text-rose-300 border border-rose-500/20",
    dot: "bg-rose-400",
    tools: [
      "portfolio-mark",
      "risk-report",
      "mc-portfolio-simulator",
      "portfolio-rebalancer",
      "corporate-actions-scanner",
      "corp-actions-reconciler",
      "t+1-settlement-prep",
    ],
  },
  {
    label: "Filings & ownership",
    tag: "bg-sky-500/10 text-sky-300 border border-sky-500/20",
    dot: "bg-sky-400",
    tools: [
      "8-k-scanner",
      "risk-factor-delta",
      "filing-sentiment",
      "insider-flow",
      "manager-portfolio-diff",
      "guidance-tracker",
      "analyst-tracker",
    ],
  },
  {
    label: "Backtesting & crypto",
    tag: "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20",
    dot: "bg-yellow-400",
    tools: ["backtest-data-prep", "crypto-vol-scanner"],
  },
];

type Plan = {
  name: string;
  price: string;
  unlocks: string;
  note?: string;
};

const PLANS: Plan[] = [
  {
    name: "Basic (free)",
    price: "$0",
    unlocks: "18 tools + most workflows end to end",
    note: "5 calls/min, end-of-day data, SEC EDGAR fallback for earnings",
  },
  {
    name: "Stocks Starter",
    price: "$29/mo",
    unlocks: "38 of 41 tools, every workflow composite",
    note: "unlimited rate, 15-min delayed real-time, bulk grouped-aggregates",
  },
  {
    name: "Options Developer",
    price: "$79/mo add-on",
    unlocks: "options-flow, options-structure-analyzer, full earnings-drilldown",
  },
  {
    name: "Stocks Advanced",
    price: "$199/mo",
    unlocks: "Live-mode portfolio-mark on the WebSocket feed",
  },
];

export default function QuantGaragePage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://robertgourley.com";
  const pageUrl = `${siteUrl}${PAGE_PATH}`;
  const ogImageUrl = `${pageUrl}/opengraph-image`;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: "Quant Garage",
    alternateName: "quant-garage",
    description: PAGE_DESCRIPTION,
    url: pageUrl,
    image: ogImageUrl,
    codeRepository: GITHUB_URL,
    programmingLanguage: ["Python"],
    runtimePlatform: ["Claude Code", "Python 3.11+", "Jupyter"],
    license: "https://opensource.org/licenses/MIT",
    keywords: [
      "quant research",
      "AI finance research",
      "Claude Code plugin",
      "Massive API",
      "portfolio review",
      "options flow",
      "factor research",
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
    applicationCategory: "FinanceApplication",
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
        name: "Quant Garage",
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="pt-24 pb-24">
      <Script
        id="ld-quant-garage-software"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(softwareSchema)}
      </Script>
      <Script
        id="ld-quant-garage-breadcrumb"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Hero />
      <WhatItIs />
      <ClaudePath />
      <PythonPath />
      <WorkflowsSection />
      <PrimitivesSection />
      <SpotlightSection />
      <TrustSection />
      <PlanSection />
      <InstallSection />
      <FinalCTA />
    </div>
  );
}

type Spotlight = {
  name: string;
  tag: string;
  tagStyle: string;
  citation: string;
  what: string;
  result: string;
};

const SPOTLIGHT: Spotlight[] = [
  {
    name: "change-point-detector",
    tag: "quant",
    tagStyle: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
    citation: "Adams & MacKay, 2007",
    what: "Bayesian Online Change-Point Detection on daily log returns. Flags the exact dates where the return-generating distribution shifted, with posterior confidence and per-segment vol.",
    result: "Live on ALLO: detected a regime break on 2026-04-14 with 99.65% confidence. That was the exact day of the ALPHA3 trial futility announcement.",
  },
  {
    name: "rough-vol-forecast",
    tag: "quant",
    tagStyle: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
    citation: "Bayer-Friz-Gatheral, 2016",
    what: "Under rough volatility, realized vol scales as h^H with H around 0.14, much slower than sqrt(t). Ships the rough forecast alongside Brownian and EWMA for direct comparison.",
    result: "On SPY: 120-day vol drops from 11.66% (traditional) to 2.08% (rough), a 5x reduction that reshapes how you size long-horizon scenarios.",
  },
  {
    name: "zero-dte-gamma",
    tag: "options",
    tagStyle: "bg-orange-500/10 text-orange-300 border border-orange-500/20",
    citation: "Baltussen-Terhorst-Van Vliet, 2024",
    what: "Estimates net dealer gamma exposure for same-day-expiry SPY/SPX/QQQ/IWM options. Identifies pin strikes and gamma-regime flip levels driving intraday moves.",
    result: "Live SPY 2026-07-13 expiry: dealers net short $1.25B gamma at $759 pins with 9,412 open interest. Expect intraday moves to accelerate rather than mean-revert.",
  },
  {
    name: "signal-decay",
    tag: "quant",
    tagStyle: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
    citation: "Israel-Moskowitz-Ross, 2024",
    what: "Rolling 63-day IC vs 5-day forward returns over a 5-year window. Fits exponential decay to the IC series and reports the half-life plus a full performance tearsheet.",
    result: "SPY mean-reversion IC flipped from +0.06 early quarter to -0.16 recent quarter. The classic short-horizon effect has completely reversed sign this cycle.",
  },
];

function SpotlightSection() {
  return (
    <section className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="06" label="Under the hood" />
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-4">
              The quant methods most investors haven&rsquo;t seen.
            </h2>
            <p className="text-lg text-foreground/65 font-light leading-relaxed">
              A handful of these tools implement published academic research from 2007 to 2025 that individual investors have never had access to. Four worth calling out.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {SPOTLIGHT.map((s) => (
            <div
              key={s.name}
              className="group bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-xl p-6 md:p-7 flex flex-col gap-4 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.15em] rounded-md px-2 py-0.5 leading-tight ${s.tagStyle}`}
                >
                  {s.tag}
                </span>
                <span className="ml-auto font-mono text-[10px] text-foreground/40">
                  {s.citation}
                </span>
              </div>
              <div className="font-mono text-base text-foreground/95">
                {s.name}
              </div>
              <div className="text-sm text-foreground/60 font-light leading-relaxed">
                {s.what}
              </div>
              <div className="text-sm text-foreground/85 font-normal leading-relaxed border-t border-white/[0.05] pt-4 mt-auto">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/45 block mb-2">
                  Live result
                </span>
                {s.result}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

type Audience = {
  tag: string;
  tagStyle: string;
  title: string;
  blurb: string;
};

const AUDIENCES: Audience[] = [
  {
    tag: "AI · agents",
    tagStyle: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
    title: "LLM and agent developers.",
    blurb:
      "Every tool returns JSON matching a schema. Drop it into your tool-use loop and the model gets structured research instead of hallucinated finance. Ships as Claude Code skills; works with any tool-use LLM.",
  },
  {
    tag: "Claude Code",
    tagStyle: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
    title: "Traders who work in Claude.",
    blurb:
      "Ask what you'd ask a colleague. \"Preview NVDA earnings.\" \"Should I trim ALLO?\" The skill loads whenever the conversation touches markets. Sell-side output up top, cite trail underneath every take.",
  },
  {
    tag: "Retail",
    tagStyle: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    title: "Investors with a real book.",
    blurb:
      "$50K to a few million. No Bloomberg, no time to babysit a spreadsheet. Get sell-side-quality briefings on the names you actually hold: morning brief, earnings preview, portfolio review.",
  },
  {
    tag: "Fintech · dev",
    tagStyle: "bg-orange-500/10 text-orange-300 border border-orange-500/20",
    title: "Developers building on Massive.",
    blurb:
      "Reference implementation for the Massive API. Retry logic, fallback chains, timezone handling, audit-trail format. Read the source or fork it and ship your own.",
  },
];

function WhatItIs() {
  return (
    <section className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="01" label="What it is" />
        <div className="max-w-4xl mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-[64px] font-bold leading-[1.04] tracking-[-0.035em] mb-6">
            The full research desk, one prompt away.
          </h2>
          <p className="text-xl text-foreground/80 font-medium leading-[1.5] tracking-[-0.005em] mb-4 max-w-3xl">
            Forty-one tools that each answer one analyst question well. Earnings previews. Risk reports. Factor research. Options flow. Corporate actions. Macro calendars. Eight workflows chain them into complete briefings, so one prompt returns the whole read.
          </p>
          <p className="text-lg text-foreground/60 font-normal leading-[1.55] max-w-3xl">
            Every figure carries the endpoint and timestamp it came from. Every take shows its work. Ask from Claude, import into a Python notebook, or wire it into a cron job. Same computation, same audit trail, same answer.
          </p>
        </div>

        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45 mb-6">
          Built for
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {AUDIENCES.map((a) => (
            <div
              key={a.title}
              className="group bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-xl p-6 md:p-8 flex flex-col gap-4 min-h-[240px] transition-colors"
            >
              <span className={`font-mono text-[11px] uppercase tracking-[0.18em] rounded-md px-2.5 py-1 leading-none self-start ${a.tagStyle}`}>
                {a.tag}
              </span>
              <div className="space-y-3 flex-1">
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground/95 tracking-[-0.02em] leading-[1.15]">
                  {a.title}
                </h3>
                <p className="text-[15px] text-foreground/55 font-light leading-relaxed">
                  {a.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
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
  return (
    <section className="relative overflow-hidden border-b border-foreground/10 pb-20 pt-12">
      <BackdropGrid />
      <Container>
        <div className="relative mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--accent-cyan)]" />
            <span>open source · Claude Code skill · Python library</span>
          </div>
          <h1 className="font-display font-black leading-[0.88] tracking-[-0.055em] text-6xl sm:text-7xl md:text-8xl lg:text-[128px]">
            <span className="block">Quant Garage.</span>
            <span className="block">Pro research.</span>
            <span className="block">No terminal.</span>
          </h1>
        </div>

        <div className="relative grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          <div>
            <div className="max-w-2xl mb-10 space-y-4">
              <p className="text-lg md:text-xl text-foreground/70 font-normal leading-relaxed">
                Analyst-grade market research used to live behind expensive professional terminals. Now it runs in your Claude, or a Python notebook, grounded in live data and silent when the numbers won&rsquo;t support a take.
              </p>
              <p className="text-lg md:text-xl text-foreground/70 font-normal leading-relaxed">
                Eight one-command workflows chain multiple tools into a single market briefing. One prompt returns the regime, the risk, the upcoming earnings, the macro calendar, and the sector rotation. The read a research analyst would put together at 8am, computed on demand.
              </p>
              <p className="text-lg md:text-xl text-foreground/90 font-semibold leading-snug tracking-tight">
                Trade like a pro. Without the terminal.
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
                <span className="text-foreground/90 mr-1.5 tabular-nums">41</span>
                tools
              </span>
              <span className="text-foreground/20">·</span>
              <span>
                <span className="text-foreground/90 mr-1.5 tabular-nums">8</span>
                workflows
              </span>
              <span className="text-foreground/20">·</span>
              <span>
                <span className="text-foreground/90 mr-1.5 tabular-nums">1</span>
                key
              </span>
              <span className="text-foreground/20">·</span>
              <span>MIT</span>
            </div>
          </div>

          <HeroMosaic />
        </div>
      </Container>
    </section>
  );
}

function HeroMosaic() {
  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-3">
        <div className="translate-y-0">
          <RegimeCard />
        </div>
        <div className="translate-y-6">
          <DrilldownCard />
        </div>
        <div className="-translate-y-2">
          <VarianceCard />
        </div>
        <div className="translate-y-4">
          <AnalogCard />
        </div>
      </div>
      <div className="mt-4 text-xs text-foreground/45 font-light text-center lg:text-right">
        Four tool outputs. Same key. Same audit trail.
      </div>
    </div>
  );
}

function TerminalShell({
  slug,
  ts,
  children,
}: {
  slug: string;
  ts: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border border-white/10 bg-[#0a0a0a] text-[#d4d4d4] shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
        <span className="flex items-center gap-2">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
          {slug}
        </span>
        <span className="tabular-nums">{ts}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function RegimeCard() {
  return (
    <TerminalShell slug="market-regime" ts="09:31 EDT">
      <div className="space-y-3 text-[11px] font-mono leading-relaxed">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 bg-[#22c55e]/15 text-[#4ade80] uppercase tracking-[0.14em] text-[10px]">
            risk_on
          </span>
          <span className="text-white/40">composite</span>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10.5px]">
          <div className="text-white/50">SPY trend</div>
          <div className="text-white/90">uptrend_strong</div>
          <div className="text-white/50">VIX pct rank</div>
          <div className="text-white/90 tabular-nums">14th</div>
          <div className="text-white/50">breadth &gt; 50d</div>
          <div className="text-white/90 tabular-nums">9 / 11</div>
        </div>
        <div className="pt-2 border-t border-white/5 text-white/55 text-[10.5px]">
          <span className="text-white/40">reasons: </span>
          20/50/200 stacked, VIX 12.4, XLK &amp; XLC leading.
        </div>
      </div>
    </TerminalShell>
  );
}

function DrilldownCard() {
  return (
    <TerminalShell slug="earnings-drilldown NVDA" ts="Q1 preview">
      <div className="space-y-3 text-[11px] font-mono leading-relaxed">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-white/40 text-[10px] uppercase tracking-[0.14em]">
              implied move
            </div>
            <div className="text-white/95 text-lg tabular-nums">±7.2%</div>
          </div>
          <div className="text-right">
            <div className="text-white/40 text-[10px] uppercase tracking-[0.14em]">
              realized 8q
            </div>
            <div className="text-white/60 text-lg tabular-nums">±5.4%</div>
          </div>
        </div>
        <div className="h-1 bg-white/5">
          <div className="h-full bg-[#fbbf24]" style={{ width: "72%" }} />
        </div>
        <div className="pt-1 text-[10.5px] text-white/60">
          <span className="text-white/40">take: </span>
          straddle rich vs realized. PEAD t-stat 2.1, sign conditional on upside.
        </div>
      </div>
    </TerminalShell>
  );
}

function VarianceCard() {
  const rows = [
    { name: "ALLO", pct: 66, color: "bg-[#ef4444]" },
    { name: "NVDA", pct: 12, color: "bg-[#fbbf24]" },
    { name: "MSFT", pct: 8, color: "bg-white/60" },
    { name: "GOOGL", pct: 7, color: "bg-white/40" },
    { name: "AMZN", pct: 4, color: "bg-white/25" },
  ];
  return (
    <TerminalShell slug="risk-report" ts="var share">
      <div className="space-y-2 text-[11px] font-mono">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-2">
            <div className="w-10 text-white/80">{r.name}</div>
            <div className="flex-1 h-1.5 bg-white/5 relative">
              <div
                className={`h-full ${r.color}`}
                style={{ width: `${r.pct}%` }}
              />
            </div>
            <div className="w-9 text-right text-white/70 tabular-nums text-[10.5px]">
              {r.pct}%
            </div>
          </div>
        ))}
        <div className="pt-2 border-t border-white/5 text-[10.5px] text-white/55">
          <span className="text-white/40">flag: </span>
          ALLO concentration &gt; 50%. rebalancer suggests trim $66k.
        </div>
      </div>
    </TerminalShell>
  );
}

function AnalogCard() {
  const bars = [4, 7, 10, 14, 16, 12, 9, 5];
  const max = Math.max(...bars);
  return (
    <TerminalShell slug="historical-analog-finder" ts="k=20, SPY">
      <div className="space-y-2 text-[11px] font-mono">
        <div className="text-[10.5px] text-white/50 uppercase tracking-[0.14em]">
          fwd 252d return dist
        </div>
        <div className="flex items-end gap-1 h-14">
          {bars.map((b, i) => (
            <div
              key={i}
              className={`flex-1 ${
                i < 3 ? "bg-[#ef4444]/70" : "bg-[#22c55e]/70"
              }`}
              style={{ height: `${(b / max) * 100}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-white/40 tabular-nums">
          <span>-20%</span>
          <span>median +14.3%</span>
          <span>+40%</span>
        </div>
        <div className="pt-1 text-[10.5px] text-white/55">
          <span className="text-white/40">hit rate 252d: </span>
          <span className="text-white/90 tabular-nums">75%</span>
          <span className="text-white/40"> · analogs: </span>
          mid-2024, late-2021.
        </div>
      </div>
    </TerminalShell>
  );
}

function ClaudePath() {
  const asks: Array<{ say: string; loads: string; loadStyle: string }> = [
    {
      say: "preview NVDA earnings",
      loads: "earnings-drilldown",
      loadStyle: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    },
    {
      say: "should I trim ALLO?",
      loads: "risk-report",
      loadStyle: "bg-rose-500/10 text-rose-300 border border-rose-500/20",
    },
    {
      say: "what's the tape doing?",
      loads: "market-regime",
      loadStyle: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    },
    {
      say: "review my book",
      loads: "portfolio-review",
      loadStyle: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
    },
  ];
  return (
    <section className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="02" label="In Claude Code" />
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              Prompt an analyst who reads your book.
            </h2>
            <p className="text-lg text-foreground/70 font-normal leading-relaxed max-w-xl mb-8">
              The skills load automatically whenever the conversation touches markets. No slash commands, no invocation grammar. Ask what you&rsquo;d ask an analyst on your desk. Claude routes to the right tool, pulls the numbers, and writes the note.
            </p>
            <div className="space-y-2">
              {asks.map((t) => (
                <div
                  key={t.say}
                  className="group bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-lg px-5 py-4 grid grid-cols-[1fr_auto] gap-4 items-center transition-colors"
                >
                  <span className="text-foreground/90 text-[15px] font-light">
                    &ldquo;{t.say}&rdquo;
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-foreground/35">→</span>
                    <span className={`font-mono text-[11px] rounded-md px-2 py-0.5 leading-tight ${t.loadStyle}`}>
                      {t.loads}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <ClaudeTerminalMock />
        </div>
      </Container>
    </section>
  );
}

function ClaudeTerminalMock() {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 overflow-hidden">
      <div className="border-b border-white/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
          claude code
        </span>
        <span>quant-garage</span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-relaxed space-y-5 text-[#d4d4d4]">
        <div>
          <div className="text-white/40 text-[10.5px] uppercase tracking-[0.14em] mb-1">
            you
          </div>
          <div className="text-white/90">preview NVDA earnings</div>
        </div>
        <div>
          <div className="text-white/40 text-[10.5px] uppercase tracking-[0.14em] mb-2">
            claude
          </div>
          <div className="space-y-2 text-white/80">
            <div>
              running{" "}
              <span className="text-[#22d3ee]">earnings-drilldown NVDA</span>
              ...
            </div>
            <div className="text-white/60">
              implied ±7.2% vs realized 8q avg ±5.4%. PEAD t-stat 2.1,
              positive-sign conditional.
            </div>
            <div className="pt-1 text-white/95">
              <span className="text-white/40">take: </span>
              straddle rich vs realized. sell-side ranks pass on the print.
            </div>
            <div className="pt-2 text-white/40 text-[11px]">
              4 API calls · 340ms · fx.polygon.io/v3/reference/tickers/NVDA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PythonPath() {
  const destinations = [
    "Jupyter notebooks — return JSON, plot with pandas",
    "Slack bots — post the morning brief at 8am",
    "Cron jobs — daily portfolio-review after close",
    "Dashboards — Streamlit, Retool, anything that renders JSON",
  ];
  return (
    <section className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="03" label="In Python" />
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
          <PythonCodeMock />
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              Or skip Claude. Call the same function in Python.
            </h2>
            <p className="text-lg text-foreground/70 font-normal leading-relaxed max-w-xl mb-8">
              Every skill is an importable Python function that returns JSON. Same client, same audit trail, same fallback chain as the Claude path. Drop it wherever you already write code.
            </p>
            <div className="space-y-3 text-sm text-foreground/70 font-light">
              {destinations.map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <span className="text-foreground/30 mt-0.5 font-mono">→</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PythonCodeMock() {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 overflow-hidden">
      <div className="border-b border-white/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#fbbf24]" />
          notebook
        </span>
        <span>python 3.11</span>
      </div>
      <pre className="p-5 text-[13px] leading-relaxed font-mono overflow-x-auto text-[#d4d4d4]">
        <div className="text-white/40"># Cell 1 — the same tool Claude calls, imported.</div>
        <div>
          <span className="text-[#c084fc]">from</span> quant_garage.portfolio_review{" "}
          <span className="text-[#c084fc]">import</span> run
        </div>
        <div>&nbsp;</div>
        <div>
          <span className="text-white/95">report = run(book_csv=</span>
          <span className="text-[#fbbf24]">&quot;book.csv&quot;</span>
          <span className="text-white/95">)</span>
        </div>
        <div>
          <span className="text-white/95">print(report[</span>
          <span className="text-[#fbbf24]">&quot;headline&quot;</span>
          <span className="text-white/95">])</span>
        </div>
        <div>&nbsp;</div>
        <div className="text-white/45"># regime: risk_on (VIX 14th pct, breadth 9/11)</div>
        <div className="text-white/45"># variance top: ALLO 66% ⚠ flag</div>
        <div className="text-white/45"># next earnings: NVDA Thu 4:20p ET</div>
        <div className="text-white/45"># next macro: FOMC Wed 2:00p ET</div>
      </pre>
    </div>
  );
}

function WorkflowsSection() {
  return (
    <section className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="04" label="Eight one-command workflows" />
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-4">
              Start with a workflow. Get the whole read in one call.
            </h2>
            <p className="text-lg text-foreground/65 font-light leading-relaxed">
              Each one picks the right tools, chains them in order, and hands you back a single briefing. Point it at your watchlist or a single ticker.
            </p>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
            skills/*
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {WORKFLOWS.map((w) => (
            <div
              key={w.slug}
              className="group bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-xl p-6 md:p-7 flex flex-col gap-4 min-h-[170px] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`font-mono text-[11px] uppercase tracking-[0.15em] rounded-md px-2 py-0.5 leading-tight ${w.kindStyle}`}>
                  {w.kind}
                </span>
                <span className="font-mono text-[11px] text-foreground/45 tabular-nums ml-auto">
                  {w.runtime}
                </span>
              </div>
              <div className="font-mono text-base text-foreground/95">
                {w.name}
              </div>
              <div className="text-sm text-foreground/55 font-light leading-relaxed">
                {w.blurb}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PrimitivesSection() {
  return (
    <section className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="05" label="Forty-one primitives" />
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-4">
              The building blocks. Compose your own workflow.
            </h2>
            <p className="text-lg text-foreground/65 font-light leading-relaxed">
              Each is a standalone <code className="font-mono text-foreground/90">run() → dict</code> with the same client, timezone handling, audit-trail format, and significance thresholds.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {TOOL_GROUPS.map((g) => (
            <div
              key={g.label}
              className="group bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-xl p-6 md:p-7 flex flex-col gap-4 transition-colors"
            >
              <div className="flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-[0.18em] text-foreground/70">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${g.dot}`} aria-hidden="true" />
                <span>{g.label}</span>
                <span className="h-px flex-1 bg-foreground/[0.08]" />
                <span className="tabular-nums text-foreground/40">
                  {g.tools.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.tools.map((t) => (
                  <span
                    key={t}
                    className={`font-mono text-[12px] rounded-md px-2.5 py-1 leading-none ${g.tag}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="07" label="Why the layer exists" />
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              Every take is computed. Every number cites its call.
            </h2>
            <p className="text-lg text-foreground/65 font-light leading-relaxed mb-4">
              The whole difference between a research tool and a chatbot with a market-data plugin is that these tools refuse to fabricate when the data isn&rsquo;t there. They surface the endpoint and timestamp for each figure so you can retrace the reasoning.
            </p>
            <p className="text-sm text-foreground/55 font-light leading-relaxed">
              LLMs and agents work better on top of this surface than under it. Humans read a briefing, agents read a schema, both anchored to the same live citation trail.
            </p>
          </div>
          <div className="border border-white/[0.08] bg-white/[0.03] rounded-xl p-6 md:p-7 space-y-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
              What comes back with every take
            </div>
            <div className="space-y-3">
              {[
                {
                  label: "take",
                  value: "Straddle rich vs realized. PEAD t-stat 2.1.",
                },
                {
                  label: "supporting",
                  value:
                    "Implied ±7.2% vs realized 8q avg ±5.4%. Sign conditional on positive reaction.",
                },
                {
                  label: "endpoint",
                  value: "v3/reference/tickers/NVDA",
                  mono: true,
                },
                {
                  label: "timestamp",
                  value: "2026-07-13T09:31:07-04:00",
                  mono: true,
                },
                {
                  label: "sample",
                  value: "32 quarterly prints (8 years)",
                },
              ].map((row) => (
                <div key={row.label} className="grid grid-cols-[80px_1fr] gap-3 items-baseline">
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/40 pt-0.5">
                    {row.label}
                  </div>
                  <div
                    className={
                      row.mono
                        ? "font-mono text-[13px] text-foreground/85 leading-snug"
                        : "text-sm text-foreground/85 font-light leading-snug"
                    }
                  >
                    {row.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-foreground/55 font-light leading-relaxed border-t border-white/[0.06] pt-4">
              Any claim on the page can be verified against a live call in seconds. Same fields ship with every tool response.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PlanSection() {
  return (
    <section className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="08" label="What you need to run it" />
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-4">
              You need a Massive API key. Free works for most of it.
            </h2>
            <p className="text-lg text-foreground/65 font-light leading-relaxed">
              Every install needs a key. The Basic tier is free and runs 18 tools plus most workflows end to end. Stocks Starter at $29/month opens 38 of 41 tools and every workflow. Add-ons matter only for options data, live streaming, and Benzinga fundamentals.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className="group bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12] rounded-xl p-6 md:p-7 flex flex-col gap-3 transition-colors"
            >
              <div>
                <div className="text-base font-semibold text-foreground/95 mb-1">
                  {p.name}
                </div>
                <div className="font-mono text-sm text-foreground/65 tabular-nums">
                  {p.price}
                </div>
              </div>
              <div className="text-sm text-foreground/65 font-light leading-relaxed">
                {p.unlocks}
              </div>
              {p.note && (
                <div className="text-xs text-foreground/45 font-light leading-relaxed border-t border-foreground/[0.06] pt-3 mt-auto">
                  {p.note}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-foreground/45 font-light">
          Get a key at{" "}
          <a
            href="https://massive.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground underline underline-offset-4"
          >
            massive.com/pricing
          </a>
          . The PLAN-MATRIX file in the repo maps every tool to the exact plan and add-ons it needs.
        </div>
      </Container>
    </section>
  );
}

function InstallSection() {
  return (
    <section id="install" className="border-b border-foreground/10 py-24">
      <Container>
        <SectionEyebrow number="09" label="Install" />
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-[-0.03em] mb-6">
              Two ways to install. One key.
            </h2>
            <p className="text-lg text-foreground/65 font-light leading-relaxed mb-6">
              Grab a Massive key first. Then install the Python package, the Claude Code plugin, or both. Same functions, same audit trail, same JSON, whichever way you call them.
            </p>
            <ul className="space-y-3 text-sm text-foreground/70 font-light">
              {[
                "Works in a Jupyter notebook, a Slack bot, or a cron job",
                "Same code from Python, Claude Code, or any tool-use LLM",
                "SEC EDGAR fallback for earnings when Benzinga isn't wired",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[color:var(--accent-cyan)] mt-0.5 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <InstallBlock />
        </div>
      </Container>
    </section>
  );
}

function InstallBlock() {
  const lines: Array<
    | { kind: "comment"; text: string }
    | { kind: "cmd"; text: string }
    | { kind: "out"; text: string }
    | { kind: "prompt"; text: string }
    | { kind: "blank" }
  > = [
    { kind: "comment", text: "# 1. Get a Massive API key (free tier works)" },
    { kind: "comment", text: "#    massive.com/pricing" },
    { kind: "cmd", text: "export MASSIVE_API_KEY=your_key_here" },
    { kind: "blank" },
    { kind: "comment", text: "# 2a. Use it from Python" },
    { kind: "cmd", text: "pip install quant-garage" },
    { kind: "cmd", text: "python -m quant_garage.portfolio_review book.csv" },
    { kind: "blank" },
    { kind: "comment", text: "# 2b. Or install the Claude Code plugin" },
    { kind: "cmd", text: "claude plugin marketplace add https://github.com/rgourley/quant-garage" },
    { kind: "cmd", text: "/plugin install quant-garage" },
    { kind: "blank" },
    { kind: "comment", text: "# Then ask Claude in plain language" },
    { kind: "prompt", text: "review my book and flag anything I should look at" },
    { kind: "prompt", text: "preview NVDA earnings" },
    { kind: "prompt", text: "what's the tape doing?" },
  ];

  return (
    <div className="bg-[color:var(--muted)] border border-foreground/10 overflow-hidden">
      <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45">
        <span className="flex items-center gap-2">
          <Terminal className="w-3 h-3" />
          terminal
        </span>
        <span>zsh</span>
      </div>
      <pre className="p-5 text-[13px] leading-relaxed font-mono overflow-x-auto">
        {lines.map((l, i) => {
          if (l.kind === "blank") return <div key={i}>&nbsp;</div>;
          if (l.kind === "comment") {
            return (
              <div key={i} className="text-foreground/40">
                {l.text}
              </div>
            );
          }
          if (l.kind === "out") {
            return (
              <div key={i} className="text-foreground/55">
                {l.text}
              </div>
            );
          }
          if (l.kind === "prompt") {
            return (
              <div key={i} className="text-foreground/85">
                <span className="text-[#c084fc] mr-2">&gt;</span>
                {l.text}
              </div>
            );
          }
          return (
            <div key={i} className="text-foreground/90">
              <span className="text-[color:var(--accent-cyan)] mr-2">$</span>
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
            Built in the garage, not the trading floor.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              <Github className="w-4 h-4" />
              github.com/rgourley/quant-garage
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
