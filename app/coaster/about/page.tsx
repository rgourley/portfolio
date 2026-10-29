import Image from "next/image";
import type { Metadata } from "next";
import { Bungee } from "next/font/google";
import { ArrowUpRight } from "lucide-react";

// The ride at /coaster stays full screen. This page explains it and gives search engines text to index.

const display = Bungee({ weight: "400", subsets: ["latin"], display: "swap" });

const PAGE_PATH = "/coaster/about";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.robertcreative.com";
const PAGE_TITLE = "How Market Coaster works: real stock charts as roller coasters";
const PAGE_DESCRIPTION =
  "A 3D roller coaster built from real market data. Ride the GME squeeze, the Flash Crash, or any US stock's last session minute by minute. Gaps become loops, wide bars become corkscrews.";
const OG_IMAGE = "/images/coaster/og.jpg";
const OG_IMAGE_ALT =
  "The Market Coaster sign over a front-seat view of the track climbing between blue supports, with another track sweeping overhead";
const HERO_IMAGE = "/images/coaster/hero.jpg";
const HERO_ALT =
  "A whole roller coaster built from GME's squeeze week, circling a lake, with the Massive blimp overhead and mountains behind";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Market Coaster",
    "stock market roller coaster",
    "ride a stock chart",
    "three.js roller coaster",
    "GME squeeze",
    "Flash Crash",
    "market data visualization",
    "Massive API",
    "Robert Gourley",
  ],
  authors: [{ name: "Robert Gourley", url: "https://github.com/rgourley" }],
  creator: "Robert Gourley",
  publisher: "Robert Gourley",
  category: "games",
  alternates: { canonical: PAGE_PATH },
  icons: { icon: "/coaster/favicon.svg", apple: "/coaster/apple-touch-icon.png" },
  openGraph: {
    title: "How Market Coaster works",
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    siteName: "Market Coaster",
    type: "website",
    locale: "en_US",
    images: [{ url: `${SITE_URL}${OG_IMAGE}`, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Market Coaster works",
    description: PAGE_DESCRIPTION,
    creator: "@rgourley",
    images: [{ url: `${SITE_URL}${OG_IMAGE}`, alt: OG_IMAGE_ALT }],
  },
};

type Shot = { src: string; alt: string; caption: string };

const SHOTS: Shot[] = [
  {
    src: "/images/coaster/rider.jpg",
    alt: "Front-seat view down a steep drop on Tesla's election swing, at 62 mph",
    caption: "Rider view on Tesla's election swing. The strip at the bottom is the real chart, with the train's place on it.",
  },
  {
    src: "/images/coaster/chase.jpg",
    alt: "Riders with their hands up in the back cars, heading toward a loop built from a 10.4% gap down",
    caption: "Chase camera on the Covid Crash. The sign ahead marks a 10.4% gap down on March 16, 2020. It becomes a loop.",
  },
  {
    src: "/images/coaster/menu.jpg",
    alt: "The start screen, with a ticker search, the most active tickers and famous rides as cards",
    caption: "Search any ticker, pick one of the session's most active names, or take a famous ride.",
  },
  {
    src: "/images/coaster/stats.jpg",
    alt: "The end-of-ride card with Excitement, Intensity and Nausea ratings and ride stats",
    caption: "Every ride ends with ratings and stats, measured from what the train did on the market part of the track.",
  },
];

// Massive markets. Each one has a free Basic plan.
const MARKETS: Array<{ name: string; href: string }> = [
  { name: "Stocks", href: "https://massive.com/stocks" },
  { name: "Options", href: "https://massive.com/options" },
  { name: "Indices", href: "https://massive.com/indices" },
  { name: "Currencies and crypto", href: "https://massive.com/currencies" },
  { name: "Futures", href: "https://massive.com/futures" },
];

const CONTROLS: Array<[string, string]> = [
  ["1, 2, 3", "Rider, Chase and Cinema cameras. V cycles them."],
  ["C", "Move to the next car. Clicking Rider again does the same."],
  ["Drag", "Look around from your seat. In Cinema, drag rotates and WASD pans."],
  ["Space", "Pause. F changes the speed, R restarts."],
  ["H", "Hide the HUD for a clean view."],
  ["M", "Mute. U switches mph and km/h."],
];

function Container({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className="max-w-[1200px] mx-auto px-6 sm:px-12">{children}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="inline-flex items-center gap-2 mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
      <span className="h-1.5 w-1.5 rounded-full bg-[#ffd166]" />
      <span>{children}</span>
    </div>
  );
}

function RideButton({ label }: { label: string }): JSX.Element {
  return (
    <a
      href="/coaster"
      className="group inline-flex items-center gap-2 rounded-lg bg-[#ffd166] px-5 py-3 text-sm font-semibold text-[#1c1606] hover:bg-[#ffdc85] transition-colors"
    >
      {label}
      <ArrowUpRight className="w-4 h-4 -mr-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

export default function CoasterAboutPage(): JSX.Element {
  const pageUrl = `${SITE_URL}${PAGE_PATH}`;
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Market Coaster",
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/coaster`,
    image: `${SITE_URL}${OG_IMAGE}`,
    gamePlatform: "Web browser",
    applicationCategory: "Game",
    isAccessibleForFree: true,
    author: { "@type": "Person", name: "Robert Gourley", url: SITE_URL },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
      { "@type": "ListItem", position: 3, name: "Market Coaster", item: pageUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <div className="pt-28 pb-24 bg-[#0b1218] text-white">
        <Container>
          <Eyebrow>Real market data · Free to ride</Eyebrow>
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-end mb-12">
            <h1 className={`${display.className} text-5xl sm:text-6xl md:text-7xl leading-[0.95] text-[#ffd166]`}>
              Market Coaster
            </h1>
            <div>
              <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-6">
                Ride a real stock chart as a 3D roller coaster. Every climb and drop is actual price history from
                Massive, so the GME squeeze feels like the GME squeeze.
              </p>
              <RideButton label="Ride it" />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <Image
              src={HERO_IMAGE}
              alt={HERO_ALT}
              width={1440}
              height={900}
              priority
              sizes="(min-width: 1200px) 1104px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </Container>

        <section className="py-20 border-b border-white/10">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <Eyebrow>The real chart</Eyebrow>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                  The bigger the move, the bigger the ride.
                </h2>
              </div>
              <div className="space-y-5 text-lg text-white/70 leading-relaxed">
                <p>
                  The track follows the closing price, bar by bar. A quiet day is a gentle family ride. A day that
                  doubles is over 300 feet tall.
                </p>
                <p>
                  When a stock gaps up or down overnight, you go through a loop. A bar with a huge high-to-low swing
                  becomes a corkscrew. The card in the corner shows the exact open, high, low and close under the
                  train.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 border-b border-white/10">
          <Container>
            <div className="grid sm:grid-cols-2 gap-6">
              {SHOTS.map((s) => (
                <figure key={s.src}>
                  <div className="overflow-hidden rounded-xl border border-white/10">
                    <Image src={s.src} alt={s.alt} width={1440} height={900} sizes="(min-width: 640px) 50vw, 100vw" className="h-auto w-full" />
                  </div>
                  <figcaption className="mt-3 text-sm text-white/55 leading-relaxed">{s.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 border-b border-white/10">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <Eyebrow>Any ticker</Eyebrow>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-6">
                  Search a stock and ride its last session, minute by minute.
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  Type a symbol or a company name, like NVDA or Apple. The ride uses that day&apos;s real 1-minute
                  bars from the open to the close.
                </p>
              </div>
              <div>
                <Eyebrow>Famous rides</Eyebrow>
                <p className="text-lg text-white/70 leading-relaxed">
                  The GME squeeze, the 2010 Flash Crash, the Covid crash, Bitcoin&apos;s 2017 mania and more,
                  picked for the wildest swings.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 border-b border-white/10">
          <Container>
            <Eyebrow>Controls</Eyebrow>
            <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CONTROLS.map(([key, text]) => (
                <div key={key} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <dt className="font-mono text-sm text-[#ffd166] mb-1">{key}</dt>
                  <dd className="text-white/65 leading-relaxed">{text}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-start">
              <div>
                <Eyebrow>The data</Eyebrow>
                <p className="text-lg text-white/70 leading-relaxed mb-5">
                  Every price comes from{" "}
                  <a href="https://massive.com" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                    Massive
                  </a>
                  , split-adjusted.
                </p>
                <p className="text-lg text-white/70 leading-relaxed mb-6">
                  Massive covers far more than this ride uses. Each market has a free Basic plan with 5 API calls a
                  minute, and paid plans add more history and higher limits. The{" "}
                  <a href="https://massive.com/pricing" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                    pricing
                  </a>{" "}
                  is public and self-serve.
                </p>
                <ul className="flex flex-wrap gap-2">
                  {MARKETS.map((m) => (
                    <li key={m.href}>
                      <a
                        href={m.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/80 hover:border-[#ffd166] hover:text-white transition-colors"
                      >
                        {m.name}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-white/80 leading-relaxed mb-5">
                  Built by Robert Gourley. Historical prices from finished sessions, never live. For fun only, not
                  financial advice.
                </p>
                <RideButton label="Ride Market Coaster" />
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
