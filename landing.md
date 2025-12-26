# emanuelhc.ai — Landing Page Build Spec (for Claude Implementation)

Owner: Emanuel Hernández Castillo  
Brand context: Founder/CTO background, builder of Skillful AI (agentic + automation platform), specializes in real-world AI systems (RAG, agents, multimodal), AWS/FastAPI production delivery, and consultative execution.

Goal of page: Convert high-intent visitors into booked calls and paid consulting blocks:
1) Book paid time at **$200/hr**
2) Buy a **50-hour consulting block** (retainer)
3) Book a **free 15-min discovery call** (only after form completion)

Primary audience:
- Founders and operators who need AI shipped into production (not demos)
- Heads of Product/Engineering needing agentic systems, RAG, automation, or LLM integrations
- Teams scaling support/sales ops via WhatsApp/omnichannel agents
- Technical stakeholders evaluating architectures, cost, and reliability

Tone:
Professional, confident, precise. Zero fluff. Focus on outcomes, speed, reliability, and production readiness.

---

## 1) Visual Direction (Aesthetic)

### Look & feel
- Minimal, premium, “technical Apple-like” with a dark foundation and neon accents.
- Strong typography hierarchy, generous whitespace, clean grid.
- Subtle motion (micro-animations, gradient shimmer, hover elevation), never “gamey”.
- Visual motifs: “systems”, “graphs”, “layers”, “pipelines”, “signal”, “micropayments/ledger” (abstract, not crypto-hype).

### Layout system
- 12-col grid on desktop, max content width 1120–1200px.
- Section spacing: 96–140px top/bottom on desktop, 64–96px on mobile.
- Buttons: pill/rounded-2xl, strong contrast, clear states.

### Color palette (use CSS variables)
Base (Skillful-inspired dark):
- --bg: `#020617` (deep navy/black)
- --panel: `#071026` (slightly lighter for cards)
- --text: `#E6EEF8` (primary text)
- --muted: `#9FB3C8` (secondary text)
- --border: `rgba(255,255,255,0.08)`

Accents (choose one as primary, one as secondary):
- Primary neon: `#22D3EE` (cyan)
- Secondary neon: `#A78BFA` (violet)
Optional highlight:
- `#34D399` (emerald) used sparingly for “availability / success” signals

Gradients (subtle):
- Hero glow gradient: cyan → violet at 15–25% opacity, blurred, behind hero content.
- Button gradient (optional): cyan/violet at low intensity, keep text readable.

### Typography
- Headings: `Sora` or `Space Grotesk`
- Body: `Inter`
- Monospace accents (for small “system” labels): `JetBrains Mono` or `IBM Plex Mono`

Type scale suggestion:
- H1: 52–64px desktop, 36–44px mobile
- H2: 34–42px desktop, 28–32px mobile
- H3: 22–26px
- Body: 16–18px
- Small: 13–14px

### Imagery style
Avoid stock “robots”. Prefer:
- Abstract generative shapes (glows, grids, particles)
- Clean product screenshots / diagrams (real or placeholders)
- Optional professional portrait of Emanuel (if available) in monochrome + subtle gradient edge light

Provide image slots (assets can be placeholders initially):
- /images/hero-abstract.png (or SVG gradient mesh)
- /images/case-lina.png (screenshot collage placeholder)
- /images/architecture-mini.svg (simple layered diagram)
- /images/logos-placeholder.svg (client logos placeholder)

---

## 2) Page Structure (One-page landing)

Sticky top nav:
- Services
- Case Studies
- Process
- Pricing
- FAQs
- Book

Right side primary nav CTA button:
- “Book $200/hr” (primary)
Secondary nav CTA:
- “Free 15-min discovery” (outline)

---

## 3) Hero Section (Above the fold)

### Objective
Instantly communicate: who Emanuel is, what he delivers, and how to engage.

### Hero copy (suggested)
H1:
**AI systems that ship. Agents, RAG, and automation for real businesses.**

Subhead:
I design and implement production-grade AI software: retrieval-augmented systems, agent workflows, multimodal pipelines, and AWS-native delivery. Fast, reliable, and measurable.

