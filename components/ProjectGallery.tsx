"use client";

import Image from "next/image";

interface ProjectGalleryProps {
  images: string[];
  title?: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="relative w-screen -ml-12 lg:-ml-16">
        {/* Scrollable Cards Container */}
        <div 
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 pl-12 lg:pl-16"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[320px] bg-muted/50 rounded-lg overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5">
                <Image
                  src={image}
                  alt={title ? `${title} - Image ${index + 1}` : `Project image ${index + 1}`}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
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
    </div>
  );
}

