'use client';

import { useReveal } from '@/hooks/useReveal';

const services = [
  {
    name: 'WhatsApp & multichannel agents',
    desc: 'Agents that answer, quote from your catalog, book into your calendar and hand off to your team. Prices and availability come from tools, never from model memory.',
    time: '2–6 weeks',
  },
  {
    name: 'Agent operations',
    desc: 'For an agent that is already live and misbehaving: conversation audits, a regression bench, gated rule changes, daily reports the business can check.',
    time: '2–4 weeks',
  },
  {
    name: 'Booking & back-office integration',
    desc: 'Calendars, CRMs, ERPs and payments behind the agent, with confirmation gates on every write and two-way sync where people still work by hand.',
    time: '2–6 weeks',
  },
  {
    name: 'LLM ops & cost',
    desc: 'Model evals against your own bar, fallback chains that alert instead of failing silently, and cost per conversation as a tracked number.',
    time: '1–3 weeks',
  },
  {
    name: 'Cloud platform on AWS',
    desc: 'Terraform, tag-based releases with gates, canaries that check real output, migrations with a rollback written first.',
    time: '1–4 weeks',
  },
  {
    name: 'Machine learning & data',
    desc: 'Forecasting, classification and the pipelines that feed them, when the problem is not an agent.',
    time: '2–6 weeks',
  },
];

export default function Services() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="services" ref={ref} className="border-t border-[var(--border)] bg-[var(--bg2)] scroll-mt-[68px]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-[clamp(80px,10vw,130px)]">
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
