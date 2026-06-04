"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

// A fixed statusline that nods to claude-setup's context-monitor. The "ctx" bar
// fills with scroll progress — a small, on-brand, evidence-bearing detail.
const BARS = 7;

export function Statusline() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const filled = Math.round(progress * BARS);
  const pct = Math.round(progress * 100);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 hidden h-7 items-center justify-between gap-4 px-4 print:!hidden sm:flex"
      style={{
        background: "rgba(8,9,11,0.82)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid var(--line)",
      }}
      aria-hidden="true"
    >
      <div className="mono flex items-center gap-4 text-[11px] text-text-dim">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
          <span className="text-text">{site.handle}</span>@dev
        </span>
        <span className="hidden md:inline text-text-faint">~/portfolio</span>
        <span className="hidden md:inline">
          <span className="text-text-faint">git:</span>
          <span className="text-text">main</span> <span className="accent">✓</span>
        </span>
      </div>

      <div className="mono flex items-center gap-4 text-[11px] text-text-dim">
        <span className="flex items-center gap-1.5" title="page read progress">
          ctx{" "}
          <span className="tracking-tighter" style={{ color: "var(--accent)" }}>
            {"▓".repeat(filled)}
            <span className="text-text-faint">{"░".repeat(BARS - filled)}</span>
          </span>{" "}
          <span className="text-text tabular-nums">{pct}%</span>
        </span>
        <span className="hidden md:inline text-text-faint">{site.location} · {site.timezone}</span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
          <span className="text-text">{site.availability.toLowerCase()}</span>
          <span className="cursor-blink text-accent">▌</span>
        </span>
      </div>
    </div>
  );
}
