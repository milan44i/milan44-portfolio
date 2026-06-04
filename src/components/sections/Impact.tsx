import { metrics } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Impact() {
  return (
    <section className="shell py-12">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.05}>
            <div className="h-full bg-bg-elev p-5">
              <div className="font-display text-3xl font-bold tracking-tight text-accent sm:text-4xl">
                {m.value}
              </div>
              <div className="mt-2 text-sm leading-snug text-text">{m.label}</div>
              {m.note && <div className="mono mt-1 text-[10px] text-text-faint">{m.note}</div>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
