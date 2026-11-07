import type { BlogPost } from "@/lib/content";

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function fdate(d: string) { const p = d.split("-"); return `${MON[+p[1] - 1]} ${+p[2]}, ${p[0]}`; }
export function mins(p: BlogPost) { return Math.max(1, Math.round((p.content.replace(/<svg[\s\S]*?<\/svg>/g, "").match(/\w+/g) || []).length / 220)); }
export function tagOf(p: BlogPost) { return p.tags && p.tags.length ? p.tags[p.tags.length - 1] : ""; }
