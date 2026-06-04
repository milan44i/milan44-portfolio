import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="shell scroll-mt-24 py-24 sm:py-32">
      <Reveal>
        <div className="card relative overflow-hidden p-8 sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(90% 120% at 85% 0%, rgba(198,242,78,0.10), transparent 60%)" }}
          />
          <div className="relative">
            <p className="eyebrow mb-5">
              <span className="accent">●</span> {site.availability.toLowerCase()} — frontend roles
            </p>
            <h2 className="font-display display-lg max-w-[14ch] font-bold tracking-tight text-balance">
              Let&apos;s build something fast.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-text-dim">
              I&apos;m looking for frontend roles at remote-first product teams. If that&apos;s you,
              the quickest path is a direct email.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a href={site.links.email} className="btn btn-primary w-full justify-center sm:w-auto">
                {site.email} →
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary w-full justify-center sm:w-auto"
              >
                LinkedIn ↗
              </a>
              <Link href="/resume" className="btn btn-secondary w-full justify-center sm:w-auto">
                Resume
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
