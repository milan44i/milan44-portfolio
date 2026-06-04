import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ProofPanel } from "@/components/sections/ProofPanel";
import { aiEdge } from "@/lib/content";

export function AIEdge() {
  return (
    <Section id="ai" index="02" title="The AI edge" kicker="proof, not buzzwords">
      <div className="grid gap-10 md:grid-cols-[1fr_1.05fr] md:gap-12 lg:gap-14">
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
        <ProofPanel />
      </div>
    </Section>
  );
}
