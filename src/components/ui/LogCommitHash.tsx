"use client";

import { useCallback, useState } from "react";
import { Tr } from "@/components/i18n/Tr";

/** Click-to-copy affordance for deterministic decision hashes on /log. */
export function LogCommitHash({ hash }: { hash: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — hash stays visible */
    }
  }, [hash]);

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline text-left font-inherit text-fg underline decoration-dotted decoration-fg-dim/50 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent/60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={hash}
    >
      {hash}
      <span
        className={`ml-2 text-fg-dim transition-opacity ${copied ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`}
        aria-live="polite"
      >
        {copied ? <Tr k="log.copied" /> : <Tr k="log.copyHash" />}
      </span>
    </button>
  );
}
