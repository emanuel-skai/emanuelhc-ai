'use client';

import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';

const faqs = [
  {
    q: 'What problems are a good fit?',
    a: 'Agents that talk to your customers and touch real systems: quotes, bookings, payments, handoff to your team. Also the platform under them, and ML or data work when the problem isn’t an agent. Best fit: it has to hold up in production, not in a demo.',
  },
  {
    q: 'Can you work with our in-house team?',
    a: 'Yes. Often embedded: pairing on architecture, reviewing PRs, unblocking decisions. I can also take a feature end to end and hand it over.',
  },
  {
    q: 'Advice only, or implementation?',
    a: 'Both. I review and design, and I ship code. The 50-hour block is built for end-to-end delivery.',
  },
  {
    q: 'Who operates the agent after launch?',
    a: 'Your team, me, or both. Every engagement hands over the runbook, the regression bench and a daily report, so whoever runs it can see when it fails.',
  },
  {
    q: 'What do I get after a paid hour?',
    a: 'Written notes: what we looked at, what we decided, what to do next. Implementation sessions also hand over working code and docs.',
  },
  {
    q: 'Which stacks?',
    a: 'Python and FastAPI for agents and backends, AWS with Terraform for infrastructure, Next.js, React and React Native for product, PostgreSQL and Redis for state. Models are picked per task by measured cost and quality, not by brand.',
  },
  {
    q: 'How is scope handled?',
    a: 'Scope and acceptance criteria are written down first. Hourly work adjusts as we go. Blocks run from a shared backlog, reprioritized in weekly syncs.',
  },
  {
    q: 'What if it’s not a good fit?',
    a: 'I’ll say so and point you to someone better suited. That’s what the discovery call is for.',
  },
];

export default function FAQ() {
  const ref = useReveal<HTMLElement>();
  const [openFaq, setOpenFaq] = useState(0);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <section id="faq" ref={ref} aria-labelledby="faq-heading" className="border-t border-[var(--border)] bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="frame section-pad grid gap-[clamp(36px,6vw,88px)] lg:grid-cols-[minmax(240px,340px)_minmax(0,1fr)] items-start">
        <div className="reveal lg:sticky lg:top-[calc(var(--nav-h)+40px)]">
          <p className="eyebrow m-0">
            <span className="eyebrow-index">08</span>
            <span aria-hidden="true" className="eyebrow-rule" />
            <span>FAQ</span>
          </p>
          <h2
            id="faq-heading"
            className="mt-6 mb-0 font-bold text-[clamp(30px,3.4vw,44px)] tracking-[-0.038em] text-[var(--text)]"
            style={{ lineHeight: 1.06 }}
          >
            Before you book.
          </h2>
        </div>

        <div className="reveal border-b border-[var(--border)]">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="border-t border-[var(--border)]">
                <h3 className="m-0 font-[family-name:var(--font-inter)]" style={{ letterSpacing: 0, lineHeight: 'inherit' }}>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={open}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full py-6 flex items-start justify-between gap-6 text-left cursor-pointer group"
                  >
                    <span
                      className={`font-[family-name:var(--font-sora)] font-semibold text-[17px] md:text-lg tracking-[-0.015em] transition-colors ${
                        open ? 'text-[var(--text)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text)]'
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-1 flex-none text-[var(--emerald2)] transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 1v10M1 6h10" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  inert={!open}
                  className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="mt-0 mb-6 max-w-[640px] text-base leading-[1.7] text-[var(--muted)] [text-wrap:pretty]">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
