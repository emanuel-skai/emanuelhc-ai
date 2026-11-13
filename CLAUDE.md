# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (Next.js core-web-vitals + TypeScript)
```

No test framework is configured.

## Tech Stack

- **Next.js 16** (App Router) with React 19, TypeScript (strict mode)
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **Google Sheets API** (`googleapis`) for form submission backend
- Deployed on **AWS Amplify** (GitHub `main` autobuild: every push to `main` ships to production)

## Architecture

Personal services site of a tech leader: fractional CTO, technical interviews & hiring, architecture review & due diligence, AI agents in production. A buyer should understand in 10 seconds who he is, what he offers and how to start. The home page (`src/app/page.tsx`, a server component) composes these sections in order:

```
Navigation > Hero (#top) > Services (#services) > WhyMe (#about) > Process (#process) > Pricing (#pricing) > LatestWriting (#writing) > FAQ (#faq) > DiscoveryForm (#discovery, final CTA + form) > Footer
```

Section components live in `src/components/` and are client components (`'use client'`) since they use hooks and IntersectionObserver for scroll reveal (`Hero` is a server component). `page.tsx` reads articles with `getAllArticles()` and passes the latest English titles to `LatestWriting` as props (components cannot read the filesystem).

Service definitions (name, who it's for, deliverables, pricing), calendar links and the contact email live in `src/lib/site.ts`; the Services section, the form's "service" select and the JSON-LD offer catalog in `layout.tsx` all read from it.

### Content rules for the home page

- Less information, better chosen. No commit/release counts, operating logs, incident timelines or internal metrics.
- Prices are fixed: consulting hour $200, 50-hour block $10,000, discovery free (15 min). Fractional CTO, interviews and due diligence are "custom, scoped in discovery". Don't invent prices.
- Clients are anonymized. At most one number from the flagship case (`src/content/writing/whatsapp-ai-agent-ten-months-production.md`), currently ~50 s vs ~17 min first reply in `WhyMe`.
- `LatestWriting` shows titles only, because older article descriptions name clients.

### API Route

`POST /api/submit-form` — Validates discovery form data and appends a row to Google Sheets (`Sheet1!A:N`; column N = service of interest) via service account auth.

**Required env vars** (in `.env.local`):
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SHEET_ID`

## Design System

Colors and styles are defined as CSS variables in `src/app/globals.css` `:root`. The design uses a **true black background** (`#000`) with **emerald green accents** (`#10B981`). Shared classes live in `globals.css` inside `@layer components` (so Tailwind utilities can override them): `.label` (mono metadata), `.eyebrow`, `.panel`, `.cells` (hairline grid), `.btn-primary` (emerald fill, near-black text for AA contrast), `.btn-secondary`, `.link-arrow`, `.status-dot` (`.is-static`), `.frame` and `.section-pad`. Section openers use `src/components/SectionHeader.tsx` (label + headline + intro, no numeric index). `.reveal`, `.hero-in` (one CSS load animation) and `.prose` stay unlayered.

### Scroll Reveal Pattern

Most sections use `.reveal` elements + the `useReveal` hook (`src/hooks/useReveal.ts`). Elements start hidden (`opacity: 0; translateY(30px)`) and gain `.active` when scrolled into view. Under `prefers-reduced-motion` everything is shown immediately.

Note: global `h1`–`h6` rules now live in `@layer base`, so Tailwind utilities win over them. Headings still set `lineHeight` inline in most components; keep that pattern for consistency.

## Key Conventions

- **Path alias:** `@/*` maps to `./src/*`
- **Fonts:** Sora (display), Geist (body, `--font-geist-sans`) and Geist Mono (labels) loaded via `next/font/google` in `src/app/layout.tsx`
- Colors must use CSS variables (e.g., `var(--emerald)`), never hardcoded values
- Animations use CSS keyframes, not JavaScript
- Design reference docs: `landing.md` (product spec/copy) and `palette.md` (color/design rules)

## Blog / Writing System

Articles live as markdown files in `src/content/writing/[slug].md` with YAML frontmatter:

```yaml
---
title: "Article Title"
description: "2-sentence summary"
date: "YYYY-MM-DD"
pillar: "Agentic AI"  # Agentic AI | Enterprise | LATAM | Frontier | CTO Craft
published: true
keywords: [keyword-one, keyword-two]
---
```

- **Slug** is derived from the filename, not frontmatter
- **Reading time** is auto-calculated from word count (230 wpm)
- **Article loader** is in `src/lib/articles.ts` — reads filesystem at build time via `gray-matter` + `remark`
- **Routes:** `/writing` (index) and `/writing/[slug]` (article detail)
- **GEO:** Each article gets JSON-LD Article schema (linked to the site `#person` node and its translation), canonical URL, hreflang alternates, OpenGraph article metadata, and keyword meta tags. Articles without an `image` in frontmatter get a generated social card from `src/app/og/[slug]/route.tsx`. `public/llms.txt` is maintained by hand.
- **Optional frontmatter:** `lang: "es"`, `translationSlug: "<other-slug>"`, `image: "/writing/..."`
- **Skill:** Use `/add-article` to add new blog entries with frontmatter validation and GEO optimization
