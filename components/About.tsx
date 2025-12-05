"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="relative z-10 max-w-[1200px] mx-auto px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.7,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-flex items-center gap-2"
          >
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
            </div>
            <span className="text-lg font-semibold text-foreground/60">About</span>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left column - Main content */}
            <div className="lg:col-span-8 space-y-8">
              <p className="text-xl font-light leading-relaxed text-foreground/65">
                Twenty years building products across the spectrum. Consumer platforms that scaled to <span className="font-normal text-foreground">$1.2B acquisitions</span>. Trading systems processing <span className="font-normal text-foreground">$200B in volume</span>. ML underwriting platforms. AI music production. Autonomous robotics. What ties it together? Taking hairy technical challenges and crafting experiences that just work.
              </p>
              
              <p className="text-xl font-light leading-relaxed text-foreground/65">
                Right now, I'm at <span className="font-normal text-foreground">Shield AI</span> leading design for Hivemind, a low-code platform that lets engineers build, test, and deploy AI pilots. The autonomy industry is moving from automation to adaptive intelligence. The design challenge is making that accessible.
              </p>
            </div>

            {/* Right column - Stats/Companies */}
            <div className="lg:col-span-4 space-y-8">
              <div>
                <p className="text-base font-semibold text-foreground/60 mb-6">
                  Previously <span className="bg-gradient-to-r from-blue-400/60 to-purple-400/60 bg-clip-text text-transparent">@</span>
                </p>
                <div className="space-y-3">
                  <p className="text-sm font-light text-foreground">Apple</p>
                  <p className="text-sm font-light text-foreground">Shield AI</p>
                  <p className="text-sm font-light text-foreground">Federato</p>
                  <p className="text-sm font-light text-foreground">Boombox</p>
                  <p className="text-sm font-light text-foreground">Axure</p>
                  <p className="text-sm font-light text-foreground">Crunchyroll</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

