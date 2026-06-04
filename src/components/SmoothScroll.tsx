"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

// Lenis smooth scroll, disabled entirely when the user prefers reduced motion
// (native scroll + CSS scroll-behavior:auto takes over in that case).
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.1, anchors: true }}>
      {children}
    </ReactLenis>
  );
}
