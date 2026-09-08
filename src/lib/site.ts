// Single source of truth for identity + outbound links.

export const site = {
  name: "Milan Stanković",
  handle: "milan44",
  role: "AI builder & frontend engineer",
  tagline: "Agent workflows · generative pipelines · Vue · React · TypeScript",
  location: "Belgrade, Serbia",
  city: "Belgrade",
  timezone: "CET",
  availability: "Open to remote",
  email: "mln6stankovic@gmail.com",
  url: "https://milan44.dev",
  description:
    "AI builder and frontend engineer in Belgrade. 4+ years across Vue, React and TypeScript, and a pipeline that crawls, audits, generates and deploys small-business websites: 210 built, 177 live, no two alike.",
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
  { label: "How I work", href: "/#ai" },
  { label: "About", href: "/#about" },
];
