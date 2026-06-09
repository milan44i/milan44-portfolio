"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

// Lazy-load the WebGL field so three.js stays out of the critical path (keeps LCP fast).
const ParticleField = dynamic(
  () => import("./ParticleField").then((m) => m.ParticleField),
  { ssr: false },
);

// Cheap, static, zero-network starfield for low-power devices, reduced-motion users,
// and the brief window before the canvas inits. Pure CSS: a few tiled radial-gradients
// (one dim dot per tile, varied sizes/offsets so it doesn't read as a grid) over the
// hero's accent wash. Composites once on the GPU — no DOM nodes, no animation loop.
const STARFIELD_BG =
  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.09) 0 1px, transparent 1.7px) 0 0 / 92px 92px," +
  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0 1px, transparent 1.7px) 37px 53px / 143px 143px," +
  "radial-gradient(circle at 50% 50%, rgba(198,242,78,0.07) 0 1px, transparent 1.7px) 71px 19px / 197px 197px," +
  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0 1px, transparent 1.7px) 113px 91px / 263px 263px";

// Chromium-only navigator fields, declared structurally so we can feature-detect them
// without `any`. Undefined on Safari/Firefox — callers default them to "capable".
type CapabilityNavigator = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

// Whether to run the animated WebGL field. Desktop is fine; this guards the mid-tier
// phones where three.js parse/exec hurts TBT. Missing APIs default high (?? 8) so a
// device is never demoted to the static fallback just because it doesn't report.
function shouldRenderCanvas(): boolean {
  if (typeof window === "undefined") return false;
  const nav = navigator as CapabilityNavigator;
  const matches = (q: string) => window.matchMedia?.(q).matches ?? false;

  if (matches("(prefers-reduced-motion: reduce)")) return false;
  if (nav.connection?.saveData === true) return false;
  if ((navigator.hardwareConcurrency ?? 8) < 4) return false;
  if ((nav.deviceMemory ?? 8) < 4) return false;
  if (matches("(pointer: coarse)") && window.innerWidth <= 640) return false;
  return true;
}

// Defer until the main thread is idle (after first paint) so three.js init lands past
// LCP and outside the early TBT window. iOS/Safari lack rIC → short-timeout fallback.
// Returns a cancel fn for effect cleanup.
function onIdle(run: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(run, { timeout: 2000 });
    return () => window.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(run, 200);
  return () => window.clearTimeout(id);
}

const headlineWords = ["I", "build", "fast,", "scalable", "interfaces", "—"];

export function Hero() {
  const reduce = useReducedMotion();
  const [canvasReady, setCanvasReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!shouldRenderCanvas()) return; // low-power / reduced-motion → keep the static starfield
    return onIdle(() => setCanvasReady(true)); // defer three.js init until after first paint
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* static atmospheric fallback — always rendered, sits behind the canvas */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 12%, rgba(198,242,78,0.10), transparent 55%), radial-gradient(80% 70% at 12% 95%, rgba(126,240,208,0.06), transparent 60%)",
        }}
      />
      {canvasReady ? (
        <ParticleField eventSource={sectionRef} />
      ) : (
        // static starfield for low-power/reduced-motion devices + the brief pre-init window
        <div aria-hidden className="absolute inset-0" style={{ background: STARFIELD_BG }} />
      )}

      {/* readability vignette over the field */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(75% 60% at 35% 45%, rgba(8,9,11,0.55), transparent 70%)" }}
      />

      <div className="shell relative w-full pt-24">
        <motion.p
          className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-1"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="accent">●</span> {site.role}
          <span className="text-text-faint">/</span> {site.location}
          <span className="text-text-faint">/</span> {site.availability}
        </motion.p>

        <h1 className="font-display display-xl max-w-[16ch] font-extrabold text-balance">
          <span className="sr-only">
            I build fast, scalable interfaces — and the AI workflow that ships them.
          </span>
          <span aria-hidden className="flex flex-wrap gap-x-[0.28em]">
            {headlineWords.map((w, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={reduce ? false : { opacity: 0, y: "0.5em" }}
                animate={reduce ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              aria-hidden
              className="inline-block"
              initial={reduce ? false : { opacity: 0, y: "0.5em" }}
              animate={reduce ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + headlineWords.length * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              and the <span className="accent">AI workflow</span> that ships them.
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-text-dim sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          3+ years across Vue, React &amp; TypeScript. I shipped{" "}
          <span className="text-text">GameScore</span>{" "} solo, cut a carrier-grade telecom portal&apos;s
          load time by <span className="text-text">80%</span>, and engineered the AI-assisted workflow
          behind the work.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          <a href="#work" className="btn btn-primary">
            View work →
          </a>
          <a href="#ai" className="btn">
            The AI edge
          </a>
          <a href={site.links.github} target="_blank" rel="noreferrer" className="btn">
            GitHub ↗
          </a>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="mono absolute bottom-10 left-1/2 hidden -translate-x-1/2 text-[11px] text-text-faint sm:block">
        scroll ↓
      </div>
    </section>
  );
}
