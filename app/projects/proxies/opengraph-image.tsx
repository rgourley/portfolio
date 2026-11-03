import { ogFonts, ogSize, renderBloomCard } from "@/lib/og-bloom";

export const runtime = "edge";
export const alt = "Proxies. Ask your stakeholders before the meeting.";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return renderBloomCard({ label: "Project. Proxies", title: "Ask your stakeholders before the meeting.", seed: 19 }, await ogFonts());
}
