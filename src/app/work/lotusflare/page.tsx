import type { Metadata } from "next";
import { CaseStudyShell } from "@/components/case/CaseStudyShell";
import { caseStudies } from "@/lib/case-studies";

const study = caseStudies.lotusflare;

export const metadata: Metadata = {
  title: `${study.title} — case study`,
  description: study.summary,
  openGraph: { title: `${study.title} — case study`, description: study.summary },
  alternates: { canonical: `/work/${study.slug}` },
};

export default function Page() {
  return <CaseStudyShell study={study} />;
}
