# milan44.dev

Personal portfolio of **Milan Stanković** — Frontend Engineer (Vue · React · TypeScript · AI-assisted development).

A bold, motion-led site built around one signature interaction: an **agentic WebGL particle field** that reacts to the cursor. Substance-first content, an "engineered observability" aesthetic, and a recurring statusline motif that nods to my [`claude-setup`](https://github.com/milan44i/claude-setup) context-monitor.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **React Three Fiber** + **three.js** — the agentic particle hero (lazy-loaded, GPU points)
- **Motion** — scroll reveals & hero choreography
- **Lenis** — smooth scroll
- **Vercel Analytics + Speed Insights**
- Fonts: Bricolage Grotesque (display) · Hanken Grotesk (body) · JetBrains Mono (labels)

## Design principles

- **One signature moment, restraint elsewhere.** The particle field is the hero; everything else stays calm and readable.
- **Bold in form, evidence in substance.** Every flashy element carries meaning — metrics, real projects, a public workflow repo.
- **Accessible & fast.** `prefers-reduced-motion` disables the canvas and smooth scroll with a real static fallback; the hero is lazy-loaded so it never blocks LCP; mobile uses a reduced particle count.

## Structure

```
src/
  app/
    layout.tsx              # fonts, metadata, JSON-LD Person, analytics
    page.tsx                # landing
    resume/                 # print-to-PDF résumé
    work/gamescore/         # deep case study (flagship)
    work/lotusflare/        # focused case study
    opengraph-image.tsx     # branded OG card
    sitemap.ts · robots.ts
  components/
    hero/                   # Hero + ParticleField (R3F shader)
    sections/               # Impact · Work · AIEdge · About · Writing · Contact
    Nav · Statusline · Footer · Marquee · Reveal · ...
  lib/
    site.ts                 # identity + links
    content.ts              # experience, projects, skills, metrics
    case-studies.ts         # long-form case study content
```

All copy lives in `src/lib/` — edit content there, not in components.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000 — see the particle field live
npm run build    # production build
```

## Deploy

Built for **Vercel** (zero-config for Next App Router). Point the `milan44.dev` domain at the deployment.

---

Built with Next.js, React Three Fiber, and a [Claude Code workflow](https://github.com/milan44i/claude-setup).
