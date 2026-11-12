---
title: "Ten Months Running a WhatsApp AI Agent in Production: The Francesca Case Study"
description: "Francesca books appointments on WhatsApp for San Roque, a grooming spa chain in Bogotá. 234,000 messages in ten months, including the month the client switched her off, the outages, and what it took to put her back on full automatic. A detailed case study of operating, not launching, an AI agent."
date: "2026-11-12"
pillar: "Agentic AI"
published: true
keywords:
  - WhatsApp AI agent case study
  - AI agent in production
  - AI receptionist
  - appointment booking agent
  - human in the loop
  - AI agent operations
  - LLM reliability
  - agent observability
lang: "en"
translationSlug: "agente-ia-whatsapp-diez-meses-produccion"
---

Francesca answers WhatsApp for San Roque, a grooming spa chain in Bogotá: two branches, more than a dozen groomers, dogs and cats. She quotes by breed, books against real calendars, moves and cancels appointments, and hands conversations to the team when a human should take them.

In ten months she has handled more than 234,000 messages across 6,300 conversations. Her median first reply is about 50 seconds. In August, the client switched her off.

This is the full story of the operation, not the launch. Most AI agent case studies stop at go-live. The interesting part starts after it.

## What the job actually is

"Receptionist" undersells it. A single booking conversation touches four systems.

**The quote.** Prices depend on breed: 76 breeds, each mapped to a size, a coat type and four service tiers. Double-coated breeds carry their own rules. Mixed breeds have no row in the catalogue, so dogs get quoted by size and cats by coat length. Every price comes from a tool wired to the live catalogue, never from the model's memory.

**The calendar.** The business runs one Google Calendar per groomer plus one per floor: big dogs, small dogs and puppies, cats. A confirmed appointment means checking the groomer's real availability, the floor's capacity for that turn, who is off that day according to a free-text team note, and whether a large double-coated dog is trying to take the last slot of the day. Then two events get written, one for the groomer and one for the floor, as one operation, so two customers can't win the same slot.

**The lifecycle.** Plans change. Since August, Francesca has rescheduled 78 appointments and cancelled 27 end to end: find the booking from the phone and the pet's name, free both calendars, book the new slot, confirm.

**Everything around it.** Returning clients get recognized with their pet's history. Voice notes, photos and videos get understood, because that is how people use WhatsApp. Health questions go to the vet instead of being improvised. After the visit there is a survey. About 30% of conversations start outside business hours, when nobody else is there to answer.

## January to July: the humans trained her by working next to her

The cleanest number in Francesca's early history is the share of all replies on the line that came from her instead of the team.

March: 38%. April: 18%. July: 67%.

April looks like a regression. It's the opposite. That month the team moved off the WhatsApp Business app and into the platform's shared inbox. They took over conversations mid-flow, corrected answers, and every correction became a configuration change. By July she was sending two out of three replies, and conversations where the customer's last message never got any answer had dropped from 72.8% in March to 9.4%.

In July we also swapped the language model underneath her, with a byte-identical persona prompt, and measured what survived. Everything written in the spec transferred: register, vocabulary, process. Everything not written changed: messages got 28% shorter and the share of messages asking the customer a question went from 58% to 76%. Customers didn't notice. The lesson that mattered later was a different one: a rule that lives only in the prompt fails silently. The new model quoted a cat with dog prices once, even though the prompt forbade it. The fix that stuck was a species check inside the pricing tool.

## August: the month she was switched off

In August, the client reported incidents faster than we fixed them. A customer wrote "cancel my appointment" and the cancellation went through without a confirmation step. Returning clients got duplicate contact records. Internal scaffolding leaked into a reply. Each one was small; together they broke the client's trust. They switched Francesca off on part of the line in early August, and from late August every conversation went to assisted mode: she drafted each reply, and a person had to approve it before it reached the customer.

Assisted mode is the textbook answer to "the AI is making mistakes." In this operation it didn't work.

Over two weeks, the team sent about 3% of her drafts: 119 out of 4,344. The rest of the time they wrote their own answer or didn't answer at all. A busy front desk does not review drafts; it answers the customer in front of it. Sessions with no reply at all went from 9.4% in July to 30% in August.

Human-in-the-loop only works if the loop has capacity. Without it, assisted mode is not a safety net. It is a slower way to leave customers unanswered.

## September: earning automatic mode back

Getting back to full automatic took five weeks and three kinds of work.

