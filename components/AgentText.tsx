/** The agent text of a page inside its pre: markdown heading lines render like the title, a little heavier.
    No directive, so the server pages and the client home component can both use it. */
export default function AgentText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => {
        const nl = i ? "\n" : "";
        return line.startsWith("#") ? <b key={i}>{nl}{line}</b> : nl + line;
      })}
    </>
  );
}
