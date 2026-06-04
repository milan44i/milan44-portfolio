import Link from "next/link";
import { nav, site } from "@/lib/site";

const social = [
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "Medium", href: site.links.medium },
  { label: "Email", href: site.links.email },
];

export function Footer() {
  return (
    <footer className="hairline mt-32 pb-16 sm:pb-20">
      <div className="shell pt-16">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-md">
            <p className="eyebrow mb-4">Let&apos;s talk</p>
            <a
              href={site.links.email}
              className="font-display display-md block leading-none text-text transition-colors hover:text-accent"
            >
              {site.email}
            </a>
            <p className="mt-5 text-sm text-text-dim">
              {site.availability} · frontend roles · {site.location} ({site.timezone})
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <nav aria-label="Footer">
              <p className="eyebrow mb-4">Index</p>
              <ul className="space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-sm text-text-dim transition-colors hover:text-text">
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link href="/resume" className="text-sm text-text-dim transition-colors hover:text-text">
                    Resume
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <p className="eyebrow mb-4">Elsewhere</p>
              <ul className="space-y-2.5">
                {social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                      className="text-sm text-text-dim transition-colors hover:text-text"
                    >
                      {s.label} <span className="text-text-faint">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mono mt-16 flex flex-col gap-2 text-[11px] text-text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {site.name} — built with Next.js, R3F &amp; a{" "}
            <a href={site.links.claudeSetup} target="_blank" rel="noreferrer" className="text-text-dim hover:text-accent">
              Claude Code workflow
            </a>
            .
          </span>
          <span>{site.url.replace("https://", "")}</span>
        </div>
      </div>
    </footer>
  );
}
