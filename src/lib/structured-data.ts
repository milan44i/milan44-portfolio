import { site } from "@/lib/site";

// One node id for the Person on every page, so the case-study author and
// the home-page Person resolve to the same entity.
export const personId = `${site.url}/#person`;
const personRef = { "@type": "Person", "@id": personId, name: site.name, url: site.url };

// Case-study routes emit a breadcrumb so a search engine renders the trail rather
// than guessing it from the URL.
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}

export const gameScoreLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GameScore",
  url: "https://gamescore.cards",
  applicationCategory: "GameApplication",
  operatingSystem: "Web (PWA)",
  description:
    "An offline-first PWA for tracking board-game scores with no account and no server: 20 curated templates, shareable Victory Cards and a paid Pro tier.",
  author: personRef,
  offers: {
    "@type": "Offer",
    price: "4.99",
    priceCurrency: "EUR",
    category: "Pro tier, one-time",
  },
};

// The pipeline is not an installable application - it is a system I built and run,
// so CreativeWork is the honest type rather than SoftwareApplication.
export const pipelineLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "AI site-generation pipeline",
  url: `${site.url}/work/pipeline`,
  creator: personRef,
  description:
    "A pipeline that crawls a business's existing website, scores it across about thirty checks, generates a bespoke replacement from that business's own story and deploys it. 210 sites built across 14 verticals, 177 live.",
  keywords: [
    "AI automation",
    "web crawling",
    "generative pipeline",
    "agent workflows",
    "technical SEO",
    "Cloudflare Pages",
  ],
};
