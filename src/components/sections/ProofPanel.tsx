"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";

// One real evening in the fleet. Every line is something that happened, not a
// mock: the two spawns, the five-round gate, the annotated board, the 02:00
// autopilot run and the dated learnings entry.
const transcript: { kind: string; target: string; detail: string }[] = [
  { kind: "spawn", target: "potpis-landing", detail: "ship · local-only · brief: 8 items" },
  { kind: "spawn", target: "potpis-review-3", detail: "ship · effort max · 7 axes" },
  { kind: "gate", target: "restaurant-engine", detail: "review ×5 → test → docs → lint → push → PR #160 merged" },
  { kind: "board", target: "potpis-logo", detail: "12 annotations → 12 fixes → redeploy" },
  { kind: "02:00", target: "autopilot", detail: "picked 6 · built 6 · verified 6 · 0 failures" },
  { kind: "memory", target: "learnings.md", detail: "+1 entry, dated, with evidence" },
];

export function ProofPanel() {
  const reduce = useReducedMotion();

  return (
    <div className="relative min-w-0">
      {/* soft lime bloom behind the panel, fades in on view */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={reduce ? {} : { opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1.4, delay: 0.2 }}
        style={{
          background: "radial-gradient(58% 50% at 50% 32%, rgba(198,242,78,0.16), transparent 70%)",
          filter: "blur(22px)",
        }}
      />

      <motion.div
        className="card overflow-hidden"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="mono ml-2 flex items-center gap-2 text-[11px] text-text-faint">
            one evening in the fleet
            <motion.span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
              animate={reduce ? {} : { opacity: [1, 0.25, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ boxShadow: "0 0 6px var(--accent)" }}
            />
          </span>
        </div>

        <div className="p-5">
          <div className="mono mb-4 text-[12px] text-text-dim">
            <span className="accent">$</span> fleet status --tail
            <span className="cursor-blink ml-1 text-accent">▌</span>
          </div>

          {/* the transcript scrolls inside its own box; the page never does */}
          <div className="-mx-1 overflow-x-auto px-1 pb-1">
            <ul className="min-w-max space-y-2.5">
              {transcript.map((line, i) => (
                <motion.li
                  key={line.target + line.kind}
                  className="mono flex gap-3 whitespace-nowrap text-[12px] leading-snug"
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="w-14 shrink-0 text-accent">{line.kind}</span>
                  <span className="w-40 shrink-0 text-text">{line.target}</span>
                  <span className="text-text-faint">{line.detail}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <p className="mt-5 text-[12px] leading-relaxed text-text-faint">
            A supervising agent, many workers. Each gets a written brief and its own copy of the
            repo; only green work merges, and it brings me decisions rather than progress.
          </p>

          <a
            href={site.links.claudeSetup}
            target="_blank"
            rel="noreferrer"
            className="link mono mt-4 inline-block text-[11px]"
          >
            The setup behind it, on GitHub ↗
          </a>
        </div>
      </motion.div>
    </div>
  );
}