Credibility line (small):
Founder of Skillful AI • Senior AI / Software Architect • FastAPI + AWS • LLMs + automation

### Hero CTAs (3)
Primary:
- Button: “Book $200/hr”
  - Action: open scheduling + payment flow (Stripe link or checkout)

Secondary:
- Button: “Buy 50-hour block”
  - Action: open checkout for retainer package

Tertiary:
- Button (text/ghost): “Free 15-min discovery”
  - Action: scroll to form; once form submitted, show booking calendar

### Hero proof chips (small, under CTAs)
Use short, concrete signals (no emojis in headers, no hype):
- Production architecture and delivery
- Agent reliability and tool-failure handling
- Cost controls and measurable ROI
- Omnichannel automation (WhatsApp, web, email, API)

### Hero visual
Right side: abstract glow + minimal layered diagram:
- Channel Layer → Agent Layer → Tools/Workflows → Data → Observability
Keep as simple SVG.

---

## 4) “What I Do” (Services)

Format: 2 rows of cards (3 per row on desktop, 1 per row on mobile).  
Each card includes: title, 2–3 lines, deliverables list, “Typical timeline” mini label.

Service cards (recommended):
1) Agentic Workflows & Tooling
- Build agent workflows with robust tool calling, guardrails, retries, validations, and audit logs.
- Deliverables: prompt + policy design, tool contracts, error taxonomy, tracing.
- Timeline: 1–3 weeks

2) RAG & Knowledge Systems
- Retrieval strategies, chunking, evaluation, grounding, citations, and memory patterns.
- Deliverables: vector + hybrid retrieval, reranking, eval harness, governance.
- Timeline: 1–4 weeks

3) Multimodal AI (Vision/Voice)
- Image understanding, voice notes, speech pipelines, media handling for real channels.
- Deliverables: media ingestion, model selection, latency/cost tuning, UX flows.
- Timeline: 2–6 weeks

4) AI Automation for Sales/Support (Omnichannel)
- WhatsApp-first or inbox-first automation that increases conversion and reduces response time.
- Deliverables: routing logic, lead labeling, summaries, handoff, analytics.
- Timeline: 2–6 weeks

5) AWS + FastAPI Production Delivery
- Backend architecture, infra patterns, CI/CD, scaling, observability, secure deployments.
- Deliverables: repo structure, IaC, ECS/Lambda patterns, monitoring, runbooks.
- Timeline: 1–4 weeks

6) AI Cost, Reliability & Evaluation
- Make systems safe, stable, and cheaper with measurement and controls.
- Deliverables: eval harness, tracing, regression checks, prompt/versioning, rate limiting.
- Timeline: 1–3 weeks

Add a short “Not sure where to start?” row:
- “Start with an Architecture Review (2 hours). Leave with a written plan.”

CTA at bottom:
- Primary: Book $200/hr
- Secondary: Free discovery (form)

---

## 5) “How I Work” (Process)

Goal: reduce uncertainty and signal seniority.

Use 4-step horizontal timeline on desktop:
1) Discovery and Constraints
- goal, users, channels, data, latency/cost constraints, risk

2) Architecture and Plan
- system design, tool contracts, data flows, roadmap, acceptance criteria

3) Implementation and Integration
- build, integrate, instrument, test for failures and edge cases

4) Launch and Iterate
- monitoring, evals, cost controls, continuous improvements

Include outputs:
- Architecture diagram
- Backlog of atomic tasks
- Working prototype or production release
- Observability and evaluation plan

---

## 6) Case Studies (Skillful AI examples)

Format: 2–3 feature case blocks with metrics and “what was built”.

### Case Study 1 — Lina (WhatsApp lead routing + media handling)
Positioning:
AI assistant that routes leads to the right channel/store and handles images/voice in real ops.

Include measurable statements (based on known internal case details):
- Routes leads to correct WhatsApp number by channel: nearest store (13 locations), B2B wholesale, or e-commerce self-service
- Handles ~2,000 chats monthly (~20,000 messages), high automation success rate
- Media modules:
  - Fabric Identification Specialist (extracts visual properties and ranks matches)
  - Voice Interaction Module (voice note reception + voice replies)

