import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = join(process.cwd(), "src/assets/fonts");

// Bricolage Grotesque 800, the display face of the site. Satori reads TTF/WOFF,
// so these are the two woff subsets vendored from Fontsource (OFL, see LICENSE).
// Satori keeps one face per family name, so the latin-ext subset gets its own
// name and sits second in the font stack for glyphs like the ć in Stanković.
const displayFamily = '"Bricolage Grotesque", "Bricolage Grotesque Ext"';

async function displayFonts() {
  const [latin, latinExt] = await Promise.all([
    readFile(join(fontDir, "bricolage-grotesque-latin-800-normal.woff")),
    readFile(join(fontDir, "bricolage-grotesque-latin-ext-800-normal.woff")),
  ]);
  return [
    { name: "Bricolage Grotesque", data: latin, weight: 800 as const, style: "normal" as const },
    { name: "Bricolage Grotesque Ext", data: latinExt, weight: 800 as const, style: "normal" as const },
  ];
}

type Card = {
  eyebrow: string;
  title: string;
  subtitle: string;
  facts: string[];
  host?: string;
};

// One card for every route: brand row, display title, a dim subtitle and a row
// of facts. The title shrinks with its length so long case-study names fit.
export async function ogCard({ eyebrow, title, subtitle, facts, host = site.url.replace("https://", "") }: Card) {
  const titleSize = title.length > 34 ? 64 : title.length > 22 ? 78 : 96;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08090b",
          backgroundImage: "radial-gradient(900px 520px at 85% 0%, rgba(198,242,78,0.18), transparent 60%)",
          padding: "72px",
          color: "#e8eae3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26, color: "#9aa098" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: 16, height: 16, borderRadius: 16, backgroundColor: "#c6f24e", display: "flex" }} />
            <div style={{ display: "flex" }}>{host}</div>
          </div>
          <div style={{ display: "flex", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 22 }}>{eyebrow}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: displayFamily,
              fontSize: titleSize,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 32, marginTop: 28, color: "#c6f24e", maxWidth: 1000 }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: 24, color: "#9aa098" }}>
          {facts.map((fact, i) => (
            <div key={fact} style={{ display: "flex", gap: "12px", whiteSpace: "nowrap" }}>
              <div style={{ display: "flex" }}>{fact}</div>
              {i < facts.length - 1 && <div style={{ display: "flex", color: "#5d635b" }}>·</div>}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...ogSize, fonts: await displayFonts() },
  );
}
