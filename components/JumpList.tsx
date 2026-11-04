import { slugify } from "./slugify";

// A "Jump to" list for long posts: groups of links to the post's headings, one group per column,
// three across (one column on phones).
// Written in a post as:
//   :::jump
//   # Film stocks
//   Kodak Portra 400
//   Kodak Gold 200
//   # Cameras
//   Holga
//   :::
// "# Group" starts a group; the group title links to its own heading too. Every other line links to the heading with that text.
export default function JumpList({ body }: { body: string }) {
  const groups: { title: string; items: string[] }[] = [];
  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("# ")) groups.push({ title: line.slice(2).trim(), items: [] });
    else if (groups.length) groups[groups.length - 1].items.push(line);
  }

  return (
    <nav aria-label="Jump to a section" className="my-10">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground/60">Jump to</p>
      <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-3">
        {groups.map((g) => (
          <div key={g.title} className="mb-4 break-inside-avoid">
            <a href={`#${slugify(g.title)}`} className="mb-1 block text-base font-semibold text-foreground/90 hover:underline">
              {g.title}
            </a>
            {g.items.length > 0 && (
              <ul className="space-y-0.5">
                {g.items.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${slugify(item)}`}
                      className="text-[15px] leading-snug text-foreground/65 underline-offset-2 hover:text-foreground hover:underline"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
