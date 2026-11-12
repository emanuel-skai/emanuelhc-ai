'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useReveal } from '@/hooks/useReveal';
import SectionHeader from '@/components/SectionHeader';

const FLAGSHIP_EN = '/writing/whatsapp-ai-agent-ten-months-production';
const FLAGSHIP_ES = '/writing/agente-ia-whatsapp-diez-meses-produccion';

// Public numbers from the Francesca case study. Keep in sync with
// src/content/writing/whatsapp-ai-agent-ten-months-production.md and HeroReadout.tsx.
const flagshipMetrics = [
  { value: '234k', unit: '+', label: 'messages in ten months' },
  { value: '6,300', unit: '+', label: 'conversations' },
  { value: '87.4', unit: '%', label: 'after-hours chats answered', from: 'from 60.3%' },
  { value: '377', unit: '', label: 'bookings in 7 weeks', from: 'first weeks back on auto' },
];

const flagshipChanges = [
  'Writes are gated. She books, moves or cancels only after a summary and an explicit “yes”.',
  'Calendar rules moved into the booking tools, where the model can’t talk around them.',
  'Health counts AI replies delivered, not webhooks returning 200.',
];

const cases = [
  {
    id: 'case-platform',
    client: 'potenci · my platform',
    title: 'The platform under every agent on this page',
    summary:
      'Runtime, infrastructure and product for every agent here: assisted and automatic modes, a needs-attention inbox, scheduling, billing and an operator app.',
    metrics: ['New AWS account in ~4 days', 'v1.2.0 → v1.3.16'],
    tension:
      'Agents for several businesses ran on one platform. It had to move to a new AWS account without any of them going dark, then get cheaper to run.',
    fix: 'A full-dump restore, because a partial copy kept dropping tables. Tag releases from main with manual migrate and deploy gates. Canaries on auth, webhooks and AI output. Cost cuts one per night, each with a rollback ready and no long-term commitments.',
    shipped: [
      'Agent runtime: assist mode, write gates, kill switch',
      'Scheduling with two-way Google Calendar sync',
      'Billing, and an operator app on Google Play',
      'Runbooks, post-mortems and daily client reports',
    ],
    stack: ['Python', 'FastAPI', 'Next.js', 'AWS', 'Terraform', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'case-textile',
    client: 'Textile retailer · Colombia',
    title: 'A sales agent that never quotes from memory',
    summary:
      'One WhatsApp line for 13 stores, wholesale and online. Customers send fabric photos and voice notes instead of product codes. Price and stock come from database lookups, every time.',
    metrics: ['27,000+ conversations', '13 stores routed'],
    tension:
      'Leads arrived on one line and had to reach the right store, the wholesale team or the online shop. Customers describe fabric with a photo or a voice note, not a SKU.',
    fix: 'Route each lead by channel and location. Identify fabrics from photos with multimodal embedding search. Transcribe voice notes mid-conversation. Check every price against the live catalog before it reaches the customer.',
    shipped: [
      'Conversation flows and routing policy',
      'Fabric identification from photos',
      'Voice-note pipeline',
      'Payment flow, released after parity scorecards',
    ],
    stack: ['FastAPI', 'WhatsApp API', 'Vector search', 'PostgreSQL', 'AWS'],
    href: '/writing/whatsapp-ai-agent-production-case-study',
  },
  {
    id: 'case-signage',
    client: 'Signage & print shop · Colombia',
    title: 'A quoting agent that sends priced PDFs',
    summary:
      'A customer describes a sign. The agent prices material, size and finish from the shop’s own price master and sends a PDF quote. Jobs outside the list go to a person.',
    metrics: ['30-day production audit', 'Automatic on one line first'],
    tension:
      'Every quote meant pricing materials, sizes and finishes from a long price list, by hand, one chat at a time.',
    fix: 'Pricing lives in a tool over the price master, not in the prompt. A 30-day audit of real conversations drives versioned rule changes. Automatic mode went live on one line before the others.',
    shipped: [
      'Quote tool and PDF generation',
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
    <section
      id="work"
      ref={ref}
      aria-labelledby="work-heading"
      className="border-t border-[var(--border)] bg-[var(--bg2)]"
    >
      <div className="frame section-pad">
        <SectionHeader
          index="01"
          label="Work"
          id="work-heading"
          title="Agents in production for four businesses."
          aside="A grooming spa chain, a signage and print shop, a textile retailer and an online gaming platform. Clients stay anonymous here. The numbers don’t."
        />

        {/* Flagship */}
        <article
          id="case-francesca"
          aria-labelledby="case-francesca-title"
          className="reveal mt-14 md:mt-16 panel panel-accent scroll-mt-[calc(var(--nav-h)+16px)]"
        >
          <header className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-9 border-b border-[var(--border)]">
            <span className="label text-[var(--emerald2)]">Flagship · Grooming spa chain, Bogotá</span>
            <span className="flex items-center gap-2.5 label label-sm text-[var(--text-secondary)]">
              <span className="status-dot" aria-hidden="true" />
              In production · 10 months
            </span>
          </header>

          <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="px-5 py-8 md:px-9 md:py-10">
              <p className="label m-0">Francesca, WhatsApp front desk</p>
              <h3
                id="case-francesca-title"
                className="mt-4 mb-0 font-semibold text-[clamp(25px,2.7vw,34px)] tracking-[-0.03em] text-[var(--text)]"
                style={{ lineHeight: 1.14 }}
              >
                The client switched her off in August. She has run on full automatic since
                September 23.
              </h3>
              <p className="mt-5 mb-0 max-w-[600px] text-base md:text-[17px] leading-[1.7] text-[var(--text-secondary)] [text-wrap:pretty]">
                She quotes by breed from the live catalog, books against one calendar per groomer
                and per floor, and moves or cancels appointments end to end. Getting her back on
                didn’t take a better model. It took three changes to the system around her.
              </p>
              <ol className="mt-6 mb-0 p-0 list-none flex flex-col gap-3 max-w-[600px]">
                {flagshipChanges.map((l, i) => (
                  <li key={l} className="grid grid-cols-[28px_1fr] text-[15px] leading-relaxed text-[var(--muted)]">
                    <span aria-hidden="true" className="label label-sm pt-[5px] text-[var(--emerald2)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="[text-wrap:pretty]">{l}</span>
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-9">
                <Link href={FLAGSHIP_EN} className="btn-primary">
                  Read the case study
                </Link>
                <Link href={FLAGSHIP_ES} hrefLang="es" lang="es" className="link-arrow text-[15px]">
                  Leer en español <span aria-hidden="true" className="arrow">→</span>
                </Link>
              </div>
            </div>

            <div className="border-t lg:border-t-0 lg:border-l border-[var(--border)] flex flex-col">
              <dl className="m-0 grid grid-cols-2 flex-1">
                {flagshipMetrics.map((m, i) => (
                  <div
                    key={m.label}
                    className={`px-5 py-6 md:px-8 md:py-8 flex flex-col justify-between gap-8 border-[var(--border)] ${
                      i % 2 === 0 ? 'border-r' : ''
                    } ${i < 2 ? 'border-b' : ''}`}
                  >
                    <dt className="label label-sm text-[var(--muted)]">{m.label}</dt>
                    <dd className="m-0">
                      <span className="block font-[family-name:var(--font-sora)] font-bold text-[clamp(32px,3.6vw,48px)] leading-none tracking-[-0.04em] text-[var(--text)] tnum">
                        {m.value}
                        <span className="text-[var(--emerald)]">{m.unit}</span>
                      </span>
                      {m.from && <span className="block mt-2.5 text-[13px] text-[var(--muted2)]">{m.from}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="m-0 px-5 py-4 md:px-8 border-t border-[var(--border)] label label-sm">
                Sep 23 – Nov 10, 2026 unless noted
              </p>
            </div>
          </div>
        </article>

        <h3 className="reveal mt-16 mb-5 label">Also in production</h3>
        <div className="flex flex-col gap-3">
          {cases.map((c, i) => {
            const open = openCase === i;
            const panelId = `${c.id}-panel`;
            return (
              <article
                key={c.id}
                id={c.id}
                data-open={open}
                // Static className: useReveal adds `.active` imperatively, and a
                // changing className would wipe it on re-render.
                className="reveal panel scroll-mt-[calc(var(--nav-h)+16px)] transition-colors duration-200 hover:border-[var(--border-light)] data-[open=true]:border-[var(--border-bright)]"
              >
                <h4 className="m-0 font-[family-name:var(--font-inter)] font-normal" style={{ letterSpacing: 0, lineHeight: 'inherit' }}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenCase(open ? -1 : i)}
                    className="w-full text-left px-5 py-6 md:px-9 md:py-8 cursor-pointer rounded-[var(--radius-lg)] grid gap-x-8 gap-y-4 md:grid-cols-[minmax(0,1fr)_auto] items-start"
                  >
                    <span className="flex flex-col">
                      <span className="label text-[var(--emerald2)]">{c.client}</span>
                      <span
                        className="mt-3 font-[family-name:var(--font-sora)] font-semibold text-[clamp(20px,2.1vw,25px)] tracking-[-0.02em] text-[var(--text)]"
                        style={{ lineHeight: 1.22 }}
                      >
                        {c.title}
                      </span>
                      <span className="mt-3 max-w-[620px] font-normal font-[family-name:var(--font-inter)] text-[15px] md:text-base leading-relaxed text-[var(--muted)] [text-wrap:pretty]">
                        {c.summary}
                      </span>
                    </span>
                    <span className="flex items-center justify-between md:justify-end gap-6">
                      <span className="flex flex-col gap-1.5 md:items-end">
                        {c.metrics.map((m) => (
                          <span key={m} className="label text-[var(--text-secondary)] tracking-[0.12em]">
                            {m}
                          </span>
                        ))}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`w-9 h-9 flex-none rounded-full border border-[var(--border-light)] grid place-items-center text-[var(--muted)] transition-transform duration-200 ${
                          open ? 'rotate-45' : ''
                        }`}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M6 1v10M1 6h10" />
                        </svg>
                      </span>
                    </span>
                  </button>
                </h4>

                <div
                  id={panelId}
                  role="region"
                  aria-label={`${c.title}: details`}
                  inert={!open}
                  className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-7 md:px-9 md:pb-9">
                      <div className="pt-7 border-t border-[var(--border)] grid gap-8 md:grid-cols-3">
                        <div>
                          <p className="label m-0">Tension</p>
                          <p className="mt-3 mb-0 text-[15px] leading-[1.65] text-[var(--text-secondary)]">{c.tension}</p>
                        </div>
                        <div>
                          <p className="label m-0">Fix</p>
                          <p className="mt-3 mb-0 text-[15px] leading-[1.65] text-[var(--text-secondary)]">{c.fix}</p>
                        </div>
                        <div>
                          <p className="label m-0">Shipped</p>
                          <ul className="flex flex-col gap-2 mt-3 mb-0 p-0 list-none">
                            {c.shipped.map((d) => (
                              <li key={d} className="text-[15px] leading-normal text-[var(--text-secondary)]">
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-8">
                        {c.stack.map((s) => (
                          <span
                            key={s}
                            className="label label-sm text-[var(--muted)] border border-[var(--border)] rounded-[6px] px-2.5 py-1.5"
                          >
                            {s}
                          </span>
                        ))}
                        {c.href && (
                          <Link href={c.href} className="link-arrow ml-auto text-[15px]">
                            Read the case study <span aria-hidden="true" className="arrow">→</span>
                          </Link>
                        )}
                      </div>
                    </div>
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
