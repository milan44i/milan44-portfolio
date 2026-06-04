"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";

const repoFiles = [
  { path: "hooks/ts-typecheck.sh", note: "self-healing TS: re-wakes the model with compiler output" },
  { path: "hooks/precompact.py", note: "captures git + test state before context loss" },
  { path: "scripts/context-monitor.py", note: "context-usage + budget statusline" },
  { path: "memory/MEMORY.md", note: "typed, cross-linked memory system" },
  { path: "skills/fix-pr-comments", note: "classifies review comments: bug vs. preference" },
];

// The claude-setup repo, rendered as a live terminal — the section's signature
// "proof, not buzzwords" element. Subtle motion makes it feel alive, not inert.
export function ProofPanel() {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
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
            milan44i/claude-setup — main
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
            <span className="accent">$</span> tree --workflow
            <span className="cursor-blink ml-1 text-accent">▌</span>
          </div>

          <ul className="space-y-3">
            {repoFiles.map((f, i) => (
              <motion.li
                key={f.path}
                className="mono text-[12px] leading-snug"
                initial={reduce ? false : { opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-text">
                  <span className="text-accent">▸</span> {f.path}
                </span>
                <div className="pl-4 text-text-faint">{f.note}</div>
              </motion.li>
            ))}
          </ul>

          <a
            href={site.links.claudeSetup}
            target="_blank"
            rel="noreferrer"
            className="btn mt-6 w-full justify-center"
          >
            Browse the repo on GitHub ↗
          </a>
        </div>
      </motion.div>
    </div>
  );
}
