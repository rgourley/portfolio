"use client";

import { ArrowUpRight, Globe } from "lucide-react";

export interface LinkCard {
  title: string;
  url: string;
  meta?: string;
  description?: string;
}

interface LinkCardsProps {
  cards: LinkCard[];
}

function hostLabel(url: string): string {
  try {
    const u = new URL(url);
    return (u.hostname.replace(/^www\./, "") + u.pathname).replace(/\/$/, "");
  } catch {
    return url;
  }
}

function isGitHub(url: string): boolean {
  try {
    return new URL(url).hostname.replace(/^www\./, "") === "github.com";
  } catch {
    return false;
  }
}

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export default function LinkCards({ cards }: LinkCardsProps) {
  return (
    <div className="my-8 flex flex-col gap-2">
      {cards.map((card) => (
        <a
          key={card.url}
          href={card.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-3 rounded-lg border border-[color-mix(in_srgb,var(--foreground)_9%,transparent)] bg-[color-mix(in_srgb,var(--foreground)_4%,transparent)] px-4 py-3.5 transition-colors hover:border-[color-mix(in_srgb,var(--foreground)_22%,transparent)] hover:bg-[color-mix(in_srgb,var(--foreground)_7%,transparent)]"
        >
          <span className="mt-0.5 flex-shrink-0 text-[color-mix(in_srgb,var(--foreground)_65%,transparent)]">
            {isGitHub(card.url) ? (
              <GitHubMark className="h-5 w-5" />
            ) : (
              <Globe className="h-5 w-5" strokeWidth={1.5} />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center justify-between gap-3">
              <span className="truncate text-base font-semibold text-foreground">{card.title}</span>
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-[color-mix(in_srgb,var(--foreground)_35%,transparent)] transition-colors group-hover:text-foreground" />
            </span>
            {card.description && (
              <span className="mt-0.5 block text-[15px] leading-snug text-[color-mix(in_srgb,var(--foreground)_65%,transparent)]">
                {card.description}
              </span>
            )}
            <span className="mt-1.5 block truncate text-xs text-[color-mix(in_srgb,var(--foreground)_45%,transparent)]">
              {hostLabel(card.url)}
              {card.meta ? ` · ${card.meta}` : ""}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}
