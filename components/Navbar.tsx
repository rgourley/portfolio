"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaMedium, FaGithub } from "react-icons/fa";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "glass border-border/50 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight hover:text-foreground/80 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
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

            {/* Right side: Social Icons (desktop) + Hamburger (mobile) */}
            <div className="flex items-center gap-4">
              {/* Social Icons - Hidden on mobile */}
              <div className="hidden sm:flex items-center gap-4">
                <a 
                  href="https://www.instagram.com/whats.up.rob/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-grey-400 hover:text-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/rob-gourley/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-grey-400 hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://uxcreative.medium.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-grey-400 hover:text-foreground transition-colors"
                  aria-label="Medium"
                >
                  <FaMedium className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/rgourley" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-grey-400 hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              </div>

              {/* Hamburger Menu Button - Mobile only */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-foreground/60 hover:text-foreground transition-colors p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/95 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="absolute top-0 left-0 right-0 glass border-b border-border/50 pt-20 pb-8">
            <div className="max-w-[1200px] mx-auto px-6">
              <nav className="flex flex-col gap-6">
                <Link
                  href="/work"
                  className="text-lg font-light text-foreground/80 hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Work
                </Link>
                <Link
                  href="/resume"
                  className="text-lg font-light text-foreground/80 hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resume
                </Link>
                <Link
                  href="/blog"
                  className="text-lg font-light text-foreground/80 hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-light text-foreground/80 hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/newsletter"
                  className="text-lg font-light text-foreground/80 hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Newsletter
                </Link>
                
                {/* Social Icons - Mobile */}
                <div className="flex items-center gap-6 pt-4 border-t border-border/50">
                  <a 
                    href="https://www.instagram.com/whats.up.rob/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-foreground transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/rob-gourley/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-foreground transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://uxcreative.medium.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-foreground transition-colors"
                    aria-label="Medium"
                  >
                    <FaMedium className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://github.com/rgourley" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-foreground transition-colors"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

