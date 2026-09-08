import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { site } from "@/lib/site";
import { fontClassNames } from "@/lib/fonts";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// The site has two root layouts (en, sr), so unmatched URLs cannot inherit
// either; this page is the whole document for a 404, chrome included.
export const metadata: Metadata = {
  title: `Page not found · ${site.name}`,
  description: `That address does not exist on ${site.url.replace("https://", "")}.`,
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

const routes: { href: string; label: string; lang?: string }[] = [
  { href: "/#work", label: "What I build" },
  { href: "/work/pipeline", label: "Case study: the pipeline" },
  { href: "/work/gamescore", label: "Case study: GameScore" },
  { href: "/work/lotusflare", label: "Case study: LotusFlare" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Sajtovi za restorane (SR)", lang: "sr" },
];

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontClassNames}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main" className="shell flex min-h-[70svh] flex-col justify-center py-32">
          <p className="mono text-xs text-accent">404</p>
          <h1 className="font-display display-lg mt-5 max-w-[16ch] font-bold tracking-tight text-balance">
            That page is not here.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-text-dim">
            The address may be old or mistyped. Everything on this site is one click away:
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {routes.map((r) => (
              <li key={r.href}>
                <Link href={r.href} lang={r.lang} className="btn btn-secondary">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mono mt-10 text-[11px] text-text-faint">
            <Link href="/" className="link hit">
              ← Back to the start
            </Link>
          </p>
        </main>
        <Footer />
      </body>
    </html>
  );
}
