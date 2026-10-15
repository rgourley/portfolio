import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/lib/content";

export const alt = "Robert Gourley blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const interBlack = fetch(
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.19/files/inter-latin-900-normal.woff",
).then((res) => res.arrayBuffer());

const interMedium = fetch(
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.19/files/inter-latin-500-normal.woff",
).then((res) => res.arrayBuffer());

function titleSize(length: number): number {
  if (length <= 40) return 84;
  if (length <= 60) return 70;
  return 58;
}

export default async function OGImage({
  params,
}: {
  params: { slug: string };
}): Promise<ImageResponse> {
  const post = await getBlogPostBySlug(params.slug);
  const title = post?.title ?? "Robert Gourley";
  const [blackData, mediumData] = await Promise.all([interBlack, interMedium]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "#2a2a2c",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: "780px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#a3a3a3",
              textTransform: "uppercase",
              letterSpacing: "3px",
              fontWeight: 500,
            }}
          >
            robertcreative.com / blog
          </div>
          <div
            style={{
              display: "flex",
              fontSize: titleSize(title.length),
              fontWeight: 900,
              color: "#e8e1d0",
              lineHeight: 1.02,
              letterSpacing: "-2px",
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#e2a72e", fontWeight: 500 }}>
            Robert Gourley
          </div>
        </div>

        <div style={{ display: "flex", position: "absolute", right: 0, top: 0, width: 420, height: 630 }}>
          <div style={{ position: "absolute", right: 90, top: 80, width: 220, height: 220, borderRadius: 110, background: "#d9472b", display: "flex" }} />
          <div style={{ position: "absolute", right: 0, top: 300, width: 300, height: 120, background: "#e2a72e", display: "flex" }} />
          <div style={{ position: "absolute", right: 150, top: 420, width: 270, height: 210, background: "#1f7a7a", display: "flex", borderTopLeftRadius: 135 }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: blackData, weight: 900, style: "normal" },
        { name: "Inter", data: mediumData, weight: 500, style: "normal" },
      ],
    },
  );
}
