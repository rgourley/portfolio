import type { Metadata } from "next";
import type { ReactNode } from "react";
import Page from "@/components/Page";
import Pic from "@/components/Pic";
import StructuredData from "@/components/StructuredData";
import { CTRL } from "@/lib/coaster-about";
import { agentMarkdown } from "@/lib/agent-views";

// The ride at /coaster stays full screen. This page explains it and gives search engines text to index.

const PAGE_PATH = "/coaster/about";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.robertcreative.com";
const PAGE_TITLE = "How Market Coaster works: real stock charts as roller coasters";
const PAGE_DESCRIPTION =
  "A 3D roller coaster built from real market data. Ride the GME squeeze, the Flash Crash, or any US stock's last session minute by minute. Gaps become loops, wide bars become corkscrews.";
const OG_IMAGE = "/images/coaster/og.jpg";
const OG_IMAGE_ALT =
  "The Market Coaster sign over a front-seat view of the track climbing between blue supports, with another track sweeping overhead";

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

const MKTS: Array<[string, string]> = [
  ["Stocks", "https://massive.com/stocks"],
  ["Options", "https://massive.com/options"],
  ["Indices", "https://massive.com/indices"],
  ["Currencies and crypto", "https://massive.com/currencies"],
  ["Futures", "https://massive.com/futures"],
];

const md = agentMarkdown("/coaster/about");

function Sec({ n, title, children }: { n: string; title: string; children: ReactNode }): JSX.Element {
  return (
    <section className="sec">
      <h2>
        <small>{n}</small>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Shot({ src, caption }: { src: string; caption: string }): JSX.Element {
  return (
    <figure>
      <Pic src={src} w={1440} h={900} alt={caption} sizes="(max-width: 860px) 100vw, 430px" />
      <figcaption>{caption}</figcaption>
    </figure>
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
    <Page agent={md}>
      <StructuredData data={appSchema} />
      <StructuredData data={breadcrumbSchema} />
      <article className="sheet">
        <span className="k lead-k">Market Coaster · real market data · free to ride</span>
        <h1>Market Coaster</h1>
        <p className="dek">
          Ride a real stock chart as a 3D roller coaster. Every climb and drop is actual price history from Massive,
          so the GME squeeze feels like the GME squeeze.
        </p>
        <p>
          <a className="big" href="/coaster">
            Take a ride<i>&rarr;</i>
          </a>
        </p>
        <figure>
          <Pic
            src="/images/coaster/hero.jpg"
            w={1440}
            h={900}
           
            priority
            alt="A roller coaster built from GME's squeeze week"
            sizes="(max-width: 900px) 100vw, 880px"
          />
          <figcaption>
            A whole roller coaster built from GME’s squeeze week, circling a lake, with the Massive blimp overhead
            and mountains behind.
          </figcaption>
        </figure>

        <Sec n="01" title="The bigger the move, the bigger the ride">
          <div className="body2">
            <p>
              The track follows the closing price, bar by bar. A quiet day is a gentle family ride. A day that doubles
              is over 300 feet tall.
            </p>
            <p>
              When a stock gaps up or down overnight, you go through a loop. A bar with a huge high-to-low swing
              becomes a corkscrew. The card in the corner shows the exact open, high, low and close under the train.
            </p>
          </div>
          <div className="grid2">
            <Shot
              src="/images/coaster/rider.jpg"
              caption="Rider view on Tesla’s election swing. The strip at the bottom is the real chart, with the train’s place on it."
            />
            <Shot
              src="/images/coaster/chase.jpg"
              caption="Chase camera on the Covid Crash. The sign ahead marks a 10.4% gap down on March 16, 2020. It becomes a loop."
            />
          </div>
        </Sec>

        <Sec n="02" title="Search a stock and ride its last session, minute by minute">
          <div className="body2">
            <p>
              Type a symbol or a company name, like NVDA or Apple. The ride uses that day’s real 1-minute bars from the
              open to the close. Famous rides: the GME squeeze, the 2010 Flash Crash, the Covid crash, Bitcoin’s 2017
              mania and more, picked for the wildest swings.
            </p>
          </div>
          <div className="grid2">
            <Shot
              src="/images/coaster/menu.jpg"
              caption="Search any ticker, pick one of the session’s most active names, or take a famous ride."
            />
            <Shot
              src="/images/coaster/stats.jpg"
              caption="Every ride ends with ratings and stats, measured from what the train did on the market part of the track."
            />
          </div>
        </Sec>

        <Sec n="03" title="Controls">
          <ul className="kv">
            {CTRL.map(([k, t]) => (
              <li key={k}>
                <b className="code">{k}</b>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Sec>

        <Sec n="04" title="The data">
          <div className="body2">
            <p>
              Every price comes from{" "}
              <a href="https://massive.com" target="_blank" rel="noopener">
                Massive
              </a>
              , split-adjusted. Massive covers far more than this ride uses. Each market has a free Basic plan with 5
              API calls a minute, and paid plans add more history and higher limits. The{" "}
              <a href="https://massive.com/pricing" target="_blank" rel="noopener">
                pricing
              </a>{" "}
              is public and self-serve.
            </p>
          </div>
          <div className="chips">
            {MKTS.map(([n, u]) => (
              <span key={u}>
                <a href={u} target="_blank" rel="noopener">
                  {n}
                </a>
              </span>
            ))}
          </div>
          <p className="nda">
            Built by Robert Gourley. Historical prices from finished sessions, never live. For fun only, not financial
            advice.
          </p>
        </Sec>
      </article>
    </Page>
  );
}
