import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { caseStudyList } from "@/lib/case-studies";

export function CaseStudyShell({ study }: { study: CaseStudy }) {
  const other = caseStudyList.find((c) => c.slug !== study.slug);

  return (
    <main className="pt-28">
      <article className="shell">
        <Link href="/#work" className="mono text-xs text-text-dim transition-colors hover:text-accent">
          ← back to work
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="mono text-xs text-accent">{study.kind}</p>
          <h1 className="font-display display-lg mt-4 font-bold tracking-tight text-balance">{study.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-text-dim">{study.intro}</p>
        </header>

        {/* metrics */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line lg:grid-cols-4">
          {study.metrics.map((m) => (
            <div key={m.label} className="bg-bg-elev p-5">
              <div className="font-display text-3xl font-bold tracking-tight text-accent">{m.value}</div>
              <div className="mt-2 text-sm leading-snug text-text-dim">{m.label}</div>
            </div>
          ))}
        </div>

        {/* product shots */}
        {study.gallery && (
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {study.gallery.map((img, i) => (
              <Reveal
                key={img.src}
                as="li"
                delay={i * 0.07}
                className="card flex h-full flex-col overflow-hidden"
              >
                {/* flex-1 centers shorter images (the Victory Card) so captions align along the bottom */}
                <div className="flex min-h-0 flex-1 items-center">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="w-full"
                    priority={i === 0}
                  />
                </div>
                <p className="mono mt-auto border-t border-line p-4 text-[11px] leading-relaxed text-text-dim">
                  {img.caption}
                </p>
              </Reveal>
            ))}
          </ul>
        )}

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
          {/* body */}
          <div className="max-w-2xl">
            {study.blocks.map((block, i) => (
              <Reveal key={block.heading} delay={i * 0.03}>
                <section className="mb-12">
                  <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    {block.heading}
                  </h2>
                  {block.body?.map((p, j) => (
                    <p key={j} className="mt-4 text-base leading-relaxed text-text-dim">
                      {p}
                    </p>
                  ))}
                  {block.bullets && (
                    <ul className="mt-4 space-y-3">
                      {block.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-base leading-relaxed text-text">
                          <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          {/* meta sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <p className="eyebrow mb-3">Role</p>
              <p className="text-sm leading-relaxed text-text-dim">{study.role}</p>
              <p className="mono mt-2 text-[11px] text-text-faint">{study.period}</p>

              <p className="eyebrow mb-3 mt-6">Stack</p>
              <ul className="flex flex-wrap gap-1.5">
                {study.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>

              <p className="eyebrow mb-3 mt-6">Links</p>
              <ul className="space-y-2">
                {study.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link mono text-xs"
                    >
                      {l.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* footer nav */}
        <nav className="hairline mt-8 flex flex-col gap-4 border-t border-line py-10 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/#work" className="link mono text-sm">
            ← All work
          </Link>
          {other && (
            <Link href={`/work/${other.slug}`} className="link mono text-sm sm:text-right">
              Next: {other.title} →
            </Link>
          )}
        </nav>
      </article>
    </main>
  );
}
