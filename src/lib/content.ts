// All portfolio content lives here. Edit copy in one place; pages render from it.

export type Metric = { value: string; label: string; note?: string };

export const metrics: Metric[] = [
  { value: "80%", label: "faster portal load", note: "1.2 min → 14 s" },
  { value: "45%", label: "complexity cut", note: "2k-line refactor, zero regressions" },
  { value: "53%", label: "smaller main bundle", note: "PointOne build optimization" },
  { value: "Pro", label: "paid tier, shipped solo", note: "GameScore · Lemon Squeezy" },
  { value: "500+", label: "files restandardized", note: "codebase-wide consistency" },
  { value: "2.5+ yrs", label: "daily AI-assisted dev", note: "Claude Code power user" },
];

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
    title: "Frontend Engineer",
    period: "Apr 2024 — Jun 2025",
    summary: "Two products: PointOne, a data-analysis platform, and Aktivizam, a social platform.",
    stack: ["React", "Next.js", "TypeScript", "Nx", "TanStack Query", "TanStack Table", "Tailwind", "Shadcn"],
    highlights: [
      "PointOne: built an analytics dashboard with interactive charts and a DataTable with filter/sort/inline-edit/selection.",
      "Drove the Redux Toolkit → TanStack Query migration, boosting performance and simplifying the codebase.",
      "Reduced build time 40% and the main bundle 53% via build optimization and route-based code splitting.",
      "Aktivizam: built core UI (feed, filters, forms, tags, event calendar) and admin tools; led the i18n rollout.",
    ],
  },
  {
    company: "Connect The Dots",
    title: "Junior Frontend Engineer",
    period: "Apr 2023 — Apr 2024",
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
    "2.5+ years of daily AI-assisted development. Claude Code power user, and author of LotusFlare's team-adopted workflow. The differentiator isn't that I use AI — it's that I engineered the system around it.",
  capabilities: [
    {
      title: "Context engineering",
      body: "Typed memory, CLAUDE.md context systems and pre-compaction capture so the model keeps the thread across long sessions.",
    },
    {
      title: "Agentic orchestration",
      body: "Planning loops and multi-agent workflows that decompose, fan out and verify — not one-shot prompting.",
    },
    {
      title: "Refactoring at scale",
      body: "AI-assisted refactors across hundreds of files with guardrails that keep regressions at zero.",
    },
    {
      title: "Custom skills & hooks",
      body: "Self-healing TypeScript loops, budget monitoring and reusable skills — published in claude-setup.",
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
    "I'm a frontend engineer based in Belgrade, building clean, scalable, high-performance web applications. I care about component architecture, measurable performance, and interfaces that hold up under real-world complexity — like the analyst-facing tooling I own at LotusFlare for carrier-grade telecom operators.",
    "My edge is AI-assisted development. I've spent 2.5+ years building the system around the model — context engineering, agentic orchestration, custom skills — and shipped a production product, GameScore, solo with Claude Code. I'm currently open to frontend roles at remote-first product teams.",
  ],
};
