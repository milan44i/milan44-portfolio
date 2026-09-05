import { site } from "@/lib/site";
import { metricGroups } from "@/lib/content";

export const dynamic = "force-static";

// Served as a route rather than a public/ file so the facts stay derived from
// the same content the pages render — a stale llms.txt is worse than none.
const body = `# ${site.url.replace("https://", "")} — ${site.name}

> ${site.description}

## Identity
- Name: ${site.name}
- Role: ${site.role}
- Location: ${site.location} (remote; EU and US East time zones)
- Contact: ${site.email}
- Portfolio: ${site.url}
- GitHub: ${site.links.github}
- LinkedIn: ${site.links.linkedin}

## What he builds
- AI automation and agent workflows: generative pipelines, unattended overnight builds
- Crawlers and site auditors that check websites and react automatically
- Frontend: Vue 3 / Nuxt, React / Next.js, Astro, TypeScript, data-dense UIs
- Technical SEO and AI-search visibility: schema.org / JSON-LD, sitemaps, hreflang, llms.txt

## Pages
- ${site.url}/ — overview
- ${site.url}/work/lotusflare — carrier-grade telecom frontend
- ${site.url}/work/gamescore — solo-shipped PWA with a paid tier
- ${site.url}/resume — full CV
- ${site.url}/projects — gallery of generated client sites (Serbian)

## Facts
${metricGroups
  .map(
    (group) =>
      `### ${group.label}\n` +
      group.metrics.map((m) => `- ${m.value} ${m.label}${m.note ? ` (${m.note})` : ""}`).join("\n"),
  )
  .join("\n")}
`;

export function GET() {
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