Add “What I delivered”:
- Conversation flows, routing policy, media pipeline, evaluation + analytics, production deployment patterns

### Case Study 2 — Talboost (AI recruitment platform)
Positioning:
AI-driven recruitment workflows: candidate scripts, feedback, role-based portals, payments.

Add “What I delivered”:
- Product architecture, role-based flows, AI feedback loops, scalability plan

### Case Study 3 — Skillful AI platform (agents + workflows + marketplace direction)
Positioning:
A platform approach that merges agents, workflows, integrations, and measurable outcomes.

Add “What I delivered”:
- Agent templates, tool calling standards, memory design patterns, observability strategy

Case studies should include:
- Problem
- Solution
- Outcomes / metrics (or “target metrics” if not public)
- Stack (FastAPI, AWS, vector DB, messaging channels, etc.)

CTA after case studies:
- “Want this for your business? Book time.”

---

## 7) Pricing (Clear and decisive)

### Pricing cards (3)
Card A — $200/hr Consulting
- Best for: architecture review, debugging, design decisions, fast implementation sessions
- Includes: session notes + action plan
- CTA: “Book $200/hr”

Card B — 50-hour Block (Retainer)
- Best for: building a full feature, shipping to production, or iterative sprints
- Include a slight incentive (optional):
  - Example: “Priority scheduling + async support” (avoid discounting if you prefer premium)
- CTA: “Buy 50-hour block”

Card C — Free 15-min Discovery (Form-gated)
- Best for: qualifying fit and clarifying scope
- Requires: short intake form
- CTA: “Start discovery form”

### Notes under pricing
- Payment upfront for blocks
- NDA available on request
- If out of scope: Emanuel will recommend next steps or refer

---

## 8) Intake Form (Gate the free discovery call)

### Form intent
Collect enough data to make the discovery call high-signal and filter low-intent leads.

### Form fields (recommended)
Required:
- Full name
- Email
- Company / project name
- Role
- Website (optional but helpful)
- What are you trying to build? (textarea)
- Primary outcome metric (e.g., reduce response time, increase conversion, lower costs)
- Current stack (textarea)
- Data sources involved (checkbox + text)
- Channels involved (WhatsApp, Web, Email, API, Other)
- Timeline (dropdown)
- Budget range (dropdown)
- Are you ready to start in the next 2–4 weeks? (yes/no)

Optional:
- Links to docs, screenshots, repo, or loom
- Security/compliance constraints

Consent:
- Checkbox: “I agree to be contacted about this request.”

### Post-submit behavior
- Show confirmation + embed calendar booking for 15-min call
- Send email with:
  - confirmation
  - what to prepare
  - link to calendar
  - optional NDA link

---

## 9) Trust & Authority Section

Keep it clean and credible.

Components:
- Short bio block:
  “I’m Emanuel Hernández Castillo — I build AI systems that behave reliably under real-world constraints: tool failures, messy data, latency, and cost ceilings.”

- Expertise bullets (no icons required):
  - LLM agent design and tool contracts
  - RAG evaluation and grounding strategies
  - Production FastAPI and AWS delivery
  - Multimodal pipelines for business channels
  - Observability, cost controls, and reliability testing

- Logos strip (placeholder):
  “Teams and projects across LATAM, US, and EU” + placeholder logos row.

- Optional: Certifications/credentials row (only if you want listed)
  Keep it factual and minimal.

---

## 10) FAQ

Include 6–8 questions:
1) What types of projects are a good fit?
2) Can you work with our in-house team?
3) Do you sign NDAs?
4) What’s your typical timeline?
5) What do I get after a paid session?
6) Can you implement end-to-end or only advise?
7) Which stacks do you prefer?
8) How do you handle scope and change requests?

---

## 11) Final CTA Section (Strong close)

Headline:
**Ready to ship?**

Copy:
Book paid time for immediate progress, or start with a free discovery call if you’re not sure about scope.

