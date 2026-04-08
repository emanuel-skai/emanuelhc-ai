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
- Deployed on **Vercel**

## Architecture

Single-page landing site for AI/ML consulting services. The home page (`src/app/page.tsx`) composes 11 section components in order:

```
Navigation > Hero > Services > About > CaseStudies > Process > Pricing > FAQ > DiscoveryForm > FinalCTA > Footer
```

All components live in `src/components/` and are client components (`'use client'`) since they use hooks, event listeners, and IntersectionObserver for scroll-reveal animations.

### API Route

`POST /api/submit-form` — Validates discovery form data and appends a row to Google Sheets via service account auth.

**Required env vars** (in `.env.local`):
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SHEET_ID`

## Design System

Colors and styles are defined as CSS variables in `src/app/globals.css` `:root`. The design uses a **true black background** (`#000`) with **emerald green accents** (`#10B981`). Key utility classes (`.btn-primary`, `.btn-secondary`, `.card`, `.chip`, `.glass`, `.text-gradient`, `.reveal`) are all defined in `globals.css`.

### Scroll Reveal Pattern

Most sections use `.reveal` elements + IntersectionObserver. Elements start hidden (`opacity: 0; translateY(30px)`) and gain `.active` class when scrolled into view.

## Key Conventions

- **Path alias:** `@/*` maps to `./src/*`
- **Fonts:** Geist Sans + Geist Mono loaded via `next/font/google` in `src/app/layout.tsx`
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
- **GEO:** Each article gets JSON-LD Article schema, canonical URL, OpenGraph article metadata, and keyword meta tags
- **Skill:** Use `/add-article` to add new blog entries with frontmatter validation and GEO optimization
