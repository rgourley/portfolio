"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { trackExplorerChange } from "@/lib/analytics";

// A post's :::viewer block: one large photo with a row of buttons per setting, where each click changes only that
// setting. Images live at `${dir}/${prefix}-${key on each row, joined by -}.jpg`. The first option on each row is the
// starting pick. Every photo one click away loads once the frame is near the screen, so a click swaps instantly.
// The frame is a `button.zoom`, so PostShell's lightbox opens it.
type Option = { key: string; label: string; note?: string };
type Row = { label: string; options: Option[] };
type Data = { dir: string; prefix: string; aspect: string; alt: string; rows: Row[] };

export default function PhotoViewer({ src }: { src: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [picks, setPicks] = useState<string[]>([]);
  const [loaded, setLoaded] = useState<Record<string, true>>({});
  const [near, setNear] = useState(false);
  const frame = useRef<HTMLButtonElement>(null);
  const lastVisible = useRef<string | null>(null);

  useEffect(() => {
    fetch(src)
      .then((r) => r.json())
      .then((d: Data) => {
        setData(d);
        setPicks(d.rows.map((row) => row.options[0].key));
      });
  }, [src]);

  useEffect(() => {
    if (near || !frame.current) return;
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && setNear(true), { rootMargin: "200px" });
    io.observe(frame.current);
    return () => io.disconnect();
  }, [near, data]);

  if (!data || !picks.length) return <div className="my-10 rounded-lg bg-muted/20 animate-pulse" style={{ aspectRatio: "1216/832" }} />;

  const path = (keys: string[]) => `${data.dir}/${data.prefix}-${keys.join("-")}.jpg`;
  const current = path(picks);
  const visible = loaded[current] ? current : lastVisible.current;
  lastVisible.current = visible;
  const choices = data.rows.map((row, i) => row.options.find((o) => o.key === picks[i]) || row.options[0]);
  const label = `${data.alt}: ${choices.map((c) => c.label).join(", ")}`;
  const notes = choices.map((c) => c.note).filter(Boolean);

  // The current photo, the last one shown, and once it's in, everything one click away.
  const shown = new Set<string>([current]);
  if (visible) shown.add(visible);
  if (near && Object.keys(loaded).length > 0) {
    data.rows.forEach((row, i) => row.options.forEach((o) => shown.add(path(picks.map((p, j) => (j === i ? o.key : p))))));
  }

  return (
    <figure className="photoswitch viewer">
      {data.rows.map((row, i) => (
        <div key={row.label} className="setting">
          <span className="setting-name">{row.label}</span>
          <div role="tablist" aria-label={`${data.alt}: ${row.label}`} className="tabs">
            {row.options.map((o) => (
              <button
                key={o.key}
                type="button"
                role="tab"
                aria-selected={o.key === picks[i]}
                onClick={() => {
                  setPicks(picks.map((p, j) => (j === i ? o.key : p)));
                  trackExplorerChange("viewer", row.label, o.key);
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button ref={frame} type="button" className="zoom frame" data-src={current} aria-label={`Enlarge image: ${label}`} style={{ aspectRatio: data.aspect }}>
        {[...shown].map((s) => (
          <Image
            key={s}
            src={s}
            alt={s === visible ? label : ""}
            aria-hidden={s === visible ? undefined : true}
            fill
            className={s === visible ? "on" : undefined}
            unoptimized // these are already sized for the web, so skip the image optimizer
            loading="eager"
            onLoad={() => setLoaded((l) => (l[s] ? l : { ...l, [s]: true }))}
          />
        ))}
      </button>
      {notes.length > 0 && <figcaption>{notes.join(" ")}</figcaption>}
    </figure>
  );
}
