"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// Lenis smooth scroll on the window, skipped entirely when the user prefers
// reduced motion (native scroll + CSS scroll-behavior:auto takes over). Renders
// nothing, so toggling the preference never remounts the page tree.
export function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.1, duration: 1.1, anchors: true, autoRaf: true });
    return () => lenis.destroy();
  }, [reduce]);

  return null;
}
