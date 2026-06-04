import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { about, education, skills } from "@/lib/content";

export function About() {
  return (
    <Section id="about" index="03" title="About" kicker="Belgrade · open to remote">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="mb-5 text-base leading-relaxed text-text-dim sm:text-lg [&>span]:text-text">
                {p}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="mt-8 border-t border-line pt-6">
              <p className="eyebrow mb-4">Education</p>
              <ul className="space-y-3">
                {education.map((e) => (
                  <li key={e.school} className="flex items-baseline justify-between gap-4">
                    <div>
                      <div className="text-sm text-text">{e.school}</div>
                      <div className="text-sm text-text-dim">{e.detail}</div>
                    </div>
                    <span className="mono whitespace-nowrap text-[11px] text-text-faint">{e.period}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div>
          <p className="eyebrow mb-5">Stack</p>
          <div className="space-y-6">
            {skills.map((group, i) => (
              <Reveal key={group.label} delay={i * 0.06}>
                <div>
                  <div className="mono mb-2 text-[11px] text-text-faint">{group.label}</div>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
