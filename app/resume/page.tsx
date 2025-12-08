"use client";

import { motion } from "framer-motion";

export default function ResumePage() {
  const experiences = [
    {
      company: "Shield AI",
      role: "Director of Product Design",
      period: "May 2025 - Present",
      bullets: [
        "Lead product design for Hivemind autonomy platform, creating low-code developer workbench enabling deployment of AI pilots across simulation, testing, and autonomous systems.",
        "Building design team to support rapidly growing AI autonomy platform serving defense and commercial aviation sectors",
        "Define UX/UI strategy for complex developer tooling that simplifies autonomous robotics workflows from simulation through deployment",
        "Design responsive low-code interfaces with accessibility considerations, enabling autonomy engineers to build, test, and deploy AI pilot systems efficiently",
      ],
    },
    {
      company: "Kraken",
      role: "Director of Product Design",
      period: "Sep 2022 - 2025",
      highlights: ["$200B in trading volume", "100% on-time delivery", "24% increase"],
      bullets: [
        "Directed a diverse design team on the UX/UI of a complex trading platform, achieving $200B in trading volume across web, desktop, and mobile.",
        "Aligned with stakeholders to prioritize features, achieving 100% on-time delivery for two quarters and increasing trading volume through user-centric design enhancements.",
        "Boosted new user profile creation by 24% by analyzing feedback and implementing UX improvements, reflecting a deep commitment to user engagement.",
        "Stayed current with industry trends and best practices in cryptocurrency and digital asset trading to determine barriers to user adoption",
      ],
    },
    {
      company: "Federato",
      role: "Head of Product Design",
      period: "2021 - Sep 2022",
      highlights: ["6+ months to 8 weeks"],
      bullets: [
        "Spearheaded the UX/UI design for Federato's machine learning underwriting platform, enhancing insurance carrier operations.",
        "Developed a comprehensive design system in Figma, significantly reducing implementation time from 6+ months to 8 weeks, streamlining project delivery.",
        "Designed Federato to break the mold of traditionally poor insurance user experiences. This significantly drove interest and adoption, setting a new standard for insurance interfaces.",
      ],
    },
    {
      company: "Axure",
      role: "VP of Product Design",
      period: "2017 - 2022",
      highlights: ["40% increase", "25% increase"],
      bullets: [
        "Transformed Axure from what some users called the \"best tool with the worst UX\" to a modern product, achieving a 40% increase in adoption by streamlining the UI based on strategic user research.",
        "Pioneered the integration of new cloud services into Axure's product line, diversifying offerings and achieving a 25% increase in adoption.",
        "Enhanced user workflows by designing and implementing intuitive UX/UI features, resulting in a notable uptick in core product feature adoption.",
        "Created new branding and positioning strategies, including the design of a new logo, website the development of a Figma design system.",
      ],
    },
    {
      company: "CrunchyRoll",
      role: "Director of Product Design",
      period: "2015 - 2017",
      highlights: ["$1.2B acquisition"],
      bullets: [
        "Led the UX design for a comprehensive video product across multiple platforms, contributing to a significant user base growth and culminating in a successful $1.2B acquisition by Sony.",
        "Drove the design and implementation of innovative features, enhancing user engagement and satisfaction across mobile, living room, and web platforms.",
        "Collaborated with C-suite and cross-functional teams to align product vision and strategy, ensuring cohesive brand experience and market positioning.",
        "Managed and coached a 10-person creative team consisting of UX, UI, and user research",
      ],
    },
    {
      company: "Mojave",
      role: "Founder, Director of Product Design",
      period: "2008 - 2015",
      highlights: ["50m followers", "Top 99 product agencies"],
      bullets: [
        "Founded Mojave, a strategic design agency, leading it to be named one of the 'Top 99 product agencies' through innovative design leadership.",
        "Conceptualized and designed National Geographic's Facebook app, which grew to over 50m followers",
        "Earned numerous accolades for outstanding creative work, with Mojave recognized as one of the 'Top 99 product agencies'",
      ],
    },
  ];

  const patents = [
    {
      title: "Multi-View Masters for Graphical Designs (2018)",
      number: "US20230117793A1",
      description: "Pioneered a novel approach that simplifies complex interactions, enhancing efficiency and collaboration.",
    },
    {
      title: "Widget Container Management for Interactive Designs (2020)",
      number: "US20220129118A1",
      description: "Developed a method for visualization of multiple widget states, significantly improving interactive design processes.",
    },
    {
      title: "Focused Specification Generation for Interactive Designs (2023)",
      number: "US11645047B2",
      description: "Created a method for generating precise specifications for interactive designs, improving design feedback.",
    },
  ];

  return (
    <div className="pt-32 pb-20 relative overflow-hidden">
      {/* Subtle lenticular gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-full h-[500px] blur-3xl opacity-12"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.2) 25%, rgba(236, 72, 153, 0.15) 50%, rgba(99, 102, 241, 0.1) 75%, transparent 100%)',
          }}
        />
        <div 
          className="absolute top-0 right-0 w-full h-[450px] blur-3xl opacity-10"
          style={{
            background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.22) 0%, rgba(99, 102, 241, 0.18) 35%, rgba(236, 72, 153, 0.12) 65%, transparent 100%)',
          }}
        />
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.0] tracking-[-0.02em] mb-6">
            Product Design Leadership
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <p className="text-lg text-foreground/70 font-light">
              Product Design Leader at Shield AI
            </p>
            <span className="hidden md:inline text-foreground/30">|</span>
            <p className="text-sm text-foreground/50 font-light">
              Previously Kraken, Crunchyroll, Axure, Apple
            </p>
          </div>
        </motion.div>

        {/* Professional Summary */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2.5 mb-8">
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
              <div className="w-0.5 h-0.5 bg-blue-400/40" />
            </div>
            <span className="text-lg font-semibold text-foreground/60">Professional Summary</span>
          </div>
          <div className="space-y-6 text-foreground/70 font-light leading-relaxed text-lg">
            <p>
              Award-winning Product Design Leader specializing in scalable SaaS platforms, developer tools, and consumer products. Currently leading design for AI autonomy platform at Shield AI.
            </p>
            <p>
              Proven track record delivering user-centric solutions for complex technical products that drive measurable business outcomes. Expertise spans UX/UI strategy, responsive design systems, team building, mentorship, and cross-functional leadership. Successfully scaled products from startup to <span className="font-normal text-foreground">$1.2B acquisition</span>.
            </p>
          </div>
        </motion.section>

        {/* Experience Section with Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2.5 mb-16">
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
            </div>
            <span className="text-lg font-semibold text-foreground/60">Experience</span>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/10 hidden lg:block" />

            <div className="space-y-0">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-0 lg:pl-12 pb-16 last:pb-0 group"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-foreground/20 border-2 border-background hidden lg:block group-hover:bg-foreground/40 transition-colors" />

                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                          {exp.company}
                        </h3>
                        <p className="text-sm text-foreground/60 font-light">{exp.role}</p>
                      </div>
                      <p className="text-sm text-foreground/50 font-light">{exp.period}</p>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-3 text-foreground/70 font-light leading-relaxed">
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="flex gap-3">
                          <span className="text-foreground/40 flex-shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Design Patents */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2.5 mb-8">
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-purple-400/40" />
              <div className="w-0.5 h-0.5 bg-purple-400/40" />
              <div className="w-0.5 h-0.5 bg-purple-400/40" />
              <div className="w-0.5 h-0.5 bg-purple-400/40" />
            </div>
            <span className="text-lg font-semibold text-foreground/60">Design Patents</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {patents.map((patent, index) => (
              <motion.div
                key={patent.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="glass p-8 rounded-lg border border-foreground/10"
              >
                <p className="font-semibold text-foreground mb-2">{patent.title}</p>
                <p className="text-sm text-foreground/50 font-light mb-3 font-mono">{patent.number}</p>
                <p className="text-sm text-foreground/70 font-light leading-relaxed">{patent.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2.5 mb-8">
            <div className="grid grid-cols-2 gap-0.5 w-2 h-2 flex-shrink-0">
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
              <div className="w-0.5 h-0.5 bg-pink-400/40" />
            </div>
            <span className="text-lg font-semibold text-foreground/60">Skills</span>
          </div>
          <div className="glass p-8 rounded-lg border border-foreground/10">
            <p className="text-foreground/70 font-light leading-relaxed text-lg">
              Design Leader skilled in UX/UI, service design, and responsive systems development. Proficient with tools like Sketch, Figma, Adobe Suite, and AI/ML applications. Expertise in design systems, prototyping, and integrating AI into design processes. Combines technical mastery with leadership excellence—driving innovation through team management, cross-functional collaboration, agile methodologies, and mentorship to cultivate design thinking and deliver impactful solutions.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
