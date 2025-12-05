"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Search, Target, Rocket, ArrowRight } from "lucide-react";
import SolutionHighlights from "@/components/SolutionHighlights";

export default function LeadershipPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How is fractional leadership different from consulting?",
      answer: "Fractional leadership means I'm actually making decisions and leading your team, not just providing recommendations. I attend your meetings, make hiring decisions, set priorities, and am accountable for outcomes—just like a full-time leader would be."
    },
    {
      question: "Do you work with startups or established companies?",
      answer: "Both. Early-stage companies typically need help establishing design as a function. Growth-stage companies need help scaling. Established companies often need specialized expertise or interim leadership during transitions."
    },
    {
      question: "What if we're not sure what we need?",
      answer: "That's common. We start with a discovery phase where I assess your situation and recommend the right approach. Sometimes what you think you need isn't actually the core problem."
    },
    {
      question: "Can you help us hire a full-time design leader?",
      answer: "Yes. I often serve as interim leadership while simultaneously running the search process for a permanent hire. I can define the role, interview candidates, and help onboard your new leader."
    },
    {
      question: "Do you take equity?",
      answer: "For early-stage startups, I'm open to equity as part of the compensation structure for longer-term advisory relationships. For fractional leadership or project work, I typically work on a day-rate or monthly retainer."
    },
    {
      question: "What industries do you specialize in?",
      answer: "I've designed products across fintech/crypto, insurance/underwriting, streaming media, developer tools, and autonomous systems. I'm particularly strong with complex technical products that require making sophisticated capabilities accessible to users."
    },
    {
      question: "How quickly can you start?",
      answer: "Depending on current commitments, typically 2-4 weeks. For urgent situations, I can sometimes begin with an initial assessment sooner."
    }
  ];
  return (
    <div className="pt-32 pb-20">
      {/* Hero Section with Image */}
      <section className="relative min-h-[70vh] flex items-center mb-20 overflow-hidden">
        {/* Hero Image - Replace this URL with your own */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2000&h=1200&fit=crop"
            alt="Design Leadership & Consulting"
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
              <span className="text-lg font-semibold text-foreground/60">Design Leadership & Consulting</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.0] tracking-[-0.02em] mb-8">
              Strategic Design Leadership.<br />
              <span className="text-pink-400/60">More power to empower.</span>
            </h1>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight mb-8">
              Build design teams that<br />ship products at scale
            </h2>

            <p className="text-lg md:text-xl text-foreground/65 font-light leading-relaxed max-w-xl">
              I partner with founders, executives, and product leaders to establish design as a strategic function—whether you need an interim design leader, strategic guidance for your existing team, or help building design capability from the ground up.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-12 lg:px-16">
        {/* When Organizations Bring Me In */}
        <section className="mb-20">
          <div className="inline-flex items-center gap-2 mb-12">
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
            </div>
            <h2 className="text-lg font-semibold text-foreground/60">When Organizations Bring Me In</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">
                You're at an inflection point. Your product is gaining traction, but design is becoming a bottleneck. Your team is talented but lacks direction. You're hiring your first design leader and need someone who's been there before. You're scaling quickly and need design systems and processes that won't break as you grow.
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                I've built and led design teams through acquisition (Crunchyroll's $1.2B exit), rapid scaling (Kraken's trading platform), and cutting-edge product development (Shield AI's autonomy platform). I know what works at different stages and can help you avoid the expensive mistakes most companies make.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5 rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                alt="Team collaboration"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* What Design Leadership Looks Like */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-medium text-foreground/90 mb-3">What Design Leadership Looks Like</h2>

          <div className="space-y-16">
            {/* Fractional Design Leadership */}
            <div>
              <h3 className="text-[21px] font-semibold text-foreground/90 mb-1">Fractional Design Leadership</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">
                Step in as your interim Head of Design or Design Director while you search for a permanent hire, restructure your team, or navigate a critical product phase.
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-4">
                <strong className="font-semibold text-foreground/90">What this solves:</strong>
              </p>
              <ul className="space-y-3 text-[21px] text-foreground/65 leading-[1.7] mb-6">
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>You need senior design leadership but aren't ready for a full-time hire</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>Your design leader left and you need continuity during the search</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>You're launching a strategic initiative that needs dedicated design leadership</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>Your team needs mentorship and process while you build out the function</span>
                </li>
              </ul>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                <strong className="font-semibold text-foreground/90">How it works:</strong> I typically engage 2-3 days per week, attending key meetings, making strategic decisions, mentoring your team, and establishing processes that outlast my engagement. Engagements run 3-6 months with clear success metrics defined upfront.
              </p>
            </div>

            {/* Design Strategy & Advisory */}
            <div>
              <h3 className="text-2xl md:text-3xl font-medium text-foreground/90 mb-1">Design Strategy & Advisory</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">
                Strategic guidance for organizations with existing design teams who need an outside perspective on major decisions, roadmap planning, or organizational challenges.
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-4">
                <strong className="font-semibold text-foreground/90">What this solves:</strong>
              </p>
              <ul className="space-y-3 text-[21px] text-foreground/65 leading-[1.7] mb-6">
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>You're deciding whether to build or buy (design systems, tools, capabilities)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>Your design team and product team aren't aligned on priorities</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>You're entering a new market or launching a new product line</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>You need an objective assessment of your design org's effectiveness</span>
                </li>
              </ul>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                <strong className="font-semibold text-foreground/90">How it works:</strong> Monthly or quarterly strategic sessions with your leadership team, plus ad-hoc access for critical decisions. I bring frameworks from companies like Kraken, Crunchyroll, and Federato to help you make better decisions faster.
              </p>
            </div>

            {/* Team Building & Hiring */}
            <div>
              <h3 className="text-2xl md:text-3xl font-medium text-foreground/90 mb-1">Team Building & Hiring</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">
                Get the right people in the right roles with a hiring process that actually assesses what matters.
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-4">
                <strong className="font-semibold text-foreground/90">What this solves:</strong>
              </p>
              <ul className="space-y-3 text-[21px] text-foreground/65 leading-[1.7] mb-6">
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>You're hiring your first design leader and don't know what "great" looks like</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>Your design hiring process lets too many wrong people through</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>You're not sure how to structure your design team as you scale</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>You need to build specialized capabilities (design systems, research, AI/ML product design)</span>
                </li>
              </ul>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                <strong className="font-semibold text-foreground/90">How it works:</strong> I help you define the role, create the job description, review portfolios, conduct interviews, and make the final decision. For team structure, I assess your current state and design an org structure that supports your product roadmap.
              </p>
            </div>

            {/* Design Operations & Systems */}
            <div>
              <h3 className="text-2xl md:text-3xl font-medium text-foreground/90 mb-1">Design Operations & Systems</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-6">
                Establish the infrastructure that lets design teams move fast without breaking things.
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-4">
                <strong className="font-semibold text-foreground/90">What this solves:</strong>
              </p>
              <ul className="space-y-3 text-[21px] text-foreground/65 leading-[1.7] mb-6">
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>Designers are reinventing the wheel on every project</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>Design and engineering handoffs are painful and error-prone</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>You have no single source of truth for design decisions</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground/40 flex-shrink-0">•</span>
                  <span>Your design team's velocity doesn't match engineering's pace</span>
                </li>
              </ul>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                <strong className="font-semibold text-foreground/90">How it works:</strong> I audit your current design processes, tools, and systems, then build the infrastructure you need—design systems in Figma, documentation, component libraries, design-to-code workflows, and team processes that scale.
              </p>
            </div>
          </div>
        </section>

        {/* Solution Highlights Carousel */}
        <section className="mb-20">
          <div className="inline-flex items-center gap-2 mb-12">
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
            </div>
            <h2 className="text-lg font-semibold text-foreground/60">Solution Highlights</h2>
          </div>
          
          <SolutionHighlights
            highlights={[
              {
                id: "1",
                title: "Fractional Design Leadership",
                description: "Step in as your interim Head of Design or Design Director while you search for a permanent hire, restructure your team, or navigate a critical product phase.",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
                imageAlt: "Fractional Design Leadership"
              },
              {
                id: "2",
                title: "Design Strategy & Advisory",
                description: "Strategic guidance for organizations with existing design teams who need an outside perspective on major decisions, roadmap planning, or organizational challenges.",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
                imageAlt: "Design Strategy & Advisory"
              },
              {
                id: "3",
                title: "Team Building & Hiring",
                description: "Get the right people in the right roles with a hiring process that actually assesses what matters.",
                image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
                imageAlt: "Team Building & Hiring"
              },
              {
                id: "4",
                title: "Design Operations & Systems",
                description: "Establish the infrastructure that lets design teams move fast without breaking things.",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
                imageAlt: "Design Operations & Systems"
              }
            ]}
          />
        </section>

        {/* Why Organizations Choose to Work With Me */}
        <section className="mb-20">
          <div className="inline-flex items-center gap-2 mb-12">
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
            </div>
            <h2 className="text-lg font-semibold text-foreground/60">Why Organizations Choose to Work With Me</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h3 className="text-2xl md:text-3xl font-medium text-foreground/90 mb-1">I've Done the Work.</h3>
              <p className="text-xl md:text-2xl text-foreground/65 font-light leading-relaxed">
                I'm not a consultant who stopped designing ten years ago. I currently lead design at Shield AI for one of the most complex products in autonomy. I've shipped products across consumer, enterprise, and defense. I know what works because I'm still doing it.
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-medium text-foreground/90 mb-1">Strategy Meets Execution.</h3>
              <p className="text-xl md:text-2xl text-foreground/65 font-light leading-relaxed">
                I don't just provide recommendations and leave. I help you implement them. Whether it's building your design system, hiring your team, or establishing your design process, I stay engaged until it's working.
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-medium text-foreground/90 mb-1">Cross-Functional by Default.</h3>
              <p className="text-xl md:text-2xl text-foreground/65 font-light leading-relaxed">
                Great design leadership requires working effectively with product, engineering, and business stakeholders. I've spent twenty years building these relationships and know how to make design a valued partner, not just a service function.
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-medium text-foreground/90 mb-1">Domain Expertise That Matters.</h3>
              <p className="text-xl md:text-2xl text-foreground/65 font-light leading-relaxed">
                I've designed products for crypto trading ($200B volume), machine learning underwriting platforms, autonomous robotics systems, and streaming platforms with millions of users. I understand complex technical products and can translate that complexity into intuitive experiences.
              </p>
            </div>
          </div>
        </section>

        {/* How We'd Work Together */}
        <section className="mb-20">
          <div className="inline-flex items-center gap-2 mb-12">
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
            </div>
            <h2 className="text-lg font-semibold text-foreground/60">How We'd Work Together</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col md:border-l-0 lg:border-l border-l-pink-400/20 pl-0 lg:pl-8">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-foreground/60" />
                </div>
                <h3 className="text-[21px] font-semibold text-foreground/90 mb-1">Week 1: Discovery</h3>
              </div>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                Deep dive into your product, team, processes, and challenges. I conduct stakeholder interviews, review your product and design artifacts, and assess your current state.
              </p>
            </div>

            <div className="flex flex-col border-l border-l-pink-400/20 pl-8">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-foreground/60" />
                </div>
                <h3 className="text-[21px] font-semibold text-foreground/90 mb-1">Week 2: Strategy</h3>
              </div>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                Present findings and recommendations with clear priorities and success metrics. We align on scope, timeline, and how success will be measured.
              </p>
            </div>

            <div className="flex flex-col border-l border-l-pink-400/20 pl-8">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-foreground/60" />
                </div>
                <h3 className="text-[21px] font-semibold text-foreground/90 mb-1">Weeks 3+: Execution</h3>
              </div>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                I embed with your team, making decisions, shipping work, establishing processes, and building capability. Regular check-ins ensure we're on track and adjust as needed.
              </p>
            </div>

            <div className="flex flex-col border-l border-l-pink-400/20 pl-8">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-4">
                  <ArrowRight className="w-6 h-6 text-foreground/60" />
                </div>
                <h3 className="text-[21px] font-semibold text-foreground/90 mb-1">Transition</h3>
              </div>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                Whether I'm interim leadership or advisory, I plan for a clean handoff from day one. Documentation, knowledge transfer, and sustainability are built into every engagement.
              </p>
            </div>
          </div>
        </section>

        {/* Common Engagement Models */}
        <section className="mb-20">
          <div className="inline-flex items-center gap-2 mb-12">
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
            </div>
            <h2 className="text-lg font-semibold text-foreground/60">Common Engagement Models</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[900px]">
            <div>
              <h3 className="text-[21px] font-semibold text-foreground/90 mb-1">Interim Design Leadership</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-4">
                <strong className="font-semibold text-foreground/90">Duration:</strong> 3-6 months
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-4">
                <strong className="font-semibold text-foreground/90">Commitment:</strong> 2-3 days/week
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                <strong className="font-semibold text-foreground/90">Best for:</strong> Organizations between hires or navigating major transitions
              </p>
            </div>

            <div>
              <h3 className="text-[21px] font-semibold text-foreground/90 mb-1">Strategic Advisory</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-4">
                <strong className="font-semibold text-foreground/90">Duration:</strong> 6-12 months
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-4">
                <strong className="font-semibold text-foreground/90">Commitment:</strong> 1-2 days/month plus ad-hoc access
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                <strong className="font-semibold text-foreground/90">Best for:</strong> Organizations with design teams who need strategic guidance
              </p>
            </div>

            <div>
              <h3 className="text-[21px] font-semibold text-foreground/90 mb-1">Project-Based</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-4">
                <strong className="font-semibold text-foreground/90">Duration:</strong> 2-4 months
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7] mb-4">
                <strong className="font-semibold text-foreground/90">Commitment:</strong> Varies by project
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                <strong className="font-semibold text-foreground/90">Best for:</strong> Specific initiatives like design system creation, hiring, or organizational design
              </p>
            </div>
          </div>
        </section>

        {/* Recent Leadership Engagements */}
        <section className="mb-20">
          <div className="inline-flex items-center gap-2 mb-12">
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
            </div>
            <h2 className="text-lg font-semibold text-foreground/60">Recent Leadership Engagements</h2>
          </div>

          <div className="space-y-8 max-w-[900px]">
            <div>
              <h3 className="text-[19px] font-semibold text-foreground/90 mb-1">Shield AI</h3>
              <p className="text-sm text-foreground/50 mb-1">
                2025 - Present
              </p>
              <p className="text-sm text-foreground/50 mb-1">
                Role: Director of Product Design
              </p>
              <p className="text-sm text-foreground/50 mb-1">
                Timeline: 2025 - Present
              </p>
              <p className="text-sm text-foreground/50 mb-4">
                Platform: Web application/SDK/CLI Tools
              </p>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                Built design team and established UX strategy for Hivemind autonomy platform, creating developer-focused interfaces for complex AI systems across simulation, testing, and deployment.
              </p>
            </div>

            <div>
              <h3 className="text-[19px] font-semibold text-foreground/90 mb-1">Kraken — Director of Product Design</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                Led design team for institutional trading platform handling $200B in volume. Increased profile creation 24% through strategic UX improvements while maintaining 100% on-time delivery.
              </p>
            </div>

            <div>
              <h3 className="text-[19px] font-semibold text-foreground/90 mb-1">Federato — Head of Product Design</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                Established design function from scratch for ML underwriting platform. Created comprehensive design system reducing implementation time from 6+ months to 8 weeks.
              </p>
            </div>

            <div>
              <h3 className="text-[19px] font-semibold text-foreground/90 mb-1">Crunchyroll — Director of Product Design</h3>
              <p className="text-[21px] text-foreground/65 font-light leading-[1.7]">
                Built and led 10-person creative team through rapid growth and $1.2B acquisition by Sony. Established design processes and systems that scaled across mobile, web, and living room platforms.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section with Image */}
        <section className="relative min-h-[400px] flex items-center overflow-hidden rounded-lg mb-20">
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
          
              <div className="max-w-[900px] px-12 lg:px-16 py-16 relative z-10">
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
                  Let's Talk About Your Design Challenge.
                </h2>
                <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed mb-8">
                  Whether you're hiring your first designer, scaling an existing team, or navigating a complex product challenge, I can help you build design capability that drives business outcomes.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-foreground/20 rounded-lg text-base font-light text-foreground/80 hover:border-foreground/40 hover:text-foreground transition-all"
                >
                  Schedule a Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-[900px]">
          <div className="inline-flex items-center gap-2 mb-12">
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
            </div>
            <h2 className="text-lg font-semibold text-foreground/60">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/50">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start justify-between gap-4 py-4 text-left hover:text-foreground transition-colors"
                >
                  <h3 className="text-[19px] font-semibold text-foreground/90 flex-1">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-foreground/40 flex-shrink-0 transition-transform duration-300 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQ === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[21px] text-foreground/65 font-light leading-[1.7] pb-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

