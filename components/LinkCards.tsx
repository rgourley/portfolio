"use client";

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

export default function LinkCards({ cards }: LinkCardsProps) {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card) => (
        <a
          key={card.url}
          href={card.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-2 p-5 rounded-xl bg-muted border border-foreground/10 hover:border-foreground/30 transition-colors"
        >
          {card.meta && (
            <span className="text-xs uppercase tracking-wider text-foreground/50">{card.meta}</span>
          )}
          <span className="font-display text-2xl font-medium text-foreground/90 leading-tight">
            {card.title}
          </span>
          {card.description && (
            <span className="text-base text-foreground/65 font-light leading-relaxed">
              {card.description}
            </span>
          )}
          <span className="mt-auto pt-2 text-sm text-foreground/50 font-mono break-all group-hover:text-foreground/80 transition-colors">
            {hostLabel(card.url)} ↗
          </span>
        </a>
      ))}
    </div>
  );
}
