'use client';

import { useReveal } from '@/hooks/useReveal';
import SectionHeader from '@/components/SectionHeader';

const CALENDAR = 'https://calendar.app.google/1P4C3Q9yWTBsxLv38';

const offers = [
  {
    name: 'Consulting hour',
    price: '$200',
    unit: '/ hour',
    desc: 'An architecture review, a live incident, or a design decision you keep circling. Written notes and an action plan after the call.',
    cta: 'Book an hour',
    href: CALENDAR,
    external: true,
  },
  {
    name: '50-hour block',
    price: '$10,000',
    unit: '/ 50 hrs',
    desc: 'One feature, shipped to production: built, benched, released behind gates, with a runbook. Priority scheduling, async support, weekly syncs.',
    cta: 'Apply via discovery',
    href: '#discovery',
    featured: true,
  },
  {
    name: 'Discovery',
    price: 'Free',
    unit: '/ 15 min',
    desc: 'A short form, then fifteen minutes to check fit and scope. If I’m not the right person, I’ll say so and point you to someone who is.',
    cta: 'Start discovery',
    href: '#discovery',
  },
];

const steps = [
  {
    name: 'The hour',
    desc: 'We look at the real system: logs, conversations, config. You get written notes and the next actions.',
  },
  {
    name: 'The build',
    desc: 'Work runs from a shared backlog. Every change passes the bench and ships behind gates, one at a time.',
  },
  {
    name: 'The handover',
    desc: 'Runbook, regression bench and a daily report your team can read. Whoever operates it next can see when it fails.',
  },
];

export default function Pricing() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="engage" ref={ref} aria-labelledby="engage-heading" className="border-t border-[var(--border)] bg-[var(--bg2)]">
      <div className="frame section-pad">
        <SectionHeader
          index="07"
          label="Engage"
          id="engage-heading"
          title="Start with one paid hour."
          aside="Bring the system and the problem. Anything bigger starts from the plan we write in that hour, not from a pitch."
        />

        <div className="reveal cells md:grid-cols-3 mt-14 md:mt-16">
          {offers.map((o) => (
            <div
              key={o.name}
              className={`relative p-6 md:p-8 flex flex-col ${o.featured ? '!bg-[var(--panel2)]' : '!bg-black'}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="label">{o.name}</span>
                {o.featured && <span className="label label-sm text-[var(--emerald2)]">For shipping</span>}
              </div>
              <p className="mt-6 mb-0 flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-sora)] font-bold text-[40px] leading-none tracking-[-0.04em] text-[var(--text)] tnum">
                  {o.price}
                </span>
                <span className="text-[15px] text-[var(--muted)]">{o.unit}</span>
              </p>
              <p className="mt-5 mb-0 text-[15px] leading-relaxed text-[var(--muted)] [text-wrap:pretty]">{o.desc}</p>
              <div className="mt-auto pt-8">
                <a
                  href={o.href}
                  {...(o.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={o.featured ? 'btn-primary w-full' : 'btn-secondary w-full'}
                >
                  {o.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-14">
          <p className="label m-0">How it runs</p>
          <ol className="m-0 mt-5 p-0 list-none grid gap-8 md:gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.name} className="pt-5 border-t border-[var(--border-light)]">
                <span className="label label-sm text-[var(--emerald2)] tnum">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 mb-0 font-semibold text-lg tracking-[-0.015em] text-[var(--text)]" style={{ lineHeight: 1.3 }}>
                  {s.name}
                </h3>
                <p className="mt-2 mb-0 text-[15px] leading-relaxed text-[var(--muted)] [text-wrap:pretty]">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="reveal mt-12 mb-0 label label-sm">NDA on request · blocks paid upfront</p>
      </div>
    </section>
  );
}
