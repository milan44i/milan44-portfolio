import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

// Honest pointers to published work — no invented article titles.
// Add specific posts here as `{ title, href, date }` once you want to feature them.
const channels = [
  {
    label: "Medium",
    title: "Essays on AI-assisted development & frontend craft",
    body: "Notes on context engineering, agentic workflows, and shipping with Claude Code.",
    href: site.links.medium,
    cta: "Read on Medium",
  },
  {
    label: "Open source",
    title: "claude-setup",
    body: "A modular Claude Code toolkit — self-healing hooks, context capture, typed memory and skills.",
    href: site.links.claudeSetup,
    cta: "View on GitHub",
  },
];

export function Writing() {
  return (
    <Section id="writing" index="04" title="Writing & open source" kicker="how I think out loud">
      <div className="grid gap-5 md:grid-cols-2">
        {channels.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.07}>
            <a
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="card group flex h-full flex-col p-7 transition-transform hover:-translate-y-0.5"
            >
              <div className="mono mb-3 text-xs text-accent">{c.label}</div>
              <h3 className="font-display text-xl font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-dim">{c.body}</p>
              <span className="mono mt-6 text-xs text-text transition-colors group-hover:text-accent">
                {c.cta} ↗
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
