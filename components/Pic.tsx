"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface PicProps {
  src: string;
  alt?: string;
  /** width and height of the source, for the box's aspect ratio */
  w: number;
  h: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** a fixed box shape instead of the image's own (the project cards share one) */
  aspect?: string;
}

/** A photograph in a figure's box: a next/image at the box's shape, lazy unless it is the hero, that fades in quietly once it
    has loaded. The box keeps its shape before the file arrives, so nothing around it moves. */
export default function Pic({ src, alt = "", w, h, className = "", sizes = "(max-width: 760px) 100vw, 1200px", priority, aspect }: PicProps) {
  const img = useRef<HTMLImageElement>(null);
  const [on, setOn] = useState(false);
  // an image the browser already had is complete before React attaches onLoad, so it is checked once on mount
  useEffect(() => { if (img.current?.complete && img.current.naturalWidth) setOn(true); }, []);
  return (
    <div className={`shot ${className}`} style={{ aspectRatio: aspect || `${w}/${h}` }}>
      <Image ref={img} src={src} alt={alt} fill sizes={sizes} priority={priority} quality={85} className={on ? "on" : undefined} onLoad={() => setOn(true)} />
    </div>
  );
}
