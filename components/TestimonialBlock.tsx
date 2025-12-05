"use client";

import Image from "next/image";

interface TestimonialBlockProps {
  image: string;
  name: string;
  bio: string;
  quote: string;
}

export default function TestimonialBlock({ image, name, bio, quote }: TestimonialBlockProps) {
  return (
    <div className="my-12">
      {/* Quote - Full width, left-aligned */}
      <blockquote className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.0] tracking-[-0.02em] text-foreground/90 mb-6">
        {quote}
      </blockquote>
      
      {/* Image and Info - Side by side */}
      <div className="flex gap-6 items-center">
        {/* Circular Image */}
        <div className="flex-shrink-0">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-foreground/5">
            {image && (
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                loading="lazy"
              />
            )}
          </div>
        </div>

        {/* Name and Bio */}
        <div className="space-y-1">
          <div className="text-base font-semibold text-foreground/80">
            {name}
          </div>
          <div className="text-sm text-foreground/60 font-light">
            {bio}
          </div>
        </div>
      </div>
    </div>
  );
}

