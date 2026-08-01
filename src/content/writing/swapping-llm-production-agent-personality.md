---
title: "We Swapped the Brain of a Production AI Agent and Measured Whether Its Personality Survived"
description: "On July 8, 2026 we changed the LLM behind Francesca, San Roque's WhatsApp receptionist, from Claude Opus 4.5 to Grok 4.3 with a byte-identical persona prompt — and measured what survived. Six months of production data on what a persona spec actually controls, and what a model switch silently rewrites."
date: "2026-08-01"
pillar: "Agentic AI"
published: true
keywords:
  - LLM model swap
  - AI agent personality
  - persona prompt
  - production AI agent
  - WhatsApp AI agent
  - model migration
  - agent evaluation
  - AI agent case study
lang: "en"
translationSlug: "swapping-llm-production-agent-personality-es"
image: "/writing/san-roque/tone-card-EN.png"
---

On July 8, 2026, we changed the LLM behind Francesca — the WhatsApp receptionist for San Roque, a pet grooming business in Colombia — from Claude Opus 4.5 to Grok 4.3. Her written personality stayed byte-identical. Same instructions, same tools, same WhatsApp line. Different brain.

Most teams make this kind of switch, watch the error logs for a day, and move on. We treated it as an experiment: if the personality is written down and the model changes underneath it, how much of the agent's voice actually survives?

The answer turned out to be more interesting than the switch itself.

## The business

San Roque runs a grooming operation where the whole customer relationship lives on WhatsApp. Customers write to ask prices, check availability, and book appointments for their dogs and cats. Every booking has real constraints behind it: specific groomers, specific slots, breed-dependent services and prices.

Before Francesca, a human team answered everything from the WhatsApp Business app. That works until it doesn't: a quarter of customer messages arrive outside business hours, and every price question interrupts someone who is holding a dog.

Francesca has been on that line since late January 2026 — more than 4,600 conversations in six months. Before getting to the experiment, it's worth spelling out what her job actually involves, because "receptionist" undersells it badly.

## The job is harder than it looks

