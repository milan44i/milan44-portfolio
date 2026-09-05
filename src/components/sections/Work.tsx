import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { lanes, type LaneCase } from "@/lib/lanes";

// Four beats in a fixed order, so the six cases can be compared down the column
// rather than read one at a time.
const beats: { key: keyof Pick<LaneCase, "problem" | "built" | "ai" | "result">; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "built", label: "What I built" },
  { key: "ai", label: "The AI's role" },
  { key: "result", label: "Result" },
];

const alsoShipped = [
  {
    name: "SiteScore",
    host: "sitescore.pages.dev",
    href: "https://sitescore.pages.dev",
    blurb:
      "An on-page SEO auditor on Cloudflare's edge: 25+ checks across 7 analyzers, PageSpeed Insights, shareable reports and an embeddable widget.",
  },
  {
    name: "claude-setup",
    host: "github.com/milan44i",
    href: "https://github.com/milan44i/claude-setup",
    blurb:
      "The AI workflow itself, published: self-healing hooks that feed compiler output back to the model, pre-compaction context capture, and a typed memory system.",
  },
];

function CaseCard({ c }: { c: LaneCase }) {
  return (
    <article className="card flex h-full flex-col p-6">
      <p className="mono text-[11px] text-accent">{c.kicker}</p>
      <h3 className="font-display mt-2 text-xl font-semibold tracking-tight">{c.title}</h3>
      <dl className="mt-5 space-y-3.5">
        {beats.map((b) => (
          <div key={b.key}>
            <dt className="mono text-[10px] uppercase tracking-[0.14em] text-text-faint">{b.label}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-text-dim">{c[b.key]}</dd>
          </div>
        ))}
      </dl>
      {c.href && (
        <div className="mt-auto border-t border-line pt-4">
          <Link href={c.href} className="link mono text-xs">
            {c.hrefLabel ?? "Read more"} →
          </Link>
        </div>
      )}
    </article>
  );
}

export function Work() {
  return (
    <Section id="work" index="01" title="What I build" kicker="two lanes, six systems">
      <Reveal>
        <p className="mb-12 max-w-2xl text-base leading-relaxed text-text-dim">
          Two halves of the same job: interfaces people use, and the systems that build them. Both
          in production, both with numbers.
        </p>
      </Reveal>

      <div className="space-y-14">
        {lanes.map((lane) => (
          <div key={lane.id} id={`lane-${lane.id}`} className="scroll-mt-24">
            <Reveal>
              <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="font-display text-xl font-semibold tracking-tight text-accent">
                  {lane.label}
                </h3>
                <p className="text-sm text-text-dim">{lane.blurb}</p>
              </div>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-3">
              {lane.cases.map((c, i) => (
                <Reveal key={c.id} delay={i * 0.06} className="h-full">
                  <CaseCard c={c} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Demoted, not deleted: GameScore is now a Lane B case, so this row carries
          the two that would otherwise vanish from the site entirely. */}
      <Reveal>
        <div className="hairline mt-14 pt-8">
          <p className="eyebrow mb-5">Also shipped</p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {alsoShipped.map((p) => (
              <li key={p.name}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="card flex h-full flex-col p-5 transition-colors hover:border-line-strong"
                >
                  <p className="font-display text-lg font-semibold tracking-tight">
                    {p.name}
                    <span className="mono ml-2 align-middle text-[11px] font-normal text-text-faint">
                      {p.host} ↗
                    </span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-dim">{p.blurb}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
