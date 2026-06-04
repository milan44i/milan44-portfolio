import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Statusline } from "@/components/Statusline";
import { Footer } from "@/components/Footer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Milan Stanković",
    "Frontend Engineer",
    "Vue",
    "React",
    "TypeScript",
    "Nuxt",
    "Next.js",
    "AI-assisted development",
    "Claude Code",
    "Belgrade",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  givenName: "Milan",
  familyName: "Stanković",
  jobTitle: "Frontend Engineer",
  email: site.email,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Belgrade", addressCountry: "RS" },
  sameAs: [site.links.github, site.links.linkedin, site.links.medium],
  knowsAbout: [
    "Frontend Engineering",
    "Vue.js",
    "React",
    "TypeScript",
    "AI-assisted development",
    "Web performance",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${hanken.variable} ${jetbrains.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <SmoothScroll>
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
        <Statusline />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
