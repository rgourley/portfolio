"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

// Toggle between image and video background
const USE_VIDEO_BACKGROUND = true; // Set to true to use video, false for image

// Video configuration - just specify the filename, it will automatically use /videos/ folder
// Leave empty string to auto-detect common video filenames
const VIDEO_FILENAME = "6085299_Infomap Model Line 3d_By_Finn_Moeller_Artlist_HD.mp4"; // e.g., "globe-loop.mp4" or "" for auto-detect

// Auto-detect video files (will try these in order)
const VIDEO_OPTIONS = [
  "globe-loop.mp4",
  "earth-loop.mp4", 
  "planet-loop.mp4",
  "globe.mp4",
  "earth.mp4"
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (videoRef.current && USE_VIDEO_BACKGROUND) {
      videoRef.current.playbackRate = 0.6; // 60% speed
    }
  }, []);

  // Video mask gradients - inverted for light mode
  const videoMaskGradient = theme === "light"
    ? 'linear-gradient(to right, transparent 0%, transparent 15%, rgba(255, 255, 255, 0.3) 25%, rgba(255, 255, 255, 0.7) 40%, white 60%, white 100%)'
    : 'linear-gradient(to right, transparent 0%, transparent 15%, rgba(0, 0, 0, 0.3) 25%, rgba(0, 0, 0, 0.7) 40%, black 60%, black 100%)';
  
  const bottomMaskGradient = theme === "light"
    ? 'linear-gradient(to top, transparent 0%, rgba(255, 255, 255, 0.5) 8%, white 15%, white 100%)'
    : 'linear-gradient(to top, transparent 0%, rgba(0, 0, 0, 0.5) 8%, black 15%, black 100%)';

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Subtle lenticular gradient blobs */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-full h-[600px] blur-3xl opacity-5"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.25) 25%, rgba(236, 72, 153, 0.2) 50%, rgba(99, 102, 241, 0.15) 75%, transparent 100%)',
          }}
        />
        <div 
          className="absolute top-0 right-1/4 w-full h-[500px] blur-3xl opacity-4"
          style={{
            background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.25) 0%, rgba(99, 102, 241, 0.2) 30%, rgba(139, 92, 246, 0.15) 60%, transparent 100%)',
          }}
        />
      </div>
      
      {/* Background Image or Video - extends from left column to right edge */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        {USE_VIDEO_BACKGROUND ? (
          // Video Background with fade wrapper
          <div
            className="absolute top-0 h-full overflow-hidden"
            style={{
              left: 'max(1.5rem, calc((100vw - 75rem) / 2 + 1.5rem))',
              right: '0',
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute top-0 h-full w-full object-cover opacity-35"
              style={{
                maskImage: `${videoMaskGradient}, ${bottomMaskGradient}`,
                WebkitMaskImage: `${videoMaskGradient}, ${bottomMaskGradient}`,
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
              }}
            >
              {VIDEO_FILENAME ? (
                // Use specified filename
                <source src={`/videos/${VIDEO_FILENAME}`} type="video/mp4" />
              ) : (
                // Auto-detect: try multiple common filenames
                VIDEO_OPTIONS.map((filename) => (
                  <source key={filename} src={`/videos/${filename}`} type="video/mp4" />
                ))
              )}
            </video>
            {/* Bottom fade overlay - quick fade in less vertical space */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                height: '15%',
                background: 'linear-gradient(to top, var(--background) 0%, color-mix(in srgb, var(--background) 90%, transparent) 30%, color-mix(in srgb, var(--background) 50%, transparent) 60%, transparent 100%)',
              }}
            />
          </div>
        ) : (
          // Image Background (original)
          <div 
            className="absolute top-0 h-full bg-cover bg-center bg-no-repeat opacity-35"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000&h=1200&fit=crop')",
              left: 'max(1.5rem, calc((100vw - 75rem) / 2 + 1.5rem))',
              right: '0',
            }}
          />
        )}
        {/* Gradient overlay to blend with background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, var(--background) 0%, color-mix(in srgb, var(--background) 80%, transparent) 30%, color-mix(in srgb, var(--background) 40%, transparent) 60%, transparent 100%)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-12 lg:px-16 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.1,
                },
              },
            }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.0] tracking-[-0.02em] md:tracking-[-0.02em] lg:tracking-[-0.02em]"
            >
              Turning complexity
              <br />
              into products <span style={{ color: 'var(--accent-cyan)' }}>people love</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="text-xl text-foreground/65 font-light leading-relaxed max-w-xl"
            >
              Whether it's leading design for autonomous AI pilots, transforming how underwriters evaluate risk with machine learning, or helping traders move billions with confidence, I build systems that make the complex feel effortless.
            </motion.p>

            {/* Discover Link */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              className="pt-4"
            >
              <Link
                href="/work"
                className="inline-flex items-center text-sm font-light text-foreground/60 hover:text-foreground transition-colors"
              >
                Discover ↓
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

