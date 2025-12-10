import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Product Design & Strategy Consulting",
  description: "Product design consulting services by Robert Gourley. Strategic design direction, end-to-end product design execution, and design systems & team building. Specializing in complex technical products, AI/ML interfaces, fintech platforms, and enterprise SaaS. 20+ years experience at Shield AI, Kraken, Crunchyroll, and Federato.",
  keywords: ["product design services", "UX design consulting", "design strategy consulting", "design systems", "product design execution", "design team building", "design consulting", "AI product design", "fintech design consulting", "enterprise design"],
  openGraph: {
    title: "Services | Product Design & Strategy Consulting",
    description: "Strategic design partnership for organizations building intuitive products. Turn complexity into products people love.",
    url: "/services",
    images: [
      {
        url: "/images/og-services.jpg",
        width: 1200,
        height: 630,
        alt: "Product Design & Strategy Services",
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero Section with Image */}
      <section className="relative min-h-[70vh] flex items-center mb-20 overflow-hidden">
        {/* Hero Image - Replace this URL with your own */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=2000&h=1200&fit=crop"
            alt="Strategic Design Partnership"
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

        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16 w-full relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
                <div className="w-0.5 h-0.5 bg-pink-400/40" />
              </div>
              <span className="text-lg font-semibold text-foreground/60">Product Design & Strategy</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.0] tracking-[-0.02em] mb-8">
              Strategic Design Partnership
            </h1>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-8">
              Turn complexity into products people love
            </h2>

            <p className="text-lg md:text-xl text-foreground/65 font-light leading-relaxed max-w-xl mb-8">
              I partner with organizations to build intuitive products that solve hard problems, from early-stage startups defining their vision to established companies scaling their design capabilities.
            </p>

            <p className="text-lg md:text-xl text-foreground/65 font-light leading-relaxed max-w-xl">
              Whether you need a strategic UX audit, a complete product redesign, or help building a design team that ships at scale, I bring twenty years of experience turning ambitious ideas into shipping products across consumer, enterprise, and cutting-edge autonomy.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-16">

        {/* Services Sections with Images */}
        <div className="space-y-20 mb-20">
          {/* Service 01 */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                </div>
                <h3 className="text-lg font-semibold text-foreground/60">01 — Strategic Design Direction</h3>
              </div>
              <p className="text-lg md:text-xl text-foreground/65 font-light leading-relaxed mb-6">
                Great products start with clear strategy. I work with your team to align business goals with user needs, creating a roadmap that guides every design decision from concept through launch.
              </p>
              <div className="max-w-[680px]">
                <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-4">
                  <strong className="font-semibold text-foreground/90">What this includes:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-[21px] text-foreground/65 leading-[1.7]">
                  <li>Product vision and UX strategy</li>
                  <li>Comprehensive design audits</li>
                  <li>User research and validation</li>
                  <li>Competitive analysis and positioning</li>
                </ul>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5 rounded-lg max-w-[80%] mx-auto lg:mx-0">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                alt="Strategic Design Direction"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </section>

          {/* Service 02 */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1 relative aspect-[4/3] overflow-hidden bg-foreground/5 rounded-lg max-w-[80%] mx-auto lg:mx-0">
              <Image
                src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=600&fit=crop"
                alt="Product Design Execution"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                </div>
                <h3 className="text-lg font-semibold text-foreground/60">02 — Product Design Execution</h3>
              </div>
              <p className="text-lg md:text-xl text-foreground/65 font-light leading-relaxed mb-6">
                From initial concepts to production-ready designs, I create interfaces that are both intuitive and emotionally resonant. Every interaction is crafted to feel natural while solving real user problems.
              </p>
              <div className="max-w-[680px]">
                <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-4">
                  <strong className="font-semibold text-foreground/90">What this includes:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-[21px] text-foreground/65 leading-[1.7]">
                  <li>End-to-end product design</li>
                  <li>Complex workflow optimization</li>
                  <li>Responsive and accessible interfaces</li>
                  <li>AI-powered feature design</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Service 03 */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                  <div className="w-0.5 h-0.5 bg-pink-400/40" />
                </div>
                <h3 className="text-lg font-semibold text-foreground/60">03 — Design Systems & Team Building</h3>
              </div>
              <p className="text-lg md:text-xl text-foreground/65 font-light leading-relaxed mb-6">
                Scale your design capability with systems built to last. I create comprehensive design systems in Figma that serve as a single source of truth, enabling teams to move faster while maintaining consistency.
              </p>
              <div className="max-w-[680px]">
                <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-4">
                  <strong className="font-semibold text-foreground/90">What this includes:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 text-[21px] text-foreground/65 leading-[1.7]">
                  <li>Component libraries and documentation</li>
                  <li>Design system implementation</li>
                  <li>Team process and workflow optimization</li>
                  <li>Leadership coaching and mentorship</li>
                </ul>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5 rounded-lg max-w-[80%] mx-auto lg:mx-0">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                alt="Design Systems & Team Building"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </section>
        </div>

        {/* How I Work Section */}
        <section className="mb-20">
          <div className="inline-flex items-center gap-2 mb-12">
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
            </div>
            <h2 className="text-lg font-semibold text-foreground/60">How I Work</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div className="max-w-[680px]">
              <h3 className="text-[21px] font-semibold text-foreground/90 mb-1">Strategic First</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                Every design decision rolls up to clear business outcomes. I start by understanding what success looks like for your users and your business, then build toward that north star.
              </p>
            </div>

            <div className="max-w-[680px]">
              <h3 className="text-[21px] font-semibold text-foreground/90 mb-2">Cross-Functional Leadership</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                Great design happens at the intersection of product, engineering, and business. I work closely with all stakeholders to ensure design decisions support the broader product vision.
              </p>
            </div>

            <div className="max-w-[680px]">
              <h3 className="text-[21px] font-semibold text-foreground/90 mb-2">User-Centered Process</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                I bring deep experience researching complex workflows, from insurance underwriters to crypto traders to autonomy engineers. Understanding real user needs drives everything.
              </p>
            </div>

            <div className="max-w-[680px]">
              <h3 className="text-[21px] font-semibold text-foreground/90 mb-2">Built to Scale</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                Whether it's a design system, a product feature, or a team process, I design with growth in mind. Solutions work at launch and continue working as your product evolves.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section with Image */}
        <section className="relative min-h-[400px] flex items-center overflow-hidden rounded-lg">
          <div className="absolute inset-0 -z-10">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop"
              alt="Let's work together"
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
          
          <div className="max-w-[680px] px-6 sm:px-12 lg:px-16 py-16 relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-3">Let's talk about your product</h2>
            <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-8">
              Ready to turn complexity into clarity? Let's discuss how strategic design can drive your business forward.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-light text-foreground/60 hover:text-foreground transition-colors"
            >
              Get in Touch →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

