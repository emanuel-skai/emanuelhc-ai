'use client';

import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';

const faqs = [
  {
    q: 'What does a fractional CTO do, exactly?',
    a: 'The job a full-time CTO would do, on part of the week: own the architecture and the roadmap, make build vs buy and vendor calls, hire and lead the engineers, and be the technical voice with investors and clients. You get the judgment without the full-time salary or the equity of a co-founder.',
  },
  {
    q: 'How much of your time do we get?',
    a: 'A fixed cadence we agree on after discovery, sized to your stage: enough to make decisions and unblock the team, not so much that you pay for idle hours. We revisit it as the company grows or hires a full-time CTO.',
  },
  {
    q: 'Which roles can you interview for?',
    a: 'Backend, AI and ML, and data engineers, from mid-level to lead. I design the loop with you, run the technical interviews, and send a written evaluation of each candidate with a clear recommendation.',
  },
  {
    q: 'What does an architecture review or due diligence include?',
    a: 'A look at the system, the code, the infrastructure and the team, then a written report: what holds up, what is at risk, what it would cost to fix, and an action plan in priority order. Founders use it to plan; investors use it to decide.',
  },
  {
    q: 'Do you write code or only advise?',
    a: 'Both. Leadership and reviews are mostly decisions and documents. AI agent work is hands-on: I design, build, ship and operate them, and the 50-hour block exists for that.',
  },
  {
    q: 'Where are you, and which languages?',
    a: 'Costa Rica (UTC−6): working hours overlap with the US and Latin America, and with the afternoon in Europe. I work in Spanish and English. Everything is remote; NDA on request.',
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
      <div className="frame section-pad grid gap-12 lg:grid-cols-[minmax(240px,380px)_minmax(0,1fr)] lg:gap-[clamp(48px,7vw,112px)] items-start">
        <div className="reveal lg:sticky lg:top-[calc(var(--nav-h)+40px)]">
          <p className="eyebrow m-0">
            <span aria-hidden="true" className="eyebrow-rule" />
            <span>FAQ</span>
          </p>
          <h2
            id="faq-heading"
            className="mt-5 mb-0 font-semibold text-[clamp(32px,4vw,52px)] tracking-[-0.035em] text-[var(--text)]"
            style={{ lineHeight: 1.06 }}
          >
            Before you book a call.
          </h2>
        </div>

        <div className="reveal border-b border-[var(--border)]">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="border-t border-[var(--border)]">
                <h3 className="m-0 font-[family-name:var(--font-geist-sans)]" style={{ letterSpacing: 0, lineHeight: 'inherit' }}>
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
