import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { experience, projects } from "@/lib/content";

const flagship = projects.find((p) => p.featured)!;

export function Work() {
  return (
    <Section id="work" index="01" title="Selected work" kicker="flagship + recent roles">
      {/* Flagship — GameScore */}
      <Reveal>
        <article className="card group mb-6 overflow-hidden p-7 sm:p-10">
          <div className="pointer-events-none absolute right-4 top-2 select-none font-display text-[7rem] font-extrabold leading-none text-line-strong/40 sm:text-[10rem]">
            01
          </div>
          <div className="relative">
            <div className="mono mb-3 text-xs text-accent">{flagship.kind}</div>
            <h3 className="font-display display-md font-bold tracking-tight">{flagship.name}</h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-dim">{flagship.blurb}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {flagship.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={flagship.caseStudy!} className="btn btn-primary">
                Read case study →
              </Link>
              <a href={flagship.href} target="_blank" rel="noreferrer" className="btn">
                Visit {flagship.href!.replace("https://", "")} ↗
              </a>
            </div>
          </div>
        </article>
      </Reveal>

      {/* Roles */}
      <div className="grid gap-5 md:grid-cols-2">
        {experience.map((role, i) => (
          <Reveal key={role.company} delay={i * 0.06}>
            <article className="card flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {role.company}
                    {role.team && <span className="text-text-faint"> · {role.team}</span>}
                  </h3>
                  <p className="mt-0.5 text-sm text-text-dim">{role.title}</p>
                </div>
                <span className="mono whitespace-nowrap text-[11px] text-text-faint">{role.period}</span>
              </div>

              {role.summary && <p className="mt-4 text-sm leading-relaxed text-text-dim">{role.summary}</p>}

              <ul className="mt-4 space-y-2">
                {role.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="flex gap-2.5 text-sm leading-snug text-text">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {role.stack.slice(0, 6).map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>

              {role.caseStudy && (
                <div className="mt-6 border-t border-line pt-4">
                  <Link href={role.caseStudy} className="link mono text-xs">
                    Read the deep dive →
                  </Link>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
