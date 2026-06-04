import { Reveal } from "@/components/Reveal";

type SectionProps = {
  id?: string;
  index: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
};

export function Section({ id, index, title, kicker, children }: SectionProps) {
  return (
    <section id={id} className="shell scroll-mt-24 py-20 sm:py-28">
      <Reveal>
        <div className="mb-12 flex items-baseline gap-4 border-b border-line pb-5">
          <span className="mono text-xs text-accent">{index}</span>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          {kicker && <span className="mono ml-auto hidden text-xs text-text-faint sm:block">{kicker}</span>}
        </div>
      </Reveal>
      {children}
    </section>
  );
}
