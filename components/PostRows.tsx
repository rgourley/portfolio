import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/content";
import { fileDims } from "@/lib/image-dims";
import { fdate, mins, tagOf } from "@/lib/blog";

/** A post's cover at its own shape, or an empty frame when it has none. */
export function PostPic({ post, priority, sizes }: { post: BlogPost; priority?: boolean; sizes: string }) {
  if (!post.image) return <div className="pic" style={{ aspectRatio: "16/10" }} />;
  const d = fileDims(post.image) || { w: 16, h: 10 };
  return <Image className="pic" src={post.image} alt="" width={d.w} height={d.h} sizes={sizes} priority={priority} quality={82} />;
}

/** The numbered list of posts used on /blog and the section hubs. `start` is the number of the first row. */
export default function PostRows({ posts, start = 1 }: { posts: BlogPost[]; start?: number }) {
  return (
    <ol className="rows">
      {posts.map((p, i) => (
        <li key={p.slug}>
          <Link className="row" href={`/blog/${p.slug}`} prefetch={false}>
            <span className="n">{String(i + start).padStart(2, "0")}</span>
            <PostPic post={p} sizes="(max-width: 760px) 260px, 176px" />
            <h3>{p.title}</h3>
            <span className="meta"><span>{fdate(p.date)}</span><span>{tagOf(p)} &nbsp; {mins(p)} min</span></span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
