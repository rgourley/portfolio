"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Dims } from "@/lib/image-dims";

// Dynamically import heavy components to reduce initial bundle size
const SolutionHighlightsCarousel = dynamic(() => import("./SolutionHighlightsCarousel"), {
  loading: () => <div className="h-64 bg-muted/20 animate-pulse rounded-lg" />,
});
import LinkCards, { LinkCard } from "./LinkCards";
const SettingsExplorer = dynamic(() => import("./SettingsExplorer"));
const ModelToggle = dynamic(() => import("./ModelToggle"));
const ComboExplorer = dynamic(() => import("./ComboExplorer"));
const CropGrid = dynamic(() => import("./CropGrid"));
const TestimonialBlock = dynamic(() => import("./TestimonialBlock"), {
  loading: () => <div className="h-48 bg-muted/20 animate-pulse rounded-lg" />,
});

// Copies a code block's text, so readers can grab a prompt in one click.
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="copy"
      onClick={() => {
        const done = () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
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
      }}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

interface MarkdownContentProps {
  content: string;
  // "article" is the blog's reading column; "default" is the same set of elements without the lightbox.
  variant?: "default" | "article";
  /** pixel sizes of the local images, read on the server, so each one keeps its own shape */
  dims?: Dims;
}

// Parse Solution Highlights section from markdown
function parseSolutionHighlights(content: string): { highlights: Array<{ title: string; description: string; image?: string }>; restContent: string; contentAfter: string } {
  const solutionHighlightsIndex = content.indexOf('## Solution Highlights');

  if (solutionHighlightsIndex === -1) {
    return { highlights: [], restContent: content, contentAfter: '' };
  }

  // Find the end of Solution Highlights section (next ## heading or end of content)
  const afterHighlights = content.substring(solutionHighlightsIndex);
  const nextSectionMatch = afterHighlights.match(/\n## /);
  const highlightsEndIndex = nextSectionMatch
    ? solutionHighlightsIndex + nextSectionMatch.index!
    : content.length;

  const highlightsSection = content.substring(
    solutionHighlightsIndex + '## Solution Highlights\n\n'.length,
    highlightsEndIndex
  );
  const restContent = content.substring(0, solutionHighlightsIndex).trim();
  const contentAfter = content.substring(highlightsEndIndex).trim();

  // Parse each highlight: **Title** followed by optional image, then paragraph
  const highlights: Array<{ title: string; description: string; image?: string }> = [];
  const lines = highlightsSection.split('\n');
  let currentTitle = '';
  let currentDescription = '';
  let currentImage = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check if line is a bold title (starts with ** and ends with **)
    const boldMatch = line.match(/^\*\*(.+?)\*\*$/);
    // Check if line is an image markdown: ![alt](src) or ![src]
    const imageMatch = line.match(/^!\[.*?\]\((.+?)\)$/);

    if (boldMatch) {
      // Save previous highlight if exists
      if (currentTitle && currentDescription) {
        highlights.push({
          title: currentTitle,
          description: currentDescription.trim(),
          image: currentImage || undefined,
        });
      }
      currentTitle = boldMatch[1].trim();
      currentDescription = '';
      currentImage = '';
    } else if (imageMatch && currentTitle) {
      // Extract image URL
      currentImage = imageMatch[1].trim();
    } else if (line.trim() && currentTitle && !imageMatch) {
      // Accumulate description lines (skip image lines)
      currentDescription += (currentDescription ? '\n' : '') + line;
    }
  }

  // Add last highlight
  if (currentTitle && currentDescription) {
    highlights.push({
      title: currentTitle,
      description: currentDescription.trim(),
      image: currentImage || undefined,
    });
  }

  return { highlights, restContent, contentAfter };
}

type Testimonial = { image: string; name: string; bio: string; quote: string };
type ContentPart =
  | { type: 'markdown'; content: string }
  | { type: 'testimonial'; testimonial: Testimonial }
  | { type: 'cards'; cards: LinkCard[] }
  | { type: 'settings'; src: string }
  | { type: 'models'; src: string; scene: string }
  | { type: 'combo'; src: string }
  | { type: 'crops'; src: string };

