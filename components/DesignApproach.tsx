"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function DesignApproach() {
  const { theme } = useTheme();

  // Theme-aware mask and gradient
  const imageMaskGradient = theme === "light"
    ? 'linear-gradient(to right, white 0%, white 70%, transparent 100%)'
    : 'linear-gradient(to right, black 0%, black 70%, transparent 100%)';

  const gradientOverlay = theme === "light"
    ? 'linear-gradient(to left, var(--background) 0%, var(--background) 20%, color-mix(in srgb, var(--background) 95%, transparent) 40%, color-mix(in srgb, var(--background) 70%, transparent) 60%, color-mix(in srgb, var(--background) 30%, transparent) 80%, transparent 100%)'
    : 'linear-gradient(to left, var(--background) 0%, var(--background) 20%, rgba(13, 13, 13, 0.95) 40%, rgba(13, 13, 13, 0.7) 60%, rgba(13, 13, 13, 0.3) 80%, transparent 100%)';

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Subtle lenticular gradient blobs */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-[500px] blur-3xl opacity-5"
          style={{
            background: 'linear-gradient(150deg, rgba(139, 92, 246, 0.25) 0%, rgba(99, 102, 241, 0.2) 30%, rgba(236, 72, 153, 0.15) 60%, transparent 100%)',
          }}
        />
        <div 
          className="absolute top-0 right-0 w-full h-[450px] blur-3xl opacity-4"
          style={{
            background: 'linear-gradient(30deg, rgba(236, 72, 153, 0.2) 0%, rgba(139, 92, 246, 0.18) 40%, rgba(99, 102, 241, 0.12) 70%, transparent 100%)',
          }}
        />
      </div>
      {/* Background Image - extends from left edge to content start */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <div
          className="absolute top-0 bottom-0 bg-cover bg-center bg-no-repeat opacity-12"
          style={{
            backgroundImage: "url('/images/plan.png')",
            left: '0',
            right: 'max(1.5rem, calc((100vw - 75rem) / 2 + 1.5rem + 40%))',
            maskImage: imageMaskGradient,
            WebkitMaskImage: imageMaskGradient,
          }}
        />
        {/* Gradient overlay to blend with background and protect text area */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: gradientOverlay
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Empty left column for spacing */}
            <div className="hidden lg:block lg:col-span-5"></div>
            
            {/* Design Approach heading on the right */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:col-span-7 inline-flex items-center gap-2"
            >
              <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
                <div className="w-0.5 h-0.5 bg-purple-400/40" />
                <div className="w-0.5 h-0.5 bg-purple-400/40" />
                <div className="w-0.5 h-0.5 bg-purple-400/40" />
                <div className="w-0.5 h-0.5 bg-purple-400/40" />
              </div>
              <span className="text-lg font-semibold text-foreground/60">Design Approach</span>
            </motion.div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start -mt-2">
            {/* Content on the right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:col-span-7 lg:col-start-6 space-y-8"
            >
              <p className="text-xl font-light leading-relaxed text-foreground/65">
                I've spent my career finding patterns in chaos. The challenge is always the same: how do you take something deeply technical and make it feel natural?
              </p>

              <p className="text-xl font-light leading-relaxed text-foreground/65">
                My approach starts with understanding the user's world completely. Not just their workflow, but their mental models, their constraints, their moments of frustration. With that foundation, I build design systems that scale. Systems that let teams ship fast without sacrificing quality. Systems that grow with the product.
              </p>

              <p className="text-xl font-light leading-relaxed text-foreground/65">
                As a leader, I focus on building teams that can handle ambiguity. I hire for curiosity and teach for craft. We move fast, we prototype constantly, and we're not afraid to throw away work that isn't solving the real problem. The best design happens when you give talented people clear direction, then get out of their way.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

