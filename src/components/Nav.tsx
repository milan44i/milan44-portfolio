"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? "rgba(8,9,11,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="shell flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2" aria-label="Home">
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
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="mono text-xs text-text-dim transition-colors hover:text-accent">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/resume" className="btn hidden sm:inline-flex">
            Résumé
          </Link>
          <a href={site.links.email} className="btn btn-primary">
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
