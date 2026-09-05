import { ogCard, ogContentType, ogSize } from "@/lib/og";
import { projectsCopy as c } from "@/lib/projects";
import { site } from "@/lib/site";

export const alt = `${c.title} · ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    eyebrow: "Beograd",
    title: c.title,
    subtitle: "Brz sajt, gotov za nekoliko dana, bez komplikacija",
    facts: ["Restorani", "Vinarije", "Saloni", "Mali biznisi"],
  });
}
