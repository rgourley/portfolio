// Event tracking: Google Analytics when its tag is on the page, and PostHog, which loads on demand.
// posthog-js is a large library, so nothing imports it at page load: the provider asks for it once the page is idle or the
// reader first interacts, and events raised before then wait in a queue and go out as soon as it is ready. The first
// pageview cannot be lost to a fast exit: if the reader leaves before the library has loaded, it goes out as a beacon
// under the same anonymous id the library adopts afterwards, so the visit still joins up.
// No event carries personal data: pages, labels, settings and hostnames only. A browser that sends Global Privacy
// Control or Do Not Track gets no analytics at all.

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type PostHog = typeof import("posthog-js").default;
type Params = { [key: string]: string | number | boolean | undefined };

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let client: PostHog | null = null;
let loading: Promise<PostHog | null> | null = null;
const queue: Array<(p: PostHog) => void> = [];
let firstPageviewSent = false;

/** False when the browser asks not to be tracked: Global Privacy Control or Do Not Track. Nothing is sent then. */
export function analyticsAllowed(): boolean {
  if (typeof window === "undefined") return false;
  const n = navigator as Navigator & { globalPrivacyControl?: boolean };
  return !n.globalPrivacyControl && n.doNotTrack !== "1";
}

/** The anonymous id for this browser: the one posthog-js keeps in its cookie when it has run before, otherwise one made
    here and kept so the library can adopt it when it loads. Random, never derived from anything personal. */
function anonymousId(): string {
  if (!POSTHOG_KEY) return "";
  try {
    const m = document.cookie.match(new RegExp("(?:^|; )ph_" + POSTHOG_KEY.replace(/[^A-Za-z0-9_]/g, "\\$&") + "_posthog=([^;]+)"));
    if (m) { const v = JSON.parse(decodeURIComponent(m[1])); if (v && typeof v.distinct_id === "string") return v.distinct_id; }
  } catch {}
  try {
    let id = localStorage.getItem("ph_anon");
    if (!id) { id = crypto.randomUUID(); localStorage.setItem("ph_anon", id); }
    return id;
  } catch { return "anon-" + Math.random().toString(36).slice(2) + Date.now().toString(36); }
}

/** Loads and starts posthog-js once. Resolves null when no key is configured or the browser asked not to be tracked. */
export function loadPostHog(): Promise<PostHog | null> {
  if (!POSTHOG_KEY || !analyticsAllowed()) return Promise.resolve(null);
  if (!loading) {
    loading = import("posthog-js").then((m) => {
      const p = m.default;
      p.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        // App Router navigations don't reload the page, so pageviews are sent by the provider's tracker.
        capture_pageview: false,
        capture_pageleave: true,
        // Anonymous visitors don't create billable person profiles.
        person_profiles: "identified_only",
        // the id this browser already has, so a pageview sent by beacon before the library loaded belongs to the same visitor
        bootstrap: { distinctID: anonymousId(), isIdentifiedID: false },
      });
      client = p;
      queue.splice(0).forEach((fn) => fn(p));
      return p;
    }).catch(() => null);
  }
  return loading;
}

/** Runs fn with the PostHog client, now if it is loaded, otherwise once it is. Nothing happens without a key or consent. */
export function withPostHog(fn: (p: PostHog) => void) {
  if (!POSTHOG_KEY || !analyticsAllowed()) return;
  if (client) fn(client);
  else { queue.push(fn); loadPostHog(); }
}

/** The page's first pageview. It waits for the library like any event, but if the page is hidden or left before the
    library has loaded it goes out at once as a beacon, so a reader who bounces in two seconds is still counted. */
export function firstPageview(url: string) {
  if (!POSTHOG_KEY || !analyticsAllowed()) return;
  withPostHog((p) => { if (!firstPageviewSent) { firstPageviewSent = true; p.capture("$pageview", { $current_url: url }); } });
  const beacon = () => {
    if (firstPageviewSent || client || !navigator.sendBeacon) return;
    firstPageviewSent = true;
    const body = JSON.stringify({
      api_key: POSTHOG_KEY, event: "$pageview", distinct_id: anonymousId(), timestamp: new Date().toISOString(),
      properties: { $current_url: url, $lib: "web-beacon", $process_person_profile: false, $host: location.host, $pathname: location.pathname },
    });
    navigator.sendBeacon(POSTHOG_HOST + "/i/v0/e/", new Blob([body], { type: "text/plain" }));
  };
  const onHide = () => { if (document.visibilityState === "hidden") beacon(); };
  window.addEventListener("pagehide", beacon, { once: true });
  document.addEventListener("visibilitychange", onHide);
  // the listeners come off once the library has loaded, when the pageview goes the normal way
  loadPostHog().then(() => { window.removeEventListener("pagehide", beacon); document.removeEventListener("visibilitychange", onHide); });
}

