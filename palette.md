# emanuelhc.ai — Landing Page Spec (Black + Emerald, High-End Minimal)

Theme request: **black base + emerald green accent**, premium minimal aesthetic.

---

## 1) Visual System

### Aesthetic
- High-end, minimal, confident.
- Mostly black/charcoal surfaces, sparse emerald accents.
- Clean grid, generous whitespace, subtle motion only.
- Avoid gradients unless extremely subtle (emerald glow at very low opacity).

### Color palette (CSS variables)
Use these exactly (or very close):

**Base**
- --bg: `#000000` (true black background)
- --bg2: `#050505` (near-black for subtle depth)
- --panel: `#0B0B0B` (cards)
- --panel2: `#111111` (hover/secondary)
- --text: `#F5F5F5` (primary text)
- --muted: `#A3A3A3` (secondary text)
- --border: `rgba(255,255,255,0.08)` (hairline borders)

**Emerald accent**
- --emerald: `#10B981` (emerald 500)
- --emerald2: `#34D399` (emerald 400 for hover)
- --emeraldDark: `#064E3B` (deep emerald for subtle fills)

**Semantic**
- --danger: `#EF4444` (rarely)
- --warning: `#F59E0B` (rarely)

### Accent usage rules
- Emerald should be **< 10%** of visible UI.
- Primary uses:
  - Primary CTA button
  - Focus ring
  - Small highlights (underline, tiny chips, icons)
  - 1px top border line in hero or footer (optional)
- Avoid emerald backgrounds for large sections.

### Typography
- Headings: `Sora` or `Space Grotesk`
- Body: `Inter`
- Optional monospace for micro labels: `JetBrains Mono`

Type scale:
- H1: 56–64 desktop / 38–44 mobile
- H2: 34–40 desktop / 28–32 mobile
- Body: 16–18

### UI components style
- Borders: 1px hairline with low opacity
- Corners: 18–24px (rounded-2xl vibe)
- Shadows: extremely soft and minimal (or none)
- Dividers: 1px line, `rgba(255,255,255,0.06)`

### Motion
- Micro transitions only:
  - hover: translateY(-2px), border brightens slightly
  - button hover: emerald shifts to --emerald2
  - section reveals: subtle fade + translate 8px (optional)

---

## 2) Imagery & Visual Motifs

Avoid stock AI imagery. Prefer:
- Abstract monochrome textures (grain, soft noise)
- Thin-line system diagrams in gray/white with emerald nodes
- One “hero” visual: an abstract emerald glow orb/mesh (very subtle)

Image slots:
- `/images/hero-orb-emerald.png` (subtle glow on black)
- `/images/architecture-lines.svg` (minimal layered diagram)
- `/images/case-lina.png` (case study screenshot collage placeholder)

Add subtle grain overlay:
- 2–4% opacity noise layer across entire page (optional).

---

## 3) Page Structure (One-page)

Sticky nav (minimal):
- Services
- Case Studies
- Process
- Pricing
- FAQ
- Book

Right-side CTAs:
- Primary: “Book $200/hr” (emerald filled)
- Secondary: “Free discovery” (outline)

---

## 4) Hero (Above the fold)

H1:
**Production-grade AI systems. Built fast. Built right.**

Subhead:
I help teams ship reliable AI software: agent workflows, RAG systems, and multimodal pipelines — designed for real constraints like tool failures, latency budgets, and cost ceilings.

Proof line (small):
Founder of Skillful AI • Senior AI / Software Architect • FastAPI + AWS

CTAs (3):
1) Primary button (emerald): **Book $200/hr**
2) Secondary button (dark outline): **Buy 50-hour block**
3) Tertiary text button: **Free 15-min discovery** (form-gated)

Hero chips (thin outlined pills):
- Agents & tool calling reliability
- RAG & knowledge systems
- AWS-native delivery
- Cost + evaluation harnesses

Hero visual:
- Right: emerald orb/glow + minimal diagram lines.
- Keep contrast crisp; no busy illustrations.

---

## 5) Services (Minimal cards)

6 cards, 2 rows of 3 on desktop.

Card style:
- background: --panel
- border: hairline
- title in white
- bullet list in muted
- tiny “Typical timeline” label in monospace

