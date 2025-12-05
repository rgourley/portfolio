import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Product Design Leader & Strategist",
  description: "Product design leader with 20+ years of experience building design teams and shipping products at scale. Currently Director of Product Design at Shield AI. Previously led design at Kraken, Federato, and Crunchyroll. Specializing in complex technical products, design systems, and team building.",
  keywords: ["product design leader", "design director", "UX design leader", "design strategist", "Shield AI", "Kraken", "Federato", "Crunchyroll", "design team building"],
  openGraph: {
    title: "About | Product Design Leader & Strategist",
    description: "Product design leader with 20+ years of experience building design teams and shipping products at scale.",
    url: "/about",
    images: [
      {
        url: "/images/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Robert Gourley - Product Design Leader",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-12 lg:px-16">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
            </div>
            <span className="text-lg font-semibold text-foreground/60">About</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">Rob Gourley</h2>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.0] tracking-[-0.02em] mb-8">
            I build design teams that <span className="text-blue-400/80">ship products at scale</span>
          </h1>

          <p className="text-xl text-foreground/65 font-light leading-relaxed max-w-3xl mb-12">
            I've led design across autonomous systems, fintech platforms, and products used by millions. I specialize in establishing design as a strategic function: building teams, creating systems, and shipping products that turn complexity into experiences people actually understand.
          </p>
        </section>

        <hr className="border-t border-border my-20" />

        {/* What I Do Section */}
        <section className="mb-20">
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">What I Do</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">
                I'm a product design leader who builds teams and ships products at scale. Currently, I lead design at Shield AI, where we're creating the platform that enables autonomous systems for defense and commercial aviation. Before that, I built design teams at Kraken (handling $200B in trading volume), led design through Crunchyroll's $1.2B acquisition by Sony, and helped insurance carriers adopt machine learning at Federato.
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                My work spans the full spectrum of product design, from early-stage strategy and user research through detailed interaction design and design system creation. I lead by doing, working across product, engineering, and business to ensure design drives measurable outcomes.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5 rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                alt="Design leadership"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <hr className="border-t border-border my-20" />

        {/* How I Think About Design Section */}
        <section className="mb-20">
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-12">How I Think About Design</h2>

          <div className="space-y-16">
            {/* Products Should Empower */}
            <div>
              <h3 className="text-[21px] font-semibold text-foreground/90 mb-2">Products Should Empower, Not Replace</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">
                The best products give people superpowers. They make complex tasks manageable, not by hiding complexity but by organizing it in ways that match how people actually think and work. I design products that augment human capability rather than trying to automate it away.
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                This philosophy shows up everywhere in my work. At Shield AI, our autonomy platform doesn't replace engineers. It gives them tools to build, test, and deploy AI pilots more effectively. At Federato, our ML platform didn't replace underwriters. It gave them better data to make faster, more confident decisions.
              </p>
            </div>

            {/* Design Leads When It Solves Real Problems */}
            <div>
              <h3 className="text-[21px] font-semibold text-foreground/90 mb-2">Design Leads When It Solves Real Problems</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">
                Design isn't styling. It's understanding the problem deeply enough to create solutions that feel obvious in hindsight. That requires spending time with users, understanding their workflows, and identifying where the real friction lives.
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                At Federato, we spent 1,200+ hours interviewing insurance underwriters before designing a single screen. At Kraken, I worked alongside traders to understand the split-second decisions that move millions of dollars. This deep user understanding is what separates products that look good from products that actually work.
              </p>
            </div>

            {/* Systems Think Beyond Screens */}
            <div>
              <h3 className="text-[21px] font-semibold text-foreground/90 mb-2">Systems Think Beyond Screens</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">
                Good design scales. That means building design systems, establishing processes, and creating patterns that work across platforms and use cases. It means thinking about what happens when your product grows 10x, when your team doubles, when edge cases emerge.
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                I've built design systems that reduced implementation time from six months to eight weeks. I've created component libraries that serve teams across web, mobile, and desktop. I've established design processes that survived acquisitions and rapid scaling. Systems thinking is what makes design sustainable.
              </p>
            </div>

            {/* Teams Matter More Than Heroes */}
            <div>
              <h3 className="text-[21px] font-semibold text-foreground/90 mb-2">Teams Matter More Than Heroes</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">
                The best design doesn't come from lone geniuses. It comes from well-structured teams with clear processes, shared understanding, and mutual respect with engineering and product partners. I've built and led design teams from 2 to 10+ people, and the principles are consistent: hire people smarter than you, give them context and autonomy, and get out of their way.
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                I care as much about building great teams as I do about building great products. I mentor designers, establish career frameworks, create processes that reduce friction, and foster environments where people do their best work.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-t border-border my-20" />

        {/* Background & Experience Section */}
        <section className="mb-20">
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">Background & Experience</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">
                I started my career at the intersection of design and technology, working on everything from Apple website sections to digital experiences for National Geographic. In 2008, I founded Mojave, a design agency that was recognized as one of the top 99 product agencies globally. We created the National Geographic Facebook app that grew to 50 million followers and worked with brands ranging from startups to Fortune 500 companies.
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                The agency taught me how to work across industries, adapt to different technical constraints, and understand what clients actually need versus what they ask for. It also taught me that I'm most energized when I can go deep on complex products rather than jumping between projects every few weeks.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5 rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                alt="Background and experience"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mt-12 max-w-3xl">
            That led me to product design leadership roles where I could embed with teams and see products through from concept to scale. At Crunchyroll, I built a 10-person creative team and led design across mobile, web, and living room platforms during the company's growth to a $1.2B acquisition. At Kraken, I directed design for trading products handling $200B in volume. At Federato, I established the design function from scratch and created systems that dramatically accelerated the team's velocity.
          </p>

          <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mt-6 max-w-3xl">
            Now at Shield AI, I'm working on some of the most technically complex products I've encountered: interfaces for building autonomous AI systems that make life-or-death decisions. It's the kind of challenge that requires everything I've learned about making complexity accessible.
          </p>
        </section>

        <hr className="border-t border-border my-20" />

        {/* Beyond the Work Section */}
        <section className="mb-20">
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">Beyond the Work</h2>
          
          <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6 max-w-3xl">
            I believe the best designers are constantly learning. I track AI/ML developments closely, not just because I design AI products but because these technologies are reshaping what's possible in product design. I follow design systems evolution, read extensively about team leadership, and stay current on the industries I design for.
          </p>
          
          <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6 max-w-3xl">
            I share what I learn through my newsletter, Design Mind, where I write about AI tools worth using, design team building tactics that actually work, and trends that matter versus noise. It's read by designers at Google, Airbnb, and startups worldwide because I focus on what's working right now, not theory.
          </p>
          
          <p className="text-[21px] text-foreground/65 font-light leading-[1.7] max-w-3xl">
            I also believe good design requires understanding business realities. I've taken courses in stock valuation, completed certifications in agile methodologies, and make it a point to understand the financial and strategic context my designs operate within. Design decisions that ignore business constraints don't ship.
          </p>
        </section>

        <hr className="border-t border-border my-20" />

        {/* Recognition & Patents Section */}
        <section className="mb-20">
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">Recognition & Patents</h2>
          
          <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-12 max-w-3xl">
            My work has been recognized through multiple patents in the design and prototyping space:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-muted/50 border border-grey-800 rounded-lg p-6">
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                Multi-View Masters for Graphical Designs (2018)
              </p>
            </div>
            <div className="bg-muted/50 border border-grey-800 rounded-lg p-6">
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                Widget Container Management for Interactive Designs (2020)
              </p>
            </div>
            <div className="bg-muted/50 border border-grey-800 rounded-lg p-6">
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                Focused Specification Generation for Interactive Designs (2023)
              </p>
            </div>
          </div>
          
          <p className="text-[21px] text-foreground/65 font-light leading-[1.7] max-w-3xl">
            These aren't academic exercises. They're solutions to real problems I encountered while building design tools and working with cross-functional teams to ship products faster.
          </p>
        </section>

        <hr className="border-t border-border my-20" />

        {/* What Drives Me Section */}
        <section className="mb-20">
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">What Drives Me</h2>
          
          <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6 max-w-3xl">
            I'm motivated by hard problems that matter. Products where if the design fails, people can't do their jobs. Interfaces where complexity can't be avoided, only organized. Teams where design thinking needs to be established, not just applied.
          </p>
          
          <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6 max-w-3xl">
            I care about making sophisticated technology accessible without dumbing it down. I care about building teams that can operate independently. I care about creating products that users don't just tolerate but genuinely rely on.
          </p>
          
          <p className="text-[21px] text-foreground/65 font-light leading-[1.7] max-w-3xl">
            And I care about doing this work with people who take craft seriously. Whether that's engineering teams who care about performance, product teams who care about outcomes, or business leaders who understand that good design is a competitive advantage, not a nice-to-have.
          </p>
        </section>

        <hr className="border-t border-border my-20" />

        {/* Let's Work Together Section */}
        <section className="mb-20">
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">Let's Work Together</h2>
          
          <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-8 max-w-3xl">
            I'm currently leading design at Shield AI and also take on select consulting engagements, typically fractional leadership roles, strategic advisory work, or specific initiatives like design system creation or team building.
          </p>
          
          <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-8 max-w-3xl">
            If you're working on complex products that need strategic design leadership, let's talk.
          </p>
          
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-light text-foreground/60 hover:text-foreground transition-colors"
          >
            Get in Touch →
          </Link>
        </section>

        <hr className="border-t border-border my-20" />

        {/* Quick Facts Section */}
        <section className="mb-20">
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-12">Quick Facts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <div>
              <p className="text-sm font-semibold text-foreground/60 mb-2">Current Role</p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">Director of Product Design, Shield AI</p>
            </div>
            
            <div>
              <p className="text-sm font-semibold text-foreground/60 mb-2">Location</p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">San Diego, California</p>
            </div>
            
            <div>
              <p className="text-sm font-semibold text-foreground/60 mb-2">Experience</p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">20+ years in product design and leadership</p>
            </div>
            
            <div>
              <p className="text-sm font-semibold text-foreground/60 mb-2">Specializations</p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">AI/ML products, design systems, team building, complex enterprise platforms</p>
            </div>
            
            <div>
              <p className="text-sm font-semibold text-foreground/60 mb-2">Industries</p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">Autonomous systems, fintech/crypto, streaming media, insurance tech, developer tools</p>
            </div>
            
            <div>
              <p className="text-sm font-semibold text-foreground/60 mb-2">Education & Certifications</p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">Google UX Design, Atlassian Agile, Stock Valuation</p>
            </div>
            
            <div>
              <p className="text-sm font-semibold text-foreground/60 mb-2">Tools I Use</p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">Figma, Sketch, Adobe Creative Suite, Axure, prototyping tools, AI-assisted design workflows</p>
            </div>
            
            <div>
              <p className="text-sm font-semibold text-foreground/60 mb-2">Patents</p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">3 granted patents in design tooling and interactive design systems</p>
            </div>
            
            <div>
              <p className="text-sm font-semibold text-foreground/60 mb-2">Newsletter</p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">Design Mind: weekly insights on AI tools, team building, and design trends for 2,000+ designers</p>
            </div>
            
            <div>
              <p className="text-sm font-semibold text-foreground/60 mb-2">Fun Facts</p>
              <ul className="space-y-2 text-[21px] text-foreground/65 leading-[1.7]">
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>Created National Geographic's Facebook app (50M+ followers)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>Led design through a $1.2B acquisition</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>Founded design agency recognized as top 99 globally</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>Currently designing interfaces for autonomous aircraft</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

