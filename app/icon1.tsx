import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0d0d",
          color: "#d1d1d1",
          fontSize: 96,
          fontWeight: 700,
          borderRadius: 42,
        }}
      >
        RG
      </div>
    ),
    size,
  );
}
