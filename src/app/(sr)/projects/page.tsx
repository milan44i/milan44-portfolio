import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { projects, projectsCopy as c } from "@/lib/projects";

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: `${site.url}/projects`,
    title: `${c.title} · ${site.name}`,
    description: c.description,
    siteName: site.name,
    locale: "sr_RS",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <header className="shell flex items-center justify-between pt-7">
        <Link href="/projects" className="font-display text-[15px] font-semibold tracking-tight">
          {site.name}
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/" className="mono text-[11px] text-text-faint transition-colors hover:text-text" title="English">
            EN
          </Link>
          <a href="#kontakt" className="btn text-[13px]">
            {c.contactLabel}
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="shell pt-20 pb-16 sm:pt-28 sm:pb-20">
          <p className="eyebrow mb-5">{c.hero.eyebrow}</p>
          <h1 className="font-display display-lg max-w-3xl text-balance">{c.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-dim">{c.hero.lead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#kontakt" className="btn btn-primary">
              {c.hero.ctaPrimary}
            </a>
            <a href={c.contact.phoneHref} className="btn">
              {c.contact.phone}
            </a>
          </div>
          <dl className="hairline mt-14 grid grid-cols-2 gap-x-8 gap-y-7 pt-8 sm:grid-cols-4">
            {c.hero.stats.map((s) => (
              <div key={s.small} className="flex flex-col">
                <dt className="order-last mt-1.5 text-[13px] text-text-dim">{s.small}</dt>
                <dd className="font-display text-3xl font-semibold tracking-tight text-accent">{s.big}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Gallery */}
        <section className="shell pb-20 sm:pb-28">
          <div>
            <p className="eyebrow mb-4">{c.gallery.eyebrow}</p>
            <h2 className="font-display display-md text-balance">{c.gallery.title}</h2>
            <p className="mt-4 max-w-xl text-text-dim">{c.gallery.lead}</p>
          </div>

          <div className="mt-12 grid gap-x-7 gap-y-14 md:grid-cols-2">
            {projects.map((p) => (
              <article key={p.slug} className="group">
                <div
                  className="card overflow-hidden rounded-[var(--radius)]"
                  style={{ borderTopWidth: 2, borderTopColor: p.accent }}
                >
                  <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                    <span className="size-2 rounded-full bg-line-strong" aria-hidden />
                    <span className="size-2 rounded-full bg-line-strong" aria-hidden />
                    <span className="size-2 rounded-full" style={{ background: p.accent }} aria-hidden />
                    <span className="mono ml-2 text-[10.5px] tracking-wide text-text-faint">
                      {p.name.toLowerCase().replace(/\s/g, "")}
                    </span>
                  </div>
                  <Image
                    src={p.image}
                    alt={p.alt}
                    sizes="(max-width: 768px) 100vw, 560px"
                    placeholder="blur"
                    className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  />
                </div>
                <div className="mt-4 px-0.5">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    {p.name}
                    <span className="ml-3 align-middle text-[12px] font-normal tracking-normal text-text-faint">
                      {p.place} · {p.kind}
                    </span>
                  </h3>
                  <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-text-dim">{p.story}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Google + AI visibility */}
        <section className="hairline shell pt-16 pb-20 sm:pb-28">
          <div>
            <p className="eyebrow mb-4">{c.search.eyebrow}</p>
            <h2 className="font-display display-md max-w-2xl text-balance">{c.search.title}</h2>
            <p className="mt-4 max-w-2xl text-text-dim">{c.search.lead}</p>
          </div>
          <div className="mt-11 grid gap-5 sm:grid-cols-3">
            {c.search.items.map((item) => (
              <div key={item.tech} className="card rounded-[var(--radius)] p-6">
                <p className="mono text-[12px] tracking-wide text-accent">{item.tech}</p>
                <p className="mt-1 text-lg text-text-faint" aria-hidden>
                  ↳
                </p>
                <p className="mt-1 text-sm leading-relaxed text-text">{item.plain}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What every site gets */}
        <section className="hairline shell pt-16 pb-20 sm:pb-28">
          <div>
            <p className="eyebrow mb-4">{c.base.eyebrow}</p>
            <h2 className="font-display display-md max-w-2xl text-balance">{c.base.title}</h2>
          </div>
          <div className="mt-11 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {c.base.items.map((item) => (
              <div key={item.h} className="border-l border-line-strong pl-5">
                <h3 className="font-display text-lg font-semibold tracking-tight">{item.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-dim">{item.t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="kontakt" className="hairline shell pt-16 pb-24 sm:pb-32">
          <div>
            <p className="eyebrow mb-4">{c.contact.eyebrow}</p>
            <h2 className="font-display display-md text-balance">{c.contact.title}</h2>
            <div className="mt-8 space-y-3">
              <a
                href={site.links.email}
                className="font-display block w-fit text-2xl font-semibold tracking-tight transition-colors hover:text-accent sm:text-3xl"
              >
                {site.email}
              </a>
              <a
                href={c.contact.phoneHref}
                className="font-display block w-fit text-2xl font-semibold tracking-tight transition-colors hover:text-accent sm:text-3xl"
              >
                {c.contact.phone}
              </a>
            </div>
            <p className="mt-6 text-sm text-text-dim">{c.contact.note}</p>
            <p className="mt-12">
              <Link href="/" className="link mono text-[12px] text-text-dim">
                {c.contact.techProfile} →
              </Link>
            </p>
          </div>
        </section>
      </main>

      <footer className="hairline">
        <div className="shell mono flex flex-col gap-2 py-8 text-[11px] text-text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {site.name}</span>
          <span>{site.url.replace("https://", "")}</span>
        </div>
      </footer>
    </>
  );
}
