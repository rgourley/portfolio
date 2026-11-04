import { ImageResponse } from "next/og";

/* The site's mark, "R." in Manrope light on paper with the full stop as a round dot a little heavier than the type: the same
   geometry as app/icon.svg, drawn as vector for the PNG icon routes so no font has to load and every size renders alike.
   The R is the glyph's own outline from the Manrope light file the share images use. The PNGs are the light version;
   the SVG icon carries the dark-tab rule. */

const PAPER = "#F2F1EE", INK = "#161616";
const R_PATH = "M140 0V-1440H683Q704 -1440 728.5 -1438.5Q753 -1437 780 -1432Q888 -1415 965.5 -1354.5Q1043 -1294 1084.0 -1202.5Q1125 -1111 1125 -1001Q1125 -842 1040 -724Q975 -634 872 -594L1162 0H1027L755 -561H255V0ZM255 -674H681Q699 -674 722.5 -676.0Q746 -678 770 -682Q848 -698 900.0 -745.5Q952 -793 978.0 -860.0Q1004 -927 1004.0 -1001.0Q1004 -1075 978.0 -1141.5Q952 -1208 900.0 -1255.5Q848 -1303 770 -1319Q746 -1324 722.5 -1326.0Q699 -1328 681 -1328H255Z";

/** The mark as a PNG at the given square size, with the paper corner radius scaled from the 32px icon's 5px. */
export function renderMark(size: number): ImageResponse {
  const r = Math.round((size / 32) * 5);
  return new ImageResponse(
    (
      <div style={{ width: size, height: size, display: "flex", background: PAPER, borderRadius: r }}>
        <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path fill={INK} transform="translate(3.6 27) scale(0.01528)" d={R_PATH} />
          <circle fill={INK} cx="25.8" cy="24.7" r="2.4" />
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
