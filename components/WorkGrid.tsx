"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WorkItem } from "@/lib/content";

interface WorkGridProps {
  work: WorkItem[];
}

export default function WorkGrid({ work }: WorkGridProps) {
  return (
    <div className="space-y-16">
      {work.map((item, index) => (
        <motion.div
          key={item.slug}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: index * 0.1,
          }}
          className="group"
        >
          <Link href={`/work/${item.slug}`} className="block">
            <div className="space-y-8">
              {/* Title Above */}
              <div>
                <h3 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.0] tracking-[-0.02em] group-hover:text-foreground/90 transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Large Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-500"
                  />
                )}
                {!item.image && (
                  <div className="w-full h-full bg-foreground/5" />
                )}
              </div>

              {/* Info and Tags Below */}
              <div className="space-y-4">
                {item.description && (
                  <div className="flex items-start justify-between gap-6">
                    <p className="text-lg md:text-xl text-foreground/65 font-light leading-relaxed max-w-2xl flex-1">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 text-foreground/40 group-hover:text-foreground/60 transition-colors flex-shrink-0">
                      <span className="text-sm font-light">View project</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-muted text-foreground/70 font-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

