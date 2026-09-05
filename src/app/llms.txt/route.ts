import { site } from "@/lib/site";
import { metricGroups } from "@/lib/content";

export const dynamic = "force-static";

// Served as a route rather than a public/ file so the facts stay derived from
// the same content the pages render - a stale llms.txt is worse than none.
const body = `# ${site.url.replace("https://", "")} - ${site.name}

> ${site.description}

## Identity
- Name: ${site.name}
- Role: ${site.role}
- Location: ${site.location} (remote; EU and US East time zones)
- [Email](mailto:${site.email}): ${site.email}
- [Portfolio](${site.url}): ${site.url}
- [GitHub](${site.links.github}): open-source work, including the AI workflow toolkit
- [LinkedIn](${site.links.linkedin}): full professional history

## What he builds
- AI automation and agent workflows: generative pipelines, unattended overnight builds
- Crawlers and site auditors that check websites and react automatically
- Frontend: Vue 3 / Nuxt, React / Next.js, Astro, TypeScript, data-dense UIs
- Technical SEO and AI-search visibility: schema.org / JSON-LD, sitemaps, hreflang, llms.txt

## Pages
- [Overview](${site.url}/): both identities, with the numbers
- [The site-generation pipeline](${site.url}/work/pipeline): how 210 sites were crawled, generated and deployed
- [LotusFlare case study](${site.url}/work/lotusflare): carrier-grade telecom frontend
- [GameScore case study](${site.url}/work/gamescore): solo-shipped PWA with a paid tier
- [Resume](${site.url}/resume): full CV and timeline
- [Projects](${site.url}/projects): gallery of generated client sites (Serbian)

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
