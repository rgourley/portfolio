"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";

// A post's "Jump to" list as a rail that follows the reader down the right side, on screens wide enough to have room
// beside the reading column. It is built from the inline nav.jump the post already has (the :::jump block), so any post
// with a jump list gets it. Groups collapse; the one you're reading in opens by itself and its current entry is marked.
// It appears once the inline list has scrolled away, and steps aside while a wide image (wider than the column) passes it. Portaled to <body>: .page keeps a transform from its entrance
// animation, and fixed elements inside a transformed ancestor don't stay fixed to the window.

type Item = { text: string; id: string };
type Group = { title: string; id: string; items: Item[] };

const TOP = 120; // px from the top of the window where the rail starts; also the reading line for "current section"
const MIN_ROOM = 230; // px needed to the right of the reading column

function readGroups(nav: Element): Group[] {
  return [...nav.querySelectorAll(":scope .cols > div")].map((div) => {
    const head = div.querySelector<HTMLAnchorElement>(".k a");
    const id = (a: HTMLAnchorElement | null) => decodeURIComponent(a?.hash.slice(1) ?? "");
    return {
      title: head?.textContent ?? "",
      id: id(head),
      items: [...div.querySelectorAll<HTMLAnchorElement>("li a")].map((a) => ({ text: a.textContent ?? "", id: id(a) })),
    };
  });
}

export default function JumpRail({ root }: { root: RefObject<HTMLElement> }) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [left, setLeft] = useState<number | null>(null); // null: not enough room, no rail
  const [shown, setShown] = useState(false);
  const [current, setCurrent] = useState<string>("");
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const rail = useRef<HTMLElement>(null);

  useEffect(() => {
    const first = root.current?.querySelector("nav.jump");
    if (!first) return;
    const gs = readGroups(first);
    setGroups(gs);
    const ids = gs.flatMap((g) => [g.id, ...g.items.map((i) => i.id)]);
    // Looked up on every use, never kept: Next can re-render the article and swap these nodes for new copies, and a
    // kept node that has left the page measures as 0, which hid the rail for good and froze the current section.
    const live = () => {
      const el = root.current;
      return { el, nav: el?.querySelector("nav.jump"), body: el?.closest(".body") ?? el };
    };

    const place = () => {
      const { body } = live();
      if (!body) return;
      const x = body.getBoundingClientRect().right + 48;
      setLeft(window.innerWidth - x >= MIN_ROOM ? x : null);
    };
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const { el, nav } = live();
        if (!el || !nav) return;
        // Hidden above the inline list, and while a wide image overlaps the rail's height on screen
        const h = rail.current?.offsetHeight ?? 0;
        const overlap = [...el.querySelectorAll<HTMLElement>(".wideimg")].some((w) => {
          const r = w.getBoundingClientRect();
          return r.bottom > TOP - 16 && r.top < TOP + h + 16;
        });
        setShown(nav.getBoundingClientRect().bottom < 0 && !overlap);
        // The current section: the last heading that has reached the reading line
        let id = "";
        for (const i of ids) {
          const t = document.getElementById(i);
          if (t && t.getBoundingClientRect().top <= TOP + 40) id = i;
        }
        setCurrent(id);
      });
    };
    place(); onScroll();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("resize", place); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [root]);

  const currentGroup = groups.find((g) => g.id === current || g.items.some((i) => i.id === current))?.id;
  // Groups opened or closed by hand go back to automatic when the reader moves into another section. Otherwise
  // the rail keeps growing, and a tall rail overlaps (and so hides for) almost any wide image on screen.
  useEffect(() => setOpen({}), [currentGroup]);

  if (!groups.length || left === null) return null;
  return createPortal(
    <aside ref={rail} className={"jumprail" + (shown ? " on" : "")} style={{ left, top: TOP }} aria-label="Contents" aria-hidden={!shown}>
      <p className="k">Contents</p>
      {groups.map((g) => {
        const isOpen = open[g.id] ?? g.id === currentGroup;
        return (
          <div key={g.id} className={"grp" + (g.id === currentGroup ? " cur" : "")}>
            <button type="button" aria-expanded={isOpen} onClick={() => setOpen((o) => ({ ...o, [g.id]: !isOpen }))} tabIndex={shown ? 0 : -1}>
              <span>{g.title}</span><span className="n">{g.items.length}</span>
            </button>
            {isOpen && (
              <ul>
                {g.items.map((i) => (
                  <li key={i.id}>
                    <a href={`#${i.id}`} className={i.id === current ? "cur" : undefined} aria-current={i.id === current ? "location" : undefined} tabIndex={shown ? 0 : -1}>
                      {i.text}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </aside>,
    document.body
  );
}
