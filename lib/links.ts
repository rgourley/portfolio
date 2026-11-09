// The site's own routes, in the place of the prototype's artifact links (site_links.json).
export const R = {
  home: "/",
  work: "/work",
  projects: "/projects",
  resume: "/resume",
  blog: "/blog",
  about: "/about",
  newsletter: "/newsletter",
  contact: "/contact",
  hivemind: "/work/hivemind",
  clawstreet: "/work/clawstreet",
  kraken: "/work/kraken",
  boombox: "/work/boombox",
  axure: "/work/axure",
  crunchyroll: "/work/crunchyroll",
  apple: "/work/apple",
  "paul-frank-industries": "/work/paul-frank-industries",
  leadership: "/leadership",
  services: "/services",
  proxies: "/projects/proxies",
  "quant-garage": "/projects/quant-garage",
  "financial-ui-suite": "/projects/financial-ui-suite",
  coaster: "/coaster/about",
  "font-sizes": "/tools/font-sizes",
} as const;

// The Film Looks pack on Gumroad: linked from the footer, the Open models hub and the model posts.
export const PACK_URL = "https://rgourley.gumroad.com/l/film-looks-z-image-moss";

// The social icons after Newsletter in the nav. An empty link is left out.
export const SOCIAL: [string, string][] = [
  ["Instagram", "https://www.instagram.com/whats.up.rob/"],
  ["LinkedIn", "https://www.linkedin.com/in/rob-gourley/"],
  ["X", "https://x.com/Whats_Up_Rob"],
];

export const NAV: [keyof typeof R, string][] = [
  ["work", "Work"],
  ["projects", "Projects"],
  ["resume", "Resume"],
  ["blog", "Blog"],
  ["about", "About"],
  ["newsletter", "Newsletter"],
];

// Which nav link is underlined on a path. Leadership and Services sit under About, the project pages under Projects.
export function navKeyFor(pathname: string): keyof typeof R | null {
  if (pathname === "/") return null;
  if (pathname.startsWith("/work")) return "work";
  if (pathname.startsWith("/projects") || pathname.startsWith("/coaster") || pathname.startsWith("/tools")) return "projects";
  if (pathname.startsWith("/resume")) return "resume";
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/about") || pathname.startsWith("/leadership") || pathname.startsWith("/services")) return "about";
  if (pathname.startsWith("/newsletter")) return "newsletter";
  return null;
}