/** Sends one event straight to PostHog without the library, for an event raised as the reader leaves the page before the
    library has loaded; it carries the same anonymous id, so it still belongs to the visit. */
function beaconEvent(event: string, properties: Params) {
  if (!POSTHOG_KEY || !navigator.sendBeacon) return;
  const body = JSON.stringify({ api_key: POSTHOG_KEY, event, distinct_id: anonymousId(), timestamp: new Date().toISOString(),
    properties: { ...properties, $current_url: location.href, $lib: "web-beacon", $process_person_profile: false } });
  navigator.sendBeacon(POSTHOG_HOST + "/i/v0/e/", new Blob([body], { type: "text/plain" }));
}

/** A later pageview, on a client-side navigation. */
export function pageview(url: string) {
  withPostHog((p) => p.capture("$pageview", { $current_url: url }));
}

/**
 * Track a custom event in Google Analytics and PostHog
 */
export function trackEvent(eventName: string, eventParams?: Params, opts: { leaving?: boolean } = {}) {
  if (!analyticsAllowed()) return;
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, { ...eventParams, transport_type: "beacon" });
  }
  // an event raised as the page is left (a link off the site) cannot wait for the library: it goes by beacon now
  if (opts.leaving && !client) { beaconEvent(eventName, eventParams || {}); return; }
  withPostHog((p) => p.capture(eventName, eventParams, opts.leaving ? { transport: "sendBeacon" } : undefined));
}

/** The page a reader is on, as its path, for events that say where they happened. */
function here(): string { return typeof location === "undefined" ? "" : location.pathname; }

/** The hostname of a URL, nothing more: for outbound links and the font tool. */
export function hostOf(url: string): string {
  try { return new URL(url, typeof location === "undefined" ? "https://www.robertcreative.com" : location.href).hostname; } catch { return ""; }
}

// The events, each named once here so the names stay the same in both tools. See the notes for what each one means.

/** The valve flipped between the view for humans and the view for agents. */
export function trackValveToggle(to: "agents" | "humans") { trackEvent("valve_toggle", { to, page: here() }); }

/** The dot in the header switched the colour scheme. */
export function trackThemeToggle(to: "dark" | "light") { trackEvent("theme_toggle", { to, page: here() }); }

/** The "See the work" link on the home page. */
export function trackSeeTheWork() { trackEvent("see_the_work", { page: here() }); }

/** One of the home page's work lines. */
export function trackWorkLineClick(line: string) { trackEvent("work_line_click", { line, page: here() }); }

/** The next-case link at the foot of a case study. */
export function trackCaseNext(from: string, to: string) { trackEvent("case_next", { from, to }); }

/** A link that leaves the site: its hostname and the label it was clicked under. */
export function trackOutboundClick(href: string, label: string) { trackEvent("outbound_click", { host: hostOf(href), label, page: here() }, { leaving: true }); }

/** The next-post link at the foot of a post. */
export function trackPostNext(from: string, to: string) { trackEvent("post_next", { from, to }); }

/** A link that opens Market City, which is its own site under /city. */
export function trackCityOpen() { trackEvent("city_open", { page: here() }, { leaving: true }); }

/** A link that opens Amphora under /amphora. */
export function trackAmphoraStart() { trackEvent("amphora_start", { page: here() }, { leaving: true }); }

/** A form went off: the contact form or the newsletter sign-up. No field values, ever. */
export function trackSubmit(form: "contact" | "newsletter", ok: boolean) { trackEvent(form + "_submit", { ok, page: here() }); }

/** A blog explorer changed: which explorer, which setting, which value. */
export function trackExplorerChange(explorer: string, setting: string, value: string | number) { trackEvent("blog_explorer_change", { explorer, setting, value: String(value), page: here() }); }

/** The before-and-after slider in an explorer was dragged. Once per page. */
let sliderUsed = "";
export function trackCompareSliderUse(explorer: string) { if (sliderUsed === here()) return; sliderUsed = here(); trackEvent("compare_slider_use", { explorer, page: here() }); }

/** A code block's copy button. */
export function trackCopyCode(language: string) { trackEvent("copy_code", { language, page: here() }); }

/** The font size checker ran on a page: the page's hostname only. */
export function trackFontToolRun(url: string) { trackEvent("font_tool_run", { host: hostOf(url) }); }

/** The font size checker's console snippet was copied. */
export function trackFontToolCopy() { trackEvent("font_tool_copy", { page: here() }); }

/**
 * Track a project view
 */
export function trackProjectView(projectSlug: string, projectTitle: string) {
  trackEvent("project_view", {
    project_slug: projectSlug,
    project_title: projectTitle,
  });
}

/**
 * Track an email click: where on the site it happened. The address is the site's own, so it is not sent.
 */
export function trackEmailClick(_emailAddress: string, location: string) {
  trackEvent("email_click", {
    location: location, // e.g., "footer", "contact_page", "cta"
  });
}
