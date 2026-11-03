import type { Metadata } from "next";
import Page from "@/components/Page";
import DotImage from "@/components/DotImage";
import StructuredData from "@/components/StructuredData";
import Term from "@/components/Term";
import type { TermLine } from "@/components/Term";
import { pageSchema } from "@/lib/schema";

const GH = "https://github.com/rgourley/quant-garage";
const DESCRIPTION = "Forty-two tools and thirteen one-command workflows for equity research, sizing and risk, from Claude or Python. Every number cites the live API call it came from.";

export const metadata: Metadata = {
  alternates: { canonical: "/projects/quant-garage" },
  title: "Quant Garage | Pro Research, No Terminal",
  description: DESCRIPTION,
  openGraph: { title: "Quant Garage", description: DESCRIPTION, url: "/projects/quant-garage" },
};

const AUD: [string, string, string][] = [
  ["AI and agents", "LLM and agent developers.", "Every tool returns JSON matching a schema. Drop it into your tool-use loop and the model gets structured research instead of hallucinated finance. Ships as Claude Code skills; works with any tool-use LLM."],
  ["Claude Code", "Traders who work in Claude.", 'Ask what you would ask a colleague. "Preview NVDA earnings." "Should I trim ALLO?" The skill loads whenever the conversation touches markets. Sell-side output up top, cite trail underneath every take.'],
  ["Retail", "Investors with a real book.", "$50K to a few million. No Bloomberg, no time to babysit a spreadsheet. Get sell-side-quality briefings on the names you actually hold: morning brief, earnings preview, portfolio review."],
  ["Fintech and dev", "Developers building on Massive.", "Reference implementation for the Massive API. Retry logic, fallback chains, timezone handling, audit-trail format. Read the source or fork it and ship your own."],
];

const ASKS: [string, string][] = [
  ["preview NVDA earnings", "earnings-drilldown"],
  ["should I trim ALLO?", "risk-report"],
  ["what is the tape doing?", "market-regime"],
  ["review my book", "portfolio-review"],
];

const WFL: [string, string, string, string][] = [
  ["portfolio-review", "~90s", "deep dive", "The full book review in one call. Chains market-regime, sector rotation, risk report, earnings blackout, macro calendar, 8-K scanner, rebalancer."],
  ["weekly-brief", "~30s", "weekly", "Sunday-night watchlist prep. Regime, rotation, macro calendar, earnings blackout across a 7-day window. Frames the week."],
  ["morning-brief", "~15s", "daily", "60-second daily open. Regime, macro today plus tomorrow, news scan per watchlist ticker. Cron it at 8am."],
  ["preflight-trade", "~30s", "pre-trade", "Before you hit execute. Ticker plus intent. Technical read, earnings blackout, news, corporate actions. Verdict: go, wait, review."],
  ["earnings-week-prep", "~2 min", "earnings", "For weeks where four of your names print in five days. Earnings blackout on the watchlist, then drilldown plus technical read for the top prints."],
  ["historical-comparison", "~20s", "analog", "Twin decision support. Event study on the specific event plus historical analogs on the market regime. Two anchors, not one."],
  ["scan-and-frame", "~30s", "discovery", "Regime-framed idea generation. Regime context, universe screen, relative-strength rank on the top N. Factor pass optional."],
  ["stock-one-pager", "~10s", "single-name", "Retail-tier single-name card. Technical read plus earnings blackout plus regime, translated into plain language. Every claim gated to data."],
];

const TOOLS: [string, string[]][] = [
  ["Earnings", ["earnings-drilldown", "event-study", "earnings-blackout"]],
  ["Equity research and valuation", ["pitch-comps", "valuation-sanity-check", "position-sizer"]],
  ["Quant and screening", ["technical-briefing", "universe-builder", "factor-research", "relative-strength", "pairs-scanner", "hurst-exponent", "change-point-detector", "signal-decay", "rough-vol-forecast"]],
  ["Market context", ["market-regime", "sector-rotation-signal", "macro-event-calendar", "historical-analog-finder"]],
  ["Trading and execution", ["options-flow", "zero-dte-gamma", "news-scanner", "slippage-cost", "options-structure-analyzer"]],
  ["Risk and ops", ["portfolio-mark", "risk-report", "mc-portfolio-simulator", "portfolio-rebalancer", "corporate-actions-scanner", "corp-actions-reconciler", "t+1-settlement-prep"]],
  ["Filings and ownership", ["8-k-scanner", "risk-factor-delta", "filing-sentiment", "insider-flow", "manager-portfolio-diff", "guidance-tracker", "analyst-tracker"]],
  ["Backtesting and crypto", ["backtest-data-prep", "crypto-vol-scanner"]],
];

