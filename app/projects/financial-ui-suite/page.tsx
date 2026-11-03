import type { Metadata } from "next";
import type { ReactNode } from "react";
import Page from "@/components/Page";
import DotImage from "@/components/DotImage";
import StructuredData from "@/components/StructuredData";
import Term, { type TermLine } from "@/components/Term";
import { pageSchema } from "@/lib/schema";
import { GH, PATT, STY } from "@/lib/financial-ui-suite";
import { agentMarkdown } from "@/lib/agent-views";

const PAGE_PATH = "/projects/financial-ui-suite";
const PAGE_TITLE = "Financial UI Suite | 14 Styles, No AI Defaults";
const PAGE_DESCRIPTION =
  "A Claude Code plugin: 17 correctness references and 14 design styles modelled on Bloomberg, TradingView, Robinhood and FT. No more generic AI dashboards.";

export const metadata: Metadata = {
  alternates: { canonical: PAGE_PATH },
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, url: PAGE_PATH },
};

const ANTI: [string, string][] = [
  ["text-emerald-400", "Raw colour values instead of semantic up and down tokens."],
  ["price.toFixed(2)", "Breaks BTC (no decimals at $100K) and SHIB (needs eight)."],
  ["bg-${color}-500/10", "Dynamic Tailwind classes silently dropped by JIT."],
  ["<span>{price}</span>", "No tabular-nums. Digits jitter on every tick."],
  ["ws.onmessage = render", "No throttle, no staleness, no reconnect indicator."],
  ["color === 'green' ? up : down", "Red and green only fails 8% of male users."],
];

const TRIG: [string, string][] = [
  ["build a portfolio holdings table", "financial-ui-patterns"],
  ["design an options chain in TradingView style", "patterns + modern-pro-dark"],
  ["make it look like Bloomberg terminal", "pro-terminal"],
  ["render an FT-style market wrap", "editorial-financial"],
];

const md = agentMarkdown("/projects/financial-ui-suite");

