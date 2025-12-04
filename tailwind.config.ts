import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        grey: {
          50: "var(--grey-50)",
          100: "var(--grey-100)",
          200: "var(--grey-200)",
          300: "var(--grey-300)",
          400: "var(--grey-400)",
          500: "var(--grey-500)",
          600: "var(--grey-600)",
          700: "var(--grey-700)",
          800: "var(--grey-800)",
          900: "var(--grey-900)",
          950: "var(--grey-950)",
        },
      },
      maxWidth: {
        "content": "1200px",
      },
      gridTemplateColumns: {
        "12": "repeat(12, minmax(0, 1fr))",
      },
      gap: {
        "grid": "20px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        // Type scale based on 1.25 ratio (Major Third)
        // Each size includes [fontSize, lineHeight, letterSpacing]
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.025em" }],      // 12px - captions, labels
        sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.01em" }],    // 14px - small body, metadata
        base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0" }],             // 16px - body text
        lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],  // 18px - large body
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.015em" }],  // 20px - subheadings
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.02em" }],     // 24px - small headings
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.025em" }], // 30px - medium headings
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.03em" }],  // 36px - large headings
        "5xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.035em" }],      // 48px - display
        "6xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.04em" }],     // 60px - large display
        "7xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.045em" }],      // 72px - hero
        "8xl": ["6rem", { lineHeight: "0.95", letterSpacing: "-0.05em" }],      // 96px - massive hero
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "gradient": "gradient 8s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "rotate-slow": "rotateSlow 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(251, 191, 36, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(251, 191, 36, 0.6)" },
        },
        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