// name, citation, what it does, live result
const SPOT: [string, string, string, string][] = [
  ["change-point-detector", "Adams and MacKay, 2007", "Bayesian Online Change-Point Detection on daily log returns. Flags the exact dates where the return-generating distribution shifted, with posterior confidence and per-segment vol.", "Live on ALLO: detected a regime break on 2026-04-14 with 99.65% confidence. That was the exact day of the ALPHA3 trial futility announcement."],
  ["rough-vol-forecast", "Bayer, Friz and Gatheral, 2016", "Under rough volatility, realised vol scales as h^H with H around 0.14, much slower than sqrt(t). Ships the rough forecast alongside Brownian and EWMA for direct comparison.", "On SPY: 120-day vol drops from 11.66% (traditional) to 2.08% (rough), a 5x reduction that reshapes how you size long-horizon scenarios."],
  ["zero-dte-gamma", "Baltussen, Terhorst and Van Vliet, 2024", "Estimates net dealer gamma exposure for same-day-expiry SPY, SPX, QQQ and IWM options. Identifies pin strikes and gamma-regime flip levels driving intraday moves.", "Live SPY 2026-07-13 expiry: dealers net short $1.25B gamma at $759 pins with 9,412 open interest. Expect intraday moves to accelerate rather than mean-revert."],
  ["signal-decay", "Israel, Moskowitz and Ross, 2024", "Rolling 63-day IC vs 5-day forward returns over a 5-year window. Fits exponential decay to the IC series and reports the half-life plus a full performance tearsheet.", "SPY mean-reversion IC flipped from +0.06 early quarter to -0.16 recent quarter. The classic short-horizon effect has completely reversed sign this cycle."],
];

const TRUST: [string, string][] = [
  ["take", "Straddle rich vs realized. PEAD t-stat 2.1."],
  ["supporting", "Implied ±7.2% vs realized 8q avg ±5.4%. Sign conditional on positive reaction."],
  ["endpoint", "v3/reference/tickers/NVDA"],
  ["timestamp", "2026-07-13T09:31:07-04:00"],
  ["sample", "32 quarterly prints (8 years)"],
];

const PLANS: [string, string, string, string][] = [
  ["Basic (free)", "$0", "21 tools plus most workflows end to end", "5 calls a minute, end-of-day data, SEC EDGAR fallback for earnings"],
  ["Stocks Starter", "$29 a month", "39 of 42 tools, every workflow composite", "unlimited rate, 15-minute delayed real-time, bulk grouped aggregates"],
  ["Options Developer", "$79 a month add-on", "options-flow, options-structure-analyzer, full earnings-drilldown", ""],
  ["Stocks Advanced", "$199 a month", "Live-mode portfolio-mark on the WebSocket feed", ""],
];

const AGENT_TEXT = `- what: 42 tools and 13 one-command workflows for equity research, sizing and risk; Claude Code skills and a Python library; every number cites the live API call it came from
- repo: ${GH}
- workflows: ${WFL.map(([n]) => n).join(", ")}
- tools: ${TOOLS.map(([g, ts]) => `${g}: ${ts.join(", ")}`).join("; ")}
- key: Massive API, free tier runs 21 tools`;

const TERM_02: TermLine[] = [
  ["c", "claude code · quant-garage"],
  ["p", "preview NVDA earnings"],
  ["c", "running earnings-drilldown NVDA ..."],
  ["", "implied ±7.2% vs realized 8q avg ±5.4%. PEAD t-stat 2.1, positive-sign conditional."],
  ["", "take: straddle rich vs realized. sell-side ranks pass on the print."],
  ["c", "4 API calls · 340ms · fx.polygon.io/v3/reference/tickers/NVDA"],
];

const TERM_03: TermLine[] = [
  ["c", "# Cell 1: the same tool Claude calls, imported."],
  ["", "from quant_garage.portfolio_review import run"],
  ["", 'report = run(book_csv="book.csv")'],
  ["", 'print(report["headline"])'],
  ["c", "# regime: risk_on (VIX 14th pct, breadth 9/11)"],
  ["c", "# variance top: ALLO 66%, flag"],
  ["c", "# next earnings: NVDA Thu 4:20p ET"],
  ["c", "# next macro: FOMC Wed 2:00p ET"],
];

