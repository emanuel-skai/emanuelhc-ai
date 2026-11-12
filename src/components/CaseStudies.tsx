'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useReveal } from '@/hooks/useReveal';

const FLAGSHIP_EN = '/writing/whatsapp-ai-agent-ten-months-production';
const FLAGSHIP_ES = '/writing/agente-ia-whatsapp-diez-meses-produccion';

const flagship = {
  client: 'Grooming spa chain · Bogotá',
  title: 'Francesca: a WhatsApp front desk that quotes, books and reschedules',
  summary:
    'She quotes by breed from the live catalog, books against one calendar per groomer and per floor, moves and cancels appointments end to end, and hands the conversation to the team when a person should take it. In August the client switched her off. Five weeks later she was back on full automatic.',
  metrics: [
    { value: '10 months', label: 'in production' },
    { value: '72.8% → 7.8%', label: 'unanswered conversations' },
    { value: '377', label: 'bookings in 7 weeks' },
  ],
  lessons: [
    'Writes are gated: book, move or cancel only after a summary and an explicit “yes”.',
    'Calendar rules live in the booking tools, where the model can’t talk around them.',
    'Health means AI replies delivered, not webhooks returning 200.',
  ],
};

const cases = [
  {
    client: 'potenci · my platform',
    title: 'Multi-tenant agent platform, operated end to end',
    summary:
      'The runtime, infrastructure and product layer under every agent here: assisted and automatic modes, a needs-attention inbox, scheduling, billing and an operator app.',
    metrics: ['Moved accounts in ~4 days', 'Releases v1.2.0 → v1.3.16'],
    problem:
      'Production agents for several businesses depended on one platform, and the platform had to move to a new AWS account without the agents going dark, then get cheaper to run.',
    solution:
      'A full-dump restore instead of a partial copy, tag-based releases from main with manual migrate and deploy gates, and canaries for auth, webhooks and AI output. Cost cuts ran one per night, each with a rollback ready and no long-term commitments.',
    delivered: [
      'Agent runtime: assist mode, write gates, kill switch',
      'Scheduling with two-way Google Calendar sync',
      'Billing on Paddle, operator app on Google Play',
      'Post-mortems, runbooks and daily client reports',
    ],
    stack: ['Python', 'FastAPI', 'Next.js', 'AWS', 'Terraform', 'PostgreSQL', 'Redis'],
  },
  {
    client: 'Textile retailer · Colombia',
    title: 'WhatsApp sales agent with grounded catalog lookups',
    summary:
      'Leads routed across stores, wholesale and e-commerce, with fabric recognition from customer photos and voice notes answered mid-conversation. Prices and stock come from database lookups, never from the model’s memory.',
    metrics: ['27,000+ conversations', '13 stores routed'],
    problem:
      'A large fabric retailer needed one WhatsApp line to route leads across 13 stores, wholesale and online, while customers sent photos and voice notes instead of product codes.',
    solution:
      'An agent that routes each lead to the right channel, identifies fabrics from photos with multimodal embedding search, transcribes voice notes, and checks every price against the live catalog.',
    delivered: [
      'Conversation flows & routing policy',
      'Fabric identification from photos',
      'Voice note pipeline',
      'Payment flow with parity scorecards before production',
    ],
    stack: ['FastAPI', 'WhatsApp API', 'Vector search', 'PostgreSQL', 'AWS'],
    href: '/writing/whatsapp-ai-agent-production-case-study',
  },
  {
    client: 'Signage & print shop · Colombia',
    title: 'Quoting agent that sends priced PDFs on WhatsApp',
    summary:
      'Turns a customer’s description of a sign or print job into a priced quote from the shop’s own price list, and escalates to a person when the job falls outside it.',
    metrics: ['30-day production audit', 'Automatic on one line first'],
    problem:
      'Quoting a sign or print job means pricing materials, sizes and finishes from a long price list, one WhatsApp chat at a time.',
    solution:
      'Pricing lives in a tool over the shop’s price master, not in the prompt. Audits of real conversations drive versioned rule changes, and automatic mode went live on one line before the rest.',
    delivered: [
      'Quote tool + PDF generation',
      'Escalation and scheduling handoff',
      '30-day conversation audit',
      'Versioned rules with a regression bench',
    ],
    stack: ['FastAPI', 'WhatsApp API', 'Workflow automation', 'PostgreSQL'],
  },
];

