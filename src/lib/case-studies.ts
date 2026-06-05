export type CaseBlock = {
  heading: string;
  body?: string[];
  bullets?: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  kind: string;
  period: string;
  role: string;
  intro: string;
  summary: string; // for metadata
  links: { label: string; href: string }[];
  stack: string[];
  metrics: { value: string; label: string }[];
  blocks: CaseBlock[];
};

export const caseStudies: Record<string, CaseStudy> = {
  gamescore: {
    slug: "gamescore",
    title: "GameScore",
    kind: "Solo product · gamescore.cards",
    period: "2026 — present",
    role: "Design, engineering & infrastructure — solo",
    intro:
      "A production PWA for tracking board-game scores: offline-first, fast, and wired into BoardGameGeek search across 100,000+ titles — with a paid Pro tier. Designed, built, shipped and operated solo, with Claude Code as the force multiplier.",
    summary:
      "How I designed, built and shipped GameScore solo — an offline-first board-game scoring PWA on Nuxt 4, Dexie and Vercel with a paid Pro tier.",
    links: [{ label: "Visit gamescore.cards", href: "https://gamescore.cards" }],
    stack: ["Nuxt 4", "TypeScript", "Pinia", "Dexie / IndexedDB", "Tailwind", "shadcn-vue", "PWA", "Lemon Squeezy", "Vercel", "Vercel KV"],
    metrics: [
      { value: "Offline", label: "first PWA, no account" },
      { value: "Solo", label: "design → ship → operate" },
      { value: "Pro", label: "paid tier (€4.99, Lemon Squeezy)" },
      { value: "20", label: "curated game templates" },
    ],
    blocks: [
      {
        heading: "The problem",
        body: [
          "Board-game groups keep score on scraps of paper and half-broken apps. The good ones assume you're always online; the offline ones can't find your game. I wanted something that loads instantly at a kitchen table with no signal, knows essentially every game in print, and turns a finished match into something worth sharing.",
        ],
      },
      {
        heading: "Constraints that shaped the build",
        bullets: [
          "Offline-first is non-negotiable — scoring happens where Wi-Fi isn't. All state lives on-device; there are no accounts and no cloud sync, with JSON export/import for backup.",
          "Adding a game pulls metadata from BoardGameGeek's API — that lookup must be fast and must never block scoring, so each game's details are snapshotted locally the moment it's added.",
          "It's a solo project with a real cost ceiling — the infrastructure had to be cheap to run and near-zero to operate.",
          "A paid Pro tier means real payments, license checks and a feature boundary that can't leak.",
        ],
      },
      {
        heading: "Key decisions",
        body: [
          "I built on Nuxt 4 for a single TypeScript codebase across rendering, routing and server endpoints, with Pinia for state. The core is local-first: Dexie over IndexedDB holds matches, players and snapshotted game data, so scoring never blocks on the network. BGG search runs through a small Nuxt server route that proxies and parses BoardGameGeek's XML API; the fields that matter are denormalized into the match, so a game's name and box art stay available offline once it's been added.",
          "The whole thing runs on Vercel — Nuxt server routes for BGG search and license verification, with Vercel KV holding Pro license keys (there is no user database). Payments are a one-time €4.99 through Lemon Squeezy, which also handles EU VAT. Pro features sit behind a server-verified license check so the boundary holds even though the app is otherwise offline-capable. Victory Cards are rendered client-side with html-to-image into shareable 1080×1920 images people actually post.",
        ],
      },
      {
        heading: "Architecture at a glance",
        bullets: [
          "Client: Nuxt 4 PWA (@vite-pwa/nuxt), installable, with a service worker caching the offline shell + assets.",
          "Local data: Dexie / IndexedDB as the source of truth for in-progress and historical games — no accounts, no server DB.",
          "Game search: BoardGameGeek XML API via a Nuxt server route (fast-xml-parser); results snapshotted locally on add.",
          "Backend: Vercel-hosted Nuxt server routes; Vercel KV stores Pro license keys.",
          "Monetization: one-time €4.99 via Lemon Squeezy; license verified server-side and fenced behind that check.",
          "Victory Cards: generated client-side with html-to-image (1080×1920); Sentry for monitoring, Umami for analytics.",
        ],
      },
      {
        heading: "Where the AI workflow earned its keep",
        body: [
          "GameScore is the clearest proof of the workflow I write about: a single engineer carrying design, frontend, edge backend, data modelling and ops. Claude Code, driven by the context-engineering and agentic-orchestration setup I publish in claude-setup, is what made that scope tractable solo — planning loops for features, AI-assisted refactors with guardrails, and a typed memory system so the model kept the thread across long sessions.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "A live, production PWA with a paid tier — shipped and operated by one person. It's the answer to the only question that matters in an interview: can you take something from nothing to in-production, end to end? Here it is, and you can click it.",
        ],
      },
    ],
  },

  lotusflare: {
    slug: "lotusflare",
    title: "LotusFlare — DNO Cloud Portal",
    kind: "Frontend Engineer · carrier-grade telecom",
    period: "Jun 2025 — present",
    role: "Frontend Engineer — owning analyst-facing portal UIs",
    intro:
      "I own the UIs that let business analysts configure complex data pipelines, reporting and real-time event processing for carrier-grade telecom operators serving millions of subscribers. The work is about making genuinely hard configuration feel manageable — and keeping a large Vue codebase fast and consistent.",
    summary:
      "Owning analyst-facing portal UIs at LotusFlare: an 80% load-time cut, a Vue 3 + Pinia migration, and a 2k-line editor refactored with zero regressions.",
    links: [{ label: "Company", href: "https://lotusflare.com" }],
    stack: ["Vue 3", "TypeScript", "Pinia", "Vuex", "Vite", "Tailwind", "Docker", "Kubernetes"],
    metrics: [
      { value: "80%", label: "faster initial load (1.2 min → 14 s)" },
      { value: "45%", label: "complexity cut on the editor refactor" },
      { value: "500+", label: "files restandardized" },
      { value: "0", label: "regressions on the refactor" },
    ],
    blocks: [
      {
        heading: "Context",
        body: [
          "The DNO Cloud Portal is how operators serving millions of subscribers configure data pipelines, reporting and real-time event processing. The interfaces are dense and the stakes are high — analysts drive carrier-grade systems through them. My remit is the frontend that makes that power usable.",
        ],
      },
      {
        heading: "Performance: 1.2 minutes → 14 seconds",
        body: [
          "Initial load had crept to roughly 1.2 minutes — unacceptable for a tool people live in all day. I cut it by ~80% to about 14 seconds through dynamic imports, route-level code splitting and Vite build optimizations, shrinking what the browser has to parse and execute before the portal is usable.",
        ],
      },
      {
        heading: "Modernizing the codebase",
        bullets: [
          "Led the Vue 3 Composition API + Pinia migration and authored reusable composables adopted across the team.",
          "Refactored a 2,000+ line SinkConfigEditor into a modular, step-based flow — 45% less complexity, zero regressions.",
          "Established codebase standards and reorganized imports across 500+ files for long-term maintainability.",
          "Architected the team's AI engineering stack: cross-IDE agent rules, a CLAUDE.md context system and custom skills.",
        ],
      },
      {
        heading: "Features that ship real capability",
        bullets: [
          "A multi-file S3 upload system with real-time progress, smart error handling and DLQ recovery.",
          "Role-based access control for Reports, with permission-driven UI rendering.",
          "An Application Management UI with cluster-level actions for data-pipeline orchestration.",
        ],
      },
      {
        heading: "The throughline",
        body: [
          "Two things define the role: making hard configuration feel manageable for analysts, and keeping a large, fast-moving Vue codebase performant and consistent. The 80% load-time cut and the zero-regression refactor are the measurable edges of that work — and the AI engineering stack I set up is how the whole team moves faster on it.",
        ],
      },
    ],
  },
};

export const caseStudyList = Object.values(caseStudies);
