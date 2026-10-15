import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Robert Gourley. Product design and engineering.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const interBlack = fetch(
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.19/files/inter-latin-900-normal.woff",
).then((res) => res.arrayBuffer());

const interMedium = fetch(
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.19/files/inter-latin-500-normal.woff",
).then((res) => res.arrayBuffer());

export default async function OGImage(): Promise<ImageResponse> {
  const [blackData, mediumData] = await Promise.all([interBlack, interMedium]);

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
              fontSize: 110,
              fontWeight: 900,
              color: "#f5f5f5",
              lineHeight: 0.95,
              letterSpacing: "-4px",
            }}
          >
            Robert Gourley
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 36,
              fontWeight: 500,
              color: "#d4d4d4",
            }}
          >
            Product design and engineering for complex technical products.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#737373",
            fontWeight: 500,
          }}
        >
          Apple · Kraken · Crunchyroll · Shield AI
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
