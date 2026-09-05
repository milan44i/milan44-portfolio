"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
};

// Scroll-triggered reveal. The content is in the server HTML and the hiding and
// the animation live in CSS (.reveal in globals.css), gated on scripting and
// motion preference, so JS-off and reduced-motion users see everything at once.
export function Reveal({ children, delay = 0, y = 18, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        el.dataset.in = "";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";
  const style = { "--delay": `${delay}s`, "--y": `${y}px` } as CSSProperties;

  return (
    <Tag ref={ref} className={className ? `reveal ${className}` : "reveal"} style={style}>
      {children}
    </Tag>
  );
}
