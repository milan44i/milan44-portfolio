// All portfolio content lives here. Edit copy in one place; pages render from it.

export type Metric = { value: string; label: string; note?: string };
export type MetricGroup = { label: string; metrics: Metric[] };

// Two halves, four each: the strip has to prove both identities at a glance.
// The pipeline metric is "1 pipeline", not "0 manual steps" - the build path
// still has human judgement in it (design quality is scored by eye, the
// old-site map in sajt-analiza is hand-curated, price lists get transcribed).
export const metricGroups: MetricGroup[] = [
  {
    label: "AI & automation",
    metrics: [
      { value: "210", label: "sites generated and deployed", note: "14 verticals · 177 live" },
      { value: "80+", label: "sites built overnight, unattended", note: "15 nightly runs · best night 9 of 9" },
      { value: "0", label: "sign-ups or servers needed to score a game", note: "GameScore · offline-first PWA · IndexedDB · paid Pro" },
      { value: "1", label: "pipeline: Google Maps listing in, live demo site out", note: "scout · audit · build · deploy · verify, hands off" },
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
    slug: "site-pipeline",
    name: "Potpis Studio",
    kind: "Small-business site pipeline · 210 built, 177 live",
    blurb:
      "An end-to-end pipeline that turns a Google Maps listing into a live demo site: scout the business, crawl and audit its current site, generate a bespoke replacement on a shared engine, deploy to Cloudflare Pages and verify it live. Runs unattended overnight (80+ sites over 15 nightly runs, best night 9 of 9), with truthfulness gates on every outreach claim and review boards for the human pass. Potpis Studio is the inbound brand built on it.",
    stack: ["Node", "Astro", "Cloudflare Pages / Workers / D1", "Playwright", "Claude Code agents"],
    year: "2026",
  },
  {
    slug: "gamescore",
    name: "GameScore",
    kind: "gamescore.cards",
    blurb:
      "A production PWA for board-game score-tracking - offline-first, no account and no server, 20 curated templates, and a paid Pro tier with sharable Victory Cards. Designed, built and shipped solo with Claude Code.",
    stack: ["Nuxt 4", "TypeScript", "Pinia", "Dexie / IndexedDB", "Tailwind", "Lemon Squeezy", "Vercel"],
    href: "https://gamescore.cards",
    caseStudy: "/work/gamescore",
    featured: true,
    year: "2026",
  },
  {
    slug: "sitescore",
    name: "SiteScore",
    kind: "sitescore.pages.dev",
    blurb:
      "An on-page SEO auditor running entirely on Cloudflare's edge: 25+ checks across 7 analyzers plus PageSpeed Insights, shareable reports and an embeddable widget.",
    stack: ["Nuxt", "Cloudflare Workers", "D1", "KV", "R2"],
    href: "https://sitescore.pages.dev",
    year: "2026",
  },
  {
    slug: "claude-setup",
    name: "claude-setup",
    kind: "Open source · AI workflow toolkit",
    blurb:
      "My Claude Code setup, published: the 18 skills I actually run, from Jira ticket to merged PR (implement, create PR, fix checks, fix comments, resolve conflicts) and from Google Maps listing to live demo (scout, build, pitch), with an installer that merges into an existing setup.",
    stack: ["Shell", "Claude Code", "Skills", "Hooks"],
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
    company: "Independent",
    title: "AI Builder & Automation Engineer",
    period: "Jul 2026 - Present",
    summary:
      "Self-employed, Belgrade (remote). I design and run systems that find the work, do it, and check their own output.",
    stack: ["Astro", "Node", "Cloudflare Workers / Pages / D1 / R2", "Playwright", "TypeScript", "Claude Code agents"],
    highlights: [
      "Built a pipeline that turns a Google Maps listing into a live website - scout, audit, generate, deploy: 210 sites across 14 verticals, 177 live, no two alike. Potpis Studio is the inbound brand on it.",
      "It runs itself overnight: 80+ sites over 15 nightly runs, best night 9 of 9, each verified live before it counts.",
      "Truthfulness gates on every outreach claim (one audit caught 78 of 161 unverified) and validation gates before any merge, run by a supervised fleet of agents.",
    ],
  },
  {
    company: "LotusFlare",
    team: "DNO Cloud Portal",
    title: "Frontend Engineer",
    period: "Jun 2025 - Present",
    summary:
      "Own the UIs that let business analysts configure data pipelines, reporting and real-time event processing for carrier-grade telecom operators serving millions of subscribers.",
    stack: ["Vue 3", "TypeScript", "Pinia", "Vite", "Tailwind", "Docker", "Kubernetes"],
    caseStudy: "/work/lotusflare",
    featured: true,
    highlights: [
      "Architected the team's AI engineering stack: cross-IDE agent rules, a CLAUDE.md context system and custom skills, now the workflow the team develops with.",
      "Cut portal initial load time by 80% (1.2 min to 14 s) via dynamic imports, route-level splitting and Vite optimizations.",
      "Led the Vue 3 Composition API and Pinia migration; authored reusable composables adopted team-wide.",
      "Refactored a 2,000+ line SinkConfigEditor into a modular, step-based flow: 45% less complexity, zero regressions.",
      "Built a multi-file S3 upload system with real-time progress, smart error handling and DLQ recovery.",
    ],
  },
  {
    company: "DEVersity",
    title: "Junior Frontend Engineer, then Frontend Engineer",
    period: "Apr 2024 - Jun 2025",
    summary: "PointOne, a data-analysis platform; Aktivizam, a social platform; Romotioncam, blade inspection.",
    stack: ["React", "Next.js", "TypeScript", "Nx", "TanStack Query", "TanStack Table", "Tailwind"],
    highlights: [
      "PointOne: built the analytics dashboard and a DataTable with filtering, sorting, inline editing and row selection.",
      "Drove the Redux Toolkit to TanStack Query migration.",
      "Cut build time 40% (18.8 to 11.4 s) and the main bundle 53% (1,834 to 858 kB) via route-based code splitting.",
      "Aktivizam: built the core UI end to end (feed, filters, forms, tags, event calendar, admin tools) and led the i18n rollout.",
    ],
  },
  {
    company: "Connect The Dots",
    title: "Frontend Developer (intern), then Junior Frontend Engineer",
    period: "Apr 2023 - Mar 2024",
    summary: "AI relationship-intelligence platform.",
    stack: ["Vue 3", "TypeScript", "Pinia", "TanStack Query", "Storybook", "Vitest"],
    highlights: [
      "Refactored a legacy Vue UI and modernized the frontend architecture.",
      "Built a reusable component library (Table, Input, Accordion, Checkbox) pixel-matched to Figma, with unit and integration tests.",
    ],
  },
];

// The title line on the résumé and the printed CV.
export const resumeTitle = "AI Builder & Frontend Engineer · Vue · React · TypeScript · Automation";

export type AICapability = { title: string; body: string };

export const aiEdge = {
  lede:
    "The interesting question is not how I get a model to write code. It is what I do on the day it is confidently wrong.",
  // Six things I actually do daily, one measured sentence each.
  capabilities: [
    {
      title: "I run a fleet, not a chat",
      body: "A supervising agent and many workers, each with a written brief and its own copy of the repo. About 180 task records since late August, typically 4 to 8 workers alive at once.",
    },
    {
      title: "Skills are my unit of work",
      body: "Reusable skills instead of prompts: implement-ticket into create-pr into fix-pr-checks into resolve-conflicts, chained across a whole sprint. Each one carries its own rules, checks and definition of done.",
    },
    {
      title: "Gates, not vibes",
      body: "Engine changes pass independent review, tests, docs, lint, PR and CI before they land. On one change this week the review ran five fix rounds before the tests were allowed to start.",
    },
    {
      title: "I review on a board, not in a chat",
      body: "Plans and diffs become annotatable pages. I draw on a screenshot and the marks go back to the worker as instructions: the last logo round was 12 annotations, 12 fixes, one redeploy.",
    },
    {
      title: "Nights run themselves",
      body: "Scheduled agents pick the work, build it, deploy it and verify each result live. 80+ sites over 15 nightly runs, best night 9 of 9, and a preflight that refuses to start rather than half-finish.",
    },
    {
      title: "I assume it is wrong, then check",
      body: "A claim about someone else's business renders only with a dated, sourced check behind it, and a negative verdict needs two independent measurements. The unchecked version was wrong in 78 of 161 messages.",
    },
  ] as AICapability[],
};

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "AI & automation", items: ["AI agents", "LLM tooling", "Agentic workflows", "Web scraping", "Web crawling", "Technical SEO", "Schema.org / JSON-LD"] },
  { label: "Languages", items: ["TypeScript", "JavaScript", "HTML5", "CSS3", "SQL"] },
  { label: "Frameworks & UI", items: ["Vue 3", "React", "Next.js", "Nuxt", "Astro", "Node.js", "Tailwind", "Shadcn"] },
  { label: "State & Data", items: ["Pinia", "Vuex", "TanStack Query", "Redux Toolkit"] },
  { label: "Tooling & Infra", items: ["Cloudflare Workers / Pages / D1 / R2", "Vite", "Playwright", "Vitest", "Storybook", "Docker", "Vercel", "Git"] },
];

