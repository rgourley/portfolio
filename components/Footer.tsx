"use client";

import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";
import { useTheme } from "@/components/ThemeProvider";

export default function Footer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-[1200px] mx-auto px-12 lg:px-16 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Links */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <Link href="/work" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors">
              Work
            </Link>
            <Link href="/resume" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors">
              Resume
            </Link>
            <Link href="/blog" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/newsletter" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors">
              Newsletter
            </Link>
            <Link href="/services" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors">
              Services
            </Link>
            <Link href="/leadership" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors">
              Leadership
            </Link>
            <a 
              href="mailto:hello@example.com" 
              className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2"
            >
              <FaEnvelope className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>

          {/* Right side: Theme toggle and vibe coded line */}
          <div className="flex items-center gap-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-xs text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2"
              aria-label="Toggle theme"
            >
              <span>{theme === "dark" ? "☀️" : "🌙"}</span>
              <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>

            {/* Vibe coded line */}
            <p className="text-xs text-grey-600">
              Vibe coded with ♥ using Cursor and Figma MCP
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

