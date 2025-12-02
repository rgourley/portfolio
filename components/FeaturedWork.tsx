"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { WorkItem } from "@/lib/content";

interface FeaturedWorkProps {
  featuredWork: WorkItem[];
}

export default function FeaturedWork({ featuredWork }: FeaturedWorkProps) {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="relative z-10 max-w-[1200px] mx-auto px-12 lg:px-16">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-12">
            <span className="inline-flex items-center gap-2">
              <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
              </div>
              <span className="text-lg font-light text-foreground/60">Selected work</span>
            </span>
            <Link
              href="/work"
              className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors"
            >
              Discover ↓
            </Link>
          </div>
        </div>

        <div className="space-y-16">
          {/* First large featured work */}
          {featuredWork[0] && (
            <motion.div
              key={featuredWork[0].slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <Link
                href={`/work/${featuredWork[0].slug}`}
                className="block group"
              >
                <div className="space-y-6">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5">
                    {featuredWork[0].image && (
                      <img
                        src={featuredWork[0].image}
                        alt={featuredWork[0].title}
                        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-500"
                      />
                    )}
                    {!featuredWork[0].image && (
                      <div className="w-full h-full bg-foreground/5" />
                    )}
                  </div>

                  {/* Title */}
                  <div className="flex items-start justify-between">
                    <h3 className="font-display text-lg font-light group-hover:text-foreground/80 transition-colors">
                      {featuredWork[0].title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-foreground/30 group-hover:text-foreground/60 mt-2 ml-4 transition-colors flex-shrink-0" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Next two in 2-column grid */}
          {featuredWork.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredWork.slice(1, 3).map((work, index) => (
                <motion.div
                  key={work.slug}
                  initial={{ opacity: 0, y: 30 }}
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
                          <img
                            src={work.image}
                            alt={work.title}
                            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-500"
                          />
                        )}
                        {!work.image && (
                          <div className="w-full h-full bg-foreground/5" />
                        )}
                      </div>

                      {/* Title */}
                      <div className="flex items-start justify-between">
                        <h3 className="font-display text-lg font-light group-hover:text-foreground/80 transition-colors">
                          {work.title}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-foreground/30 group-hover:text-foreground/60 mt-2 ml-4 transition-colors flex-shrink-0" />
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

