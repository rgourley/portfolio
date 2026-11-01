"use client";

import { useEffect, useState } from "react";

// Data file shape: the models in display order, the seeds, and per scene each model's time on each seed.
type Model = { key: string; label: string };
type Scene = { key: string; title?: string; secs: Record<string, Record<string, number>> };
type Data = { dir: string; models: Model[]; seeds: number[]; scenes: Scene[] };

// One scene, one large image. The thumbnails underneath swap which model's version is shown.
export default function ModelToggle({ src, scene }: { src: string; scene: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [model, setModel] = useState("");
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    fetch(src)
      .then((r) => r.json())
      .then((d: Data) => {
        setData(d);
        setModel(d.models[0].key);
        setSeed(d.seeds[0]);
      });
  }, [src]);

  if (!data) return <div className="my-10 aspect-video rounded-lg bg-muted/20 animate-pulse" />;

  const s = data.scenes.find((x) => x.key === scene);
  if (!s) return null;
  const path = (m: string) => `${data.dir}/${scene}-${m}-${seed}.jpg`;
  const current = data.models.find((m) => m.key === model)!;

  return (
    <div className="my-10 w-full md:w-[min(1100px,calc(100vw-8rem))] md:relative md:left-1/2 md:-translate-x-1/2">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-foreground/5">
        {/* All three stay mounted so switching is instant; only the chosen one is visible */}
        {data.models.map((m) => (
          <img
            key={m.key}
            src={path(m.key)}
            loading="lazy"
            alt={`${s.title || scene}, made with ${m.label}, seed ${seed}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-150 ${m.key === model ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <span className="pointer-events-none absolute top-3 left-3 rounded bg-black/60 px-2 py-1 text-xs text-white">
          {current.label} · {s.secs[model]?.[seed]}s
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {data.models.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setModel(m.key)}
            aria-pressed={m.key === model}
            className={`overflow-hidden rounded-md border-2 text-left transition-colors ${
              m.key === model ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img src={path(m.key)} alt="" loading="lazy" className="aspect-video w-full object-cover" />
            <span className="block px-2 py-1 text-xs text-foreground/70">
              {m.label} · {s.secs[m.key]?.[seed]}s
            </span>
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm text-foreground/60">
        <span>Seed</span>
        {data.seeds.map((x) => (
          <button
            key={x}
            type="button"
            onClick={() => setSeed(x)}
            className={`rounded-full border px-3 py-1 text-sm ${
              x === seed ? "border-foreground bg-foreground text-background" : "border-foreground/20 text-foreground/70 hover:text-foreground"
            }`}
          >
            {x}
          </button>
        ))}
      </div>
    </div>
  );
}