export default function CaseStudies() {
  const ref = useReveal<HTMLElement>();
  const [openCase, setOpenCase] = useState(-1);

  return (
    <section id="work" ref={ref} className="border-t border-[var(--border)] bg-black scroll-mt-[68px]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-[clamp(80px,10vw,130px)]">
        <div className="reveal flex items-end justify-between gap-10 flex-wrap">
          <div className="max-w-[660px]">
            <div className="flex items-center gap-3.5 mb-[26px]">
              <span className="w-7 h-px bg-[var(--emerald)]" />
              <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--emerald)]">
                Selected work
              </span>
            </div>
            <h2 className="m-0 font-bold text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.035em] text-[var(--text)]">
              Systems running today
            </h2>
          </div>
          <p className="m-0 max-w-[380px] text-base leading-relaxed text-[var(--muted)]">
            Production agents for four businesses: grooming, signage and printing, textile retail
            and online gaming. Clients are anonymized here.
          </p>
        </div>

        {/* Flagship */}
        <article className="reveal relative mt-16 bg-gradient-to-b from-[var(--panel2)] to-[#050505] border border-[rgba(16,185,129,0.28)] rounded-[20px] p-6 md:p-[44px] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--emerald)]">
              {flagship.client}
            </div>
            <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--muted)]">
              Flagship case study
            </div>
          </div>
          <div className="mt-5 grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-[clamp(28px,4vw,56px)]">
            <div>
              <h3 style={{ lineHeight: 1.18 }} className="m-0 font-semibold text-[clamp(24px,2.6vw,32px)] leading-[1.18] tracking-[-0.02em] text-[var(--text)] [text-wrap:balance]">
                {flagship.title}
              </h3>
              <p className="mt-4 mb-0 max-w-[600px] text-base leading-[1.7] text-[var(--text-secondary)] [text-wrap:pretty]">
                {flagship.summary}
              </p>
              <ul className="mt-6 mb-0 p-0 list-none flex flex-col gap-3 max-w-[600px]">
                {flagship.lessons.map((l) => (
                  <li key={l} className="flex gap-3 text-[15px] leading-relaxed text-[var(--muted)]">
                    <span aria-hidden="true" className="mt-[9px] w-[5px] h-[5px] flex-none rounded-full bg-[var(--emerald)]" />
                    {l}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8">
                <Link
                  href={FLAGSHIP_EN}
                  className="text-[15px] font-semibold text-white bg-gradient-to-br from-[#10B981] to-[#0D9668] px-[26px] py-[13px] rounded-xl transition-all hover:-translate-y-px hover:shadow-[0_14px_40px_rgba(16,185,129,0.28)]"
                >
                  Read the case study
                </Link>
                <Link
                  href={FLAGSHIP_ES}
                  hrefLang="es"
                  lang="es"
                  className="text-[15px] font-semibold text-[var(--text-secondary)] hover:text-[var(--emerald2)] transition-colors"
                >
                  Leer en español →
                </Link>
              </div>
            </div>
            <dl className="m-0 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-px self-start bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden">
              {flagship.metrics.map((m) => (
                <div key={m.label} className="bg-black px-6 py-5 flex flex-col-reverse gap-2">
                  <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
                    {m.label}
                  </dt>
                  <dd className="m-0 font-bold text-[28px] leading-none tracking-[-0.03em] text-[var(--text)] font-[family-name:var(--font-sora)] tabular-nums">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </article>

        <div className="flex flex-col gap-5 mt-5">
          {cases.map((c, i) => {
            const open = openCase === i;
            const panelId = `case-panel-${i}`;
            return (
              <article
                key={c.title}
                className="reveal bg-gradient-to-b from-[var(--panel)] to-[var(--bg2)] border border-[var(--border)] rounded-[20px] transition-all duration-300 hover:border-[var(--border-bright)]"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenCase(open ? -1 : i)}
                  className="w-full text-left p-6 md:px-[38px] md:py-9 cursor-pointer rounded-[20px]"
                >
                  <div className="flex items-start justify-between gap-9 flex-wrap">
                    <div className="flex items-baseline gap-[26px] flex-[1_1_420px]">
                      <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--muted2)]">
                        {String(i + 2).padStart(2, '0')}
                      </span>
                      <div>
                        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--emerald)]">
                          {c.client}
                        </div>
                        <h3 style={{ lineHeight: 1.2 }} className="mt-3 mb-0 font-semibold text-[clamp(21px,2.2vw,26px)] leading-[1.2] tracking-[-0.015em] text-[var(--text)]">
                          {c.title}
                        </h3>
                        <p className="mt-3 mb-0 max-w-[560px] text-base leading-relaxed text-[var(--muted)]">
                          {c.summary}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[22px]">
                      <div className="hidden sm:flex flex-col gap-2">
                        {c.metrics.map((m) => (
                          <div
                            key={m}
                            className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--text-secondary)]"
                          >
                            {m}
                          </div>
                        ))}
                      </div>
                      <span
                        aria-hidden="true"
                        className="w-[34px] h-[34px] flex-none rounded-full border border-[var(--border-light)] grid place-items-center font-mono text-sm text-[var(--muted)]"
                      >
                        {open ? '−' : '+'}
                      </span>
                    </div>
                  </div>
                </button>

                <div id={panelId} hidden={!open} className="px-6 pb-6 md:px-[38px] md:pb-9">
                  <div className="pt-8 border-t border-[var(--border)] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[34px]">
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
                        Problem
                      </div>
                      <p className="mt-3.5 mb-0 text-[15px] leading-[1.65] text-[var(--text-secondary)]">
                        {c.problem}
                      </p>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
                        Solution
                      </div>
                      <p className="mt-3.5 mb-0 text-[15px] leading-[1.65] text-[var(--text-secondary)]">
                        {c.solution}
                      </p>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
                        Delivered
                      </div>
                      <ul className="flex flex-col gap-2.5 mt-3.5 mb-0 p-0 list-none">
                        {c.delivered.map((d) => (
                          <li key={d} className="text-[15px] leading-normal text-[var(--text-secondary)]">
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-[30px]">
                    {c.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--muted)] bg-white/[0.02] border border-[var(--border)] rounded-[10px] px-4 py-[9px]"
                      >
                        {s}
                      </span>
                    ))}
                    {c.href && (
                      <Link
                        href={c.href}
                        className="ml-auto text-[15px] font-semibold text-[var(--emerald2)] hover:text-[var(--emerald3)] transition-colors"
                      >
                        Read the case study →
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
