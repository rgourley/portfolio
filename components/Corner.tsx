"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, R, navKeyFor } from "@/lib/links";
import { useMode } from "@/components/ModeProvider";

/** The fixed corners: the name and title top left, the nav and the mode dot top right.
    On a phone the nav folds into one word, Menu, that opens a full-screen sheet of the same links. */
export default function Corner() {
  const pathname = usePathname() || "/";
  const here = navKeyFor(pathname);
  const { dark, toggle } = useMode();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.documentElement.classList.remove("menu-open"); };
  }, [open]);
  return (
    <>
      <div className="corner tl">
        <Link href={R.home}>Robert Gourley</Link>
        <span>Head of Agentic Systems</span>
      </div>
      <div className="corner tr">
        {NAV.map(([key, label]) => (
          <Link key={key} href={R[key]} className={here === key ? "here" : undefined}>{label}</Link>
        ))}
        <button type="button" className="mode" onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} />
      </div>
      <button type="button" className="menubtn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
        {open ? "Close" : "Menu"}
      </button>
      <nav className="menu" id="menu" aria-label="Site">
        {NAV.map(([key, label], i) => (
          <Link key={key} href={R[key]} className={here === key ? "here" : undefined}>
            {label}<i>{String(i + 1).padStart(2, "0")}</i>
          </Link>
        ))}
        <div className="mrow">
          <button type="button" onClick={toggle}><span className="mode" />{dark ? "Light mode" : "Dark mode"}</button>
          <Link href={R.contact}>Contact</Link>
          <Link href={R.leadership}>Leadership</Link>
          <Link href={R.services}>Services</Link>
        </div>
      </nav>
    </>
  );
}