const TERM_09: TermLine[] = [
  ["c", "# 1. Get a Massive API key (free tier works)"],
  ["c", "# massive.com/pricing"],
  ["$", "export MASSIVE_API_KEY=your_key_here"],
  ["", ""],
  ["c", "# 2a. Use it from Python"],
  ["$", "pip install quant-garage"],
  ["$", "python -m quant_garage.portfolio_review book.csv"],
  ["", ""],
  ["c", "# 2b. Or install the Claude Code plugin"],
  ["$", "claude plugin marketplace add https://github.com/rgourley/quant-garage"],
  ["$", "/plugin install quant-garage"],
  ["", ""],
  ["c", "# Then ask Claude in plain language"],
  ["p", "review my book and flag anything I should look at"],
  ["p", "preview NVDA earnings"],
  ["p", "what's the tape doing?"],
];

export default function QuantGaragePage() {
  return (
    <Page agentTitle="Quant Garage" agent={AGENT_TEXT}>
      <StructuredData
        data={pageSchema({
          path: "/projects/quant-garage",
          name: "Quant Garage",
          description: DESCRIPTION,
          crumbs: [
            ["Projects", "/projects"],
            ["Quant Garage", "/projects/quant-garage"],
          ],
        })}
      />
      <article className="sheet">
        <span className="k lead-k">Quant Garage · open source · Claude Code skill · Python library</span>
        <h1>Pro research. No terminal.</h1>
        <p className="dek">Analyst-grade market research used to live behind expensive professional terminals. Now it runs in your Claude, or a Python notebook, grounded in live data and silent when the numbers will not support a take.</p>
        <div className="body2">
          <p>Thirteen one-command workflows chain multiple tools into a single market briefing. One prompt returns the regime, the risk, the upcoming earnings, the macro calendar and the sector rotation. The read a research analyst would put together at 8am, computed on demand.</p>
        </div>
        <div className="chips">
          <span>42 tools</span>
          <span>13 workflows</span>
          <span>1 key</span>
          <span>MIT</span>
        </div>
        <p style={{ marginTop: 28 }}>
          <a className="big" href={GH} target="_blank" rel="noopener">View on GitHub<i>&rarr;</i></a>
        </p>
        <figure>
          <DotImage src="/images/projects/quant-garage.webp" w={1360} h={850} cell={6} priority alt="Quant Garage" sizes="(max-width: 900px) 100vw, 880px" />
          <figcaption>Quant Garage: forty-two tools and thirteen workflows, from Claude Code or Python.</figcaption>
        </figure>

        <section className="sec">
          <h2><small>01</small>The full research desk, one prompt away</h2>
          <div className="body2">
            <p>Forty-two tools that each answer one analyst question well. Earnings previews. Risk reports. Factor research. Options flow. Corporate actions. Macro calendars. Thirteen workflows chain them into complete briefings, so one prompt returns the whole read.</p>
            <p>Every figure carries the endpoint and timestamp it came from. Every take shows its work. Ask from Claude, import into a Python notebook, or wire it into a cron job. Same computation, same audit trail, same answer.</p>
          </div>
          <div className="eng">
            {AUD.map(([t, ti, d]) => (
              <div key={t}>
                <span>{t}</span>
                <b>{ti}</b>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sec">
          <h2><small>02</small>Prompt an analyst who reads your book</h2>
          <div className="body2">
            <p>The skills load automatically whenever the conversation touches markets. No slash commands, no invocation grammar. Ask what you would ask an analyst on your desk. Claude routes to the right tool, pulls the numbers, and writes the note.</p>
          </div>
          <ul className="kv">
            {ASKS.map(([s, l]) => (
              <li key={s}>
                <b className="plain">“{s}”</b>
                <span className="code">loads {l}</span>
              </li>
            ))}
          </ul>
          <Term lines={TERM_02} />
        </section>

        <section className="sec">
          <h2><small>03</small>Or skip Claude. Call the same function in Python.</h2>
          <div className="body2">
            <p>Every skill is an importable Python function that returns JSON. Same client, same audit trail, same fallback chain as the Claude path. Drop it wherever you already write code: Jupyter notebooks, Slack bots, cron jobs, dashboards.</p>
          </div>
          <Term lines={TERM_03} />
        </section>

        <section className="sec">
          <h2><small>04</small>Start with a workflow. Get the whole read in one call.</h2>
          <div className="body2">
            <p>Each one picks the right tools, chains them in order, and hands you back a single briefing. Point it at your watchlist or a single ticker.</p>
          </div>
          <ul className="kv">
            {WFL.map(([n, r, k, d]) => (
              <li key={n}>
                <b className="code">
                  {n}
                  <br />
                  <span>{k} · {r}</span>
                </b>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="sec">
          <h2><small>05</small>The building blocks. Compose your own workflow.</h2>
          <div className="body2">
            <p>Each is a standalone run() that returns a dict with the same client, timezone handling, audit-trail format and significance thresholds.</p>
          </div>
          {TOOLS.map(([g, ts]) => (
            <div key={g} style={{ margin: "0 0 22px" }}>
              <span className="k" style={{ display: "block", marginBottom: 8 }}>{g} · {ts.length}</span>
              <div className="chips" style={{ margin: 0 }}>
                {ts.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="sec">
          <h2><small>06</small>The quant methods most investors have not seen</h2>
          <div className="body2">
            <p>A handful of these tools implement published academic research from 2007 to 2025 that individual investors have never had access to. Four worth calling out.</p>
          </div>
          <div className="eng">
            {SPOT.map(([n, c, w, r]) => (
              <div key={n}>
                <span>{c}</span>
                <b className="code" style={{ fontSize: 15 }}>{n}</b>
                <p>{w}</p>
                <p style={{ marginTop: 8, color: "var(--ink)" }}>
                  <b style={{ display: "inline", font: "600 10px/1 var(--mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-dim)" }}>Live result</b>
                  <br />
                  {r}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="sec">
          <h2><small>07</small>Every take is computed. Every number cites its call.</h2>
          <div className="body2">
            <p>The whole difference between a research tool and a chatbot with a market-data plugin is that these tools refuse to fabricate when the data is not there. They surface the endpoint and timestamp for each figure so you can retrace the reasoning. LLMs and agents work better on top of this surface than under it. Humans read a briefing, agents read a schema, both anchored to the same live citation trail.</p>
          </div>
          <ul className="kv">
            {TRUST.map(([k, v]) => (
              <li key={k}>
                <b>{k}</b>
                <span className={k === "endpoint" || k === "timestamp" ? "code" : undefined}>{v}</span>
              </li>
            ))}
          </ul>
          <p className="k" style={{ marginTop: 14 }}>Any claim on the page can be verified against a live call in seconds. The same fields ship with every tool response.</p>
        </section>

        <section className="sec">
          <h2><small>08</small>You need a Massive API key. Free works for most of it.</h2>
          <div className="body2">
            <p>Every install needs a key. The Basic tier is free and runs 21 tools plus most workflows end to end. Stocks Starter at $29 a month opens 39 of 42 tools and every workflow. Add-ons matter only for options data, live streaming and Benzinga fundamentals.</p>
          </div>
          <div className="eng">
            {PLANS.map(([n, p, u, nt]) => (
              <div key={n}>
                <b>{n}</b>
                <span>{p}</span>
                <p>
                  {u}
                  {nt && (
                    <>
                      <br />
                      {nt}
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
          <p className="k" style={{ marginTop: 22 }}>
            Get a key at{" "}
            <a href="https://massive.com/pricing" target="_blank" rel="noopener" style={{ textDecoration: "none", borderBottom: "1px solid var(--ink-dim)" }}>massive.com/pricing</a>. The PLAN-MATRIX file in the repo maps every tool to the exact plan and add-ons it needs.
          </p>
        </section>

        <section className="sec">
          <h2><small>09</small>Two ways to install. One key.</h2>
          <div className="body2">
            <p>Grab a Massive key first. Then install the Python package, the Claude Code plugin, or both. Same functions, same audit trail, same JSON, whichever way you call them. Works in a Jupyter notebook, a Slack bot or a cron job, and there is an SEC EDGAR fallback for earnings when Benzinga is not wired.</p>
          </div>
          <Term lines={TERM_09} />
        </section>

        <section className="sec">
          <h2><small>10</small>Built in the garage, not the trading floor</h2>
          <p>
            <a className="big" href={GH} target="_blank" rel="noopener">github.com/rgourley/quant-garage<i>&rarr;</i></a>
          </p>
          <p className="nda">MIT, by Robert Gourley.</p>
        </section>
      </article>
    </Page>
  );
}
