"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="relative z-10 max-w-[1200px] mx-auto px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-6xl font-light mb-6 leading-tight">
            Let's build something
            <br />
            <span className="gradient-text">together</span>
          </h2>
          <p className="text-lg text-foreground/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you're looking to transform a complex product or build something new, I'd love to hear about your project.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="mailto:hello@example.com"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-foreground/30 rounded-full font-light text-sm hover:border-foreground transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Get in touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 text-foreground/60 hover:text-foreground font-light text-sm transition-colors"
            >
              View my work
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

