import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/PrintButton";
import { site } from "@/lib/site";
import { about, education, experience, projects, skills } from "@/lib/content";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name}, ${site.role} — ${site.tagline}.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main className="pt-28 print:pt-0">
      <div className="shell max-w-3xl">
        {/* controls (screen only) */}
        <div className="mb-10 flex items-center justify-between print:hidden">
          <Link href="/" className="mono text-xs text-text-dim transition-colors hover:text-accent">
            ← back home
          </Link>
          <PrintButton />
        </div>

        <article className="print:text-black">
          {/* header */}
          <header className="border-b border-line pb-6 print:border-black/20">
            <h1 className="font-display text-4xl font-bold tracking-tight">{site.name}</h1>
            <p className="mt-1 text-text-dim print:text-black">
              {site.role} · {site.tagline}
            </p>
            <div className="mono mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-text-dim print:text-black">
              <span>{site.email}</span>
              <span>{site.location}</span>
              <a href={site.url} className="hover:text-accent">{site.url.replace("https://", "")}</a>
              <a href={site.links.github} className="hover:text-accent">github.com/{site.handle}i</a>
              <a href={site.links.linkedin} className="hover:text-accent">linkedin.com/in/{site.handle}</a>
            </div>
          </header>

          {/* profile */}
          <Section heading="Profile">
            <p className="text-sm leading-relaxed text-text-dim print:text-black">{about.paragraphs[0]}</p>
          </Section>

          {/* experience */}
          <Section heading="Experience">
            <div className="space-y-6">
              {experience.map((role) => (
                <div key={role.company}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-semibold text-text print:text-black">
                      {role.title} — {role.company}
                      {role.team ? ` · ${role.team}` : ""}
                    </h3>
                    <span className="mono whitespace-nowrap text-[11px] text-text-faint print:text-black/60">
                      {role.period}
                    </span>
                  </div>
                  {role.summary && (
                    <p className="mt-1 text-sm text-text-dim print:text-black">{role.summary}</p>
                  )}
                  <ul className="mt-2 space-y-1.5">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm leading-snug text-text-dim print:text-black">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent print:bg-black" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mono mt-2 text-[11px] text-text-faint print:text-black/60">{role.stack.join(" · ")}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* projects */}
          <Section heading="Projects">
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.slug}>
                  <h3 className="font-semibold text-text print:text-black">
                    {p.name} <span className="font-normal text-text-faint print:text-black/60">— {p.kind}</span>
                  </h3>
                  <p className="mt-1 text-sm text-text-dim print:text-black">{p.blurb}</p>
                  <p className="mono mt-1 text-[11px] text-text-faint print:text-black/60">{p.stack.join(" · ")}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* skills */}
          <Section heading="Skills">
            <dl className="space-y-2">
              {skills.map((g) => (
                <div key={g.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                  <dt className="mono w-40 shrink-0 text-[11px] uppercase tracking-wider text-text-faint print:text-black/60">
                    {g.label}
                  </dt>
                  <dd className="text-sm text-text-dim print:text-black">{g.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* education */}
          <Section heading="Education">
            <ul className="space-y-2">
              {education.map((e) => (
                <li key={e.school} className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-text-dim print:text-black">
                    <span className="font-medium text-text print:text-black">{e.school}</span> — {e.detail}
                  </span>
                  <span className="mono whitespace-nowrap text-[11px] text-text-faint print:text-black/60">{e.period}</span>
                </li>
              ))}
            </ul>
          </Section>
        </article>
      </div>
    </main>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-display mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent print:text-black">
        {heading}
      </h2>
      {children}
    </section>
  );
}