export const education = [
  { school: "University of Belgrade, ETF", detail: "B.Sc. Systems Engineering · GPA 8.75 / 10", period: "2018 - 2022" },
  { school: "Mathematical Grammar School, Belgrade", detail: "GPA 4.7 / 5", period: "2014 - 2018" },
];

// The resume and the printed CV share one profile paragraph; the landing page
// About section keeps its own two, so this is deliberately not about.paragraphs[0].
export const resumeProfile =
  "AI builder and frontend engineer with 4+ years in Vue, React and TypeScript, passionate about building clean, scalable, and high-performance web applications. Strong understanding of modern frontend frameworks, component-based architecture, and UI/UX best practices. Designs and operates multi-agent AI workflows end to end: supervised coding agents, validation gates, and unattended pipelines that have built 210 production sites.";

export const about = {
  paragraphs: [
    "I'm an AI builder and frontend engineer based in Belgrade, with 4+ years across Vue, React and TypeScript. I care about component architecture, measurable performance, and interfaces that hold up under real-world complexity - like the analyst-facing tooling I own at LotusFlare for carrier-grade telecom operators.",
    "For the past year, in my free time, I have been building AI systems end to end: a pipeline that crawls and audits small-business websites, generates a bespoke replacement for each one and deploys it. 210 built, 177 live. I design the system and write the rules; agents do the volume, and every result is checked live before it counts.",
  ],
};
