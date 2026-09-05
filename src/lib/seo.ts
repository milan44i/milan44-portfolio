import type { Metadata } from "next";
import { site } from "@/lib/site";

// Next replaces a parent's openGraph/twitter objects wholesale when a page sets
// its own, so every route builds the complete set here: canonical, an OG block
// with the route's URL and site name, and the matching Twitter card. The
// image comes from the route's opengraph-image.tsx.
export function pageMetadata({
  title,
  description,
  path,
  locale = "en_US",
}: {
  title: string;
  description: string;
  path: string;
  locale?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url, title: fullTitle, description, siteName: site.name, locale },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
