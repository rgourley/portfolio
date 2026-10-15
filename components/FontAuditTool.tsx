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
    <div className="flex flex-wrap items-center gap-4">
      {/* React blocks javascript: hrefs in JSX, so the attribute is set from a ref on mount. */}
      <a
        ref={(el) => {
          if (el) el.setAttribute("href", FONT_AUDIT_BOOKMARKLET);
        }}
        onClick={(e) => e.preventDefault()}
        draggable
        className="inline-flex items-center rounded-full bg-foreground text-background px-6 py-3 text-base font-medium cursor-grab"
      >
        Font audit
      </a>
      <button
        type="button"
        onClick={runHere}
        className="rounded-full border border-foreground/30 px-6 py-3 text-base hover:border-foreground transition-colors"
      >
        Run it on this page
      </button>
      <button
        type="button"
        onClick={copySnippet}
        className="rounded-full border border-foreground/30 px-6 py-3 text-base hover:border-foreground transition-colors"
      >
        {copied ? "Copied" : "Copy console snippet"}
      </button>
    </div>
  );
}
