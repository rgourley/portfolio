"use client";

import Image from "next/image";

interface SolutionHighlight {
  title: string;
  description: string;
  image?: string;
}

interface SolutionHighlightsCarouselProps {
  highlights: SolutionHighlight[];
}

export default function SolutionHighlightsCarousel({ highlights }: SolutionHighlightsCarouselProps) {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  return (
    <div className="mb-12 -mx-12 lg:-mx-16">
      <div className="relative">
        {/* Scrollable Cards Container */}
        <div 
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: '3rem',
            paddingRight: '3rem',
          }}
        >
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[320px] bg-muted/70 rounded-lg overflow-hidden border border-grey-800"
            >
              {/* Image Above */}
              {highlight.image && (
                <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5">
                  <Image
                    src={highlight.image}
                    alt={highlight.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              )}
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
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

