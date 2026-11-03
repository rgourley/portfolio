// Holds the valve to its promise: on every page, the text the "For agents" view shows is the head of the /md document for
// that page, byte for byte, followed by two lines naming the full text and the site index. Fetches each page and its /md
// twin from a running server and compares them. Then checks the
// user-agent rule: a program (curl and friends, or no user agent) asking for a page gets the twin itself, and an
// Accept header naming text/html gets the page back.
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

// a browser-like request, so the page comes back as HTML; and a program-like one, which gets the markdown twin
const BROWSER = { "User-Agent": "Mozilla/5.0 (check-agent-views)", Accept: "text/html,application/xhtml+xml,*/*;q=0.8" };
const PROGRAM = { "User-Agent": "curl/8.4.0", Accept: "*/*" };

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
    const [h, t] = await Promise.all([fetch(base + page, { headers: BROWSER }), fetch(base + md)]);
    if (!h.ok || !t.ok) { console.log(`FAIL ${page}: page ${h.status}, ${md} ${t.status}`); failures++; continue; }
    [html, twin] = await Promise.all([h.text(), t.text()]);
  } catch (e) {
    console.log(`FAIL ${page}: ${e.message}`); failures++; continue;
  }
  const shown = agentText(html);
  if (shown === null) { console.log(`FAIL ${page}: no agent view in the page`); failures++; continue; }
  // the shown text: the twin's head, then a blank line, then the two link lines
  const tail = shown.match(/\n\nFull text for agents: (\S+)\nSite index: (\S+)\n$/);
  if (!tail) { console.log(`FAIL ${page}: the agent view does not end with the full-text and site-index lines`); failures++; continue; }
  const head = shown.slice(0, tail.index) + "\n";
  if (!twin.startsWith(head)) { console.log(`FAIL ${page} is not the head of ${md}: ${firstDiff(head, twin.slice(0, head.length))}`); failures++; continue; }
  const headLines = head.split("\n").length - 1;
  if (headLines < 4 || headLines > 44) { console.log(`FAIL ${page}: the excerpt is ${headLines} lines`); failures++; continue; }
  const mdPath = new URL(tail[1]).pathname;
  if (mdPath !== md) { console.log(`FAIL ${page}: the full-text line points at ${mdPath}, not ${md}`); failures++; continue; }
  if (tail[2] !== "https://www.robertcreative.com/llms.txt") { console.log(`FAIL ${page}: the site index line is ${tail[2]}`); failures++; continue; }
  console.log(`ok   ${page} shows the first ${headLines} lines of ${md} (${twin.length} bytes) and names it`);
}

// the user-agent rule, on a sample: the home, the first route, one post and one case study
const sample = [pairs[0], pairs[1], pairs.find(([p]) => p.startsWith("/blog/")), pairs.find(([p]) => p.startsWith("/work/"))].filter(Boolean);
for (const [page, md] of sample) {
  try {
    const [asProgram, asHuman, twin] = await Promise.all([
      fetch(base + page, { headers: PROGRAM }).then((r) => r.text()),
      fetch(base + page, { headers: { "User-Agent": "curl/8.4.0", Accept: "text/html" } }).then((r) => r.text()),
      fetch(base + md).then((r) => r.text()),
    ]);
    if (asProgram !== twin) { console.log(`FAIL ${page} with a curl user agent is not ${md}: ${firstDiff(asProgram, twin)}`); failures++; continue; }
    if (!/^\s*<!DOCTYPE html>/i.test(asHuman)) { console.log(`FAIL ${page} with curl and Accept: text/html did not return the page`); failures++; continue; }
    console.log(`ok   ${page} as a program = ${md}; with Accept: text/html = the page`);
  } catch (e) {
    console.log(`FAIL ${page} user-agent case: ${e.message}`); failures++;
  }
}

console.log(failures ? `\n${failures} checks failed` : `\nall ${pairs.length} pages show the head of their /md twin and name it, and programs get the twin by default`);
process.exit(failures ? 1 : 0);
