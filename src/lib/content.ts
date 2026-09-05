// All portfolio content lives here. Edit copy in one place; pages render from it.

export type Metric = { value: string; label: string; note?: string };
export type MetricGroup = { label: string; metrics: Metric[] };

// Two halves, four each: the strip has to prove both identities at a glance.
// The pipeline metric is "1 pipeline", not "0 manual steps" — the build path
// still has human judgement in it (design quality is scored by eye, the
// old-site map in sajt-analiza is hand-curated, price lists get transcribed).
export const metricGroups: MetricGroup[] = [
  {
    label: "AI & automation",
    metrics: [
      { value: "210", label: "sites generated and deployed", note: "14 verticals · 177 live" },
      { value: "35", label: "sites built overnight, unattended", note: "22 runs · best night 9 of 9, zero failures" },
      { value: "100k+", label: "board-game titles in GameScore, shipped solo", note: "offline-first PWA · paid Pro tier" },
      { value: "1", label: "pipeline from map listing to live demo site", note: "crawl · audit · generate · deploy · verify" },
    ],
  },
  {
    label: "Frontend",
    metrics: [
      { value: "80%", label: "faster portal load", note: "1.2 min → 14 s" },
      { value: "53%", label: "smaller main bundle", note: "1,834 → 858 kB" },
      { value: "40%", label: "faster builds", note: "18.8 → 11.4 s" },
      { value: "45%", label: "less complexity in a 2,000-line editor", note: "zero regressions" },
    ],
  },
];

// Flat view, for the résumé.
export const metrics: Metric[] = metricGroups.flatMap((g) => g.metrics);

export type Project = {
  slug: string;
  name: string;
  kind: string;
  blurb: string;
  stack: string[];
  href?: string;
  caseStudy?: string;
  featured?: boolean;
  year: string;
};

export const projects: Project[] = [
  {
    slug: "gamescore",
    name: "GameScore",
    kind: "Solo product · gamescore.cards",
    blurb:
      "A production PWA for board-game score-tracking — offline-first, 100,000+ BoardGameGeek titles, and a paid Pro tier with sharable Victory Cards. Designed, built and shipped solo with Claude Code.",
    stack: ["Nuxt 4", "TypeScript", "Pinia", "Dexie / IndexedDB", "Tailwind", "Lemon Squeezy", "Vercel"],
    href: "https://gamescore.cards",
    caseStudy: "/work/gamescore",
    featured: true,
    year: "2026",
  },
  {
    slug: "claude-setup",
    name: "claude-setup",
    kind: "Open source · AI workflow toolkit",
    blurb:
      "A modular Claude Code installation toolkit: a self-healing TypeScript hook that re-wakes the model with compiler output, pre-compaction context capture, a context/budget statusline, and a typed memory system. The 'how' behind the velocity.",
    stack: ["Python", "Shell", "Claude Code", "Hooks", "Skills"],
    href: "https://github.com/milan44i/claude-setup",
    year: "2026",
  },
];

export type Role = {
  company: string;
  team?: string;
  title: string;
  period: string;
  summary?: string;
  stack: string[];
  highlights: string[];
  caseStudy?: string;
  featured?: boolean;
};

