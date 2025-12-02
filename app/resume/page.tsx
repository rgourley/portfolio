export default function ResumePage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-12 lg:px-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-6">
            Making complex
            <br />
            products intuitive
            <br />
            and adoptable
          </h1>
          <p className="text-lg text-foreground/70 font-light">
            Product Design Leader at Shield AI | Previously Kraken, Crunchyroll, Axure, Apple
          </p>
        </div>

        {/* Professional Summary */}
        <section className="mb-20">
          <h2 className="font-display text-2xl font-light mb-6 text-foreground/90">Professional Summary</h2>
          <div className="space-y-4 text-foreground/70 font-light leading-relaxed">
            <p>
              Award-winning Product Design Leader specializing in scalable SaaS platforms, developer tools, and consumer products. Currently leading design for AI autonomy platform at Shield AI.
            </p>
            <p>
              Proven track record delivering user-centric solutions for complex technical products that drive measurable business outcomes. Expertise spans UX/UI strategy, responsive design systems, team building, mentorship, and cross-functional leadership. Successfully scaled products from startup to $1.2B acquisition.
            </p>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-20">
          <h2 className="font-display text-2xl font-light mb-12 text-foreground/90">Experience</h2>
          
          <div className="space-y-16">
            {/* Shield AI */}
            <div>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl font-light text-foreground">Shield AI</h3>
                  <p className="text-sm text-foreground/60 font-light">Director of Product Design</p>
                </div>
                <p className="text-sm text-foreground/50 font-light mt-2 md:mt-0">May 2025 - Present</p>
              </div>
              <ul className="space-y-3 text-foreground/70 font-light leading-relaxed list-none">
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Lead product design for Hivemind autonomy platform, creating low-code developer workbench enabling deployment of AI pilots across simulation, testing, and autonomous systems.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Building design team to support rapidly growing AI autonomy platform serving defense and commercial aviation sectors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Define UX/UI strategy for complex developer tooling that simplifies autonomous robotics workflows from simulation through deployment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Design responsive low-code interfaces with accessibility considerations, enabling autonomy engineers to build, test, and deploy AI pilot systems efficiently</span>
                </li>
              </ul>
            </div>

            {/* Kraken */}
            <div>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl font-light text-foreground">Kraken</h3>
                  <p className="text-sm text-foreground/60 font-light">Director of Product Design</p>
                </div>
                <p className="text-sm text-foreground/50 font-light mt-2 md:mt-0">Sep 2022 - 2025</p>
              </div>
              <ul className="space-y-3 text-foreground/70 font-light leading-relaxed list-none">
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Directed a diverse design team on the UX/UI of a complex trading platform, achieving <span className="font-normal text-foreground">$200B in trading volume</span> across web, desktop, and mobile.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Aligned with stakeholders to prioritize features, achieving <span className="font-normal text-foreground">100% on-time delivery</span> for two quarters and increasing trading volume through user-centric design enhancements.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Boosted new user profile creation by <span className="font-normal text-foreground">24%</span> by analyzing feedback and implementing UX improvements, reflecting a deep commitment to user engagement.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Stayed current with industry trends and best practices in cryptocurrency and digital asset trading to determine barriers to user adoption</span>
                </li>
              </ul>
            </div>

            {/* Federato */}
            <div>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl font-light text-foreground">Federato</h3>
                  <p className="text-sm text-foreground/60 font-light">Head of Product Design</p>
                </div>
                <p className="text-sm text-foreground/50 font-light mt-2 md:mt-0">2021 - Sep 2022</p>
              </div>
              <ul className="space-y-3 text-foreground/70 font-light leading-relaxed list-none">
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Spearheaded the UX/UI design for Federato's machine learning underwriting platform, enhancing insurance carrier operations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Developed a comprehensive design system in Figma, significantly reducing implementation time from <span className="font-normal text-foreground">6+ months to 8 weeks</span>, streamlining project delivery.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Designed Federato to break the mold of traditionally poor insurance user experiences. This significantly drove interest and adoption, setting a new standard for insurance interfaces.</span>
                </li>
              </ul>
            </div>

            {/* Axure */}
            <div>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl font-light text-foreground">Axure</h3>
                  <p className="text-sm text-foreground/60 font-light">VP of Product Design</p>
                </div>
                <p className="text-sm text-foreground/50 font-light mt-2 md:mt-0">2017 - 2022</p>
              </div>
              <ul className="space-y-3 text-foreground/70 font-light leading-relaxed list-none">
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Transformed Axure from what some users called the "best tool with the worst UX" to a modern product, achieving a <span className="font-normal text-foreground">40% increase in adoption</span> by streamlining the UI based on strategic user research.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Pioneered the integration of new cloud services into Axure's product line, diversifying offerings and achieving a <span className="font-normal text-foreground">25% increase in adoption</span>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Enhanced user workflows by designing and implementing intuitive UX/UI features, resulting in a notable uptick in core product feature adoption.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Created new branding and positioning strategies, including the design of a new logo, website the development of a Figma design system.</span>
                </li>
              </ul>
            </div>

            {/* CrunchyRoll */}
            <div>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl font-light text-foreground">CrunchyRoll</h3>
                  <p className="text-sm text-foreground/60 font-light">Director of Product Design</p>
                </div>
                <p className="text-sm text-foreground/50 font-light mt-2 md:mt-0">2015 - 2017</p>
              </div>
              <ul className="space-y-3 text-foreground/70 font-light leading-relaxed list-none">
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Led the UX design for a comprehensive video product across multiple platforms, contributing to a significant user base growth and culminating in a successful <span className="font-normal text-foreground">$1.2B acquisition by Sony</span>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Drove the design and implementation of innovative features, enhancing user engagement and satisfaction across mobile, living room, and web platforms.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Collaborated with C-suite and cross-functional teams to align product vision and strategy, ensuring cohesive brand experience and market positioning.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Managed and coached a 10-person creative team consisting of UX, UI, and user research</span>
                </li>
              </ul>
            </div>

            {/* Mojave */}
            <div>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                <div>
                  <h3 className="font-display text-xl font-light text-foreground">Mojave</h3>
                  <p className="text-sm text-foreground/60 font-light">Founder, Director of Product Design</p>
                </div>
                <p className="text-sm text-foreground/50 font-light mt-2 md:mt-0">2008 - 2015</p>
              </div>
              <ul className="space-y-3 text-foreground/70 font-light leading-relaxed list-none">
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Founded Mojave, a strategic design agency, leading it to be named one of the 'Top 99 product agencies' through innovative design leadership.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Conceptualized and designed National Geographic's Facebook app, which grew to over <span className="font-normal text-foreground">50m followers</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-foreground/40 mt-2">•</span>
                  <span>Earned numerous accolades for outstanding creative work, with Mojave recognized as one of the 'Top 99 product agencies'</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Design Patents */}
        <section className="mb-20">
          <h2 className="font-display text-2xl font-light mb-8 text-foreground/90">Design Patents</h2>
          <div className="space-y-6 text-foreground/70 font-light leading-relaxed">
            <div>
              <p className="font-normal text-foreground mb-2">
                Multi-View Masters for Graphical Designs (2018): US20230117793A1
              </p>
              <p>Pioneered a novel approach that simplifies complex interactions, enhancing efficiency and collaboration.</p>
            </div>
            <div>
              <p className="font-normal text-foreground mb-2">
                Widget Container Management for Interactive Designs (2020): US20220129118A1
              </p>
              <p>Developed a method for visualization of multiple widget states, significantly improving interactive design processes.</p>
            </div>
            <div>
              <p className="font-normal text-foreground mb-2">
                Focused Specification Generation for Interactive Designs (2023): US11645047B2
              </p>
              <p>Created a method for generating precise specifications for interactive designs, improving design feedback.</p>
            </div>
          </div>
        </section>

        {/* Licenses & Certifications */}
        <section className="mb-20">
          <h2 className="font-display text-2xl font-light mb-8 text-foreground/90">Licenses & Certifications</h2>
          <ul className="space-y-3 text-foreground/70 font-light list-none">
            <li className="flex items-start gap-3">
              <span className="text-foreground/40 mt-2">•</span>
              <span>Google: Foundations of User Experience (UX) Design</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-foreground/40 mt-2">•</span>
              <span>Atlassian: Agile with Atlassian Jira</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-foreground/40 mt-2">•</span>
              <span>Stock Valuation with Comparable Companies Analysis</span>
            </li>
          </ul>
        </section>

        {/* Skills */}
        <section className="mb-20">
          <h2 className="font-display text-2xl font-light mb-8 text-foreground/90">Skills</h2>
          <p className="text-foreground/70 font-light leading-relaxed max-w-3xl">
            Design Leader skilled in UX/UI, service design, and responsive systems development. Proficient with tools like Sketch, Figma, Adobe Suite, and AI/ML applications. Expertise in design systems, prototyping, and integrating AI into design processes. Combines technical mastery with leadership excellence—driving innovation through team management, cross-functional collaboration, agile methodologies, and mentorship to cultivate design thinking and deliver impactful solutions.
          </p>
        </section>
      </div>
    </div>
  );
}
