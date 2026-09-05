import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbLd, gameScoreLd } from "@/lib/structured-data";
import { CaseStudyShell } from "@/components/case/CaseStudyShell";
import { caseStudies } from "@/lib/case-studies";

const study = caseStudies.gamescore;

export const metadata: Metadata = pageMetadata({
  title: `${study.title} - case study`,
  description: study.summary,
  path: `/work/${study.slug}`,
});

export default function Page() {
  const crumbs = breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Work", path: "/#work" },
    { name: "GameScore", path: "/work/gamescore" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([gameScoreLd, crumbs]) }}
      />
      <CaseStudyShell study={study} />
    </>
  );
}
