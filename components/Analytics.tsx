"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { analyticsAllowed, trackAmphoraStart, trackCaseNext, trackCityOpen, trackOutboundClick, trackPostNext, trackSeeTheWork, trackWorkLineClick } from "@/lib/analytics";

/** The hosts of this site: a link to them is not outbound, even on a preview or on localhost. */
const OWN = /(^|\.)robertcreative\.com$/;

/** The label an outbound link is reported under: a known destination by its host, otherwise the link's own text. */
const LABELS: Array<[RegExp, string]> = [
  [/clawstreet\.io$/, "ClawStreet"], [/github\.com$/, "GitHub"], [/linkedin\.com$/, "LinkedIn"], [/greatrobots\.ai$/, "greatrobots"],
  [/madeforspace\.io$/, "madeforspace"], [/mdskills\.ai$/, "mdskills"], [/massive\.com$/, "Massive"], [/medium\.com$/, "Medium"],
  [/instagram\.com$/, "Instagram"], [/theautonomyreport\.com$/, "The Autonomy Report"], [/gitkingdom\.com$/, "Git Kingdom"], [/apple\.com$/, "Apple"], [/(^|\.)x\.com$/, "X"],
];
function labelFor(host: string, text: string): string {
  for (const [re, label] of LABELS) if (re.test(host)) return label;
  return text.trim().replace(/\s+/g, " ").slice(0, 60);
}

/** The site's click analytics: one listener for the links worth counting. Links sit in server components and in HTML made on
    the server, so they are matched here rather than wired one by one: a link off the site, the next case or post, the home
    page's work lines, and the links that open Market City and Amphora. PostHog itself is started by PostHogProvider; it is
    the only analytics the site has, Google Analytics having been removed on 2026-11-03. Nothing runs when the browser has
    asked not to be tracked. */
export default function Analytics() {
  const pathname = usePathname();
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
  return null;
}
