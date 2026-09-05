"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { nav, site } from "@/lib/site";

// Derive the section id a nav href points at, e.g. "/#work" -> "work".
const sectionId = (href: string) => href.split("#")[1] ?? "";

const rise = (delay: number, y = "12px") => ({ "--delay": `${delay}s`, "--y": y }) as CSSProperties;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav item for the section crossing the upper third.
  useEffect(() => {
    const ids = [...nav.map((n) => sectionId(n.href)), "contact"].filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock background scroll + allow Escape to close the mobile menu.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled || open ? "rgba(8,9,11,0.72)" : "transparent",
        backdropFilter: scrolled || open ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="shell flex h-16 items-center justify-between">
        {/* the accessible name has to contain the visible text ("milan44.dev") */}
        <Link href="/" className="group flex min-h-11 items-center gap-2" aria-label="milan44.dev, home">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }}
          />
          <span className="mono text-sm tracking-tight text-text">
            {site.handle}
            <span className="text-text-faint">.dev</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const isActive = active === sectionId(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className="mono hit relative text-xs transition-colors"
                style={{ color: isActive ? "var(--accent)" : "var(--text-dim)" }}
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300"
                  style={{ width: isActive ? "100%" : "0%" }}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/resume" className="btn btn-secondary hidden sm:inline-flex">
            Resume
          </Link>
          <a href={site.links.email} className="btn btn-primary">
            Contact
          </a>

          {/* mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative grid h-11 w-11 place-items-center rounded-lg border border-line-strong md:hidden"
          >
            <span className="relative block h-[10px] w-5">
              <span
                className="absolute left-0 block h-px w-5 bg-text transition-all duration-300"
                style={{ top: open ? "5px" : "0px", transform: open ? "rotate(45deg)" : "none" }}
              />
              <span
                className="absolute bottom-0 left-0 block h-px w-5 bg-text transition-all duration-300"
                style={{ bottom: open ? "4px" : "0px", transform: open ? "rotate(-45deg)" : "none" }}
              />
            </span>
          </button>
        </div>
      </div>
    </header>

    {/* mobile overlay menu - sibling of <header> so its fixed positioning
        references the viewport, not the header's backdrop-filter containing block */}
    {open && (
      <div
        id="mobile-menu"
        className="rise fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain md:hidden"
        style={{ background: "rgba(8,9,11,0.97)", backdropFilter: "blur(16px)", ...rise(0, "0px") }}
      >
        <nav className="shell flex flex-col gap-1 pt-10" aria-label="Mobile">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rise font-display flex items-baseline gap-4 border-b border-line py-5 text-3xl font-semibold tracking-tight text-text"
              style={rise(0.05 + i * 0.06)}
            >
              <span className="mono text-xs text-accent">0{i + 1}</span>
              {item.label}
            </a>
          ))}

          <div className="rise mt-8 flex flex-col gap-3" style={rise(0.05 + nav.length * 0.06, "10px")}>
            <a href={site.links.email} onClick={() => setOpen(false)} className="btn btn-primary w-full justify-center">
              {site.email} →
            </a>
            <Link href="/resume" onClick={() => setOpen(false)} className="btn btn-secondary w-full justify-center">
              Resume
            </Link>
            <div className="mono mt-2 flex items-center justify-center gap-4 text-[11px] text-text-faint">
              <a href={site.links.github} target="_blank" rel="noreferrer" className="hit hover:text-accent">GitHub ↗</a>
              <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="hit hover:text-accent">LinkedIn ↗</a>
              <a href={site.links.medium} target="_blank" rel="noreferrer" className="hit hover:text-accent">Medium ↗</a>
            </div>
          </div>
        </nav>
      </div>
    )}
    </>
  );
}
