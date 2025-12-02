"use client";

import { motion } from "framer-motion";

export default function DesignApproach() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Image - extends from left edge to content start */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <div
          className="absolute top-0 bottom-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{
            backgroundImage: "url('/images/design-approach-image.jpg')",
            left: '0',
            right: 'max(1.5rem, calc((100vw - 75rem) / 2 + 1.5rem + 50%))',
          }}
        />
        {/* Gradient overlay to blend with background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, var(--background) 0%, rgba(13, 13, 13, 0.8) 30%, rgba(13, 13, 13, 0.4) 60%, transparent 100%)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2"
          >
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-purple-400/40" />
              <div className="w-0.5 h-0.5 bg-purple-400/40" />
              <div className="w-0.5 h-0.5 bg-purple-400/40" />
              <div className="w-0.5 h-0.5 bg-purple-400/40" />
            </div>
            <span className="text-lg font-light text-foreground/60">Design Approach</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Content on the right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 lg:col-start-6 space-y-8"
            >
              <p className="text-lg font-light leading-relaxed text-foreground/70">
                I've spent my career finding patterns in chaos. The challenge is always the same: how do you take something deeply technical and make it feel natural?
              </p>

              <p className="text-lg font-light leading-relaxed text-foreground/70">
                My approach starts with understanding the user's world completely. Not just their workflow, but their mental models, their constraints, their moments of frustration. With that foundation, I build design systems that scale. Systems that let teams ship fast without sacrificing quality. Systems that grow with the product.
              </p>

              <p className="text-lg font-light leading-relaxed text-foreground/70">
                As a leader, I focus on building teams that can handle ambiguity. I hire for curiosity and teach for craft. We move fast, we prototype constantly, and we're not afraid to throw away work that isn't solving the real problem. The best design happens when you give talented people clear direction, then get out of their way.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

