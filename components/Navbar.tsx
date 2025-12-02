"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "glass border-border/50 py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-12 lg:px-16">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight hover:text-foreground/80 transition-colors"
          >
            Rob Gourley
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <Link href="/work" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors">Work</Link>
            <Link href="/resume" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors">Resume</Link>
            <Link href="/blog" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors">Blog</Link>
            <Link href="/about" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors">About</Link>
            <Link href="/newsletter" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors">Newsletter</Link>
          </div>

          {/* Contact */}
          <div className="hidden md:block">
            <a href="mailto:hello@example.com" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors">hello@example.com</a>
          </div>

          {/* Mobile - Show contact */}
          <div className="md:hidden">
            <a href="mailto:hello@example.com" className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors">hello@example.com</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

