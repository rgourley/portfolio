/* The pages with a markdown twin: the home at /md, every other page at /md/<route> (and /<route>.md). The list is a
   const tuple so lib/agent-views.ts has to cover every route; next.config.js repeats it for the .md rewrites. */
export const MD_ROUTES = [
  "/",
  "/about",
  "/resume",
  "/contact",
  "/newsletter",
  "/leadership",
  "/services",
  "/projects",
  "/projects/proxies",
  "/projects/quant-garage",
  "/projects/financial-ui-suite",
  "/coaster/about",
  "/tools/font-sizes",
  "/work",
  "/blog",
] as const;

export type MdRoute = (typeof MD_ROUTES)[number];

export function isMdRoute(path: string): path is MdRoute {
  return (MD_ROUTES as readonly string[]).includes(path);
}

/** The markdown twin of a page path, or null when the page has none. Posts and case studies have one per slug. */
export function markdownTwin(path: string): string | null {
  if (isMdRoute(path)) return path === "/" ? "/md" : `/md${path}`;
  const m = path.match(/^\/(blog|work)\/([^/]+)$/);
  if (m && !m[2].endsWith(".md") && m[2] !== "opengraph-image") return `/md/${m[1]}/${m[2]}`;
  return null;
}
