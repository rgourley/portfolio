/* Server-side capture of agent traffic. Browser analytics never see a curl, a Python client or an AI fetcher reading the
   markdown twins, llms.txt or the feed, so the middleware sends one PostHog event per such request from the edge:
   `agent_request` with the route, the format served and the client's family. Nothing personal travels: no IP (geo lookup
   is off), no full user-agent string, no query strings. A token bucket caps the rate so a crawler storm cannot become a
   cost: at most RATE events a second per edge instance, BURST in a burst, and the rest are dropped, not queued. */

const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
// The server key, or the project key the browser uses; PostHog's capture endpoint takes either project token.
const KEY = process.env.POSTHOG_KEY || process.env.NEXT_PUBLIC_POSTHOG_KEY;
const RATE = 2, BURST = 30;

let tokens = BURST, refilledAt = Date.now();

/** True when this request may be sent: one token per event, refilled at RATE a second up to BURST. */
function takeToken(): boolean {
  const now = Date.now();
  tokens = Math.min(BURST, tokens + ((now - refilledAt) / 1000) * RATE); refilledAt = now;
  if (tokens < 1) return false;
  tokens -= 1; return true;
}

/** The family a client belongs to, from its user agent: an AI fetcher by name, a command-line or library client, or none. */
export function agentFamily(ua: string | null): string {
  const u = (ua || "").toLowerCase();
  if (!u) return "none";
  const families: Array<[string, RegExp]> = [
    ["claude", /claudebot|claude-user|claude-searchbot|anthropic-ai/], ["openai", /gptbot|oai-searchbot|chatgpt-user|openai/],
    ["perplexity", /perplexity/], ["google-extended", /google-extended/], ["applebot-extended", /applebot-extended/],
    ["cohere", /cohere-ai/], ["bytespider", /bytespider/], ["meta", /meta-externalagent/], ["amazonbot", /amazonbot/],
    ["mistral", /mistralai/], ["duckassist", /duckassistbot/], ["ccbot", /ccbot/],
    ["curl", /^curl/], ["wget", /^wget/], ["httpie", /^httpie/], ["python", /^python-(requests|urllib|httpx)/], ["go", /^go-http-client/],
    ["node", /^(node-fetch|undici|node|axios)/], ["java", /^(okhttp|java)/], ["perl", /^(libwww|lwp)/],
  ];
  for (const [name, re] of families) if (re.test(u)) return name;
  return "other";
}

export type AgentFormat = "markdown-twin" | "markdown" | "llms" | "feed";

/** Sends the event, or does nothing when there is no key or the bucket is empty. Returns the fetch for waitUntil. */
export function captureAgentRequest(route: string, format: AgentFormat, ua: string | null): Promise<void> {
  if (!KEY || !takeToken()) return Promise.resolve();
  const family = agentFamily(ua);
  const body = JSON.stringify({
    api_key: KEY,
    event: "agent_request",
    distinct_id: "agent:" + family,
    timestamp: new Date().toISOString(),
    properties: { route, format, ua_family: family, $lib: "edge", $process_person_profile: false, $geoip_disable: true },
  });
  return fetch(HOST + "/i/v0/e/", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true })
    .then(() => undefined, () => undefined);
}
