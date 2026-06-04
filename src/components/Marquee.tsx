import { skills } from "@/lib/content";

const items = [
  "Vue 3",
  "React",
  "TypeScript",
  "Next.js",
  "Nuxt 3",
  "Performance",
  "Pinia",
  "TanStack Query",
  "Tailwind",
  "Claude Code",
  "Context engineering",
  "Vite",
  "Cloudflare Workers",
  "Agentic workflows",
  ...skills.flatMap((g) => g.items),
];

export function Marquee() {
  const sep = (
    <span aria-hidden className="px-6 text-accent">
      ◆
    </span>
  );
  const row = (
    <div className="marquee-track flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span className="mono text-sm text-text-dim">{it}</span>
          {sep}
        </span>
      ))}
    </div>
  );

  return (
    <div className="hairline border-b border-line py-5" aria-hidden>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {row}
        {row}
      </div>
    </div>
  );
}
