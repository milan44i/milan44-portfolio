"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

// Lazy-load the WebGL field so three.js stays out of the critical path (keeps LCP fast).
// The chunk only downloads once <ParticleField> actually renders — see showCanvas below.
const ParticleField = dynamic(
  () => import("./ParticleField").then((m) => m.ParticleField),
  { ssr: false },
);

const headlineWords = ["I", "build", "interfaces"];

export function Hero() {
  const reduce = useReducedMotion();
  // Desktop-only, idle-time WebGL: mobile and reduced-motion users keep the static
  // gradient fallback, and the ~860KB three.js chunk never competes with first paint.
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    if (reduce || !window.matchMedia("(min-width: 768px)").matches) return;
    if (typeof window.requestIdleCallback !== "function") {
      const t = window.setTimeout(() => setIdle(true), 1200);
      return () => window.clearTimeout(t);
    }
    const id = window.requestIdleCallback(() => setIdle(true), { timeout: 2500 });
    return () => window.cancelIdleCallback(id);
  }, [reduce]);

  const sectionRef = useRef<HTMLElement>(null);
  const showCanvas = idle && !reduce;

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* static atmospheric fallback - always rendered, sits behind the canvas */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 12%, rgba(198,242,78,0.10), transparent 55%), radial-gradient(80% 70% at 12% 95%, rgba(126,240,208,0.06), transparent 60%)",
        }}
      />
      {showCanvas && <ParticleField eventSource={sectionRef} />}

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
          <span className="accent">●</span> {site.name}
          <span className="text-text-faint">/</span> {site.city}
          <span className="text-text-faint">/</span> {site.role}
        </motion.p>

        <h1 className="font-display display-xl max-w-[16ch] font-extrabold text-balance">
          <span className="sr-only">
            I build interfaces and the AI that builds them.
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
              and the <span className="accent">AI</span> that builds them.
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-base leading-relaxed text-text-dim sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Frontend engineer at <span className="text-text">LotusFlare</span>, on carrier-grade
          telecom tooling. On my own time, a pipeline that crawls, audits, generates and deploys
          small-business websites: <span className="text-text">210 built</span>,{" "}
          <span className="text-text">177 live</span>, no two alike.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          {/* both identities carry equal weight - neither outranks the other */}
          <a href="#lane-ai" className="btn btn-primary">
            AI systems →
          </a>
          <a href="#lane-frontend" className="btn btn-primary">
            Frontend work →
          </a>
          <Link href="/resume" className="btn btn-secondary">
            Résumé
          </Link>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="mono absolute bottom-10 left-1/2 hidden -translate-x-1/2 text-[11px] text-text-faint sm:block">
        scroll ↓
      </div>
    </section>
  );
}