function Sec({ n, title, children }: { n: string; title: string; children: ReactNode }) {
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

const TREE_LINES: TermLine[] = [
  ["$", "tree skills/"],
  ["", "skills/"],
  ["", "  financial-ui-patterns   # correctness, always on"],
  ["", "  financial-ui-styles     # pick exactly one"],
  ["c", "# loads on its own when the agent sees:"],
  ["c", "# prices, P&L, order books, holdings, charts, ticks, watchlists"],
];

const INSTALL_LINES: TermLine[] = [
  ["c", "# Add the marketplace from GitHub"],
  ["$", "claude plugin marketplace add https://github.com/rgourley/financial-ui-suite"],
  ["", ""],
  ["c", "# Install the plugin"],
  ["$", "/plugin install financial-ui-suite@financial-ui-suite-dev"],
  ["", ""],
  ["c", "# Then ask Claude in plain language"],
  ["p", "build a portfolio holdings table"],
  ["p", "make it look like Bloomberg terminal"],
  ["", ""],
  ["c", "# Optional: verify an existing codebase"],
  ["$", "./scripts/verify-financial-ui.sh ../my-app/src"],
];

export default function FinancialUiSuitePage() {
  return (
    <Page agent={md}>
      <StructuredData
        data={pageSchema({
          path: "/projects/financial-ui-suite",
          name: "Financial UI Suite",
          description: PAGE_DESCRIPTION,
          crumbs: [
            ["Projects", "/projects"],
            ["Financial UI Suite", "/projects/financial-ui-suite"],
          ],
        })}
      />
      <article className="sheet">
        <span className="k lead-k">Financial UI Suite &middot; open source &middot; a Claude Code plugin</span>
        <h1>Financial UI, 14 styles. No AI defaults.</h1>
        <p className="dek">A Claude Code plugin with two skills. One covers the correctness rules AI tools usually miss: tabular-nums, per-asset number formatting, streaming state, timezone-aware timestamps, and colourblind-safe up and down colours. The other picks one of 14 design styles, each modelled on a real trading product.</p>
        <div className="body2">
          <p>The skills load on their own whenever Claude touches prices, P&amp;L, order books, holdings or streaming market data. No slash commands, no special syntax. Ask what you would ask a designer. It stops the AI from shipping the same dashboard every time.</p>
        </div>
        <div className="chips">
          <span>2 skills</span>
          <span>17 references</span>
          <span>14 styles</span>
          <span>MIT</span>
          <span>built for Massive</span>
        </div>
        <p style={{ marginTop: 28 }}>
          <a className="big" href={GH} target="_blank" rel="noopener">
            View on GitHub<i>&rarr;</i>
          </a>
        </p>

        <figure>
          <DotImage
            src="/images/fui/modern-pro-dark.png"
            w={1100}
            h={532}
            cell={6}
            priority hero
            alt="Modern Pro Dark"
            sizes="(max-width: 900px) 100vw, 880px"
          />
          <figcaption>Modern Pro Dark: the same NVDA ticker page in the TradingView and Kraken Pro idiom.</figcaption>
        </figure>

        <Sec n="01" title="Two skills. One purpose.">
          <div className="body2">
            <p><span className="code">financial-ui-patterns</span> always loads. It holds the correctness rules every serious trading product follows. <span className="code">financial-ui-styles</span> picks one of 14 design styles, so the result does not look like every other AI dashboard. Patterns load every time. One style per product. Combine them in plain English: &ldquo;build an options chain in TradingView style.&rdquo;</p>
          </div>
          <Term lines={TREE_LINES} />
        </Sec>

        <Sec n="02" title="Six bugs Claude writes on its own">
          <div className="body2">
            <p>Ask Claude for a trading UI without the plugin and it writes every line below. Each one breaks something real users see.</p>
          </div>
          <ul className="xs">
            {ANTI.map(([b, w]) => (
              <li key={b}>
                <span className="code">{b}</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </Sec>

        <Sec n="03" title="17 references for the parts AI tools miss">
          <div className="body2">
            <p>Pulled from how Bloomberg, Kraken, TradingView, Coinbase, FT, Robinhood and TastyTrade actually ship. Not opinion. Conventions.</p>
          </div>
          <ul className="list2">
            {PATT.map(([f, n], i) => (
              <li key={f}>
                <i>{String(i + 1).padStart(2, "0")}</i>
                <div>
                  <span className="code" style={{ color: "var(--ink)" }}>{f}.md</span>
                  <span>{n}</span>
                </div>
              </li>
            ))}
          </ul>
        </Sec>

        <Sec n="04" title="Every style is modelled on a real product">
          <div className="body2">
            <p>Four featured styles rendered as full product screens on the same NVDA ticker. Ten more ship in the plugin as complete reference sets.</p>
          </div>
          <div className="grid2">
            <figure>
              <DotImage
                src="/images/fui/pro-terminal.png"
                w={1100}
                h={484}
                cell={5}
                alt="Pro Terminal"
                sizes="(max-width: 860px) 100vw, 430px"
              />
              <figcaption>Pro Terminal: amber on black, monospaced, dense. Bloomberg, IBKR TWS, ThinkOrSwim.</figcaption>
            </figure>
            <figure>
              <DotImage
                src="/images/fui/retail-polish-dark.png"
                w={1100}
                h={574}
                cell={5}
                alt="Retail Polish Dark"
                sizes="(max-width: 860px) 100vw, 430px"
              />
              <figcaption>Retail Polish Dark: friendly geometry, oversized type. Robinhood, Public.</figcaption>
            </figure>
          </div>
          <div className="grid2">
            <figure>
              <DotImage
                src="/images/fui/editorial-financial.png"
                w={1100}
                h={512}
                cell={5}
                alt="Editorial Financial"
                sizes="(max-width: 860px) 100vw, 430px"
              />
              <figcaption>Editorial Financial: salmon paper, serif headlines. FT, Bloomberg.com, WSJ.</figcaption>
            </figure>
            <figure>
              <DotImage
                src="/images/fui/api-dashboard.png"
                w={1100}
                h={784}
                cell={5}
                alt="API Dashboard"
                sizes="(max-width: 860px) 100vw, 430px"
              />
              <figcaption>API Dashboard: crisp grids, doc-first. Massive, Stripe, Vercel, Linear.</figcaption>
            </figure>
          </div>
          <ul className="kv">
            {STY.map(([s, n, b, cols, v]) => (
              <li key={s}>
                <b className="name">
                  <span className="sw">
                    {cols.map((c, i) => (
                      <i key={i} style={{ background: c }} />
                    ))}
                  </span>
                  {n}
                </b>
                <span>
                  <span className="code">{s}</span> &nbsp; {b}
                  <br />
                  <span style={{ color: "var(--ink-dim)" }}>{v}</span>
                </span>
              </li>
            ))}
          </ul>
        </Sec>

        <Sec n="05" title="Talk to it like a person">
          <div className="body2">
            <p>No special syntax. The agent reads the request, loads the right reference, and writes against it. Name a brand to pick a style.</p>
          </div>
          <ul className="kv">
            {TRIG.map(([s, l]) => (
              <li key={s}>
                <b className="plain">&ldquo;{s}&rdquo;</b>
                <span className="code">loads {l}</span>
              </li>
            ))}
          </ul>
        </Sec>

        <Sec n="06" title="Two commands">
          <div className="body2">
            <p>Add the marketplace, then install the plugin. The skills load on their own whenever Claude touches financial UI. Works on any Claude Code project, with React and Tailwind examples and framework-agnostic rules, and a verify script that flags the common mistakes.</p>
          </div>
          <Term lines={INSTALL_LINES} />
        </Sec>

        <Sec n="07" title="The NVDA prices on this page are fake. Massive’s are not.">
          <div className="body2">
            <p>A real build needs real trades, quotes and bars behind it. Massive serves that data: real-time and historical trades, quotes, OHLC bars, options chains, futures and fundamentals across stocks, crypto, FX and indices. There is a free tier, so the first build can run on a real feed. The plugin&rsquo;s api-dashboard style is modelled in part on the Massive dashboard.</p>
            <p>
              <a href="https://massive.com" target="_blank" rel="noopener">massive.com</a> &nbsp;{" "}
              <a href="https://massive.com/docs" target="_blank" rel="noopener">Read the API docs</a>
            </p>
          </div>
        </Sec>

        <Sec n="08" title="Ship something that does not look generated">
          <p>
            <a className="big" href={GH} target="_blank" rel="noopener">
              github.com/rgourley/financial-ui-suite<i>&rarr;</i>
            </a>
          </p>
          <p className="nda">MIT, by Robert Gourley.</p>
        </Sec>
      </article>
    </Page>
  );
}
