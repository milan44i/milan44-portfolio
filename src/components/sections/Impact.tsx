import { metricGroups } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Impact() {
  return (
    <section className="shell py-12">
      <div className="grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line lg:grid-cols-2">
        {metricGroups.map((group, gi) => (
          <div key={group.label} className="grid grid-cols-2 gap-px bg-line">
            <div className="col-span-2 bg-bg-elev px-5 pt-4 pb-1">
              <p className="eyebrow">{group.label}</p>
            </div>
            {group.metrics.map((m, i) => (
              <Reveal key={m.label} delay={(gi * 4 + i) * 0.05}>
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
        ))}
      </div>
    </section>
  );
}
