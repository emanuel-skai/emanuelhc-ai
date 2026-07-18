---
title: "What 27,000 WhatsApp Conversations Taught Me About Production AI Agents"
description: "Nine and a half months of production data from Tere, the AI sales agent we built for Colombian fabric retailer Telas Real. The architecture decisions that worked, the ones that were hard, and why grounded database lookups beat model knowledge."
date: "2026-07-15"
pillar: "Agentic AI"
published: true
keywords:
  - AI agent production
  - WhatsApp AI agent
  - agentic AI case study
  - grounded tool calling
  - AI sales agent
  - human handoff design
  - LATAM AI
  - conversational AI architecture
lang: "en"
translationSlug: "whatsapp-ai-agent-production-case-study-es"
---

![Tere, the generated avatar of Telas Real's WhatsApp textile advisor, smiling in front of shelves stacked with colorful fabric rolls](/writing/tere/tere-avatar.jpg)

Meet Tere. For the past nine and a half months she has been the textile advisor on the WhatsApp lines of Telas Real, one of Colombia's largest fabric retailers. She has handled 27,482 conversations with 26,490 distinct customers, and 99.96% of them ended without a human needing to take over. Tere is an AI agent we built at Skillful — the portrait above is her generated avatar — and this article covers the architecture decisions behind those numbers, the production data that backs them, and the parts that were genuinely hard.

Most of what I read about AI agents is written from demos. This is what I learned from production.

![Key production metrics for Tere: 27,482 conversations handled, 26,490 distinct customers, 99.96% resolved without human takeover, 19,668 CRM contacts captured, 29,508 grounded tool executions, 37.2% of messages arriving outside business hours](/writing/tere/metrics-card-EN.png)

## The setup

Telas Real sells fabric by the meter through 11 stores and an e-commerce site. Their customers — dressmakers, designers, garment manufacturers — do business on WhatsApp. They send voice notes, photos of fabrics, questions about price and stock. Two things made this hard: the answers have to be exact (a wrong price costs a sale), and 37.2% of messages arrive outside business hours, when nobody can answer.

Tere answers on both WhatsApp lines. Text, voice notes, photos. She advises on fabric selection, quotes projects, checks live stock and prices, and when she detects buying intent she registers the lead in the CRM and hands the customer to a human advisor at the right store. The customer never fills a form.

Four decisions made the difference between this working and this being another chatbot story.

## The model knows nothing about the products

Tere has zero product data in her prompt and zero catalog embeddings. Every price, color, stock, and composition answer comes from a live database query at the moment the customer asks. 29,508 tool executions so far.

This was the most argued-about decision and the most correct one. Fabric inventory changes daily. Prompts go stale. Embeddings go stale. A model that "knows" your catalog will eventually invent a price with total confidence, and you will find out from an angry customer. A model that can only look things up cannot invent. If the answer must be exact, design the system so the database produces it, not the model.

## Four config layers, versioned like code

Tere's behavior lives in four separately versioned layers:

- **Persona** — voice, tone, formatting, boundaries
- **Operating rules** — which tool to use when, how the sales flow runs
- **Business notebook** — how products are priced, store coverage, what the company does not sell
- **Per-turn checklist** — orient, consult before asserting, quote, redirect, register

The separation is what makes iteration safe. We tune the sales playbook without touching the personality. We shipped 28 config revisions in five months, each one against a regression gate with evaluation on apply. Early on, an innocent one-line rule edit shifted behavior in an unrelated flow — that was the day prompt changes became production deployments for us, with the same discipline.

![Architecture diagram of Tere: WhatsApp text, voice, and image inputs flow through four versioned config layers — persona, operating rules, business notebook, and per-turn checklist — into a ReAct loop with grounded database tools for stock, prices, and CRM registration](/writing/tere/architecture-EN.png)

## A small model with strict rules beats a big model with vague ones

Tere runs on gpt-4.1-mini in a ReAct loop. No reasoning model. Cost per turn stays in cents, latency stays conversational, and correctness comes from grounded tools and tight operating rules. I see teams reach for the biggest model available to compensate for a fuzzy spec. In a workflow like this, the spec is the product. The model is replaceable.

## Human handoff is a feature, not a failure

Tere does not negotiate prices, does not take payments, does not improvise on complaints. Those routes go to people, by design. Any advisor can pause her mid-conversation and take over — it happened 157 times, 0.6% of conversations.

![Decision tree showing when Tere hands off to a human: price negotiation, payments, and complaints route to human advisors by design, while product questions, quotes, and lead capture stay automated — with any advisor able to pause the agent mid-conversation](/writing/tere/decision-tree-EN.png)

The number that matters to the business is not "how much did the AI automate." It is "did every serious buyer reach a human with their data already captured." That reframe changed how we measured everything: Tere filled the CRM with 19,668 contacts the sales team can act on.

## What was genuinely hard

**Sounding human on WhatsApp is a formatting problem before it is an intelligence problem.** Long paragraphs and markdown bold scream bot. Tere writes short messages, single-asterisk WhatsApp bold, one idea per message, at most one follow-up question. That came from iterating against real conversations.

**Voice is not optional in Colombia.** A large share of customers communicate mainly through voice notes. Tere transcribes them and answers with a natural Colombian voice. Adoption of the channel changed visibly once she could speak.

**Platform scar tissue is real.** We learned that cloning an agent template does not carry its tool attachments. Costs you a day exactly once. Production is made of details like this.

## Why this matters beyond fabric

![Capability map of Tere: fabric advice, project quotes, live stock and price lookups, voice note transcription and replies, photo understanding, lead registration in the CRM, and human handoff across two WhatsApp lines](/writing/tere/capability-map-EN.png)

The pattern is general: customers who live on WhatsApp, answers that must come from a catalog or price list, demand that arrives after hours. That describes an enormous share of commerce in Latin America. We are already reusing about 80% of this architecture for the next vertical.

More than a third of Telas Real's customer messages arrive when every store is closed. Those used to be silent lost leads. Now they are answered in seconds and waiting in the CRM the next morning. That gap — between when customers want to buy and when businesses are available to sell — is where most of the value of production agents is sitting right now, and it has nothing to do with how impressive the demo looks.

## Visuals in Spanish

This case study serves a bilingual audience — these are the shareable Spanish versions of the metrics card and the handoff decision tree.

![Tarjeta de métricas de Tere en español: 27.482 conversaciones atendidas, 26.490 clientes distintos, 99,96% resueltas sin intervención humana, 19.668 contactos registrados en el CRM](/writing/tere/metrics-card-ES.png)

![Árbol de decisión de Tere en español: negociación de precios, pagos y reclamos pasan a asesores humanos por diseño, mientras consultas de producto, cotizaciones y captura de leads permanecen automatizadas](/writing/tere/decision-tree-ES.png)

---

*Tere runs on the [Skillful AI](https://skillfulai.io) platform: multi-channel agents with grounded tools, versioned configuration, evaluation gates, and human handoff built in. All figures come from production data as of July 15, 2026, published with Telas Real's approval.*
