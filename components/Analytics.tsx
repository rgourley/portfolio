"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { analyticsAllowed, trackAmphoraStart, trackCaseNext, trackCityOpen, trackOutboundClick, trackPostNext, trackSeeTheWork, trackWorkLineClick } from "@/lib/analytics";

const GA_ID = "G-MC70FP4W2T";

/** The hosts of this site: a link to them is not outbound, even on a preview or on localhost. */
const OWN = /(^|\.)robertcreative\.com$/;

/** The label an outbound link is reported under: a known destination by its host, otherwise the link's own text. */
const LABELS: Array<[RegExp, string]> = [
  [/clawstreet\.io$/, "ClawStreet"], [/github\.com$/, "GitHub"], [/linkedin\.com$/, "LinkedIn"], [/greatrobots\.ai$/, "greatrobots"],
  [/madeforspace\.io$/, "madeforspace"], [/mdskills\.ai$/, "mdskills"], [/massive\.com$/, "Massive"], [/medium\.com$/, "Medium"],
  [/instagram\.com$/, "Instagram"], [/theautonomyreport\.com$/, "The Autonomy Report"], [/gitkingdom\.com$/, "Git Kingdom"], [/apple\.com$/, "Apple"],
];
function labelFor(host: string, text: string): string {
  for (const [re, label] of LABELS) if (re.test(host)) return label;
  return text.trim().replace(/\s+/g, " ").slice(0, 60);
}

/** Analytics for the site: the Google tag, loaded after the page and only when the browser has not asked not to be
    tracked, and one click listener for the links worth counting. Links sit in server components and in HTML made on
    the server, so they are matched here rather than wired one by one: a link off the site, the next case or post, the
    home page's work lines, and the links that open Market City and Amphora. PostHog itself is started by PostHogProvider. */
export default function Analytics() {
  const [allowed, setAllowed] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setAllowed(analyticsAllowed()); }, []);
  useEffect(() => {
    if (!analyticsAllowed()) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!a) return;
      let url: URL; try { url = new URL(a.href, location.href); } catch { return; }
      const text = a.textContent || a.getAttribute("aria-label") || "";
      if (url.origin !== location.origin && !OWN.test(url.hostname)) { trackOutboundClick(url.href, labelFor(url.hostname, text)); return; }
      const path = url.pathname;
      if (path === "/city" || path.startsWith("/city/")) { trackCityOpen(); return; }
      if (path === "/amphora" || path.startsWith("/amphora/")) { trackAmphoraStart(); return; }
      if (a.classList.contains("next")) {
        if (location.pathname.startsWith("/work/")) trackCaseNext(location.pathname.slice(6), path.replace(/^\/work\//, ""));
        else if (location.pathname.startsWith("/blog/")) trackPostNext(location.pathname.slice(6), path.replace(/^\/blog\//, ""));
        return;
      }
      if (location.pathname === "/") {
        const line = a.closest<HTMLElement>(".line");
        if (line && a.closest(".after")) { trackSeeTheWork(); return; }
        if (line) { trackWorkLineClick(line.dataset.fig || text); return; }
      }
    };
    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [pathname]);
  if (!allowed) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_ID}', { transport_type: 'beacon' });`}
      </Script>
    </>
  );
}
