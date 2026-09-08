import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { caseStudies } from "@/lib/case-studies";

const study = caseStudies.lotusflare;

export const alt = `${study.title} - case study`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    eyebrow: "case study",
    title: study.title,
    subtitle: study.role,
    facts: ["80% faster initial load", "500+ files brought to one standard", "0 regressions on a 2,000-line refactor"],
  });
}
