import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { site } from "@/lib/site";
import { personId } from "@/lib/structured-data";
import { fontClassNames } from "@/lib/fonts";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Statusline } from "@/components/Statusline";
import { Footer } from "@/components/Footer";

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Milan Stanković",
    "AI builder",
    "Automation Engineer",
    "AI agents",
    "Web scraping",
    "Technical SEO",
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
    title: `${site.name} - ${site.role}`,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: site.name,
  givenName: "Milan",
  familyName: "Stanković",
  jobTitle: "AI builder & Frontend engineer",
  email: site.email,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Belgrade", addressCountry: "RS" },
  sameAs: [site.links.github, site.links.linkedin, site.links.medium],
  // Mirrors the ranked skills list on the LinkedIn profile so the two agree.
  knowsAbout: [
    "Artificial Intelligence",
    "AI Agents",
    "Large Language Models",
    "Prompt Engineering",
    "Automation",
    "Web Scraping",
    "Web Crawling",
    "Search Engine Optimization",
    "Technical SEO",
    "Vue.js",
    "React",
    "TypeScript",
    "Next.js",
    "Nuxt",
    "Astro",
    "Node.js",
    "Cloudflare Workers",
    "Web Performance Optimization",
    "Playwright",
    "Front-End Development",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Belgrade, School of Electrical Engineering",
    url: "https://www.etf.bg.ac.rs/",
  },
  worksFor: {
    "@type": "Organization",
    name: "LotusFlare",
    url: "https://lotusflare.com/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={fontClassNames}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
        <Statusline />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
