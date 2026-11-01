"use client";

import { useEffect, useState } from "react";
import { Segmented } from "./SettingsExplorer";

// Data file shape: the models in display order, the seeds, and per scene each model's time on each seed.
type Model = { key: string; label: string };
type Scene = { key: string; title?: string; secs: Record<string, Record<string, number>> };
// aspect is optional, like "4/5"; without it the frames are 16:9.
type Data = { dir: string; models: Model[]; seeds: number[]; scenes: Scene[]; aspect?: string; zoomLabel?: string; zoomOrigin?: string };

// One scene, one large image. The thumbnails underneath swap which model's version is shown.
export default function ModelToggle({ src, scene }: { src: string; scene: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [model, setModel] = useState("");
  const [seed, setSeed] = useState(0);
  const [zoom, setZoom] = useState(false);

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
  const portrait = !!data.aspect && Number(data.aspect.split("/")[0]) < Number(data.aspect.split("/")[1]);
  const ratio = data.aspect ? { aspectRatio: data.aspect } : undefined;
  // Close-up: zoom the large image on a fixed spot.
  const zoomStyle = zoom ? { transform: "scale(2.2)", transformOrigin: data.zoomOrigin || "50% 45%" } : undefined;

  return (
    <div className="my-10 w-full md:w-[min(1100px,calc(100vw-8rem))] md:relative md:left-1/2 md:-translate-x-1/2">
      <div className={`relative overflow-hidden rounded-lg bg-foreground/5 ${data.aspect ? "" : "aspect-video"} ${portrait ? "mx-auto max-w-[560px]" : ""}`} style={ratio}>
        {/* All three stay mounted so switching is instant; only the chosen one is visible */}
        {data.models.map((m) => (
          <img
            key={m.key}
            src={path(m.key)}
            loading="lazy"
            alt={`${s.title || scene}, made with ${m.label}, seed ${seed}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-150 ${m.key === model ? "opacity-100" : "opacity-0"}`}
            style={zoomStyle}
          />
        ))}
        <span className="pointer-events-none absolute top-3 left-3 rounded bg-black/60 px-2 py-1 text-xs text-white">
          {current.label} · {s.secs[model]?.[seed]}s
        </span>
      </div>

      <div className={`mt-3 grid grid-cols-3 gap-2 ${portrait ? "mx-auto max-w-[560px]" : ""}`}>
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
            <img src={path(m.key)} alt="" loading="lazy" className={`w-full object-cover ${data.aspect ? "" : "aspect-video"}`} style={ratio} />
            <span className="block px-2 py-1 text-xs text-foreground/70">
              {m.label} · {s.secs[m.key]?.[seed]}s
            </span>
          </button>
        ))}
      </div>

      <div className={`mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/60 ${portrait ? "mx-auto max-w-[560px]" : ""}`}>
        <Segmented label="Seed" options={data.seeds.map((x) => ({ key: String(x), label: String(x) }))} value={String(seed)} onChange={(k) => setSeed(Number(k))} />
        {data.zoomLabel && (
          <Segmented
            label="View"
            options={[{ key: "full", label: "Full frame" }, { key: "zoom", label: data.zoomLabel }]}
            value={zoom ? "zoom" : "full"}
            onChange={(k) => setZoom(k === "zoom")}
          />
        )}
      </div>
    </div>
  );
}
