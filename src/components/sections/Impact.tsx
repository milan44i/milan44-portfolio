import { Fragment } from "react";
import { metricGroups } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

// ONE grid, not two side by side. Two independent grids let each half size its
// own rows, so a three-line label on the left pushed that half's dividers and
// number baselines out of step with the right and the seam read as two tables.
// A single grid shares its row tracks, so every divider runs the full width and
// all four numbers in a row sit on one baseline.
//
// DOM order stays group-sequential (header, its four cells, next header, its
// four) so the mobile stack reads correctly; at lg each cell is placed
// explicitly into its column and row. The class strings are literal because
// Tailwind scans source text and cannot see computed names.
const CELL_POS = [
  ["lg:col-start-1 lg:row-start-2", "lg:col-start-2 lg:row-start-2", "lg:col-start-1 lg:row-start-3", "lg:col-start-2 lg:row-start-3"],
  ["lg:col-start-3 lg:row-start-2", "lg:col-start-4 lg:row-start-2", "lg:col-start-3 lg:row-start-3", "lg:col-start-4 lg:row-start-3"],
];

const HEADER_POS = [
  "lg:col-start-1 lg:row-start-1 lg:col-span-2",
  "lg:col-start-3 lg:row-start-1 lg:col-span-2",
];

export function Impact() {
  return (
    <section aria-labelledby="proof-title" className="shell py-12">
      <h2 id="proof-title" className="sr-only">
        By the numbers
      </h2>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line lg:grid-cols-4">
        {metricGroups.map((group, g) => (
          <Fragment key={group.label}>
            <div className={`col-span-2 bg-bg-elev px-5 pt-4 pb-2 ${HEADER_POS[g]}`}>
              <p className="eyebrow">{group.label}</p>
            </div>
            {group.metrics.map((m, i) => (
              <Reveal key={m.label} delay={(g * 4 + i) * 0.05} className={CELL_POS[g][i]}>
                {/* the grid row sizes every cell to its tallest sibling; nothing gets clipped */}
                <div className="flex h-full min-h-[7.5rem] flex-col bg-bg-elev p-4 sm:min-h-[8.5rem] sm:p-5">
                  <div className="font-display text-3xl font-bold leading-none tracking-tight text-accent sm:text-4xl">
                    {m.value}
                  </div>
                  <div className="mt-2.5 text-sm leading-snug text-text">{m.label}</div>
                  {m.note && (
                    <div className="mono mt-auto pt-3 text-[10px] leading-snug text-text-faint">{m.note}</div>
                  )}
                </div>
              </Reveal>
            ))}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
