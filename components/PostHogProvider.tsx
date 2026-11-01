"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let started = false;

function startPostHog() {
  if (started || !POSTHOG_KEY || typeof window === "undefined") return;
  started = true;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // App Router navigations don't reload the page, so pageviews are sent by PageViewTracker.
    capture_pageview: false,
    capture_pageleave: true,
    // Anonymous visitors don't create billable person profiles.
    person_profiles: "identified_only",
  });
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!POSTHOG_KEY || !pathname) return;
    const query = searchParams?.toString();
    posthog.capture("$pageview", {
      $current_url: window.location.origin + pathname + (query ? `?${query}` : ""),
    });
  }, [pathname, searchParams]);

  return null;
}

// Renders nothing until NEXT_PUBLIC_POSTHOG_KEY is set, so the site works without it.
export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    startPostHog();
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {children}
    </>
  );
}
