"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, R, navKeyFor } from "@/lib/links";
import { useMode } from "@/components/ModeProvider";

/** The fixed corners: the name and title top left, the nav and the mode dot top right. */
export default function Corner() {
  const pathname = usePathname() || "/";
  const here = navKeyFor(pathname);
  const { dark, toggle } = useMode();
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
    </>
  );
}
