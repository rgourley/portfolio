"use client";

import Image from "next/image";

interface SolutionHighlight {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

interface SolutionHighlightsProps {
  highlights: SolutionHighlight[];
}

export default function SolutionHighlights({ highlights }: SolutionHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <div className="relative w-screen -ml-12 lg:-ml-16">
      {/* Scrollable Cards Container */}
      <div 
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 pl-12 lg:pl-16"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {highlights.map((highlight) => (
          <div
            key={highlight.id}
            className="flex-shrink-0 w-[320px] bg-muted/50 rounded-lg overflow-hidden"
          >
            {/* Image Above */}
            <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5">
              {highlight.image ? (
                <Image
                  src={highlight.image}
                  alt={highlight.imageAlt || highlight.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-foreground/5" />
              )}
            </div>

            {/* Content Below */}
            <div className="p-5">
              <h3 className="text-lg font-medium text-foreground/90 mb-2">
                {highlight.title}
              </h3>
              <p className="text-sm text-foreground/80 font-light leading-relaxed">
                {highlight.description}
              </p>
            </div>
          </div>
        ))}
        {/* Spacer to allow scrolling to the edge */}
        <div className="flex-shrink-0 w-12 lg:w-16" />
      </div>
      
      {/* Fade gradient on the right */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to left, var(--background) 0%, transparent 100%)'
        }}
      />

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

