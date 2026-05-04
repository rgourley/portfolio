"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function NewsletterPage() {
  return (
    <>
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden mb-0 pb-0">
        {/* Background image — right side, fading left behind headline */}
        <div className="absolute top-0 right-0 bottom-0 w-[65%] -z-10">
          <Image
            src="/images/newsletter-bg.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          {/* Fade left, top, and bottom into page background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: [
                'linear-gradient(to right, var(--background) 0%, color-mix(in srgb, var(--background) 85%, transparent) 15%, color-mix(in srgb, var(--background) 40%, transparent) 40%, color-mix(in srgb, var(--background) 10%, transparent) 70%, color-mix(in srgb, var(--background) 15%, transparent) 100%)',
                'linear-gradient(to bottom, var(--background) 0%, transparent 15%)',
                'linear-gradient(to bottom, transparent 75%, var(--background) 100%)',
              ].join(', '),
            }}
          />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16 w-full relative z-10">
          <span className="text-[13px] uppercase tracking-[4px] text-foreground/40 font-medium block mb-6">
            AI Newsletter
          </span>
          <h1 className="font-display text-[clamp(64px,12vw,160px)] font-extrabold text-foreground leading-[0.9] tracking-[-0.04em] mb-8">
            The Autonomy
            <br />
            Report
          </h1>
          <div className="w-20 h-[3px] bg-cyan-500 mb-8" />
          <p className="text-2xl font-semibold text-foreground/70 leading-relaxed max-w-[600px] mb-10">
            Rob Gourley&apos;s Weekly Briefing on Agentic AI
          </p>
          <Link
            href="https://www.theautonomyreport.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 border border-foreground/20 text-[13px] uppercase tracking-[2px] font-medium text-foreground/70 hover:border-foreground/40 hover:text-foreground transition-all backdrop-blur-sm bg-foreground/[0.03]"
          >
            Subscribe to The Autonomy Report
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="max-w-[600px] mt-6 space-y-4">
            <p className="text-[clamp(15px,1.8vw,17px)] text-foreground/50 font-light leading-[1.7]">
              I&apos;ve spent two decades designing and shipping products: at Apple, running my own agency, and leading design at startups building AI and autonomous systems. The best signal comes from people actually building, not just talking.
            </p>
            <p className="text-[clamp(15px,1.8vw,17px)] text-foreground/50 font-light leading-[1.7]">
              That&apos;s <Link href="https://www.theautonomyreport.com/" target="_blank" rel="noopener noreferrer" className="text-foreground/70 underline underline-offset-2 hover:text-foreground transition-colors">The Autonomy Report</Link>. Every week I share what&apos;s actually moving in agentic AI. Agent releases worth your attention versus the demos that won&apos;t ship. Model launches and what they unlock. Infrastructure changes that matter for builders. The work transition ahead, from someone living it.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16 mt-8">

        {/* For You / Not For You */}
        <section className="pt-0 pb-6 border-0">
          <span className="text-2xl font-semibold text-foreground/70 block mb-8">
            Who It&apos;s For
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-[900px]">
            <div>
              <h3 className="text-base font-semibold text-foreground/75 mb-6 tracking-wide">
                This is for you if:
              </h3>
              <ul className="space-y-0">
                {[
                  "You're building with agents, not just reading about them",
                  "You ship products in agentic AI, autonomous systems, or developer tools",
                  "You want signal from someone in the work, not commentary from the sidelines",
                  "You'd rather read a 5-minute briefing than a 40-tweet thread",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 items-start text-base text-foreground/50 leading-relaxed py-2.5 border-0"
                  >
                    <span className="text-emerald-400 text-sm mt-0.5 flex-shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground/75 mb-6 tracking-wide">
                Not for you if:
              </h3>
              <ul className="space-y-0">
                {[
                  "You want hot takes and AGI predictions",
                  "You're looking for VC commentary or hype cycles",
                  "You prefer LinkedIn motivation over what actually works in production",
                  "You want long-form theory over tested practice",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 items-start text-base text-foreground/50 leading-relaxed py-2.5 border-0"
                  >
                    <span className="text-red-400 text-sm mt-0.5 flex-shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Recent Issues */}
        <section className="py-6 border-0">
          <span className="text-2xl font-semibold text-foreground/70 block mb-8">
            Recent Issues
          </span>
          <div className="max-w-[720px]">
            {[
              "The Autonomy Breakout is Here",
              "AI Isn't Taking Jobs. But Autonomy Might.",
              "Why DoorDash Built Its Own Delivery Robot",
              "Foxglove Raises $40M to Build the Data Stack Behind Every Robot",
              "40 Humanoid Robot Companies Raising Billions",
            ].map((title, i) => (
              <div
                key={title}
                className="group flex items-center gap-4 py-5 border-0 transition-all hover:pl-2"
              >
                <span className="text-xs text-foreground/20 font-semibold tabular-nums min-w-[24px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg text-foreground/65 flex-1 group-hover:text-foreground transition-colors">
                  {title}
                </span>
                <span className="text-foreground/20 group-hover:text-foreground/50 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-6 border-0">
          <h2 className="font-display text-[clamp(36px,6vw,72px)] font-bold text-foreground leading-[1.05] tracking-[-0.03em] max-w-[800px] mb-6">
            The signal you need. Every week.
          </h2>
          <p className="text-lg text-foreground/50 font-light leading-relaxed max-w-[600px] mb-4">
            Join 2,000+ builders getting weekly takes on agents, models, infra, and the work transition ahead.
          </p>
          <p className="text-lg text-foreground/50 font-light mb-10">
            Read by operators at Google, Microsoft, Shield AI, and startups everywhere.
          </p>
          <Link
            href="https://www.theautonomyreport.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 border border-foreground/20 text-[13px] uppercase tracking-[2px] font-medium text-foreground/70 hover:border-foreground/40 hover:text-foreground transition-all backdrop-blur-sm bg-foreground/[0.03]"
          >
            Subscribe Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
    </>
  );
}