**An external QA pass.** A third party tested her end to end and reported 12 findings. Each one became a rule change or a tool change with a regression case attached. Nothing was published without running the bench first. The bench decides whether a change ships; it doesn't confirm something that already shipped.

**Moving rules out of the prompt.** Writes became gated: Francesca can only book, move or cancel after summarizing the change and getting an explicit "yes" from the customer. The calendar logic (who works today, floor capacity, the last-slot rule for large breeds) moved into the booking tools, where a model can't talk its way around it.

**A migration under load.** In the middle of this, the whole platform moved to new infrastructure. Francesca's operation moved with a full data copy instead of a partial one, because the partial copy in the test environment had silently dropped tables.

On September 23 she went back to automatic. 5,544 conversations that had been sitting in assisted mode returned to her. The ones the team had taken manually stayed manual.

## What production threw at us anyway

The weeks after going back to automatic were the most instructive of the year, because almost none of the failures were about the model.

An API key went stale on the path that generated drafts for assisted conversations, and the AI produced nothing there for 43 hours while every health check said "healthy." Inbound messages were flowing, webhooks were green, the inbox looked alive. A resize of the message broker left a listener that never reconnected, and agents went quiet for about 11 hours, again with green dashboards. In October, a billing setting on the client's own Meta account blocked 65% of outgoing WhatsApp messages for several days, and the number was deregistered for about two days.

The fix that came out of all three is simple and I now consider it mandatory: **a health check for an AI agent must verify AI output, not plumbing.** Our canary now asks "did the model produce replies in the last window, and did they reach WhatsApp?" Inbound traffic and HTTP 200s prove nothing. Human replies hide a dead AI, so the check splits them.

The second rule came from the same weeks: one change per window, at night, with the rollback written before the change.

## October and November: what automatic looks like now

From September 23 to November 10, with automatic mode on:

- Median first reply: about 50 seconds (p90 72 s). The human team, on the same line: about 17 minutes.
- 99.7% of Francesca's replies arrive in under five minutes. The team's: 38.9%.
- After-hours conversations that get a reply went from 60.3% to 87.4%, and 90.4% in November.
- 377 appointments booked by Francesca in seven weeks.
- Conversations nobody answered: 7.8% in early November, the lowest of the year.

October had 249 AI-booked appointments even though the line was down or paused for roughly 13 days that month, between the Meta outage and planned pauses.

The work in November is no longer about whether she answers. It is about how she shares the line with people.

**Two people on one conversation.** The team still writes to customers: photos of the dog after the bath, "you can come pick him up." When a customer replies "thanks!" to that, an agent that answers too creates noise. Francesca now stays quiet when the last team message is recent and the customer's reply is only a thank-you or an emoji. In the first week that silenced 22 replies, and none of them was a question.

**A second branch.** The chain opened a second location. Groomers rotate between them, and the source of truth was a sentence in a daily calendar note. Francesca now reads rosters per branch and per day, including "attends the other branch today," and honors per-groomer limits: some only work the small-dog floor, one doesn't take large breeds.

**A real scheduling system.** Twelve Google Calendars and free-text notes are the root of most remaining errors. We built a scheduling product with per-branch rules, team shifts and floor capacity. As of this week, it syncs with Google Calendar in both directions, so the team can move over gradually without a cutover day: whatever they book in the new agenda lands in Google in the same format Francesca uses, and whatever they do in Google shows up in the agenda.

## What I'd generalize

**An agent in production is an operation, not a launch.** Francesca's configuration changed dozens of times in ten months. Every one of those changes was a decision about what to delegate to the AI and what to keep human.

**Human-in-the-loop needs capacity, not just a button.** If nobody has time to approve drafts, assisted mode quietly becomes "no answer." Measure the approval rate before trusting it.

**Rules that matter belong in tools.** The prompt says what the model should do. The tools decide what it can do. Every rule we moved from prompt to tool stopped failing.

**Monitor what the customer sees.** Inbound volume, webhooks and uptime were green during every silent outage we had. The only signal that never lied was "AI replies delivered in the last window."

**Earn autonomy with numbers the client can check.** Going back to automatic happened because the client received a daily report with replies, response times, bookings and failures named one by one, and could see the trend for themselves.

Francesca answers in 50 seconds today, books hundreds of appointments a month, and shares a WhatsApp line with a team that once switched her off. None of that came from the model. It came from treating the agent as something you operate every day.
