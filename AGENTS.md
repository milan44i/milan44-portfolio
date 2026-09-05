<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Gotchas that the code does not explain

- Every page is static, so the CSP in `next.config.ts` uses `'unsafe-inline'`; a nonce would force dynamic rendering. Preview-only allowances (Vercel Toolbar) are keyed on `VERCEL_ENV === "preview"` and never reach production.
- OG images (`src/lib/og.tsx`) render with satori: it needs `.woff` (not woff2) and keeps one face per family name, so the latin-ext subset is registered as a second family ("Bricolage Grotesque Ext") for the "ć" in Stanković.
- A child route's `openGraph`/`twitter` replaces the parent's wholesale; build route metadata through `pageMetadata()` in `src/lib/seo.ts` so the canonical, OG URL and Twitter card stay complete.
- Entrance motion is CSS only (`.rise`, `.reveal` in `globals.css`) and gated on `prefers-reduced-motion: no-preference` and `scripting: enabled`; the markup must stay complete in the server HTML so JS-off and reduced-motion users see everything.
- `npm test` runs Playwright against the production build (`npm run build` first). Deployment-protected Vercel previews need the `_vercel_jwt` cookie, and Lighthouse honours it only on the first run per Chrome instance.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
