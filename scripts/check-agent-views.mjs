// Holds the valve to its promise: on every page, the text the "For agents" view shows is the /md document for that
// page, byte for byte. Fetches each page and its /md twin from a running server and compares them.
//
//   node scripts/check-agent-views.mjs                  # against http://localhost:3000
//   node scripts/check-agent-views.mjs http://localhost:3017
//   BASE_URL=https://preview.example node scripts/check-agent-views.mjs
//
// Exit code 1 on any difference, any page without an agent view, or any twin that does not answer.
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = (process.argv[2] || process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");

// the page routes with a twin, read from the same list the site uses
const routesSrc = readFileSync(join(root, "lib", "md-routes.ts"), "utf8");
const listSrc = routesSrc.slice(routesSrc.indexOf("MD_ROUTES = ["), routesSrc.indexOf("] as const"));
const routes = [...listSrc.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
const slugs = (dir) => readdirSync(join(root, "content", dir)).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3));
const pairs = [
  ...routes.map((r) => [r, r === "/" ? "/md" : `/md${r}`]),
  ...slugs("blog").map((s) => [`/blog/${s}`, `/md/blog/${s}`]),
  ...slugs("work").map((s) => [`/work/${s}`, `/md/work/${s}`]),
];

function decode(s) {
  return s
    .replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
}

/** The agent view's text: the pre inside the section for agents, tags stripped, entities decoded. */
function agentText(html) {
  const m = html.match(/<section class="agent"[^>]*>[\s\S]*?<pre>([\s\S]*?)<\/pre>/);
  if (!m) return null;
  // a <pre> drops one leading newline; React never emits one, but match the browser all the same
  return decode(m[1].replace(/<[^>]+>/g, "")).replace(/^\n/, "");
}

function firstDiff(a, b) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  const show = (s) => JSON.stringify(s.slice(Math.max(0, i - 40), i + 60));
  return `first difference at byte ${i}\n    page: ${show(a)}\n    md:   ${show(b)}`;
}

let failures = 0;
for (const [page, md] of pairs) {
  let html, twin;
  try {
    const [h, t] = await Promise.all([fetch(base + page), fetch(base + md)]);
    if (!h.ok || !t.ok) { console.log(`FAIL ${page}: page ${h.status}, ${md} ${t.status}`); failures++; continue; }
    [html, twin] = await Promise.all([h.text(), t.text()]);
  } catch (e) {
    console.log(`FAIL ${page}: ${e.message}`); failures++; continue;
  }
  const shown = agentText(html);
  if (shown === null) { console.log(`FAIL ${page}: no agent view in the page`); failures++; continue; }
  if (shown !== twin) { console.log(`FAIL ${page} differs from ${md}: ${firstDiff(shown, twin)}`); failures++; continue; }
  console.log(`ok   ${page} = ${md} (${twin.length} bytes)`);
}
console.log(failures ? `\n${failures} of ${pairs.length} pages differ from their /md twin` : `\nall ${pairs.length} pages match their /md twin`);
process.exit(failures ? 1 : 0);
