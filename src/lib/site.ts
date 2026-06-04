// Single source of truth for identity + outbound links.
// NOTE: MEDIUM_URL is a best-guess based on the `milan44i` handle — confirm/replace if your
// Medium profile lives elsewhere.

export const site = {
  name: "Milan Stanković",
  handle: "milan44",
  role: "Frontend Engineer",
  tagline: "Vue · React · TypeScript · AI-assisted development",
  location: "Belgrade, Serbia",
  timezone: "CET",
  availability: "Open to remote",
  email: "mln6stankovic@gmail.com",
  url: "https://milan44.dev",
  description:
    "Frontend engineer with 3+ years across Vue, React and TypeScript. Shipped GameScore solo, cut a carrier-grade telecom portal's load time by 80%, and engineered the AI-assisted workflow behind the work.",
  links: {
    github: "https://github.com/milan44i",
    linkedin: "https://www.linkedin.com/in/milan44/",
    medium: "https://medium.com/@milan44i",
    claudeSetup: "https://github.com/milan44i/claude-setup",
    gamescore: "https://gamescore.cards",
    email: "mailto:mln6stankovic@gmail.com",
  },
} as const;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "AI edge", href: "/#ai" },
  { label: "About", href: "/#about" },
  { label: "Writing", href: "/#writing" },
];
