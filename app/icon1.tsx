import { renderMark } from "@/lib/mark";

export const runtime = "edge";
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

/** The 192px icon: the site's mark, "R." on paper. */
export default function Icon() {
  return renderMark(192);
}
