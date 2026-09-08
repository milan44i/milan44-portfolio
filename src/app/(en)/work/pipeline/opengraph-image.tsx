import { ogCard, ogContentType, ogSize } from "@/lib/og";

export const alt = "The site-generation pipeline - case study";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    eyebrow: "case study",
    title: "The site-generation pipeline",
    subtitle: "Scout, audit, generate, deploy, verify - a whole site per business, unattended",
    facts: ["210 sites built", "14 verticals", "177 live", "80+ built overnight"],
  });
}
