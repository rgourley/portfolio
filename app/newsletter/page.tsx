"use client";

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { ArrowRight } from "lucide-react";

export default function NewsletterPage() {
  return (
    <>
      <Script
        type="text/javascript"
        async
        src="https://subscribe-forms.beehiiv.com/attribution.js"
      />
      
      <div className="pt-32 pb-20">
        {/* Hero Section with Image */}
        <section className="relative min-h-[70vh] flex items-center mb-20 overflow-hidden">
          {/* Hero Image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=2000&h=1200&fit=crop"
              alt="Design Mind Newsletter"
              fill
              className="object-cover opacity-40"
              priority
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 8%, rgba(0, 0, 0, 0.7) 15%, black 25%, black 75%, rgba(0, 0, 0, 0.7) 85%, rgba(0, 0, 0, 0.3) 92%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 8%, rgba(0, 0, 0, 0.7) 15%, black 25%, black 75%, rgba(0, 0, 0, 0.7) 85%, rgba(0, 0, 0, 0.3) 92%, transparent 100%)',
              }}
            />
            {/* Gradient overlay */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, var(--background) 0%, color-mix(in srgb, var(--background) 50%, transparent) 35%, color-mix(in srgb, var(--background) 10%, transparent) 65%, transparent 100%)'
              }}
            />
          </div>

          <div className="max-w-[1200px] mx-auto px-12 lg:px-16 w-full relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                </div>
                <span className="text-lg font-semibold text-foreground/60">Newsletter</span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.0] tracking-[-0.02em] mb-8">
                Design Mind
              </h1>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight mb-8">
                Rob Gourley's Weekly Newsletter on Product Design, AI, and Team Leadership
              </h2>

              <div className="space-y-6 mb-8">
                <p className="text-lg md:text-xl text-foreground/65 font-light leading-relaxed max-w-xl">
                  I've spent two decades designing products at Apple, running my own agency, and leading design at startups building AI and autonomous systems. The best insights come from people actually building, not just talking.
                </p>

                <p className="text-lg md:text-xl text-foreground/65 font-light leading-relaxed max-w-xl">
                  That's Design Mind. Every week I share what's working right now. AI tools I'm testing and which ones are worth your subscription. Tactics for building and scaling design teams. Design trends that matter versus what's just noise.
                </p>

                <p className="text-lg md:text-xl text-foreground/65 font-light leading-relaxed max-w-xl">
                  Join 2,000+ designers getting actionable insights. Read by designers at Google, Airbnb, and startups worldwide.
                </p>
              </div>

              <Link
                href="https://www.getdesignmind.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-foreground/20 rounded-lg text-base font-light text-foreground/80 hover:border-foreground/40 hover:text-foreground transition-all"
              >
                Subscribe to Design Mind
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-12 lg:px-16">
          {/* This Newsletter Is For You If */}
          <section className="mb-20">
            <div className="inline-flex items-center gap-2 mb-12">
              <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
              </div>
              <h2 className="text-lg font-semibold text-foreground/60">This Newsletter Is For You If:</h2>
            </div>

            <ul className="space-y-3 text-[21px] text-foreground/65 leading-[1.7] max-w-3xl">
              <li className="flex gap-3">
                <span className="text-foreground/40 flex-shrink-0">•</span>
                <span>You're building AI-powered products</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground/40 flex-shrink-0">•</span>
                <span>You lead or are growing a design team</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground/40 flex-shrink-0">•</span>
                <span>You want practical, tested insights over theory</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground/40 flex-shrink-0">•</span>
                <span>You're shipping products, not just talking about design</span>
              </li>
            </ul>
          </section>

          {/* This Newsletter Is NOT For You If */}
          <section className="mb-20">
            <div className="inline-flex items-center gap-2 mb-12">
              <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
              </div>
              <h2 className="text-lg font-semibold text-foreground/60">This Newsletter Is NOT For You If:</h2>
            </div>

            <ul className="space-y-3 text-[21px] text-foreground/65 leading-[1.7] max-w-3xl">
              <li className="flex gap-3">
                <span className="text-foreground/40 flex-shrink-0">•</span>
                <span>You prefer generic design tips</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground/40 flex-shrink-0">•</span>
                <span>You're looking for portfolio inspiration only</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground/40 flex-shrink-0">•</span>
                <span>You want LinkedIn motivation posts over real tactics</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground/40 flex-shrink-0">•</span>
                <span>You don't work on actual products</span>
              </li>
            </ul>
          </section>

          {/* Recent Issues */}
          <section className="mb-20">
            <div className="inline-flex items-center gap-2 mb-12">
              <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
              </div>
              <h2 className="text-lg font-semibold text-foreground/60">Recent Issues</h2>
            </div>

            <ul className="space-y-3 text-[21px] text-foreground/65 leading-[1.7] max-w-3xl">
              <li className="flex gap-3">
                <span className="text-foreground/40 flex-shrink-0">•</span>
                <span>How I'm using AI in Figma (what works, what doesn't)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground/40 flex-shrink-0">•</span>
                <span>Three mistakes I made scaling design teams</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground/40 flex-shrink-0">•</span>
                <span>Design systems: When to start small vs go big</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground/40 flex-shrink-0">•</span>
                <span>The AI tools actually worth your $20/month</span>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground/40 flex-shrink-0">•</span>
                <span>Career moves that matter in 2025</span>
              </li>
            </ul>
          </section>

          {/* CTA Section */}
          <section className="relative min-h-[400px] flex items-center overflow-hidden rounded-lg mb-20">
            <div className="absolute inset-0 -z-10">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop"
                alt="Let's shape the future of design"
                fill
                className="object-cover opacity-15"
                loading="lazy"
              />
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, var(--background) 0%, color-mix(in srgb, var(--background) 60%, transparent) 50%, transparent 100%)'
                }}
              />
            </div>
            
            <div className="max-w-[900px] px-12 lg:px-16 py-16 relative z-10">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
                Let's shape the future of design, together.
              </h2>
              <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed mb-8">
                Join 2,000+ designers getting actionable insights on product design, AI tools, and team leadership.
              </p>
              <Link
                href="https://www.getdesignmind.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-foreground/20 rounded-lg text-base font-light text-foreground/80 hover:border-foreground/40 hover:text-foreground transition-all"
              >
                Subscribe Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

