import React from "react";

// Heading anchor ids, shared by the markdown headings and the jump list so their links always match.
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Plain text of rendered markdown children (strings, or elements wrapping strings like <strong>).
export function textOf(children: React.ReactNode): string {
  return React.Children.toArray(children)
    .map((c: any) => (typeof c === "string" || typeof c === "number" ? String(c) : textOf(c?.props?.children)))
    .join("");
}
