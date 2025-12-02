"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { WorkItem } from "@/lib/content";

interface WorkGridProps {
  work: WorkItem[];
}

export default function WorkGrid({ work }: WorkGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {work.map((item, index) => (
        <motion.div
          key={item.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group"
        >
          <Link href={`/work/${item.slug}`} className="block">
            <div className="space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5 rounded-lg">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-500"
                  />
                )}
                {!item.image && (
                  <div className="w-full h-full bg-foreground/5" />
                )}
              </div>
              <div>
                <h3 className="font-display text-xl font-light group-hover:text-foreground/90 transition-colors">
                  {item.title}
                </h3>
                <p className="text-foreground/60 mb-4 line-clamp-2 text-sm">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-muted text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

