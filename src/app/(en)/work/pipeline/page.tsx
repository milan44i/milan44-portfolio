import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { LiveSiteStrip, liveProjectCount } from "@/components/LiveSiteStrip";
import { Reveal } from "@/components/Reveal";
import { caseById } from "@/lib/lanes";
import { site } from "@/lib/site";
import { breadcrumbLd, pipelineLd } from "@/lib/structured-data";

const study = caseById("pipeline")!;

const summary =
  "How I built a pipeline that crawls a business's existing website, scores it, generates a bespoke replacement and deploys it - 210 built across 14 verticals, 177 live.";

export const metadata: Metadata = pageMetadata({
  title: "The site-generation pipeline - case study",
  description: summary,
  path: "/work/pipeline",
});

const beats = [
  { heading: "Problem", body: study.problem },
  { heading: "What I built", body: study.built },
  { heading: "The AI's role", body: study.ai },
  { heading: "Result", body: study.result },
];

const metrics = [
  { value: "210", label: "sites generated and deployed" },
  { value: "177", label: "live in production" },
  { value: "211", label: "designs, no two alike" },
  { value: "14", label: "business verticals" },
];

const stack = [
  "Astro",
  "TypeScript",
  "Node",
  "Cloudflare Pages",
  "Cloudflare Workers",
  "D1",
  "Playwright",
  "schema.org / JSON-LD",
];

export default function Page() {
  const crumbs = breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Work", path: "/#work" },
    { name: "The site-generation pipeline", path: "/work/pipeline" },
  ]);

  return (
    <main id="main" className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([pipelineLd, crumbs]) }}
      />
      <article className="shell">
        <Link href="/#work" className="hit mono text-xs text-text-dim transition-colors hover:text-accent">
          ← back to work
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="mono text-xs text-accent">AI &amp; automation · solo, agent-assisted</p>
          <h1 className="font-display display-lg mt-4 font-bold tracking-tight text-balance">
            The site-generation pipeline
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-text-dim">
            A business goes in as a map listing and comes out as a deployed website: crawled, scored,
            designed from its own story, built, deployed and verified.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-bg-elev p-5">
              <div className="font-display text-3xl font-bold tracking-tight text-accent">{m.value}</div>
              <div className="mt-2 text-sm leading-snug text-text-dim">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {beats.map((b, i) => (
            <Reveal key={b.heading} delay={i * 0.06}>
              <h2 className="font-display text-xl font-semibold tracking-tight">{b.heading}</h2>
              <p className="mt-3 leading-relaxed text-text-dim">{b.body}</p>
            </Reveal>
          ))}
        </div>

        <section className="hairline mt-16 pt-12">
          <h2 className="font-display display-md font-bold tracking-tight">What it produces</h2>
          <p className="mt-4 max-w-2xl text-text-dim">
            {liveProjectCount === 6 ? "Six" : liveProjectCount === 5 ? "Five" : liveProjectCount} of
            the sites the pipeline generated, deployed and still serving. Every design is one-of-one:
            the fingerprint registry refuses a new theme that shares more than one of eight design
            axes with anything already shipped.
          </p>
          <div className="mt-10">
            <LiveSiteStrip />
          </div>
        </section>

        <section className="hairline mt-16 pt-12">
          <h2 className="font-display text-xl font-semibold tracking-tight">Measured on one of them</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-text-dim">
            Lighthouse on <span className="text-text">restoran-pinot.pages.dev</span>, desktop:
            accessibility <span className="text-text">95</span>, best practices{" "}
            <span className="text-text">100</span>, agentic browsing{" "}
            <span className="text-text">100</span>. Every generated site ships typed JSON-LD, a
            sitemap, hreflang pairs, an <code className="mono text-[12px]">llms.txt</code> and
            near-zero client JavaScript.
          </p>
        </section>

        <section className="hairline mt-16 pt-12">
          <h2 className="font-display text-xl font-semibold tracking-tight">Stack</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {stack.map((s) => (
              <li key={s} className="mono rounded-full border border-line px-3 py-1 text-[11px] text-text-dim">
                {s}
              </li>
            ))}
          </ul>
        </section>

        <div className="hairline mt-16 flex flex-wrap gap-3 pt-10 pb-24">
          <Link href="/#work" className="btn">
            All work
          </Link>
          <a href={site.links.email} className="btn btn-primary">
            Get in touch →
          </a>
        </div>
      </article>
    </main>
  );
}
