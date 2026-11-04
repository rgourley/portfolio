import { Fragment } from "react";

/** A terminal transcript: comments faint, prompts marked, commands with a dollar. kind: "c" comment, "p" prompt, "$" command, "" plain. */
export type TermLine = ["c" | "p" | "$" | "", string];

export default function Term({ lines }: { lines: TermLine[] }) {
  return (
    <div className="term">
      {lines.map(([kind, txt], i) => (
        <Fragment key={i}>
          {i > 0 && "\n"}
          {kind === "c" ? <i>{txt}</i> : kind === "p" ? <><b>&gt; </b>{txt}</> : kind === "$" ? <><b>$ </b>{txt}</> : txt}
        </Fragment>
      ))}
    </div>
  );
}
