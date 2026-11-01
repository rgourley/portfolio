import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const interBlack = fetch(
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.19/files/inter-latin-900-normal.woff",
).then((res) => res.arrayBuffer());

const interMedium = fetch(
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.19/files/inter-latin-500-normal.woff",
).then((res) => res.arrayBuffer());

// Same look as the site-wide card in app/opengraph-image.tsx, with a per-section title.
export async function renderOgCard(title: string, subtitle: string): Promise<ImageResponse> {
  const [blackData, mediumData] = await Promise.all([interBlack, interMedium]);
  const titleSize = title.length <= 14 ? 120 : title.length <= 24 ? 96 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "72px",
          fontFamily: "Inter",
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
          robertcreative.com
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 900,
              color: "#f5f5f5",
              lineHeight: 0.95,
              letterSpacing: "-3px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 34,
              fontWeight: 500,
              color: "#d4d4d4",
            }}
          >
            {subtitle}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#737373", fontWeight: 500 }}>
          Robert Gourley · Apple · Kraken · Crunchyroll · Shield AI
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Inter", data: blackData, weight: 900, style: "normal" },
        { name: "Inter", data: mediumData, weight: 500, style: "normal" },
      ],
    },
  );
}
