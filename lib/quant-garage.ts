/* Quant Garage: the facts the page and its agent view share. */
export const GH = "https://github.com/rgourley/quant-garage";

export const WFL: [string, string, string, string][] = [
  ["portfolio-review", "~90s", "deep dive", "The full book review in one call. Chains market-regime, sector rotation, risk report, earnings blackout, macro calendar, 8-K scanner, rebalancer."],
  ["weekly-brief", "~30s", "weekly", "Sunday-night watchlist prep. Regime, rotation, macro calendar, earnings blackout across a 7-day window. Frames the week."],
  ["morning-brief", "~15s", "daily", "60-second daily open. Regime, macro today plus tomorrow, news scan per watchlist ticker. Cron it at 8am."],
  ["preflight-trade", "~30s", "pre-trade", "Before you hit execute. Ticker plus intent. Technical read, earnings blackout, news, corporate actions. Verdict: go, wait, review."],
  ["earnings-week-prep", "~2 min", "earnings", "For weeks where four of your names print in five days. Earnings blackout on the watchlist, then drilldown plus technical read for the top prints."],
  ["historical-comparison", "~20s", "analog", "Twin decision support. Event study on the specific event plus historical analogs on the market regime. Two anchors, not one."],
  ["scan-and-frame", "~30s", "discovery", "Regime-framed idea generation. Regime context, universe screen, relative-strength rank on the top N. Factor pass optional."],
  ["stock-one-pager", "~10s", "single-name", "Retail-tier single-name card. Technical read plus earnings blackout plus regime, translated into plain language. Every claim gated to data."],
];

export const TOOLS: [string, string[]][] = [
  ["Earnings", ["earnings-drilldown", "event-study", "earnings-blackout"]],
  ["Equity research and valuation", ["pitch-comps", "valuation-sanity-check", "position-sizer"]],
  ["Quant and screening", ["technical-briefing", "universe-builder", "factor-research", "relative-strength", "pairs-scanner", "hurst-exponent", "change-point-detector", "signal-decay", "rough-vol-forecast"]],
  ["Market context", ["market-regime", "sector-rotation-signal", "macro-event-calendar", "historical-analog-finder"]],
  ["Trading and execution", ["options-flow", "zero-dte-gamma", "news-scanner", "slippage-cost", "options-structure-analyzer"]],
  ["Risk and ops", ["portfolio-mark", "risk-report", "mc-portfolio-simulator", "portfolio-rebalancer", "corporate-actions-scanner", "corp-actions-reconciler", "t+1-settlement-prep"]],
  ["Filings and ownership", ["8-k-scanner", "risk-factor-delta", "filing-sentiment", "insider-flow", "manager-portfolio-diff", "guidance-tracker", "analyst-tracker"]],
  ["Backtesting and crypto", ["backtest-data-prep", "crypto-vol-scanner"]],
];
