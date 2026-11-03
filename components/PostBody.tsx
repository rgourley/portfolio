import PostShell from "./PostShell";
import PostTool from "./PostTool";
import { renderPost } from "@/lib/post-html";
import type { Dims } from "@/lib/image-dims";

interface PostBodyProps {
  content: string;
  /** pixel sizes of the local images, read on the server, so each one keeps its own shape */
  dims: Dims;
}

/** A post's article: the prose as HTML made on the server, the interactive blocks as components. */
export default async function PostBody({ content, dims }: PostBodyProps) {
  const parts = await renderPost(content, dims);
  return (
    <PostShell>
      {parts.map((part, i) =>
        part.type === "html" ? <div key={i} dangerouslySetInnerHTML={{ __html: part.html }} /> : <PostTool key={i} part={part} />
      )}
    </PostShell>
  );
}
