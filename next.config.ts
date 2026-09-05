import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
// Preview deployments inject the Vercel Toolbar (vercel.live); production never does.
const isPreview = process.env.VERCEL_ENV === "preview";
const only = (allowed: boolean, sources: string) => (allowed ? ` ${sources}` : "");

// Every page is static, so a nonce-based CSP is off the table (it would force
// dynamic rendering); 'unsafe-inline' covers Next's bootstrap scripts and the
// inline JSON-LD. Vercel Analytics and Speed Insights load from /_vercel on
// production and from va.vercel-scripts.com in development.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com${only(isDev, "'unsafe-eval'")}${only(isPreview, "https://vercel.live")}`,
  `style-src 'self' 'unsafe-inline'${only(isPreview, "https://vercel.live")}`,
  `img-src 'self' data: blob:${only(isPreview, "https://vercel.live https://vercel.com")}`,
  `font-src 'self'${only(isPreview, "https://vercel.live https://assets.vercel.com")}`,
  `connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com${only(isPreview, "https://vercel.live wss://ws-us3.pusher.com")}`,
  `frame-src ${isPreview ? "https://vercel.live" : "'none'"}`,
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  experimental: {
    // two root layouts (en, sr): the 404 has to be a whole document of its own
    globalNotFound: true,
  },
  images: {
    // gallery and live-site screenshots live in /public and never change without a redeploy
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/index", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
