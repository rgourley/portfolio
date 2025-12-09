"use client";

import { useEffect } from "react";
import { trackProjectView } from "@/lib/analytics";

interface ProjectViewTrackerProps {
  slug: string;
  title: string;
}

export default function ProjectViewTracker({ slug, title }: ProjectViewTrackerProps) {
  useEffect(() => {
    trackProjectView(slug, title);
  }, [slug, title]);

  return null;
}

