import DotImage from "@/components/DotImage";
import PilotsScene from "@/components/PilotsScene";
import { IMG, type Block } from "@/lib/cases";

/** Renders a chapter's blocks: copy, figures that arrive as dots, and the scenes. */
export default function CaseBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === "html") return <div key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;
        if (b.t === "fig") {
          const im = IMG[b.img];
          return (
            <figure key={i} className={b.cls || "wide"}>
              <DotImage src={im.src} w={im.w} h={im.h} cell={b.cell || 6} alt={b.cap} sizes="(max-width: 860px) 100vw, 760px" />
              <figcaption>{b.cap}</figcaption>
            </figure>
          );
        }
        if (b.t === "grid") {
          const a = IMG[b.a], c = IMG[b.b];
          return (
            <div key={i} className="grid2">
              <figure><DotImage src={a.src} w={a.w} h={a.h} cell={5} alt={b.ca} sizes="(max-width: 860px) 100vw, 380px" /><figcaption>{b.ca}</figcaption></figure>
              <figure><DotImage src={c.src} w={c.w} h={c.h} cell={5} alt={b.cb} sizes="(max-width: 860px) 100vw, 380px" /><figcaption>{b.cb}</figcaption></figure>
            </div>
          );
        }
        if (b.t === "hold") {
          return (
            <figure key={i} className="wide breakout">
              <PilotsScene kind="hold" label={b.label} style={{ aspectRatio: "16/8" }} ariaLabel="Placeholder for a scene still to be built" />
            </figure>
          );
        }
        if (b.t === "quote") {
          const im = IMG[b.img];
          return (
            <figure key={i} className="quote">
              <DotImage src={im.src} w={im.w} h={im.h} cell={4} alt={b.who} sizes="120px" />
              <blockquote><p>{b.q}</p><cite>{b.who}<small>{b.bio}</small></cite></blockquote>
            </figure>
          );
        }
        return (
          <figure key={i} className="wide breakout">
            <PilotsScene kind={b.kind} style={{ aspectRatio: b.aspect }} ariaLabel={b.aria}>
              {b.title && (
                <div className="title">
                  <b>{b.title.name}</b>
                  {b.title.stats.map(([k, v]) => <span key={k}>{k}<i>{v}</i></span>)}
                </div>
              )}
            </PilotsScene>
            <figcaption>{b.cap}</figcaption>
          </figure>
        );
      })}
    </>
  );
}
