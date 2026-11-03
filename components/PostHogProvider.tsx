"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { loadPostHog, withPostHog } from "@/lib/analytics";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!POSTHOG_KEY || !pathname) return;
    const query = searchParams?.toString();
    const url = window.location.origin + pathname + (query ? `?${query}` : "");
    // queued until the library is loaded, so the first pageview still goes out with the page's own URL
    withPostHog((p) => p.capture("$pageview", { $current_url: url }));
  }, [pathname, searchParams]);

  return null;
}

/** Starts PostHog once the page is idle, or sooner if the reader interacts, so the library never competes with the page's
    own scripts for the first paint. Renders nothing until NEXT_PUBLIC_POSTHOG_KEY is set, so the site works without it. */
export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!POSTHOG_KEY) return;
    let done = false, idle = 0, timer = 0;
    const events: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "scroll", "touchstart"];
    const start = () => {
      if (done) return; done = true;
      events.forEach((e) => window.removeEventListener(e, start));
      if (idle && "cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      clearTimeout(timer);
      loadPostHog();
    };
    events.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }));
    const whenIdle = () => {
      if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(start, { timeout: 5000 });
      else timer = window.setTimeout(start, 3000);
    };
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });
    return () => { done = true; events.forEach((e) => window.removeEventListener(e, start)); window.removeEventListener("load", whenIdle); clearTimeout(timer); };
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
