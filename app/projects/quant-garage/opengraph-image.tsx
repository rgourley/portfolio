import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Quant Garage. Pro research. No terminal.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const interBlack = fetch(
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.19/files/inter-latin-900-normal.woff",
).then((res) => res.arrayBuffer());

const interSemiBold = fetch(
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.19/files/inter-latin-600-normal.woff",
).then((res) => res.arrayBuffer());

const interRegular = fetch(
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.19/files/inter-latin-500-normal.woff",
).then((res) => res.arrayBuffer());

export default async function OGImage() {
  const [blackData, semiBoldData, regularData] = await Promise.all([
    interBlack,
    interSemiBold,
    interRegular,
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
            padding: "56px 30px 56px 72px",
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
                fontSize: 17,
                color: "#a3a3a3",
                textTransform: "uppercase",
                letterSpacing: "2.5px",
                fontWeight: 500,
              }}
            >
              open source · Claude Code · Python
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 80,
                fontWeight: 900,
                color: "#f5f5f5",
                lineHeight: 0.92,
                letterSpacing: "-3px",
                marginBottom: 6,
              }}
            >
              Quant Garage.
            </div>
            <div
              style={{
                fontSize: 80,
                fontWeight: 900,
                color: "#f5f5f5",
                lineHeight: 0.92,
                letterSpacing: "-3px",
                marginBottom: 6,
              }}
            >
              Pro research.
            </div>
            <div
              style={{
                fontSize: 80,
                fontWeight: 900,
                color: "#f5f5f5",
                lineHeight: 0.92,
                letterSpacing: "-3px",
              }}
            >
              No terminal.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              style={{
                fontSize: 20,
                color: "#e5e5e5",
                fontWeight: 600,
                letterSpacing: "-0.3px",
              }}
            >
              Trade like a pro. Without the terminal.
            </div>
            <div
              style={{
                fontSize: 14,
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
            flexDirection: "column",
            padding: "40px 60px 40px 10px",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", gap: 12, height: 236 }}>
            <RegimeCard />
            <DrilldownCard />
          </div>
          <div style={{ display: "flex", gap: 12, height: 236 }}>
            <VarianceCard />
            <AnalogCard />
          </div>
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

function CardShell({
  slug,
  meta,
  dot,
  children,
}: {
  slug: string;
  meta: string;
  dot: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "8px 12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 10,
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              background: dot,
            }}
          />
          {slug}
        </div>
        <div
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "monospace",
          }}
        >
          {meta}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "12px",
          gap: 6,
          fontFamily: "monospace",
          flex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function RegimeCard() {
  return (
    <CardShell slug="market-regime" meta="09:31 EDT" dot="#22c55e">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            display: "flex",
            background: "rgba(34,197,94,0.15)",
            color: "#4ade80",
            fontSize: 10,
            padding: "2px 8px",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            borderRadius: 3,
          }}
        >
          risk_on
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
          composite
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        <div style={{ display: "flex", color: "rgba(255,255,255,0.45)" }}>
          SPY trend
        </div>
        <div style={{ display: "flex", color: "rgba(255,255,255,0.9)" }}>
          uptrend_strong
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        <div style={{ display: "flex", color: "rgba(255,255,255,0.45)" }}>
          VIX pct rank
        </div>
        <div style={{ display: "flex", color: "rgba(255,255,255,0.9)" }}>
          14th
        </div>
      </div>
    </CardShell>
  );
}

function DrilldownCard() {
  return (
    <CardShell slug="earnings-drilldown NVDA" meta="Q1" dot="#fbbf24">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            implied
          </div>
          <div style={{ fontSize: 20, color: "#f5f5f5", fontWeight: 500 }}>
            ±7.2%
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            realized 8q
          </div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.6)" }}>
            ±5.4%
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          height: 3,
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            width: "72%",
            background: "#fbbf24",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 10,
          color: "rgba(255,255,255,0.55)",
        }}
      >
        straddle rich vs realized
      </div>
    </CardShell>
  );
}

function VarianceCard() {
  const rows = [
    { name: "ALLO", pct: 66, color: "#ef4444" },
    { name: "NVDA", pct: 12, color: "#fbbf24" },
    { name: "MSFT", pct: 8, color: "rgba(255,255,255,0.6)" },
    { name: "GOOGL", pct: 7, color: "rgba(255,255,255,0.4)" },
  ];
  return (
    <CardShell slug="risk-report" meta="var share" dot="#22c55e">
      {rows.map((r) => (
        <div
          key={r.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 34,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {r.name}
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              height: 4,
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ width: `${r.pct}%`, background: r.color }} />
          </div>
          <div
            style={{
              display: "flex",
              width: 28,
              color: "rgba(255,255,255,0.65)",
              justifyContent: "flex-end",
            }}
          >
            {r.pct}%
          </div>
        </div>
      ))}
    </CardShell>
  );
}

function AnalogCard() {
  const bars = [4, 7, 10, 14, 16, 12, 9, 5];
  const max = 16;
  return (
    <CardShell slug="historical-analog-finder" meta="k=20" dot="#22c55e">
      <div
        style={{
          fontSize: 9,
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        fwd 252d return dist
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          height: 40,
          gap: 2,
        }}
      >
        {bars.map((b, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${(b / max) * 100}%`,
              background: i < 3 ? "rgba(239,68,68,0.7)" : "rgba(34,197,94,0.7)",
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 10,
          color: "rgba(255,255,255,0.55)",
        }}
      >
        hit 75% · median +14.3%
      </div>
    </CardShell>
  );
}