export const experience: Role[] = [
  {
    company: "LotusFlare",
    team: "DNO Cloud Portal",
    title: "Frontend Engineer",
    period: "Jun 2025 — Present",
    summary:
      "Own the UIs that let business analysts configure complex data pipelines, reporting and real-time event processing for carrier-grade telecom operators serving millions of subscribers.",
    stack: ["Vue 3", "TypeScript", "Pinia", "Vuex", "Vite", "Tailwind", "Docker", "Kubernetes"],
    caseStudy: "/work/lotusflare",
    featured: true,
    highlights: [
      "Cut portal initial load time by 80% (1.2 min → 14 s) via dynamic imports, route-level splitting and Vite optimizations.",
      "Led the Vue 3 Composition API + Pinia migration; authored reusable composables adopted team-wide.",
      "Architected the team's AI engineering stack — cross-IDE agent rules, a CLAUDE.md context system and custom skills.",
      "Built a multi-file S3 upload system with real-time progress, smart error handling and DLQ recovery.",
      "Architected role-based access control for Reports with permission-driven UI rendering.",
      "Refactored a 2,000+ line SinkConfigEditor into a modular, step-based flow — 45% less complexity, zero regressions.",
      "Established codebase standards and reorganized imports across 500+ files for long-term maintainability.",
    ],
  },
  {
    company: "DEVersity",
    title: "Frontend Engineer, previously Junior Frontend Engineer",
    period: "Apr 2024 — Jun 2025",
    summary:
      "Three products: PointOne, a data-analysis platform; Aktivizam, a social platform; and Romotioncam, a wind-turbine blade inspection platform.",
    stack: ["React", "Next.js", "TypeScript", "Nx", "TanStack Query", "TanStack Table", "Tailwind", "Shadcn"],
    highlights: [
      "PointOne: built an analytics dashboard with interactive charts and a DataTable with filter/sort/inline-edit/selection.",
      "Drove the Redux Toolkit → TanStack Query migration, boosting performance and simplifying the codebase.",
      "Reduced build time 40% and the main bundle 53% via build optimization and route-based code splitting.",
      "Aktivizam: built core UI (feed, filters, forms, tags, event calendar) and admin tools; led the i18n rollout.",
      "Romotioncam: built the Blade Picker UI and core inspection workflows used by field engineers.",
    ],
  },
  {
    company: "Connect The Dots",
    title: "Junior Frontend Engineer, then Frontend Developer (intern)",
    period: "Apr 2023 — Mar 2024",
    summary: "AI relationship-intelligence platform.",
    stack: ["Vue", "TypeScript", "Pinia", "TanStack Query", "Storybook", "Vitest", "Vite"],
    highlights: [
      "Refactored a legacy Vue UI and contributed to modernizing the frontend architecture.",
      "Built reusable components — Table, Input, Accordion, Checkbox and more — pixel-matched to Figma.",
    ],
  },
];

export type AICapability = { title: string; body: string };

export const aiEdge = {
  lede:
    "The interesting question is not how I get a model to write code. It is what I do on the day it is confidently wrong.",
  capabilities: [
    {
      title: "I assume it is lying, then check",
      body: "Every claim my systems make about someone else's business has to cite a dated source or it does not render at all. That rule exists because I measured how often the unchecked version was wrong: 78 messages out of 161.",
    },
    {
      title: "I write evals for taste, not just correctness",
      body: "A generative fleet converges long before it breaks. Eight design axes, a collision rule, and a build gate that fails on a dishonest entry. 211 designs in and it still holds.",
    },
    {
      title: "I decide where the model is not allowed",
      body: "Agents research and build. The path that produces the message a stranger reads is deterministic, and sending is always a human. Knowing where to stop took the longest to learn.",
    },
    {
      title: "Every rule has a failure behind it",
      body: "Nothing in my systems is a precaution. Each gate is dated and names the production incident that produced it, so the next person, or the next model, can see why before removing it.",
    },
  ] as AICapability[],
};

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "HTML5", "CSS3", "SQL"] },
  { label: "Frameworks & UI", items: ["Vue 3", "React", "Next.js", "Nuxt 4", "Node.js", "Tailwind", "SCSS", "Shadcn", "MUI", "Quasar"] },
  { label: "State & Data", items: ["Pinia", "Vuex", "Redux Toolkit", "TanStack Query", "RTK Query"] },
  { label: "Tooling & Infra", items: ["Vite", "Nx", "Storybook", "Vitest", "Git", "Docker", "Kubernetes", "AWS", "Vercel"] },
];

export const education = [
  { school: "University of Belgrade, ETF", detail: "B.Sc. Systems Engineering · GPA 8.75 / 10", period: "2018 — 2022" },
  { school: "Mathematical Grammar School, Belgrade", detail: "GPA 4.7 / 5", period: "2014 — 2018" },
];

export const about = {
  paragraphs: [
    "I'm an AI builder and frontend engineer based in Belgrade, with 4+ years across Vue, React and TypeScript. I care about component architecture, measurable performance, and interfaces that hold up under real-world complexity — like the analyst-facing tooling I own at LotusFlare for carrier-grade telecom operators.",
    "For the past year I have been building AI systems end to end: a pipeline that crawls and audits small-business websites, generates a bespoke replacement for each one and deploys it. 210 built, 177 live. The part I care about is not that the model wrote most of it, it is the gates that catch it when it is wrong.",
  ],
};
