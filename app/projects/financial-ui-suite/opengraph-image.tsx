import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Financial UI Suite: a Claude Code plugin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PREVIEW_SLUGS = [
  "modern-pro-dark",
  "pro-terminal",
  "editorial-financial",
  "retail-polish-dark",
] as const;

const interBlack = fetch(
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.19/files/inter-latin-900-normal.woff",
).then((res) => res.arrayBuffer());

const interSemiBold = fetch(
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.19/files/inter-latin-600-normal.woff",
).then((res) => res.arrayBuffer());

const interRegular = fetch(
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.19/files/inter-latin-500-normal.woff",
).then((res) => res.arrayBuffer());

// The image reads the previews from disk. It does not fetch them over HTTP,
// because the site URL is not reachable when the image renders at build time.
async function readPreview(slug: string): Promise<string> {
  const file = await readFile(
    join(process.cwd(), "public", "images", "fui", `${slug}.png`),
  );
  return `data:image/png;base64,${file.toString("base64")}`;
}

export default async function OGImage() {
  const [blackData, semiBoldData, regularData, previews] = await Promise.all([
    interBlack,
    interSemiBold,
    interRegular,
    Promise.all(PREVIEW_SLUGS.map(readPreview)),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "#0a0a0a",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            width: "58%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 40px 60px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: "#22d3ee",
              }}
            />
            <div
              style={{
                fontSize: 18,
                color: "#a3a3a3",
                textTransform: "uppercase",
                letterSpacing: "2.5px",
                fontWeight: 500,
              }}
            >
              open source · Claude Code plugin
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 74,
                fontWeight: 900,
                color: "#f5f5f5",
                lineHeight: 0.94,
                letterSpacing: "-3px",
              }}
            >
              Financial UI that looks like the product it ships in.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                display: "flex",
                gap: 18,
                fontSize: 15,
                color: "#a3a3a3",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: 500,
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "#f5f5f5" }}>2</span>
                <span>skills</span>
              </div>
              <div style={{ color: "#404040" }}>·</div>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "#f5f5f5" }}>17</span>
                <span>references</span>
              </div>
              <div style={{ color: "#404040" }}>·</div>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ color: "#f5f5f5" }}>14</span>
                <span>styles</span>
              </div>
            </div>
            <div
              style={{
                fontSize: 15,
                color: "#737373",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              by Robert Gourley
            </div>
          </div>
        </div>

        <div
          style={{
            width: "42%",
            display: "flex",
            flexWrap: "wrap",
            padding: "40px 60px 40px 0",
            gap: 10,
            alignContent: "center",
          }}
        >
          {PREVIEW_SLUGS.map((slug, i) => (
            <div
              key={slug}
              style={{
                width: 217,
                height: 235,
                display: "flex",
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                transform:
                  i === 0
                    ? "translateY(0)"
                    : i === 1
                      ? "translateY(20px)"
                      : i === 2
                        ? "translateY(-8px)"
                        : "translateY(14px)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previews[i]}
                alt={slug}
                width={217}
                height={235}
                style={{
                  width: 217,
                  height: 235,
                  objectFit: "cover",
                  objectPosition: "left top",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: blackData, weight: 900, style: "normal" },
        { name: "Inter", data: semiBoldData, weight: 600, style: "normal" },
        { name: "Inter", data: regularData, weight: 500, style: "normal" },
      ],
    },
  );
}
