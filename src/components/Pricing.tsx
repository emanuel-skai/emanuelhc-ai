'use client';

import { useReveal } from '@/hooks/useReveal';
import SectionHeader from '@/components/SectionHeader';
import { CALENDAR_HOUR } from '@/lib/site';

const offers = [
  {
    name: 'Consulting hour',
    price: '$200',
    unit: 'per hour',
    desc: 'An architecture question, a hiring decision, a vendor choice or a system that keeps breaking. Written notes and next actions after the call.',
    cta: 'Book an hour',
    href: CALENDAR_HOUR,
    external: true,
  },
  {
    name: '50-hour block',
    price: '$10,000',
    unit: '50 hours',
    desc: 'One system shipped to production, usually an AI agent: built, tested, released and documented. Priority scheduling and weekly syncs.',
    cta: 'Apply via discovery',
    href: '#discovery',
  },
  {
    name: 'Ongoing & scoped work',
    price: 'Custom',
    unit: 'scoped in discovery',
    desc: 'Fractional CTO, technical interviews and due diligence. Priced on scope and cadence once we know the team, the stage and the deadline, with a written proposal first.',
    cta: 'Start with a free call',
    href: '#discovery',
  },
];

export default function Pricing() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="pricing" ref={ref} aria-labelledby="pricing-heading" className="border-t border-[var(--border)] bg-[var(--bg2)]">
      <div className="frame section-pad">
        <SectionHeader
          label="Pricing"
          id="pricing-heading"
          title="Clear prices where the scope is clear."
          intro="The discovery call is always free. Everything else is either a fixed price or a written proposal."
        />

        <ul className="reveal cells md:grid-cols-3 mt-14 md:mt-16 mb-0 p-0 list-none">
          {offers.map((o) => (
            <li key={o.name} className="!bg-[var(--bg2)] p-7 md:p-8 flex flex-col">
              <h3 className="m-0 label">{o.name}</h3>
              <p className="mt-6 mb-0 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="font-[family-name:var(--font-sora)] font-semibold text-[40px] leading-none tracking-[-0.04em] text-[var(--text)] tnum">
                  {o.price}
                </span>
                <span className="text-[15px] text-[var(--muted)]">{o.unit}</span>
              </p>
              <p className="mt-5 mb-0 text-[15px] leading-relaxed text-[var(--muted)] [text-wrap:pretty]">{o.desc}</p>
              <div className="mt-auto pt-8">
                <a
                  href={o.href}
                  {...(o.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="btn-secondary w-full"
                >
                  {o.cta}
                </a>
              </div>
            </li>
          ))}
        </ul>

        <p className="reveal mt-8 mb-0 label label-sm">NDA on request · blocks paid upfront</p>
      </div>
    </section>
  );
}
