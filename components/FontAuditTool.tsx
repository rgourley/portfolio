"use client";

import { useState } from "react";
import { FONT_AUDIT_BOOKMARKLET, FONT_AUDIT_SOURCE } from "@/lib/font-audit-script";

export default function FontAuditTool(): JSX.Element {
  const [copied, setCopied] = useState(false);

  function runHere(): void {
    new Function(FONT_AUDIT_SOURCE)();
  }

  async function copySnippet(): Promise<void> {
    await navigator.clipboard.writeText(FONT_AUDIT_SOURCE);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="tool">
      {/* React blocks javascript: hrefs in JSX, so the attribute is set from a ref on mount. */}
      <a
        ref={(el) => {
          if (el) el.setAttribute("href", FONT_AUDIT_BOOKMARKLET);
        }}
        onClick={(e) => e.preventDefault()}
        draggable
      >
        Font audit
      </a>
      <button type="button" onClick={runHere}>
        Run it on this page
      </button>
      <button type="button" onClick={copySnippet}>
        {copied ? "Copied" : "Copy console snippet"}
      </button>
    </div>
  );
}
