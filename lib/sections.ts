import type { BlogPost } from "@/lib/content";

/* The blog's "Open models" section: posts that test open models run locally (image models in ComfyUI so far).
   A post belongs to it by tag, so new posts join by being tagged. Post URLs stay /blog/<slug>; the section adds a hub
   at /blog/open-models, its own lane on /blog, a back link and breadcrumb on each post, and "Next" within the section. */

export const OPEN_MODELS = {
  slug: "open-models",
  path: "/blog/open-models",
  title: "Open models",
  tags: ["ComfyUI", "open models"],
};

export function inOpenModels(p: BlogPost): boolean {
  return (p.tags || []).some((t) => OPEN_MODELS.tags.includes(t));
}

/** The hub's topic groups, in order. A section post missing from every group lands in "More" at the end. */
export const OPEN_MODEL_GROUPS: { title: string; blurb: string; slugs: string[] }[] = [
  {
    title: "Which model",
    blurb: "Head-to-head tests on the same prompts and seeds.",
    slugs: ["z-image-vs-krea-2-vs-moss-image", "z-image-turbo-vs-flux-3-klein-20-prompts", "z-image-turbo-vs-flux-3-klein", "z-image-turbo-vs-krea-2-turbo", "z-image-turbo-vs-z-image-base"],
  },
  {
    title: "Settings, files and prompting",
    blurb: "How to run them: steps, samplers, model files and how a prompt is read.",
    slugs: ["z-image-turbo-best-settings", "z-image-turbo-bf16-fp8-int8-nvfp4", "z-image-turbo-prompt-guide"],
  },
  {
    title: "Looks: film, light and realism",
    blurb: "Prompts for a particular look, each one shown.",
    slugs: ["z-image-turbo-film-camera-recipes", "moss-image-film-camera-prompts", "film-camera-prompts-z-image-vs-krea-2", "z-image-turbo-lighting-prompts", "z-image-turbo-cinematic-movie-stills", "z-image-turbo-realistic-skin"],
  },
];

/** The section's posts as groups for the hub, newest first within each group. */
export function openModelGroups(posts: BlogPost[]) {
  const mine = posts.filter(inOpenModels);
  const bySlug = new Map(mine.map((p) => [p.slug, p]));
  const used = new Set<string>();
  const groups = OPEN_MODEL_GROUPS.map((g) => {
    const ps = g.slugs.map((s) => bySlug.get(s)).filter((p): p is BlogPost => Boolean(p));
    ps.forEach((p) => used.add(p.slug));
    return { title: g.title, blurb: g.blurb, posts: ps.sort((a, b) => b.date.localeCompare(a.date)) };
  });
  const rest = mine.filter((p) => !used.has(p.slug));
  if (rest.length) groups.push({ title: "More", blurb: "", posts: rest });
  return groups.filter((g) => g.posts.length);
}
