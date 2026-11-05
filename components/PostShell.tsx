"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { trackCopyCode } from "@/lib/analytics";

/**
 * The browser side of a post. The article is server HTML; this is one click handler over all of
 * it, so the zoom buttons open the lightbox and the copy buttons copy their code block.
 */
export default function PostShell({ children }: { children: ReactNode }) {
  // Click-to-enlarge for local article images: shows the original file over the page.
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const zoom = target.closest<HTMLButtonElement>("button.zoom");
    if (zoom?.dataset.src) {
      // A photo switcher stacks several images in one button; "img.on" is the one showing.
      const img = zoom.querySelector<HTMLImageElement>("img.on") ?? zoom.querySelector("img");
      setLightbox({ src: zoom.dataset.src, alt: img?.alt || "" });
      return;
    }
    const copy = target.closest<HTMLButtonElement>("button.copy");
    if (copy) { copyCode(copy); trackCopyCode(copy.parentElement?.querySelector("code")?.className.replace(/^.*language-(\S+).*$/, "$1") || "text"); }
  };

  return (
    <div className="md" onClick={onClick}>
      {children}

      {/* Portaled to <body>: .page keeps a transform from its entrance animation, and a transformed ancestor makes
          position:fixed relative to that ancestor. Inside the article, the lightbox spanned the whole post and the
          picture sat in its middle, thousands of pixels off screen on long posts. */}
      {lightbox && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt || "Enlarged image"}
          onClick={() => setLightbox(null)}
          className="lightbox"
        >
          {/* Plain img on purpose: show the original file at full resolution, not a resized copy */}
          <img src={lightbox.src} alt={lightbox.alt} />
          {lightbox.alt && <p>{lightbox.alt}</p>}
          <button type="button" onClick={() => setLightbox(null)} aria-label="Close">×</button>
        </div>,
        document.body
      )}
    </div>
  );
}

// Copies the code block next to the button, so readers can grab a prompt in one click.
function copyCode(button: HTMLButtonElement) {
  const text = (button.parentElement?.querySelector("pre")?.textContent ?? "").replace(/\n$/, "");
  const done = () => {
    button.textContent = "Copied";
    setTimeout(() => {
      button.textContent = "Copy";
    }, 1500);
  };
  // Older browsers and non-secure pages have no clipboard API, so fall back to a hidden textarea.
  const fallback = () => {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    if (document.execCommand("copy")) done();
    area.remove();
  };
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, fallback);
  else fallback();
}
