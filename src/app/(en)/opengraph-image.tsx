import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded OG card (inherited by all routes that don't define their own).
export default function Image() {
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
          backgroundImage:
            "radial-gradient(900px 520px at 85% 0%, rgba(198,242,78,0.18), transparent 60%)",
          padding: "72px",
          color: "#e8eae3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: 26, color: "#9aa098" }}>
          <div style={{ width: 16, height: 16, borderRadius: 16, backgroundColor: "#c6f24e", display: "flex" }} />
          <div style={{ display: "flex" }}>milan44.dev</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
            Milan Stanković
          </div>
          <div style={{ display: "flex", fontSize: 36, marginTop: 24, color: "#c6f24e" }}>
            Frontend Engineer
          </div>
          <div style={{ display: "flex", fontSize: 30, marginTop: 10, color: "#9aa098" }}>
            Vue · React · TypeScript · AI-assisted development
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", fontSize: 24, color: "#9aa098" }}>
          <div style={{ display: "flex" }}>Shipped GameScore solo</div>
          <div style={{ display: "flex", color: "#5d635b" }}>·</div>
          <div style={{ display: "flex" }}>80% faster portal load</div>
          <div style={{ display: "flex", color: "#5d635b" }}>·</div>
          <div style={{ display: "flex" }}>Claude Code power user</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
