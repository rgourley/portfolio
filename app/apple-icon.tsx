import { renderMark } from "@/lib/mark";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** The 180px touch icon: the site's mark, "R." on paper. */
export default function Icon() {
  return renderMark(180);
}
