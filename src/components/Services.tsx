'use client';

import { useReveal } from '@/hooks/useReveal';

const services = [
  {
    name: 'LLM applications & agents',
    desc: 'Agent workflows, RAG systems, tool integrations, memory patterns, and guardrails on foundation models.',
    time: '1–4 weeks',
  },
  {
    name: 'Machine learning & analytics',
    desc: 'Forecasting, classification, recommendation, and anomaly detection models that decisions actually depend on.',
    time: '2–6 weeks',
  },
  {
    name: 'Data engineering & pipelines',
    desc: 'ETL workflows, lakes, feature stores, orchestration, and the validation that keeps models honest.',
    time: '2–4 weeks',
  },
  {
    name: 'Cloud architecture & backend',
    desc: 'Scalable APIs, serverless patterns, IaC, CI/CD, security hardening, and cost control on AWS.',
    time: '1–4 weeks',
  },
  {
    name: 'Intelligent automation',
    desc: 'Business process AI across WhatsApp, web, email, and API — with explicit logic for when a human takes over.',
    time: '2–6 weeks',
  },
  {
    name: 'Full-stack delivery',
    desc: 'End-to-end product build when AI is one piece of a larger system, database through UI.',
    time: '2–8 weeks',
  },
];

export default function Services() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="services" ref={ref} className="border-t border-[var(--border)] bg-[var(--bg2)]">
      <div className="max-w-[1240px] mx-auto px-8 py-[clamp(80px,10vw,130px)]">
        <div className="reveal max-w-[700px]">
          <div className="flex items-center gap-3.5 mb-[26px]">
            <span className="w-7 h-px bg-[var(--emerald)]" />
            <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--emerald)]">
              Capabilities
            </span>
          </div>
          <h2 className="m-0 font-bold text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.035em] text-[var(--text)]">
            From model to production, one owner
          </h2>
          <p className="mt-6 mb-0 text-lg leading-[1.65] text-[var(--muted)] [text-wrap:pretty]">
            Most AI projects die in the gap between the notebook and the load balancer. I own both
            ends.
          </p>
        </div>

        <div className="reveal grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-px mt-16 bg-[var(--border)] border border-[var(--border)] rounded-[20px] overflow-hidden">
          {services.map((s, i) => (
            <div
              key={s.name}
              className="bg-black px-[34px] py-[38px] flex flex-col gap-4 transition-colors duration-300 hover:bg-[var(--panel2)]"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted2)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--muted)]">
                  {s.time}
                </span>
              </div>
              <h3 className="m-0 font-semibold text-[21px] leading-[1.25] tracking-[-0.015em] text-[var(--text)]">
                {s.name}
              </h3>
              <p className="m-0 text-[15px] leading-relaxed text-[var(--muted)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
