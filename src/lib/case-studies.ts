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
    period: "2025 — present",
    role: "Design, engineering & infrastructure — solo",
    intro:
      "A production PWA for tracking board-game scores: offline-first, fast, and built around a catalogue of 100,000+ BoardGameGeek titles — with a paid Pro tier. Designed, built, shipped and operated solo, with Claude Code as the force multiplier.",
    summary:
      "How I designed, built and shipped GameScore solo — an offline-first board-game scoring PWA on Nuxt 3, Dexie and Cloudflare Workers with a paid Pro tier.",
    links: [
      { label: "Visit gamescore.cards", href: "https://gamescore.cards" },
      { label: "claude-setup (the workflow)", href: "https://github.com/milan44i/claude-setup" },
    ],
    stack: ["Nuxt 3", "TypeScript", "Pinia", "Dexie / IndexedDB", "Cloudflare Workers", "Cloudflare D1 / R2", "Tailwind", "PWA"],
    metrics: [
      { value: "100k+", label: "BGG titles indexed" },
      { value: "Offline", label: "first architecture" },
      { value: "Solo", label: "design → ship → operate" },
      { value: "Pro", label: "paid tier shipped" },
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
          "Offline-first is non-negotiable — scoring happens where Wi-Fi isn't. State lives locally and syncs opportunistically.",
          "100,000+ titles from BoardGameGeek have to be searchable instantly on a phone, without shipping a giant payload or hammering an API mid-game.",
          "It's a solo project with a real cost ceiling — the infrastructure had to be cheap to run and near-zero to operate.",
          "A paid Pro tier means real payments, entitlement checks and a feature boundary that can't leak.",
        ],
      },
      {
        heading: "Key decisions",
        body: [
          "I built on Nuxt 3 for a single TypeScript codebase across rendering and routing, with Pinia for predictable state. The offline core is Dexie over IndexedDB: matches, players and game metadata are local-first, so the UI never blocks on the network. The BGG catalogue is indexed for fast client-side lookup rather than a live API call on every keystroke.",
          "The backend runs entirely on Cloudflare Workers with D1 and R2 — edge-close, inexpensive, and operationally quiet. The Pro tier is gated by server-verified entitlements so the boundary holds even though the app is offline-capable. Sharable Victory Cards turn a completed game into a designed artifact people actually post.",
        ],
      },
      {
        heading: "Architecture at a glance",
        bullets: [
          "Client: Nuxt 3 PWA, installable, with a service worker for offline shell + assets.",
          "Local data: Dexie/IndexedDB as the source of truth for in-progress and historical games.",
          "Catalogue: 100k+ BGG titles indexed for instant on-device search.",
          "Edge: Cloudflare Workers for API, D1 for relational data, R2 for generated Victory Card assets.",
          "Monetization: Pro entitlements verified server-side; premium features fenced behind that check.",
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
