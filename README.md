# maher-portfolio

Personal portfolio of Maher Kurdi — engineering manager, creative technologist.
Dark sci-fi HUD aesthetic, fluid GLSL hero, mechanical UI motion. Built as a showpiece
and an open lab notebook: every effect on the site is documented in `/lab` and `/colophon`.

## Brief (decided 2026-09-04)

| Decision | Choice |
| --- | --- |
| Audience / message | Show creativity + UX sense as an Eng Manager → "creative technologist" |
| Visual mood | Dark sci-fi HUD dominant; neon / 3D / light-techno as accents |
| Palette | Near-black `#050507`, grey type, violet `#a855f7` → magenta `#ec4899` accent |
| Type | Space Grotesk (display) + JetBrains Mono (HUD labels), self-hosted variable |
| Motion feel | Mechanical, precise UI motion; one fluid organic hero (full-screen shader) |
| Must-have motion | Scroll-driven storytelling, page transitions, micro-interactions (cursor, magnetic, text decode) |
| Not doing | Preloader, sound, discrete 3D hero object |
| Accessibility | Full experience adapted on mobile; `prefers-reduced-motion` disables shader/scroll/cursor/reveals |
| Engineering flex | Heavy — visible craft, open source, `/colophon` explains how it's built |
| Content | Team/product outcomes + side projects (`/work`), motion & shader experiments (`/lab`) as MDX |
| Perf bar | Balanced — 60fps feel first, scores second |

## Stack

Next.js 16 (App Router, TS strict) · Tailwind v4 + CSS-variable tokens · React Three Fiber ·
GSAP + ScrollTrigger · Lenis · Motion · MDX via `next-mdx-remote` + `gray-matter` · pnpm

## Run

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
```

## Where things live

```
content/
  work/*.mdx           case studies (frontmatter: title, summary, year, role, tags, color, featured, order)
  lab/*.mdx            experiments
src/
  app/                 routes: / work lab about contact colophon  (+ template.tsx = page transition)
  app/globals.css      ← DESIGN TOKENS. Edit colours/easings here first.
  lib/site.ts          ← identity strings: name, role, email, socials, nav
  lib/motion.ts        gsap + ScrollTrigger registration, useReducedMotion, useFinePointer, easings
  lib/content.ts       MDX loader
  components/
    three/FluidShader  full-screen domain-warped noise shader, cursor-reactive
    motion/            SmoothScroll (Lenis), Cursor, TextScramble, Magnetic, Reveal (ScrollTrigger)
    layout/            Nav, Footer, Clock
    ui/                HudFrame, EntryCard, PageHeader, EntryPage, Mdx
  fonts/               self-hosted woff2 (latin subsets)
```

## Conventions

- Every interactive element gets `data-cursor-label="Verb"` for the reticle caption.
- Wrap scroll-revealed groups in `<Reveal>`; mark children with `data-reveal`.
- New motion → also add a `content/lab/*.mdx` entry describing it. The lab *is* the changelog.
- Keep the hero shader on one quad, DPR ≤ 1.5, no post-processing.

## Roadmap

- [ ] Real content: 3–4 case studies, about story, real email/domain
- [ ] Shared-element / exit page transitions (View Transitions API or FLIP)
- [ ] Pinned scroll storytelling section on case-study pages (GSAP pin + scrub)
- [ ] Lab entries with live embedded demos, not just descriptions
- [ ] OG image generation per entry
- [ ] Lighthouse + real-device perf pass (mobile shader DPR)
- [ ] Deploy (Vercel) + analytics
