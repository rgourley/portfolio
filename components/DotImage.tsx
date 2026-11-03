"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { mountDots } from "@/lib/dots";

interface DotImageProps {
  src: string;
  alt?: string;
  /** width and height of the source, for the box's aspect ratio */
  w: number;
  h: number;
  cell?: number;
  /** the page's one dot figure, its hero: it gathers from dots and answers the cursor; every other figure is the photograph alone */
  hero?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** a fixed box shape instead of the image's own (the project cards share one) */
  aspect?: string;
}

/** A photograph in the figure's box. The hero of a page arrives as dots: the image is a next/image the engine samples, and
    it draws the dots over it until the photograph takes over. Every other figure is the next/image on its own: no canvas,
    no engine, nothing to run. */
export default function DotImage({ src, alt = "", w, h, cell = 5, hero, className = "", sizes = "(max-width: 760px) 100vw, 1200px", priority, aspect }: DotImageProps) {
  const host = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (!hero || !host.current || !img.current) return;
    return mountDots(host.current, img.current, src, { cell });
  }, [src, cell, hero]);
  return (
    <div ref={host} className={`dots ${hero ? "" : "still "}${className}`} style={{ aspectRatio: aspect || `${w}/${h}` }}>
      <Image ref={img} src={src} alt={alt} fill sizes={sizes} priority={priority} quality={85} />
    </div>
  );
}
