import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { site } from "@/lib/site";
import { fontClassNames } from "@/lib/fonts";

// Serbian-language root layout for client-facing pages (/projects).
// Deliberately without the English Nav/Footer/Statusline chrome.
export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Sajtovi za restorane i male biznise · ${site.name}`,
    template: `%s · ${site.name}`,
  },
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  robots: { index: true, follow: true },
};

export default function SrLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className={fontClassNames}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
