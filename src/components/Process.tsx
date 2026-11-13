'use client';

import { useReveal } from '@/hooks/useReveal';
import SectionHeader from '@/components/SectionHeader';

const steps = [
  {
    when: 'Step 1 · Free, 15 min',
    name: 'Discovery',
    body: 'Fifteen minutes on the problem, the team and the deadline. If I’m not the right person, I’ll say so and point you to someone who is.',
  },
  {
    when: 'Step 2 · Paid, scoped',
    name: 'First engagement',
    body: 'A paid hour, an interview loop or a scoped review. You get something written at the end: notes, an evaluation or a report with the next actions.',
  },
  {
    when: 'Step 3 · If it works',
    name: 'Ongoing',
    body: 'We keep going: fractional CTO on a fixed weekly cadence, or a 50-hour block to ship a specific system.',
  },
];

export default function Process() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="process" ref={ref} aria-labelledby="process-heading" className="border-t border-[var(--border)]">
      <div className="frame section-pad">
        <SectionHeader label="How we work" id="process-heading" title="Small first step. Then we decide." />

        <ol className="reveal m-0 mt-14 md:mt-16 p-0 list-none grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <li key={s.name} className="relative pt-6 border-t border-[var(--border-light)]">
              <span
                aria-hidden="true"
                className={`absolute -top-px left-0 h-px w-12 ${i === 0 ? 'bg-[var(--emerald)]' : 'bg-[var(--border-bright)]'}`}
              />
              <p className="m-0 label label-sm">{s.when}</p>
              <h3
                className="mt-4 mb-0 font-semibold text-[21px] tracking-[-0.02em] text-[var(--text)]"
                style={{ lineHeight: 1.25 }}
              >
                {s.name}
              </h3>
              <p className="mt-3 mb-0 max-w-[360px] text-[15px] md:text-base leading-[1.7] text-[var(--muted)] [text-wrap:pretty]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
