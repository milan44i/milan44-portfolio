import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { aiEdge } from "@/lib/content";
import { site } from "@/lib/site";

const repoFiles = [
  { path: "hooks/ts-typecheck.sh", note: "self-healing TS: re-wakes the model with compiler output" },
  { path: "hooks/precompact.py", note: "captures git + test state before context loss" },
  { path: "scripts/context-monitor.py", note: "context-usage + budget statusline" },
  { path: "memory/MEMORY.md", note: "typed, cross-linked memory system" },
  { path: "skills/fix-pr-comments", note: "classifies review comments: bug vs. preference" },
];

export function AIEdge() {
  return (
    <Section id="ai" index="02" title="The AI edge" kicker="proof, not buzzwords">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div>
          <Reveal>
            <p className="max-w-xl text-lg leading-relaxed text-text">{aiEdge.lede}</p>
          </Reveal>

          <div className="mt-9 grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2">
            {aiEdge.capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="h-full bg-bg-elev p-5">
                  <h3 className="mono text-sm text-accent">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-dim">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* terminal-style proof panel = the claude-setup repo */}
        <Reveal delay={0.1}>
          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
              <span className="mono ml-2 text-[11px] text-text-faint">milan44i/claude-setup — main</span>
            </div>
            <div className="p-5">
              <div className="mono mb-4 text-[12px] text-text-dim">
                <span className="accent">$</span> tree --workflow
              </div>
              <ul className="space-y-3">
                {repoFiles.map((f) => (
                  <li key={f.path} className="mono text-[12px] leading-snug">
                    <span className="text-text">
                      <span className="text-accent">▸</span> {f.path}
                    </span>
                    <div className="pl-4 text-text-faint">{f.note}</div>
                  </li>
                ))}
              </ul>
              <a
                href={site.links.claudeSetup}
                target="_blank"
                rel="noreferrer"
                className="btn mt-6 w-full justify-center"
              >
                Browse the repo on GitHub ↗
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
