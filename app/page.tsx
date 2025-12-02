import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import DesignApproach from "@/components/DesignApproach";
import CTA from "@/components/CTA";
import { getFeaturedWork } from "@/lib/content";

export default function Home() {
  const featuredWork = getFeaturedWork();

  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedWork featuredWork={featuredWork} />
      <About />
      <DesignApproach />
      <Testimonials />
      <CTA />
    </div>
  );
}

