import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Every page is static, so a nonce-based CSP is off the table (it would force
// dynamic rendering); 'unsafe-inline' covers Next's bootstrap scripts and the
// inline JSON-LD. Vercel Analytics and Speed Insights load from /_vercel on
// production and from va.vercel-scripts.com in development.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
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