![Francesca — San Roque's mascot avatar, "Soy FrancescAI"](/writing/san-roque/francesca-avatar.png)

Start with the quote. San Roque prices by breed: a catalogue of 76 breeds — 63 dog, 13 cat — each mapped to a size, a coat type, and four service tiers. Double-coated breeds carry their own rule: scissor cut only, never clippers, and the agent has to say so before booking. Mixed breeds have no row in the catalogue, so dogs get quoted by size and cats by coat length — two different question paths Francesca has to pick correctly mid-conversation, from context. And she never quotes from memory: every price comes from a pricing tool wired to the live catalogue, because a wrong number on WhatsApp is a refund conversation later.

Then the booking, which is real calendar surgery. San Roque runs one calendar per groomer plus three floor calendars — dogs, small dogs, and a separate cat floor. A confirmed appointment means checking the groomer's actual availability, creating the event on both the groomer's calendar and the floor's, and emailing the client a calendar invitation — as one atomic operation, so two customers can't win the same slot. Families with several pets get one conversation and one event per pet, each assigned to its own groomer. If a client asks for a specific groomer by name, she books against that person's calendar, not whoever is free.

Then the part where most scheduling bots quietly give up: the lifecycle. Plans change — in July, 9% of booked appointments were cancelled and 12% rescheduled. Francesca finds the existing appointment from the client's phone and pet name, removes it from both calendars, rebooks the new slot, and confirms — and the AI resolved four out of five of those end to end, no human touching a calendar.

Around all of that sit the capabilities that make her feel like staff rather than a form: she recognizes returning clients and greets them with their pet's history instead of a welcome pitch; she understands voice notes, photos, videos, and documents, because that is how people actually use WhatsApp; she escalates to the vet-partner conversation when a health question appears instead of playing doctor; and she shares the inbox with the human team, who can pause her or take over any conversation mid-flow — which is exactly how the training arc below happened.

## The part nobody puts in the demo: humans trained her by working next to her

The cleanest number in Francesca's history is her autonomy curve — the share of all replies on the line that came from the AI instead of the human team.

March: 38%. April: 18%. May: 31%. June: 51%. July: 67%.

April looks like a regression. It's the opposite. That month the San Roque team moved off the WhatsApp app and into the platform's shared inbox, and sent over 11,000 replies through it. They took conversations over mid-flow, corrected Francesca's answers, and every correction turned into config changes: 65 versions of her configuration in five months, including one rollback.

The result of that investment shows up in the operational metrics. Median first response in July: 44 seconds. The AI answers within five minutes 99% of the time; the human team, working shifts on a shared inbox, does so 46% of the time. Conversations where a customer's last message never got an answer fell from 82% in March — when most replies still happened off-platform — to 21% in July.

An agent in production is an operation, not a launch. The human team delegates gradually, and the config history is the record of that delegation.

## What we measured when the brain changed

The July 8 switch gave us a natural experiment. Persona prompt: hash-identical before and after. We compared four weeks of AI replies on each side — 4,259 messages under Opus, 4,781 under Grok — with two instruments: a statistical pass over every message, and blind ratings of 300 scrubbed replies per cohort, scored on formality, warmth, concision, empathy, and sales proactivity.

What survived: everything we had written down. The informal Colombian register. The brand vocabulary — pets are "sanroqueros." The signature emoji. The habit of always pushing to the next step of the booking. Both cohorts scored identical on formality and on commercial proactivity.

What changed: everything we hadn't written down. Under Grok, messages got 28% shorter (29 to 21 words median). Emoji density halved, from 1.75 per message to 0.90. The share of messages that ask the customer a question jumped from 58% to 76% — she now drives the funnel harder and celebrates less. Blind raters scored warmth and empathy one point lower, mostly in delicate moments: complaints, sick pets. And new failure modes appeared that Opus never showed — occasionally truncated greetings, one stray reply in English.

Customer-side sentiment didn't move. Positive messages went from 13.5% to 12.4%, negative from 0.7% to 0.5%. Customers, as far as we can measure, did not notice.

![Before/after tone card for the model swap: what survived — informal Colombian register, brand vocabulary, signature emoji, always proposing the next booking step — versus what changed — median words per message 29 to 21, emoji per message 1.75 to 0.90, replies asking a question 58% to 76%, warmth and empathy one point lower in blind ratings. Customer sentiment stayed stable.](/writing/san-roque/tone-card-EN.png)

## What this means if you run agents in production

The persona prompt is a specification, and like any specification, it controls exactly what it states. Register, vocabulary, greetings, process — all of that transferred across models because it was explicit. Message length, emoji rhythm, how much comfort to offer someone whose dog is sick — none of that was in the spec, so the new model filled the gaps with its own defaults.

This cuts both ways. It means your agent's identity is an asset you own, not a property of your model vendor — we moved Francesca to a model on a cheaper tier and her brand voice came with her. It also means every model switch silently rewrites the parts of the personality you never specified. If the warmer register matters, you write it into the spec and it comes back — that is a prompt edit, not a migration.

There is a second law hiding behind the first, and we paid to learn it: a rule that lives only in the prompt fails silently. Francesca's instructions said, explicitly, that a cat must never be quoted with dog prices. The new model did it anyway, once, with a customer watching. The fix that actually stuck was not a better rule — it was adding a species check to the pricing tool itself. The spec tells the model what to do; the tools decide what it can do.

One honest caveat: our runtime migrated the same day as the model, so not every delta is attributable to Grok alone. We disclose that in the client report too, because a measurement with an undisclosed confound is marketing, not measurement.

The practice I'd generalize: treat a model switch like a database migration. Snapshot behavior before. Define the cohorts in advance. Measure the same way after. The teams that swap models on vibes are the ones that find out from a customer that their agent stopped sounding like their brand.

Six months in, Francesca sends two out of three replies on San Roque's WhatsApp line, books a couple hundred appointments a month against real calendars, and handles the cancellations nobody enjoys processing. The model behind her will probably change again. Her personality is in the spec — so this time we know exactly what will survive.
