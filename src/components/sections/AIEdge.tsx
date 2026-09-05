import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ProofPanel } from "@/components/sections/ProofPanel";
import { aiEdge } from "@/lib/content";

export function AIEdge() {
  return (
    <Section id="ai" index="02" title="How I work with AI" kicker="what I do when it is wrong">
      {/* lede beside the transcript, then the cards full width underneath:
          six of them in the old narrow left column were unreadable */}
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-12 lg:gap-14">
        <Reveal>
          <p className="max-w-xl text-lg leading-relaxed text-text">{aiEdge.lede}</p>
        </Reveal>
        <ProofPanel />
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {aiEdge.capabilities.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <div className="h-full bg-bg-elev p-5">
              <h3 className="mono text-sm text-accent">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-dim">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
