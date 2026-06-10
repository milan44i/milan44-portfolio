// Single source of truth for identity + outbound links.

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
    medium: "https://medium.com/@milan44",
    fieldGuide:
      "https://medium.com/@milan44/claude-code-the-complete-field-guide-to-using-it-without-burning-your-token-budget-a68ad7e490a2",
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
