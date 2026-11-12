# emanuelhc.ai

Personal site of Emanuel Hernández Castillo: positioning, selected work, production practices and long-form writing on running AI agents in production.

## Stack

- Next.js 16 (App Router), React 19, TypeScript (strict)
- Tailwind CSS 4 via `@tailwindcss/postcss`
- File-based markdown blog in `src/content/writing/` (gray-matter + remark)
- Google Sheets API for the discovery form (`POST /api/submit-form`)

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

Env vars for the form live in `.env.local`: `GOOGLE_PRIVATE_KEY`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SHEET_ID`.

## Deploy

Hosted on **AWS Amplify**, connected to this GitHub repo. Every push to `main` triggers an automatic production build and deploy, so work on a branch and merge to `main` only when it is ready to go live.

## Content

Add articles as `src/content/writing/<slug>.md` with the frontmatter described in `CLAUDE.md`. The sitemap, RSS feed (`/feed.xml`), article JSON-LD and the generated social card (`/og/<slug>`) pick them up automatically. Update `public/llms.txt` by hand when a significant piece is published.
