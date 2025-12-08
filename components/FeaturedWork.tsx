"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { WorkItem } from "@/lib/content";

interface FeaturedWorkProps {
  featuredWork: WorkItem[];
}

export default function FeaturedWork({ featuredWork }: FeaturedWorkProps) {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mb-4">
          <div className="mb-2">
            <span className="inline-flex items-center gap-2">
              <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
              </div>
              <span className="text-lg font-semibold text-foreground/60">Selected work</span>
            </span>
          </div>
        </div>

        <div className="space-y-16">
          {/* First large featured work */}
          {featuredWork[0] && (
            <motion.div
              key={featuredWork[0].slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group"
            >
              <Link
                href={`/work/${featuredWork[0].slug}`}
                className="block group"
              >
                <div className="space-y-8">
                  {/* Full Screen Width Image - breaks out of container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
                    {featuredWork[0].image && (
                      <Image
                        src={featuredWork[0].image}
                        alt={featuredWork[0].title}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover group-hover:opacity-90 transition-opacity duration-500"
                        quality={85}
                      />
                    )}
                    {!featuredWork[0].image && (
                      <div className="w-full h-full bg-foreground/5" />
                    )}
                  </div>

                  {/* Large Title Below Image */}
                  <div>
                    <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight group-hover:text-foreground/90 transition-colors">
                      {featuredWork[0].title}
                    </h3>
                  </div>

                  {/* Description and Arrow Below Title */}
                  <div className="flex items-start justify-between gap-6">
                    {featuredWork[0].description && (
                      <p className="text-lg md:text-xl text-foreground/65 font-light leading-relaxed max-w-2xl">
                        {featuredWork[0].description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-foreground/40 group-hover:text-foreground/60 transition-colors flex-shrink-0">
                      <span className="text-sm font-light">View project</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Next two in 2-column grid */}
          {featuredWork.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {featuredWork.slice(1, 3).map((work, index) => (
                <motion.div
                  key={work.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (index + 1) * 0.15 }}
                  className="group"
                >
                  <Link
                    href={`/work/${work.slug}`}
                    className="block group"
                  >
                    <div className="space-y-4">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5">
                        {work.image && (
                          <Image
                            src={work.image}
                            alt={work.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:opacity-90 transition-opacity duration-500"
                            quality={85}
                          />
                        )}
                        {!work.image && (
                          <div className="w-full h-full bg-foreground/5" />
                        )}
                      </div>

                      {/* Title */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-display text-lg font-semibold group-hover:text-foreground/80 transition-colors mb-1">
                            {work.title}
                          </h3>
                          {work.description && (
                            <p className="text-base text-foreground/65 font-light leading-relaxed">
                              {work.description}
                            </p>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-foreground/30 group-hover:text-foreground/60 mt-2 ml-4 transition-colors flex-shrink-0" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

