import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { caseStudies } from "@/lib/case-studies";

const study = caseStudies.gamescore;

export const alt = `${study.title} - case study`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    eyebrow: "case study",
    title: study.title,
    subtitle: "Offline-first board-game scoring PWA with a paid Pro tier, built and run solo",
    facts: ["Offline-first PWA", "Nuxt 4 · Dexie · Vercel", "Paid Pro tier", "20 game templates"],
  });
}
