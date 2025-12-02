"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      
      {/* Background Image - extends from left column to right edge */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <div 
          className="absolute top-0 h-full bg-cover bg-center bg-no-repeat opacity-25"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000&h=1200&fit=crop')",
            left: 'max(1.5rem, calc((100vw - 75rem) / 2 + 1.5rem))',
            right: '0',
          }}
        />
        {/* Gradient overlay to blend with background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, var(--background) 0%, rgba(13, 13, 13, 0.8) 30%, rgba(13, 13, 13, 0.4) 60%, transparent 100%)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-12 lg:px-16 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.8] tracking-tight">
              Turn complexity
              <br />
              into products people love
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-xl">
              Whether it's leading design for autonomous AI pilots, transforming how underwriters evaluate risk with machine learning, or helping traders move billions with confidence, I build systems that make the complex feel effortless.
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href="mailto:hello@example.com"
                className="inline-flex items-center px-8 py-4 border border-foreground/20 rounded-lg font-light text-sm hover:border-foreground/40 transition-all"
              >
                hello@example.com
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

