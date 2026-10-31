"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Dynamically import heavy components to reduce initial bundle size
const SolutionHighlightsCarousel = dynamic(() => import("./SolutionHighlightsCarousel"), {
  loading: () => <div className="h-64 bg-muted/20 animate-pulse rounded-lg" />,
});
import LinkCards, { LinkCard } from "./LinkCards";
const TestimonialBlock = dynamic(() => import("./TestimonialBlock"), {
  loading: () => <div className="h-48 bg-muted/20 animate-pulse rounded-lg" />,
});

// Copies a code block's text, so readers can grab a prompt in one click.
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
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
      className="absolute top-2 right-2 rounded-md border border-foreground/15 bg-background/80 px-2.5 py-1 text-xs text-foreground/70 hover:text-foreground"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

interface MarkdownContentProps {
  content: string;
  // "article" is the narrow, Medium-style reading column used by blog posts.
  variant?: "default" | "article";
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
  | { type: 'cards'; cards: LinkCard[] };

// Parse custom blocks out of markdown content.
// Testimonial: :::testimonial\nimage: ...\nname: ...\nbio: ...\nquote: ...\n:::
// Link cards: :::cards\ntitle: ...\nurl: ...\nmeta: ...\ndescription: ...\n---\n(next card)\n:::
function parseTestimonials(content: string): { parts: ContentPart[] } {
  const blockRegex = /:::(testimonial|cards)\n([\s\S]*?)\n:::/g;
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

export default function MarkdownContent({ content, variant = "default" }: MarkdownContentProps) {
  const article = variant === "article";
  const bodyText = article
    ? "text-[19px] md:text-[20px] font-normal text-foreground/80 leading-[1.7]"
    : "text-[21px] text-foreground/65 font-light leading-[1.7]";

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
        className="block w-full cursor-zoom-in"
      >
        {child}
      </button>
    ) : (
      child
    );

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
                <figure className="m-0">
                  {zoomable(
                    src,
                    alt,
                    <Image
                      src={src}
                      alt={alt}
                      width={1344}
                      height={756}
                      sizes="(max-width: 768px) 100vw, 550px"
                      className="w-full h-auto rounded-lg"
                      quality={85}
                      loading="lazy"
                    />
                  )}
                  {alt && <figcaption className="mt-2 text-sm text-foreground/50">{alt}</figcaption>}
                </figure>
              );
            }

            if (wide && src.startsWith("/")) {
              return (
                <div className="my-10 w-full md:w-[min(1100px,calc(100vw-8rem))] md:relative md:left-1/2 md:-translate-x-1/2">
                  {zoomable(
                    src,
                    alt,
                    <Image
                      src={src}
                      alt={alt}
                      width={1600}
                      height={900}
                      sizes="(max-width: 768px) 100vw, 1100px"
                      className="w-full h-auto rounded-lg"
                      quality={85}
                      loading="lazy"
                    />
                  )}
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
                <div className="relative w-full my-8 aspect-video overflow-hidden rounded-lg bg-foreground/5">
                  <Image
                    src={normalizedSrc}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 900px, 1200px"
                    className="object-cover rounded-lg"
                    quality={85}
                    loading="lazy"
                  />
                </div>
              );
            } else if (src.startsWith("http://") || src.startsWith("https://")) {
              // External image - check if it's from configured domains, otherwise use regular img
              const isConfiguredDomain = 
                src.includes("uploads-ssl.webflow.com") ||
                src.includes("images.unsplash.com") ||
                src.includes("randomuser.me");
              
              if (isConfiguredDomain) {
                // Use Next.js Image for configured external domains
                return (
                  <div className="relative w-full my-8 aspect-video overflow-hidden rounded-lg bg-foreground/5">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 900px, 1200px"
                      className="object-contain rounded-lg"
                      quality={80}
                      loading="lazy"
                    />
                  </div>
                );
              }
              
              // Unconfigured external image - use regular img tag with optimizations
              return (
                <div className="my-8">
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto rounded-lg"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                </div>
              );
            }
            // Fallback
            return (
              <div className="my-8">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>
            );
          },
          p: ({ node, children }: any) => {
            // Don't wrap images in paragraphs
            const childrenArray = React.Children.toArray(children);
            const images = childrenArray.filter((child: any) => typeof child !== "string" || child.trim());
            if (images.length > 1 && images.every((child: any) => String(child?.props?.src || "").endsWith("#grid"))) {
              return (
                <div className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 w-full md:w-[min(1100px,calc(100vw-8rem))] md:relative md:left-1/2 md:-translate-x-1/2">
                  {images}
                </div>
              );
            }
            if (childrenArray.some((child: any) => child?.props?.src || child?.type === "img")) {
              return <>{children}</>;
            }
            return <p className={`${bodyText} mb-6`}>{children}</p>;
          },
          h1: ({ node, children }: any) => (
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-1 mt-4">{children}</h1>
          ),
          h2: ({ node, children }: any) => (
            <h2 className={`font-display text-3xl md:text-4xl font-medium mb-4 ${article ? "mt-12" : "mt-10"}`}>{children}</h2>
          ),
          h3: ({ node, children }: any) => (
            <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground/90 mb-3 mt-8">{children}</h3>
          ),
          ul: ({ node, children }: any) => (
            <ul className={article ? `list-disc list-outside pl-6 mb-6 space-y-2 ${bodyText}` : "list-disc list-inside mb-6 space-y-2 text-[21px] text-foreground/65 leading-[1.7]"}>{children}</ul>
          ),
          ol: ({ node, children }: any) => (
            <ol className={article ? `list-decimal list-outside pl-6 mb-6 space-y-2 ${bodyText}` : "list-decimal list-inside mb-6 space-y-2 text-[21px] text-foreground/65 leading-[1.7]"}>{children}</ol>
          ),
          li: ({ node, children }: any) => (
            <li className={bodyText}>{children}</li>
          ),
          a: ({ node, children, href }: any) => (
            <a
              href={href}
              className={article ? "text-[19px] md:text-[20px] text-foreground underline underline-offset-4 decoration-foreground/40 hover:decoration-foreground transition-colors leading-[1.7]" : "text-[21px] text-foreground/65 underline hover:text-foreground transition-colors leading-[1.7]"}
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
              <div className="relative mb-6">
                <pre className="p-4 pr-20 rounded-lg bg-muted text-foreground/90 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                  <code>{text}</code>
                </pre>
                {article && <CopyButton text={String(text).replace(/\n$/, "")} />}
              </div>
            );
          },
          code: ({ node, children }: any) => (
            <code className="px-1.5 py-0.5 rounded bg-muted text-foreground/90 text-sm font-mono">
              {children}
            </code>
          ),
          table: ({ node, children }: any) => (
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left border-collapse text-base [&_a]:!text-base [&_a]:!leading-normal">{children}</table>
            </div>
          ),
          th: ({ node, children }: any) => (
            <th className="py-3 pr-6 text-sm font-semibold text-foreground/80 border-b border-foreground/20 align-top">{children}</th>
          ),
          td: ({ node, children }: any) => (
            <td className="py-2.5 pr-6 text-foreground/65 border-b border-foreground/10 align-top">{children}</td>
          ),
          blockquote: ({ node, children }: any) => (
            <blockquote className={`border-l-4 border-foreground/20 pl-6 italic ${article ? "text-[19px] md:text-[20px] text-foreground/70" : "text-[21px] text-foreground/60"} my-6 leading-[1.7]`}>
              {children}
            </blockquote>
          ),
          strong: ({ node, children }: any) => (
            <strong className="font-semibold text-foreground/90">{children}</strong>
          ),
  };

  return (
    <div className={article ? "max-w-[700px] mx-auto" : "max-w-[1000px]"}>
      {/* Render content with testimonials inline */}
      {testimonialParts.map((part, index) => {
        if (part.type === 'cards') {
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
                  <h2 className="font-display text-3xl md:text-4xl font-medium mb-1 mt-4">Solution Highlights</h2>
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-black/90 p-4 cursor-zoom-out"
        >
          {/* Plain img on purpose: show the original file at full resolution, not a resized copy */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-h-[88vh] max-w-full w-auto h-auto object-contain rounded"
          />
          {lightbox.alt && <p className="max-w-3xl text-center text-sm text-white/70">{lightbox.alt}</p>}
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-4 right-5 text-3xl leading-none text-white/80 hover:text-white"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

