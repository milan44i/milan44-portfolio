import { Reveal } from "@/components/Reveal";

// Nothing else on the page carries a date, so a visitor cannot tell whether the
// site describes this year or last. This is the cheapest fix for that.
const rows = [
  {
    year: "2026",
    title: "Independent AI builder",
    detail: "The site-generation pipeline, the site auditor, GameScore, SiteScore",
  },
  {
    year: "2025",
    title: "LotusFlare - Frontend Engineer",
    detail: "DNO Cloud Portal, Data Hub",
  },
  {
    year: "2024",
    title: "DEVersity - Frontend Engineer",
    detail: "PointOne, Aktivizam, Romotioncam",
  },
  {
    year: "2023",
    title: "Connect The Dots - Junior Frontend Engineer",
    detail: "AI relationship-intelligence platform",
  },
  {
    year: "2022",
    title: "B.Sc. Systems Engineering",
    detail: "University of Belgrade, School of Electrical Engineering",
  },
];

export function Timeline() {
  return (
    <section className="shell py-16 sm:py-20">
      <Reveal>
        <p className="eyebrow mb-7">Timeline</p>
      </Reveal>
      <ol className="border-t border-line">
        {rows.map((r, i) => (
          <Reveal key={r.year} as="li" delay={i * 0.05}>
            <div className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:gap-6">
              <span className="mono w-14 shrink-0 text-xs text-accent">{r.year}</span>
              <span className="font-display text-base font-semibold tracking-tight">{r.title}</span>
              <span className="text-sm text-text-dim sm:ml-auto sm:text-right">{r.detail}</span>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