// Parse custom blocks out of markdown content.
// Testimonial: :::testimonial\nimage: ...\nname: ...\nbio: ...\nquote: ...\n:::
// Link cards: :::cards\ntitle: ...\nurl: ...\nmeta: ...\ndescription: ...\n---\n(next card)\n:::
// Settings explorer: :::settings\nsrc: /data/file.json\n:::
// Model toggle: :::models\nsrc: /data/file.json\nscene: key\n:::
// Two-axis compare: :::combo\nsrc: /data/file.json\n:::
// Close-up grid: :::crops\nsrc: /data/file.json\n:::
function parseTestimonials(content: string): { parts: ContentPart[] } {
  const blockRegex = /:::(testimonial|cards|settings|models|combo|crops)\n([\s\S]*?)\n:::/g;
  const parts: ContentPart[] = [];
  let lastIndex = 0;
  let match;

  const parseFields = (block: string): Record<string, string> => {
    const fields: Record<string, string> = {};
    for (const line of block.split('\n')) {
      const m = line.match(/^(\w+):\s*(.+)$/);
      if (m) fields[m[1]] = m[2].trim();
    }
    return fields;
  };

  while ((match = blockRegex.exec(content)) !== null) {
    // Add markdown before the block
    if (match.index > lastIndex) {
      parts.push({
        type: 'markdown',
        content: content.substring(lastIndex, match.index)
      });
    }

    if (match[1] === 'testimonial') {
      const f = parseFields(match[2]);
      parts.push({
        type: 'testimonial',
        testimonial: { image: f.image || '', name: f.name || '', bio: f.bio || '', quote: f.quote || '' }
      });
    } else if (match[1] === 'settings') {
      parts.push({ type: 'settings', src: parseFields(match[2]).src || '' });
    } else if (match[1] === 'combo' || match[1] === 'crops') {
      parts.push({ type: match[1], src: parseFields(match[2]).src || '' });
    } else if (match[1] === 'models') {
      const f = parseFields(match[2]);
      parts.push({ type: 'models', src: f.src || '', scene: f.scene || '' });
    } else {
      const cards: LinkCard[] = match[2]
        .split(/\n---\n/)
        .map((chunk) => parseFields(chunk))
        .filter((f) => f.title && f.url)
        .map((f) => ({ title: f.title, url: f.url, meta: f.meta, description: f.description }));
      parts.push({ type: 'cards', cards });
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining markdown
  if (lastIndex < content.length) {
    parts.push({
      type: 'markdown',
      content: content.substring(lastIndex)
    });
  }

  // If no custom blocks found, return entire content as markdown
  if (parts.length === 0) {
    return { parts: [{ type: 'markdown', content }] };
  }

  return { parts };
}

export default function MarkdownContent({ content, variant = "default", dims = {} }: MarkdownContentProps) {
  const article = variant === "article";

  // Parse testimonials first, then parse Solution Highlights from each markdown part
  const { parts: testimonialParts } = useMemo(() => parseTestimonials(content), [content]);

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
  const zoomable = (src: string, alt: string, child: React.ReactNode) =>
    article ? (
      <button
        type="button"
        onClick={() => setLightbox({ src, alt })}
        aria-label={alt ? `Enlarge image: ${alt}` : "Enlarge image"}
        className="zoom"
      >
        {child}
      </button>
    ) : (
      child
    );

  // A local image at its own shape when the page knows it, otherwise in a 16:9 frame.
  const picture = (src: string, alt: string, sizes: string) => {
    const d = dims[src];
    if (d) return <Image src={src} alt={alt} width={d.w} height={d.h} sizes={sizes} className="pic" quality={85} loading="lazy" />;
    return (
      <div className="pic" style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
        <Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit: "cover" }} quality={85} loading="lazy" />
      </div>
    );
  };

  // Shared components for markdown rendering
  const markdownComponents: any = {
          img: (props: any) => {
            const rawSrc = props.src || "";
            const alt = props.alt || "";
            // "#wide" opts an image out of the reading column: full natural ratio, up to 1100px, centered on the page.
            const wide = rawSrc.endsWith("#wide");
            // "#grid" images that share a paragraph are laid out two across by the p renderer; each one still opens on its own.
            const grid = rawSrc.endsWith("#grid");
            const src = wide || grid ? rawSrc.replace(/#(wide|grid)$/, "") : rawSrc;

            if (grid && src.startsWith("/")) {
              return (
                <figure>
                  {zoomable(src, alt, picture(src, alt, "(max-width: 640px) 100vw, 550px"))}
                  {alt && <figcaption>{alt}</figcaption>}
                </figure>
              );
            }

            if (wide && src.startsWith("/")) {
              return (
                <div className="wideimg">
                  <figure>
                    {zoomable(src, alt, picture(src, alt, "(max-width: 900px) 100vw, 1100px"))}
                    {alt && <figcaption>{alt}</figcaption>}
                  </figure>
                </div>
              );
            }

            // Check if it's a local image (starts with /) or external URL
            if (src.startsWith("/") || src.startsWith("./") || src.startsWith("../")) {
              // Local image - use Next.js Image
              // Normalize the path
              const normalizedSrc = src.startsWith("./") || src.startsWith("../")
                ? src.replace(/^\.\//, "/").replace(/^\.\.\//, "/")
                : src;

              return (
                <figure>
                  {zoomable(normalizedSrc, alt, picture(normalizedSrc, alt, "(max-width: 760px) 100vw, 760px"))}
                  {alt && <figcaption>{alt}</figcaption>}
                </figure>
              );
            }
            // External image: a plain tag
            return (
              <figure>
                <img src={src} alt={alt} className="pic" loading="lazy" decoding="async" fetchPriority="low" />
                {alt && <figcaption>{alt}</figcaption>}
              </figure>
            );
          },
          p: ({ node, children }: any) => {
            // Don't wrap images in paragraphs
            const childrenArray = React.Children.toArray(children);
            const images = childrenArray.filter((child: any) => typeof child !== "string" || child.trim());
            if (images.length > 1 && images.every((child: any) => String(child?.props?.src || "").endsWith("#grid"))) {
              return <div className="imggrid">{images}</div>;
            }
            if (childrenArray.some((child: any) => child?.props?.src || child?.type === "img")) {
              return <>{children}</>;
            }
            return <p>{children}</p>;
          },
          a: ({ node, children, href }: any) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          // react-markdown v9+ no longer passes an `inline` prop, so fenced blocks are styled
          // on <pre> and `code` only ever handles inline spans.
          pre: ({ node, children }: any) => {
            const codeChild: any = React.Children.toArray(children)[0];
            const text = codeChild?.props?.children ?? children;
            return (
              <div className="codewrap">
                <pre><code>{text}</code></pre>
                {article && <CopyButton text={String(text).replace(/\n$/, "")} />}
              </div>
            );
          },
          table: ({ node, children }: any) => (
            <div className="tablewrap">
              <table>{children}</table>
            </div>
          ),
  };

  return (
    <div className="md">
      {/* Render content with testimonials inline */}
      {testimonialParts.map((part, index) => {
        if (part.type === 'combo') {
          return <ComboExplorer key={`combo-${index}`} src={part.src} />;
        } else if (part.type === 'crops') {
          return <CropGrid key={`crops-${index}`} src={part.src} />;
        } else if (part.type === 'models') {
          return <ModelToggle key={`models-${index}`} src={part.src} scene={part.scene} />;
        } else if (part.type === 'settings') {
          return <SettingsExplorer key={`settings-${index}`} src={part.src} />;
        } else if (part.type === 'cards') {
          return <LinkCards key={`cards-${index}`} cards={part.cards} />;
        } else if (part.type === 'testimonial' && part.testimonial) {
          return (
            <TestimonialBlock
              key={`testimonial-${index}`}
              image={part.testimonial.image}
              name={part.testimonial.name}
              bio={part.testimonial.bio}
              quote={part.testimonial.quote}
            />
          );
        } else if (part.type === 'markdown' && part.content) {
          // Check if this markdown contains Solution Highlights
          const { highlights: sectionHighlights, restContent: sectionRest, contentAfter: sectionAfter } = parseSolutionHighlights(part.content);

          return (
            <React.Fragment key={`markdown-${index}`}>
              {/* Render content before Solution Highlights */}
              {sectionRest && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={markdownComponents}
                >
                  {sectionRest}
                </ReactMarkdown>
              )}

              {/* Render Solution Highlights as carousel */}
              {sectionHighlights.length > 0 && (
                <>
                  <h2>Solution Highlights</h2>
                  <SolutionHighlightsCarousel highlights={sectionHighlights} />
                </>
              )}

              {/* Render content after Solution Highlights */}
              {sectionAfter && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={markdownComponents}
                >
                  {sectionAfter}
                </ReactMarkdown>
              )}
            </React.Fragment>
          );
        }
        return null;
      })}

      {lightbox && (
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
        </div>
      )}
    </div>
  );
}
