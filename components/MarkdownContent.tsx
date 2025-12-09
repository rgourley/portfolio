"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Dynamically import heavy components to reduce initial bundle size
const SolutionHighlightsCarousel = dynamic(() => import("./SolutionHighlightsCarousel"), {
  loading: () => <div className="h-64 bg-muted/20 animate-pulse rounded-lg" />,
});
const TestimonialBlock = dynamic(() => import("./TestimonialBlock"), {
  loading: () => <div className="h-48 bg-muted/20 animate-pulse rounded-lg" />,
});

interface MarkdownContentProps {
  content: string;
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

// Parse testimonials from markdown content
// Syntax: :::testimonial\nimage: ...\nname: ...\nbio: ...\nquote: ...\n:::
function parseTestimonials(content: string): { parts: Array<{ type: 'markdown' | 'testimonial'; content?: string; testimonial?: { image: string; name: string; bio: string; quote: string } }> } {
  const testimonialRegex = /:::testimonial\n([\s\S]*?)\n:::/g;
  const parts: Array<{ type: 'markdown' | 'testimonial'; content?: string; testimonial?: { image: string; name: string; bio: string; quote: string } }> = [];
  let lastIndex = 0;
  let match;

  while ((match = testimonialRegex.exec(content)) !== null) {
    // Add markdown before testimonial
    if (match.index > lastIndex) {
      parts.push({
        type: 'markdown',
        content: content.substring(lastIndex, match.index)
      });
    }

    // Parse testimonial block
    const testimonialContent = match[1];
    const lines = testimonialContent.split('\n');
    const testimonial: { image: string; name: string; bio: string; quote: string } = {
      image: '',
      name: '',
      bio: '',
      quote: ''
    };

    for (const line of lines) {
      const imageMatch = line.match(/^image:\s*(.+)$/);
      const nameMatch = line.match(/^name:\s*(.+)$/);
      const bioMatch = line.match(/^bio:\s*(.+)$/);
      const quoteMatch = line.match(/^quote:\s*(.+)$/);

      if (imageMatch) testimonial.image = imageMatch[1].trim();
      if (nameMatch) testimonial.name = nameMatch[1].trim();
      if (bioMatch) testimonial.bio = bioMatch[1].trim();
      if (quoteMatch) testimonial.quote = quoteMatch[1].trim();
    }

    parts.push({
      type: 'testimonial',
      testimonial
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining markdown
  if (lastIndex < content.length) {
    parts.push({
      type: 'markdown',
      content: content.substring(lastIndex)
    });
  }

  // If no testimonials found, return entire content as markdown
  if (parts.length === 0) {
    return { parts: [{ type: 'markdown', content }] };
  }

  return { parts };
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Parse testimonials first, then parse Solution Highlights from each markdown part
  const { parts: testimonialParts } = useMemo(() => parseTestimonials(content), [content]);

  // Shared components for markdown rendering
  const markdownComponents: any = {
          img: (props: any) => {
            const src = props.src || "";
            const alt = props.alt || "";
            
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
            if (childrenArray.some((child: any) => child?.props?.src || child?.type === "img")) {
              return <>{children}</>;
            }
            return <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">{children}</p>;
          },
          h1: ({ node, children }: any) => (
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-1 mt-4">{children}</h1>
          ),
          h2: ({ node, children }: any) => (
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-1 mt-4">{children}</h2>
          ),
          h3: ({ node, children }: any) => (
            <h3 className="inline-flex items-center gap-2 mb-1 mt-3">
              <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
              </div>
              <span className="text-lg font-semibold text-foreground/60">{children}</span>
            </h3>
          ),
          ul: ({ node, children }: any) => (
            <ul className="list-disc list-inside mb-6 space-y-2 text-[21px] text-foreground/65 leading-[1.7]">{children}</ul>
          ),
          ol: ({ node, children }: any) => (
            <ol className="list-decimal list-inside mb-6 space-y-2 text-[21px] text-foreground/65 leading-[1.7]">{children}</ol>
          ),
          li: ({ node, children }: any) => (
            <li className="text-[21px] text-foreground/65 font-light leading-[1.7]">{children}</li>
          ),
          a: ({ node, children, href }: any) => (
            <a
              href={href}
              className="text-[21px] text-foreground/65 underline hover:text-foreground transition-colors leading-[1.7]"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          code: ({ node, inline, children }: any) => {
            if (inline) {
              return (
                <code className="px-1.5 py-0.5 rounded bg-muted text-foreground/90 text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="block p-4 rounded-lg bg-muted text-foreground/90 text-sm font-mono overflow-x-auto mb-6">
                {children}
              </code>
            );
          },
          blockquote: ({ node, children }: any) => (
            <blockquote className="border-l-4 border-foreground/20 pl-6 italic text-[21px] text-foreground/60 my-6 leading-[1.7]">
              {children}
            </blockquote>
          ),
          strong: ({ node, children }: any) => (
            <strong className="font-semibold text-foreground/90">{children}</strong>
          ),
  };

  return (
    <div className="max-w-[900px]">
      {/* Render content with testimonials inline */}
      {testimonialParts.map((part, index) => {
        if (part.type === 'testimonial' && part.testimonial) {
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
    </div>
  );
}

