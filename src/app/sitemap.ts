import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Static export, so the build time is the last time any of these routes could
// have changed. Set once so every entry agrees rather than per-route drift.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/resume", "/work/pipeline", "/work/gamescore", "/work/lotusflare", "/projects"];
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
