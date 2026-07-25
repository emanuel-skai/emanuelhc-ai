'use client';

import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';

const faqs = [
  {
    q: 'What kind of problems are a good fit?',
    a: 'Where software meets intelligence: agent systems, RAG, ML models, data pipelines, automation, and the backend that carries them. Best fit when the system has to hold up in production under real constraints.',
  },
  {
    q: 'Can you work with our in-house team?',
    a: 'Yes — often embedded: pairing on architecture, reviewing PRs, unblocking decisions. I can also work independently and deliver complete features.',
  },
  {
    q: 'Advice only, or implementation?',
    a: 'Both. I review and design architecture, and I ship code. The 50-hour block is built for end-to-end delivery.',
  },
  {
    q: 'What do I get after a paid session?',
    a: 'Written session notes: what we covered, the decisions made, and the next actions. Implementation sessions also hand over working code and docs.',
  },
  {
    q: 'Which stacks?',
    a: 'Python for ML and backends (FastAPI, PyTorch, scikit-learn), AWS for infrastructure, plus Next.js/React, PostgreSQL, Redis, and current AI tooling.',
  },
  {
    q: 'How is scope handled?',
    a: 'Scope and acceptance criteria are documented upfront. Hourly work adjusts as we go; blocks run off a shared backlog reprioritized in weekly syncs.',
  },
  {
    q: "What if it's not a good fit?",
    a: "I'll say so directly and point you to someone better suited. That's what the discovery call is for.",
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
    <section id="faq" ref={ref} className="border-t border-[var(--border)] bg-[var(--bg2)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-[1240px] mx-auto px-8 py-[clamp(80px,10vw,120px)] grid lg:grid-cols-[minmax(240px,340px)_minmax(320px,1fr)] gap-[clamp(40px,6vw,80px)] items-start">
        <div className="reveal">
          <div className="flex items-center gap-3.5 mb-[26px]">
            <span className="w-7 h-px bg-[var(--emerald)]" />
            <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--emerald)]">
              FAQ
            </span>
          </div>
          <h2 className="m-0 font-bold text-[clamp(28px,3.2vw,40px)] leading-[1.08] tracking-[-0.035em] text-[var(--text)]">
            Before you book
          </h2>
        </div>

        <div className="reveal flex flex-col">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div
                key={f.q}
                onClick={() => setOpenFaq(open ? -1 : i)}
                className="border-t border-[var(--border)] py-[26px] cursor-pointer"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="font-semibold text-lg tracking-[-0.01em] text-[var(--text)] font-[family-name:var(--font-sora)]">
                    {f.q}
                  </div>
                  <span className="font-mono text-sm text-[var(--emerald)] flex-none">
                    {open ? '−' : '+'}
                  </span>
                </div>
                {open && (
                  <p className="mt-4 mb-0 max-w-[620px] text-base leading-[1.65] text-[var(--muted)]">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
