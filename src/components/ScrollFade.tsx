"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Horizontal scroller that marks itself with data-more while there is content
// past its right edge; the CSS fades that edge so the cut reads as "scrolls".
export function ScrollFade({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => el.toggleAttribute("data-more", el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    update();
    el.addEventListener("scroll", update, { passive: true });
    // the content is observed too: a late font swap changes its width, not the box's
    const observer = new ResizeObserver(update);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={className ? `scroll-fade ${className}` : "scroll-fade"}>
      {children}
    </div>
  );
}