Services:
1) Agentic Workflows & Tooling
2) RAG & Knowledge Systems
3) Multimodal AI (Vision/Voice)
4) Omnichannel Automation (WhatsApp/Web/Email)
5) AWS + FastAPI Production Delivery
6) AI Cost, Reliability & Evaluation

Section CTA:
- “Book $200/hr” (primary)
- “Free discovery” (outline)

---

## 6) Case Studies (High-signal, minimal)

Design:
- 2-column blocks, alternating image/text.
- Use small metric callouts in bordered chips.

Case 1 — Lina (WhatsApp lead routing + media handling)
- Routes leads by channel: nearest store (13 locations), B2B wholesale, or e-commerce self-service
- Handles ~2,000 chats/month (~20,000 messages), high automation success
- Media modules: Fabric Identification + Voice note replies

Case 2 — Talboost (AI recruitment platform)
- Role-based flows, script generation, feedback loops, payments architecture

Case 3 — Skillful AI platform direction (agents + workflows)
- Standards for tool calling, memory, observability, and scalable automation

(If you want ultra-minimal MVP: keep only Case 1.)

---

## 7) Process (4 steps)

Minimal timeline:
1) Discovery & constraints
2) Architecture & plan
3) Build & integrate
4) Launch & iterate

Include outputs:
- Architecture diagram
- Backlog with acceptance criteria
- Instrumentation + eval plan

---

## 8) Pricing (3 cards)

Card A — **$200/hr**
- Architecture reviews, debugging, implementation sessions
- Includes session notes + action plan
- CTA: Book $200/hr (emerald)

Card B — **50-hour block**
- Best for shipping a feature to production
- Includes priority scheduling + async support window (optional)
- CTA: Buy 50-hour block (outline or emerald border)

Card C — **Free 15-min discovery**
- Requires intake form
- CTA: Start form (outline)
- After form submit: show calendar embed

---

## 9) Intake Form (Gate free call)

Required fields:
- Name, email, company, role
- What are you building? (textarea)
- Primary outcome metric
- Current stack
- Channels (WhatsApp/Web/Email/API)
- Timeline + budget range
- Ready to start in 2–4 weeks? (yes/no)

Post-submit:
- Confirmation screen
- Calendar embed displayed immediately
- Email sent to Emanuel with full payload

---

## 10) FAQ (6–8)

Keep concise, 2–4 lines each.

---

## 11) Final CTA

Headline:
**Let’s ship something real.**

Buttons:
- Book $200/hr (emerald)
- Buy 50-hour block (outline)
- Free discovery (text)

---

## 12) Implementation Notes (for Claude)

Recommended:
- Next.js + Tailwind + TypeScript
- Tailwind config with CSS variables above
- Component tokens:
  - `Button` variants: primary (emerald), outline (hairline), ghost
  - `Card` with hairline border, hover lift
  - `Chip` as small outlined pill with subtle emerald highlight on hover
- Add optional global grain overlay via CSS pseudo-element

Payments:
- Stripe payment links placeholders:
  - [STRIPE_LINK_HOURLY]
  - [STRIPE_LINK_BLOCK]

Scheduling:
- Cal.com or Calendly embed placeholder:
  - [CALENDAR_EMBED_URL]
- Free discovery: only reveal embed after form submission

Analytics:
- Track CTA clicks + form submit + calendar booked.

SEO:
- OG image: black background, white type, subtle emerald orb, minimal.

---

## 13) Emerald Minimal UI Rules (must follow)
- No rainbow gradients.
- No neon cyan/violet.
- Emerald used for:
  - one primary CTA
  - focus outlines
  - tiny separators / chips
- Everything else: black, near-black, white, gray.

---

## 14) Copy Style Constraints
- Short, confident sentences.
- Concrete terms: architecture, delivery, reliability, evaluation, latency, cost.
- Avoid hype words and buzzword stacks.

---

## 15) Placeholder Links
- Hourly payment: [STRIPE_LINK_HOURLY]
- 50-hour block: [STRIPE_LINK_BLOCK]
- Calendar embed: [CALENDAR_EMBED_URL]
- Discovery submit endpoint: `/api/discovery`
- Email: emanuel@skillfulai.io
- Privacy: `/privacy`
- Terms: `/terms`
- LinkedIn: [LINKEDIN_URL]
- GitHub: [GITHUB_URL]
