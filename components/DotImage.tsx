"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { mountDots } from "@/lib/dots";

interface DotImageProps {
  src: string;
  alt?: string;
  /** width and height of the source, for the box's aspect ratio */
  w: number;
  h: number;
  cell?: number;
  /** force this image to gather even if it is not the first on the page */
  gather?: boolean;
  /** never gather: arrive as the photo */
  still?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** a fixed box shape instead of the image's own (the project cards share one) */
  aspect?: string;
}

/** A photograph that arrives as dots. The image is a next/image; the engine samples it and draws the dots over it. */
export default function DotImage({ src, alt = "", w, h, cell = 5, gather, still, className = "", sizes = "(max-width: 760px) 100vw, 1200px", priority, aspect }: DotImageProps) {
  const host = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!host.current || !img.current) return;
    return mountDots(host.current, img.current, src, { cell, gather, still, pageKey: pathname });
  }, [src, cell, gather, still, pathname]);
  return (
    <div ref={host} className={`dots ${className}`} style={{ aspectRatio: aspect || `${w}/${h}` }}>
      <Image ref={img} src={src} alt={alt} fill sizes={sizes} priority={priority} quality={85} />
    </div>
  );
}
