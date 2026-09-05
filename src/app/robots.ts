import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// The AI crawlers are listed explicitly rather than left to the wildcard: several
// of them treat an absent named rule as ambiguous, and being quotable by an
// assistant is half the point of llms.txt.
const AI_AGENTS = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
