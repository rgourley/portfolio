"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";
import { BlogPost } from "@/lib/content";

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-foreground/60 text-lg">
          No blog posts yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group"
        >
          <Link href={`/blog/${post.slug}`} className="block h-full">
            <div className="space-y-4 h-full flex flex-col">
              {post.image && (
                <div className="relative aspect-video overflow-hidden bg-foreground/5 rounded-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-500"
                  />
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-muted text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-xl font-light mb-2 group-hover:text-foreground/90 transition-colors">
                  {post.title}
                </h3>
                <p className="text-foreground/60 mb-4 line-clamp-2 text-sm flex-1">
                  {post.description}
                </p>
                {post.date && (
                  <span className="text-xs text-foreground/50">
                    {format(new Date(post.date), "MMMM d, yyyy")}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

