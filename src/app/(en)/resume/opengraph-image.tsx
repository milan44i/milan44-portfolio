import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `Resume - ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    eyebrow: "resume",
    title: site.name,
    subtitle: `${site.role} · ${site.location}`,
    facts: ["4+ years of Vue and React", site.availability, "Claude Code workflows"],
  });
}
