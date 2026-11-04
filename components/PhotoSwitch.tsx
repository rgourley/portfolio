"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// A post's :::photos block: one photo with tabs to switch between versions of it (the same recipe on
// three scenes). Files are `${base}-${key}.jpg`. The first photo loads lazily; once it is on screen (or the
// tabs are hovered or focused), the others load in the background so a tab click swaps instantly. All
// photos sit stacked in one frame and only their opacity changes, so switching never shifts the layout.
// The frame is a `button.zoom` with the original file in data-src, so PostShell's lightbox opens it.
const TABS = [
  { key: "portrait", label: "Portrait" },
  { key: "street", label: "Street" },
  { key: "lake", label: "Boat" },
];

export default function PhotoSwitch({ base, alt }: { base: string; alt: string }) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<Record<string, true>>({});
  const [warm, setWarm] = useState(false);
  const frame = useRef<HTMLButtonElement>(null);
  const srcs = TABS.map((t) => `${base}-${t.key}.jpg`);
  const src = srcs[active];
  const label = `${alt}: ${TABS[active].label.toLowerCase()}`;

  // Until the picked photo arrives, keep showing the last one that was visible.
  const lastVisible = useRef<string | null>(null);
  const visible = loaded[src] ? src : lastVisible.current;
  lastVisible.current = visible;

  // Load the other photos once the first is in and the frame is near the screen.
  const firstLoaded = Object.keys(loaded).length > 0;
  useEffect(() => {
    if (warm || !firstLoaded || !frame.current) return;
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && setWarm(true), { rootMargin: "200px" });
    io.observe(frame.current);
    return () => io.disconnect();
  }, [warm, firstLoaded]);

  return (
    <figure className="photoswitch">
      <div role="tablist" aria-label={`${alt}: choose a scene`} className="tabs" onPointerEnter={() => setWarm(true)} onFocus={() => setWarm(true)}>
        {TABS.map((t, i) => (
          <button key={t.key} type="button" role="tab" aria-selected={i === active} onClick={() => setActive(i)}>
            {t.label}
          </button>
        ))}
      </div>
      <button ref={frame} type="button" className="zoom frame" data-src={src} aria-label={`Enlarge image: ${label}`}>
        {srcs.map((s) =>
          s === src || s === visible || warm ? (
            <Image
              key={s}
              src={s}
              alt={s === visible ? label : ""}
              aria-hidden={s === visible ? undefined : true}
              fill
              sizes="(max-width: 760px) 100vw, 760px"
              className={s === visible ? "on" : undefined}
              quality={85}
              loading={warm ? "eager" : "lazy"}
              onLoad={() => setLoaded((l) => (l[s] ? l : { ...l, [s]: true }))}
            />
          ) : null
        )}
      </button>
    </figure>
  );
}
