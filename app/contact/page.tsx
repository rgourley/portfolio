import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Let's Work Together",
  description: "Ready to turn complexity into clarity? Get in touch to discuss how strategic design can drive your business forward. Product design consulting, fractional leadership, and design strategy services.",
  keywords: ["contact", "design consulting", "product design services", "design leadership", "get in touch"],
  openGraph: {
    title: "Contact | Let's Work Together",
    description: "Ready to turn complexity into clarity? Let's discuss how strategic design can drive your business forward.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="max-w-[680px]">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.0] tracking-[-0.02em] mb-8">
            Let's work together
          </h1>

          <p className="text-[19px] text-foreground/80 font-light leading-[1.7] mb-12">
            Ready to turn complexity into clarity? I'd love to hear about your project and discuss how strategic design can drive your business forward.
          </p>

          <div className="space-y-6">
            <a
              href="mailto:rgourley@gmail.com"
              className="block text-[19px] text-foreground/80 font-light leading-[1.7] hover:text-foreground transition-colors"
            >
              rgourley@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

