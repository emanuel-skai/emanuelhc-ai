'use client';

import { useReveal } from '@/hooks/useReveal';
import SectionHeader from '@/components/SectionHeader';

const services = [
  {
    name: 'WhatsApp & multichannel agents',
    desc: 'Agents that answer, quote from your catalog, book into your calendar and hand off to your team. Prices and availability come from tools, never from the model’s memory.',
    time: '2–6 weeks',
  },
  {
    name: 'Agent operations',
    desc: 'Your agent is live and misbehaving. Conversation audits, a regression bench, gated rule changes and a daily report your team can check.',
    time: '2–4 weeks',
  },
  {
    name: 'Booking & back-office integration',
    desc: 'Calendars, CRMs, ERPs and payments behind the agent. A confirmation gate on every write, and two-way sync where people still work by hand.',
    time: '2–6 weeks',
  },
  {
    name: 'LLM ops & cost',
    desc: 'Model evals against your own bar, fallbacks that alert instead of failing quietly, and cost per conversation as a number someone watches.',
    time: '1–3 weeks',
  },
  {
    name: 'Cloud platform on AWS',
    desc: 'Terraform, tag-based releases with gates, canaries that check real output, and migrations with the rollback written first.',
    time: '1–4 weeks',
  },
  {
    name: 'Machine learning & data',
    desc: 'Forecasting, classification and the pipelines that feed them, when the problem isn’t an agent.',
    time: '2–6 weeks',
  },
];

export default function Services() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="services" ref={ref} aria-labelledby="services-heading" className="border-t border-[var(--border)] bg-black">
      <div className="frame section-pad">
        <SectionHeader
          index="04"
          label="Services"
          id="services-heading"
          title="Six kinds of work. All of it ends in production."
          aside="I own the path from the model to the load balancer. There is no handoff between an AI team and an infrastructure team, because they are the same person."
        />

        <ul className="reveal mt-14 md:mt-16 m-0 p-0 list-none border-t border-[var(--border-light)]">
          {services.map((s, i) => (
            <li
              key={s.name}
              className="grid grid-cols-[40px_minmax(0,1fr)] md:grid-cols-[64px_minmax(0,0.85fr)_minmax(0,1.15fr)_120px] gap-x-4 md:gap-x-8 gap-y-2 py-6 md:py-7 border-b border-[var(--border)]"
            >
              <span className="label pt-[5px] tnum">{String(i + 1).padStart(2, '0')}</span>
              <h3
                className="m-0 font-semibold text-[19px] md:text-[21px] tracking-[-0.02em] text-[var(--text)]"
                style={{ lineHeight: 1.3 }}
              >
                {s.name}
              </h3>
              <p className="col-start-2 md:col-start-3 md:row-start-1 m-0 text-[15px] md:text-base leading-relaxed text-[var(--muted)] [text-wrap:pretty]">
                {s.desc}
              </p>
              <span className="col-start-2 md:col-start-4 md:row-start-1 label pt-[5px] text-[var(--text-secondary)] md:text-right">
                {s.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
