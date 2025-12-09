"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { trackEmailClick } from "@/lib/analytics";
import EmailLink from "@/components/EmailLink";

export default function CTA() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Subtle lenticular gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-full h-[550px] blur-3xl opacity-8"
          style={{
            background: 'linear-gradient(130deg, rgba(99, 102, 241, 0.28) 0%, rgba(139, 92, 246, 0.22) 25%, rgba(236, 72, 153, 0.18) 50%, rgba(99, 102, 241, 0.12) 75%, transparent 100%)',
          }}
        />
        <div 
          className="absolute top-0 right-1/4 w-full h-[500px] blur-3xl opacity-6"
          style={{
            background: 'linear-gradient(50deg, rgba(236, 72, 153, 0.24) 0%, rgba(99, 102, 241, 0.2) 30%, rgba(139, 92, 246, 0.15) 60%, transparent 100%)',
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
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-6xl font-light mb-6 leading-tight">
            Let's build something
            <br />
            <span className="gradient-text">together</span>
          </h2>
          <p className="text-xl text-foreground/65 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you're looking to transform a complex product or build something new, I'd love to hear about your project.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <EmailLink
              email="rgourley@gmail.com"
              location="cta"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-foreground/30 rounded-full font-light text-sm hover:border-foreground transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Get in touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </EmailLink>
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

