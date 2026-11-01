// Event tracking utility: sends to Google Analytics and PostHog (when configured)
import posthog from "posthog-js";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Track a custom event in Google Analytics
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
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(eventName, eventParams);
  }
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


