/* Financial UI Suite: the facts the page and its agent view share. */
export const GH = "https://github.com/rgourley/financial-ui-suite";

export const PATT: [string, string][] = [
  ["typography-and-color", "Tokens, type scale, density, motion"],
  ["number-formatting", "Prices, qty, %, bps, currency"],
  ["components", "Tables, order books, tickers, pills"],
  ["streaming-and-state", "Sockets, tick flash, throttling"],
  ["accessibility", "Colour blindness, keyboard, screen readers"],
  ["mobile-and-responsive", "Phone and tablet, bottom sheets"],
  ["industry-patterns", "Bloomberg, Kraken, FT conventions"],
  ["charts-and-candles", "OHLC, volume, indicators (base)"],
  ["loading-and-skeletons", "First-load and reconnect treatments"],
  ["empty-and-error-states", "Rejected, closed, rate-limit"],
  ["timestamps-and-timezones", 'Trade times, "as of" stamps'],
  ["virtualization", "100+ streaming rows, trades tape"],
  ["chart-interactions", "Crosshair, zoom and pan, drawing tools"],
  ["order-entry-and-lifecycle", "Forms, preview, pending to filled"],
  ["alerts-and-disclosures", "Price alerts, PDT and wash-sale"],
  ["data-sources-and-freshness", "Real-time, delayed, stale"],
  ["heatmaps-and-density-viz", "Sector, options, IV surface"],
];

export const STY: [string, string, string, string[], string][] = [
  ["modern-pro-dark", "Modern Pro Dark", "TradingView, Kraken Pro, Hyperliquid", ["#0b0f17", "#22c55e", "#ef4444"], "Cool charcoal, neon ladders, hairline grids"],
  ["pro-terminal", "Pro Terminal", "Bloomberg, IBKR TWS, ThinkOrSwim", ["#0a0a0a", "#fbbf24", "#22c55e"], "Amber on black, monospaced, dense"],
  ["tasty-pro", "Tasty Pro", "TastyTrade", ["#0f1419", "#f97316", "#06b6d4"], "Options-first, BWB curves, big buttons"],
  ["crypto-exchange", "Crypto Exchange", "Coinbase Advanced, Binance, Bybit", ["#10121a", "#f0b90b", "#2ebd85"], "Saturated highlights, deep book, perp tabs"],
  ["retail-polish-dark", "Retail Polish Dark", "Robinhood, Public", ["#000000", "#00c805", "#ff5000"], "Friendly geometry, oversized type, soft motion"],
  ["retail-polish-light", "Retail Polish Light", "Wise, Revolut, Cash App, Monzo", ["#f7f7f5", "#163300", "#9fe870"], "Bright off-white, rounded, lifestyle illustration"],
  ["editorial-financial", "Editorial Financial", "FT, Bloomberg.com, WSJ", ["#fff1e5", "#0f172a", "#bb1a4f"], "Salmon paper, serif headlines, restrained chrome"],
  ["api-dashboard", "API Dashboard", "Massive, Stripe, Vercel, Linear", ["#0a0a0a", "#ffffff", "#635bff"], "Crisp grids, gradient accents, doc-first"],
  ["defi-native", "DeFi Native", "Uniswap, Jupiter, Aave, Phantom", ["#0b0a1a", "#ff007a", "#7d5cff"], "Glassy panes, hot-pink primaries, wallet chips"],
  ["apple-native", "Apple Native", "iOS Stocks, macOS widget", ["#000000", "#ffffff", "#fb2c36"], "SF Pro, exact whitespace, calm gain and loss"],
  ["yahoo-prosumer", "Yahoo Prosumer", "Yahoo Finance, Seeking Alpha, Investing.com", ["#ffffff", "#0f69ff", "#028a4e"], "White quote pages, tab strips, trending rail"],
  ["alphaspace", "AlphaSpace", "Yahoo Finance AlphaSpace, TradingView desktop", ["#0a0e16", "#52e077", "#ef4e4e"], "Slate panels, green accent, AI agent rail"],
  ["research-terminal", "Research Terminal", "AlphaSense, Visible Alpha, FactSet, Tegus", ["#fcfcfd", "#083c8c", "#fde047"], "Document-first, yellow keyword hits, AI summaries"],
  ["retro-tui", "Retro TUI", "Gloomberb, lazygit, k9s, btop", ["#000000", "#cccccc", "#00cc66"], "Tiled mono panes, :: titles, optional CRT mode"],
];
