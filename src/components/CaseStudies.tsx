'use client';

import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';

const cases = [
  {
    client: 'Skillful AI · my company',
    title: 'Agent platform & workflow engine',
    summary:
      'The platform layer: agent templates, tool contracts, memory design, and observability that other teams build on.',
    metrics: ['Reusable agent templates', 'Built-in observability'],
    problem:
      'Every client engagement rebuilt agents from scratch — different tool patterns, no shared memory design, no way to see what an agent actually did in production.',
    solution:
      'A platform approach: standardized agent templates, a tool-calling contract, explicit memory patterns, and observability wired in from the first request.',
    delivered: ['Agent template system', 'Tool calling standards', 'Memory design patterns', 'Observability strategy'],
    stack: ['Python', 'FastAPI', 'AWS', 'Redis', 'Vector DBs'],
  },
  {
    client: 'Lina · fashion retail',
    title: 'WhatsApp lead routing + media AI',
    summary:
      'Leads routed across 13 stores, B2B wholesale, and e-commerce — with fabric recognition from customer photos and voice notes answered mid-conversation.',
    metrics: ['~2,000 chats / month', '13 locations routed'],
    problem:
      'A fashion retailer needed intelligent lead routing across 13 store locations, wholesale, and e-commerce — while handling photos and voice notes inside live conversations.',
    solution:
      'An assistant that routes each lead to the right WhatsApp channel, identifies fabrics from customer photos with vision models, and transcribes and answers voice messages.',
    delivered: [
      'Conversation flows & routing policy',
      'Fabric identification (vision)',
      'Voice interaction pipeline',
      'Evaluation + analytics dashboard',
    ],
    stack: ['FastAPI', 'AWS Lambda', 'WhatsApp API', 'LLM Vision', 'Vector DB'],
  },
  {
    client: 'Talboost · recruiting',
    title: 'AI-powered recruitment platform',
    summary:
      'Candidate screening, real-time AI feedback, and role-based portals on a multi-tenant architecture.',
    metrics: ['Real-time AI feedback', 'Multi-tenant by design'],
    problem:
      'A recruitment startup needed AI-driven screening, feedback generation, and role-based portal management without rebuilding for each new client.',
    solution:
      'Product architecture with AI feedback loops, scalable candidate flows, intelligent scoring, and tenant isolation from day one.',
    delivered: [
      'Product architecture design',
      'AI feedback loop implementation',
      'Scalability & multi-tenant plan',
      'Payment integration flows',
    ],
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'LLMs', 'Stripe'],
  },
];

export default function CaseStudies() {
  const ref = useReveal<HTMLElement>();
  const [openCase, setOpenCase] = useState(1);

  return (
    <section id="work" ref={ref} className="border-t border-[var(--border)] bg-black">
      <div className="max-w-[1240px] mx-auto px-8 py-[clamp(80px,10vw,130px)]">
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
          <p className="m-0 max-w-[340px] text-base leading-relaxed text-[var(--muted)]">
            Every system here shipped under real constraints — instrumented, documented, still
            running.
          </p>
        </div>

        <div className="flex flex-col gap-5 mt-16">
          {cases.map((c, i) => {
            const open = openCase === i;
            return (
              <article
                key={c.title}
                onClick={() => setOpenCase(open ? -1 : i)}
                className="reveal bg-gradient-to-b from-[var(--panel)] to-[var(--bg2)] border border-[var(--border)] rounded-[20px] px-[38px] py-9 cursor-pointer transition-all duration-300 hover:border-[var(--border-bright)] hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.7)]"
              >
                <div className="flex items-start justify-between gap-9 flex-wrap">
                  <div className="flex items-baseline gap-[26px] flex-[1_1_420px]">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--muted2)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--emerald)]">
                        {c.client}
                      </div>
                      <h3 className="mt-3 mb-0 font-semibold text-[26px] leading-[1.2] tracking-[-0.015em] text-[var(--text)]">
                        {c.title}
                      </h3>
                      <p className="mt-3 mb-0 max-w-[520px] text-base leading-relaxed text-[var(--muted)]">
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
                    <span className="w-[34px] h-[34px] flex-none rounded-full border border-[var(--border-light)] grid place-items-center font-mono text-sm text-[var(--muted)]">
                      {open ? '−' : '+'}
                    </span>
                  </div>
                </div>

                {open && (
                  <>
                    <div className="mt-[34px] pt-8 border-t border-[var(--border)] grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[34px]">
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
                        <div className="flex flex-col gap-2.5 mt-3.5">
                          {c.delivered.map((d) => (
                            <div key={d} className="text-[15px] leading-normal text-[var(--text-secondary)]">
                              {d}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-[30px]">
                      {c.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--muted)] bg-white/[0.02] border border-[var(--border)] rounded-[10px] px-4 py-[9px]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
