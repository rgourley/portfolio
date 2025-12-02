import { getAllWork } from "@/lib/content";
import WorkGrid from "@/components/WorkGrid";

export default function WorkPage() {
  const work = getAllWork();

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-12 lg:px-16">
        <div className="mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-light mb-4">Work</h1>
          <p className="text-xl text-foreground/60 max-w-2xl">
            Selected projects showcasing design leadership and product innovation.
          </p>
        </div>
        <WorkGrid work={work} />
      </div>
    </div>
  );
}