Buttons:
- Book $200/hr (primary)
- Buy 50-hour block (secondary)
- Free 15-min discovery (ghost)

---

## 12) Footer

Footer items:
- Email: emanuel@skillfulai.io
- LinkedIn (if available)
- GitHub (if available)
- Legal: Privacy policy, Terms
- Small note:
  “Built with performance and clarity in mind.”

---

## 13) Technical Implementation Notes (for Claude)

Suggested stack:
- Next.js (App Router) + TypeScript + Tailwind
- Components: simple custom or shadcn/ui style
- Animations: Framer Motion (subtle)
- Forms: React Hook Form + Zod validation
- Form submit: server action or API route (sends email + stores lead)
- Scheduling:
  - Preferred: Cal.com embed or Calendly embed
  - Free discovery call: only show booking after form submission

Payments:
- Stripe Payment Links for:
  - $200/hr (can be sold as “1-hour session” with scheduling follow-up)
  - 50-hour block
Alternative: LemonSqueezy (if you already use it)

Lead capture:
- Store in:
  - Airtable / Notion / Postgres
  - or send to CRM (HubSpot) if desired
- Send notification email to Emanuel with full form payload

Analytics:
- Plausible or PostHog
Track events:
- CTA_Click_BookHourly
- CTA_Click_BuyBlock
- CTA_Click_FreeDiscovery
- Form_Submit_Discovery
- Calendar_Booked

SEO:
- Title: “Emanuel Hernández Castillo — AI & Software Consulting”
- Meta description: mention “agents, RAG, automation, AWS, FastAPI”
- OpenGraph image: generate a simple branded OG (dark + cyan/violet glow)
- Performance: optimize images, use next/image

Accessibility:
- Contrast meets AA
- Focus rings visible
- Button text explicit

---

## 14) Copy Blocks (Ready to paste)

### Primary headline options (pick one)
Option A:
AI systems that ship. Agents, RAG, and automation for real businesses.

Option B:
Production-grade AI engineering for teams that need results, not demos.

Option C:
From idea to deployed AI workflows — fast, reliable, measurable.

### Short bio (About)
I’m Emanuel Hernández Castillo, an AI and software architect focused on production delivery. I build agentic workflows, RAG systems, and multimodal pipelines that hold up under real constraints: tool failures, messy inputs, latency budgets, and cost ceilings.

### CTA microcopy
- Book $200/hr: “Get unstuck today. Leave with a plan and next actions.”
- 50-hour block: “Ship a full feature with priority support.”
- Free discovery: “Answer a few questions to qualify, then book 15 minutes.”

---

## 15) Content Constraints and Preferences
- Avoid hype words: “revolutionary”, “magic”, “guaranteed”.
- Prefer concrete nouns: architecture, evaluation, latency, cost, reliability, integration.
- No emojis in headers.
- Keep sections crisp; use short paragraphs and high-signal bullets.

---

## 16) Deliverables Checklist (What Claude should produce)
- Responsive landing page (mobile-first)
- Dark theme with neon accent system
- Section structure exactly as above
- 3-CTA hero and sticky nav CTA
- Pricing with 3 cards
- Form-gated free discovery booking flow
- Stripe payment link integration placeholders
- Cal.com/Calendly embed placeholders
- Basic analytics event hooks
- SEO + OG image component
- Clean component structure and reusable styles

---

## 17) Placeholder Links (to be replaced at implementation time)
- Hourly payment link: [STRIPE_LINK_HOURLY]
- 50-hour block link: [STRIPE_LINK_BLOCK]
- Calendar link/embed: [CALENDAR_EMBED_URL]
- Discovery form endpoint: [/api/discovery]
- Privacy policy: [/privacy]
- Terms: [/terms]
- LinkedIn: [LINKEDIN_URL]
- GitHub: [GITHUB_URL]

---

If you need to simplify MVP:
- Keep: Hero, Services, Case Studies (1), Pricing, Form + Booking, Footer
- Move: Process, extra case studies, trust logos, extended FAQ to later
