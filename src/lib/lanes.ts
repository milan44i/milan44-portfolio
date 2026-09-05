// The two halves of what I build. Each case is the same four beats so the eye can
// compare them: problem, what I built, what the AI actually did, the result.
// Rendered by the "What I build" section and, for A1, by /work/pipeline.

export type LaneCase = {
  id: string;
  title: string;
  kicker: string;
  problem: string;
  built: string;
  ai: string;
  result: string;
  href?: string;
  hrefLabel?: string;
  tag?: string;
};

export type Lane = {
  id: string;
  label: string;
  blurb: string;
  cases: LaneCase[];
};

export const lanes: Lane[] = [
  {
    id: "ai",
    label: "AI & automation",
    blurb: "Systems that find the work, do it, and check their own output.",
    cases: [
      {
        id: "pipeline",
        title: "The site-generation pipeline",
        kicker: "case 01 · 210 sites",
        problem:
          "Thousands of small businesses have a website that is broken, invisible to search, or twelve years old. Nobody is going to tell them, and none of them are going to find me.",
        built:
          "A crawler that scores their existing site across about thirty checks, a generative engine that designs each site from that business's own story, automated Cloudflare deploys, and an operations dashboard.",
        ai: "Agents research each business and write its site. The model never touches the outgoing message: that path is deterministic, because a sentence a stranger reads has to be auditable before it is clever.",
        result: "568 leads scouted, 210 sites built across 14 verticals, 177 live today.",
        href: "/work/pipeline",
        hrefLabel: "Read the case study",
      },
      {
        id: "anti-convergence",
        title: "The anti-convergence eval",
        kicker: "case 02 · 211 designs",
        problem:
          "Ask a model for two hundred bespoke designs and you get two hundred variations of the same one. Every site being unique is the entire product promise, so convergence is not a quality issue, it is a refund.",
        built:
          "A fingerprint registry. Every design declares eight axes: layout archetype, hero pattern, type pairing, palette family, texture, imagery treatment, price-list presentation, micro-motion.",
        ai: "The model proposes the design; the registry vetoes it. A new theme may share at most one axis with any single existing entry, and the build gate refuses a theme whose entry is missing or dishonest.",
        result:
          "211 shipped designs and the veto still has room. It also caught two CSS prefix collisions that were silently rendering one design with another's colours.",
      },
      {
        id: "overnight",
        title: "The overnight autopilot",
        kicker: "case 03 · 35 built unattended",
        problem:
          "Building a site is an evening. Building at fleet scale means the evenings have to happen without me.",
        built:
          "A scheduled overnight workflow that picks the businesses, builds and deploys their sites, verifies each one live, writes the outcome back into fourteen pipelines and two boards, and leaves a machine-readable summary.",
        ai: "A supervised multi-agent workflow doing the whole job unattended, inside a window that never races me, holding a lock so two runs cannot overlap.",
        result:
          "35 sites built with nobody watching; best night nine of nine, zero failures. It aborts on preflight rather than half-finishing, which is the behaviour I actually wanted.",
      },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Interfaces that hold up under real complexity, and stay fast doing it.",
    cases: [
      {
        id: "lotusflare",
        title: "LotusFlare Data Hub",
        kicker: "case 01 · carrier-grade telecom",
        problem:
          "Business analysts at carrier-grade telecom operators need to configure data pipelines, reporting and real-time event processing without touching code, and the portal took 1.2 minutes to load.",
        built:
          "I own the Data Hub frontend on the DNO Cloud Portal: data-dense configuration UIs, a step-based editor flow, and a multi-file S3 upload with per-file progress and DLQ recovery.",
        ai: "The AI work here is the workflow, not the product: I architected the team's AI engineering stack - cross-IDE agent rules, a context system, custom skills - and the team develops with it.",
        result:
          "Load time down 80% to 14 seconds. A 2,000-line editor refactored to 45% less complexity with zero regressions. Vue 3 + Pinia migration led, composables adopted team-wide.",
        href: "/work/lotusflare",
        hrefLabel: "Read the case study",
      },
      {
        id: "gamescore",
        title: "GameScore",
        kicker: "case 02 · shipped solo",
        problem:
          "Board-game scoring is paper, phones die, and nobody keeps a group's history.",
        built:
          "An offline-first PWA over a 100,000-title catalogue: flexible scoring, 20 curated templates, shareable Victory Cards, play-group stats, and a paid Pro tier with licensing.",
        ai: "Designed, built and shipped solo with Claude Code as the force multiplier, including the payments and licensing path.",
        result: "Live at gamescore.cards, with a paid Pro tier. Design to deployment, one person.",
        href: "/work/gamescore",
        hrefLabel: "Read the case study",
        tag: "built with Claude Code",
      },
      {
        id: "pointone",
        title: "PointOne analytics platform",
        kicker: "case 03 · data-dense UI",
        problem:
          "An analytics product with a data table that had to filter, sort, edit inline and select rows, over charts that had to stay fast.",
        built:
          "The analytics dashboard and the DataTable, plus the migration from Redux Toolkit to TanStack Query.",
        ai: "None - this one predates the workflow, and it is here because the frontend half of the job is not all AI-assisted.",
        result:
          "Build time down 40% (18.84s → 11.44s) and the main bundle down 53% (1,834 → 858 kB) via route-based code splitting.",
      },
    ],
  },
];

export const laneById = (id: string) => lanes.find((l) => l.id === id);
export const caseById = (id: string) =>
  lanes.flatMap((l) => l.cases).find((c) => c.id === id);
