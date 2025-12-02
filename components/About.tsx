"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-32 relative overflow-hidden">
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
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
            </div>
            <span className="text-lg font-light text-foreground/60">About</span>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left column - Main content */}
            <div className="lg:col-span-8 space-y-8">
              <p className="text-lg font-light leading-relaxed text-foreground/70">
                Twenty years building products across the spectrum. Consumer platforms that scaled to <span className="font-normal text-foreground">$1.2B acquisitions</span>. Trading systems processing <span className="font-normal text-foreground">$200B in volume</span>. ML underwriting platforms. AI music production. Autonomous robotics. What ties it together? Taking hairy technical challenges and crafting experiences that just work.
              </p>
              
              <p className="text-lg font-light leading-relaxed text-foreground/70">
                Right now, I'm at <span className="font-normal text-foreground">Shield AI</span> leading design for Hivemind, a low-code platform that lets engineers build, test, and deploy AI pilots. The autonomy industry is moving from automation to adaptive intelligence. The design challenge is making that accessible.
              </p>
            </div>

            {/* Right column - Stats/Companies */}
            <div className="lg:col-span-4 space-y-8">
              <div className="border-t border-foreground/10 pt-8">
                <p className="text-sm font-light text-foreground/60 mb-6 uppercase tracking-wider">Previously</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-light text-foreground">Kraken</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-light text-foreground">Crunchyroll</p>
                      <p className="text-xs font-light text-foreground/60">$1.2B Sony acquisition</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-light text-foreground">Federato</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-light text-foreground">Axure</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-light text-foreground">Apple</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-light text-foreground">My agency</p>
                      <p className="text-xs font-light text-foreground/60">Grew NatGeo to 50M+ followers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

