// Event tracking: Google Analytics when its tag is on the page, and PostHog, which loads on demand.
// posthog-js is a large library, so nothing imports it at page load: the provider asks for it once the page is idle or the
// reader first interacts, and events raised before then wait in a queue and go out as soon as it is ready.

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type PostHog = typeof import("posthog-js").default;

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let client: PostHog | null = null;
let loading: Promise<PostHog | null> | null = null;
const queue: Array<(p: PostHog) => void> = [];

/** Loads and starts posthog-js once. Resolves null when no key is configured, so the site works without one. */
export function loadPostHog(): Promise<PostHog | null> {
  if (!POSTHOG_KEY || typeof window === "undefined") return Promise.resolve(null);
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
      });
      client = p;
      queue.splice(0).forEach((fn) => fn(p));
      return p;
    }).catch(() => null);
  }
  return loading;
}

/** Runs fn with the PostHog client, now if it is loaded, otherwise once it is. Nothing happens without a key. */
export function withPostHog(fn: (p: PostHog) => void) {
  if (!POSTHOG_KEY || typeof window === "undefined") return;
  if (client) fn(client);
  else { queue.push(fn); loadPostHog(); }
}

/**
 * Track a custom event in Google Analytics and PostHog
 */
export function trackEvent(
  eventName: string,
  eventParams?: {
    [key: string]: string | number | boolean | undefined;
  }
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
  withPostHog((p) => p.capture(eventName, eventParams));
}

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
 * Track an email click
 */
export function trackEmailClick(emailAddress: string, location: string) {
  trackEvent("email_click", {
    email_address: emailAddress,
    location: location, // e.g., "footer", "contact_page", "cta"
  });
}
