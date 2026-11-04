"use client";

import { useEffect, useRef } from "react";

interface Chapter { id: string; name: string }

/** The numbered chapter rail beside a case study's reading column. It follows the reading position, and steps aside
    while a breakout scene passes over it. The breakouts themselves are made as wide as the window here too. */
export default function StoryRail({ chapters }: { chapters: Chapter[] }) {
  const rail = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const railEl = rail.current; if (!railEl) return;
    const links = Array.from(railEl.querySelectorAll<HTMLAnchorElement>("a"));
    const secs = links.map((a) => document.getElementById((a.getAttribute("href") || "").slice(1)));
    const outs = Array.from(document.querySelectorAll<HTMLElement>(".breakout"));
    function layoutOuts() {
      outs.forEach((f) => { f.style.marginLeft = "0px"; const rc = f.getBoundingClientRect(); const gutter = Math.max(16, (innerWidth - 1400) / 2); f.style.width = (innerWidth - gutter * 2) + "px"; f.style.marginLeft = (gutter - rc.left) + "px"; });
    }
    function onScroll() {
      const mid = innerHeight * 0.4; let best = 0;
      secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top <= mid) best = i; });
      links.forEach((a, i) => { a.classList.toggle("on", i === best); });
      const rr = railEl!.getBoundingClientRect(); let hide = false;
      outs.forEach((f) => { const fr = f.getBoundingClientRect(); if (fr.top < rr.bottom && fr.bottom > rr.top && fr.left < rr.right) hide = true; });
      railEl!.classList.toggle("hide", hide);
    }
    layoutOuts(); onScroll();
    window.addEventListener("resize", layoutOuts);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("resize", layoutOuts); window.removeEventListener("scroll", onScroll); outs.forEach((f) => { f.style.width = ""; f.style.marginLeft = ""; }); };
  }, [chapters]);
  return (
    <ol className="rail" ref={rail}>
      {chapters.map((c, i) => (
        <li key={c.id}><a href={`#${c.id}`}><i>{String(i + 1).padStart(2, "0")}</i>{c.name}</a></li>
      ))}
    </ol>
  );
}
