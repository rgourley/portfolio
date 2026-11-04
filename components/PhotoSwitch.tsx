"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// One large photo with tabs to switch between versions of it (e.g. the same recipe on three scenes).
// Files are `${base}-${key}.jpg`. The first photo loads lazily; once it is on screen (or the tabs are hovered or
// focused), the other photos load in the background so a tab click swaps instantly. All photos sit stacked in
// one frame and only the opacity changes, so switching never reloads or shifts the layout.
const DEFAULT_TABS = [
  { key: "portrait", label: "Portrait" },
  { key: "street", label: "Street" },
  { key: "lake", label: "Boat" },
];

export default function PhotoSwitch({
  base,
  alt,
  onZoom,
}: {
  base: string;
  alt: string;
  onZoom?: (src: string, alt: string) => void;
}) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<Record<string, true>>({});
  const [warm, setWarm] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const srcs = DEFAULT_TABS.map((t) => `${base}-${t.key}.jpg`);
  const src = srcs[active];
  const label = `${alt}: ${DEFAULT_TABS[active].label.toLowerCase()}`;

  // Until the picked photo arrives, keep the last one that was showing.
  const lastVisible = useRef<string | null>(null);
  const visible = loaded[src] ? src : lastVisible.current;
  lastVisible.current = visible;

  // Start loading the other photos once the first one is loaded and the frame is near the screen.
  const firstLoaded = Object.keys(loaded).length > 0;
  useEffect(() => {
    if (warm || !firstLoaded || !frame.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && setWarm(true),
      { rootMargin: "200px" }
    );
    io.observe(frame.current);
    return () => io.disconnect();
  }, [warm, firstLoaded]);

  const frameEl = (
    <div ref={frame} className="relative w-full overflow-hidden rounded-lg bg-foreground/5" style={{ aspectRatio: "1400 / 958" }}>
      {srcs.map((s) =>
        s === src || s === visible || warm ? (
          <Image
            key={s}
            src={s}
            alt={s === visible ? label : ""}
            aria-hidden={s === visible ? undefined : true}
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className={`object-cover transition-opacity duration-150 ${s === visible ? "opacity-100" : "opacity-0"}`}
            quality={85}
            loading={warm ? "eager" : "lazy"}
            onLoad={() => setLoaded((l) => (l[s] ? l : { ...l, [s]: true }))}
          />
        ) : null
      )}
    </div>
  );

  return (
    <div className="my-6 w-full">
      <div
        role="tablist"
        aria-label={`${alt}: choose a scene`}
        className="mb-2 flex gap-1"
        onPointerEnter={() => setWarm(true)}
        onFocus={() => setWarm(true)}
      >
        {DEFAULT_TABS.map((t, i) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              i === active
                ? "bg-foreground text-background"
                : "text-foreground/60 hover:bg-foreground/10 hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {onZoom ? (
        <button
          type="button"
          onClick={() => onZoom(src, label)}
          aria-label={`Enlarge image: ${label}`}
          className="block w-full cursor-zoom-in"
        >
          {frameEl}
        </button>
      ) : (
        frameEl
      )}
    </div>
  );
}
