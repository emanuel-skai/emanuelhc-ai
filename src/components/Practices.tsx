'use client';

import { useReveal } from '@/hooks/useReveal';
import SectionHeader from '@/components/SectionHeader';

// Each rule is paired with the real event that produced or enforced it.
const practices = [
  {
    rule: 'The bench decides the release',
    trigger:
      'Rule changes run against a local clone first. A red bench means the change doesn’t ship. Running it after publishing only measures the damage.',
  },
  {
    rule: 'Health means AI output, not plumbing',
    trigger:
      'One path sent zero AI replies for 43 hours while every check said healthy. The gate now counts AI replies delivered in the last window, split from human ones.',
  },
  {
    rule: 'Rules that matter live in tools',
    trigger:
      'The prompt said never to quote a cat at dog prices. The model did it once anyway. A species check inside the pricing tool closed it for good.',
  },
  {
    rule: 'Writes need an explicit yes',
    trigger:
      'A “cancel my appointment” once went through without confirmation. Now the agent summarizes every booking, move or cancellation and waits for a “yes”.',
  },
  {
    rule: 'One change per window, at night',
    trigger:
      'The database and compute cutovers ran on separate nights at low volume. Snapshots first, rollback written before the change.',
  },
  {
    rule: 'Measure every change',
    trigger:
      'Every row in the change log gets a 48-hour readout and a rollback. One change per agent at a time, so the readout means something.',
  },
  {
    rule: 'Cheapest model that clears the bar',
    trigger:
      'A model about 7× cheaper per conversation failed 9 of 24 critical safety cases and stayed out. With reasoning on and the write gate in place: 0 critical. On 40 replayed real turns: 18 better, 19 tied, 3 worse.',
  },
  {
    rule: 'Post-mortems name their own trigger',
    trigger:
      'A truncated signing key hid behind a cache for two days. Our own cache flush exposed it and logged everyone out. The fix shipped with an auth canary and write-time validation.',
  },
];

export default function Practices() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="practice"
      ref={ref}
      aria-labelledby="practice-heading"
      className="border-t border-[var(--border)] bg-black"
    >
      <div className="frame section-pad">
        <SectionHeader
          index="02"
          label="Practice"
          id="practice-heading"
          title="Rules written after something broke."
          aside="Almost none of this year’s failures came from the model. They came from config, plumbing and fallbacks that failed quietly. Each rule is the fix that stayed."
        />

        <div className="reveal mt-14 md:mt-16">
          <div
            aria-hidden="true"
            className="hidden md:grid grid-cols-[64px_minmax(0,0.85fr)_minmax(0,1.15fr)] gap-x-8 pb-3 label label-sm"
          >
            <span>No.</span>
            <span>Rule</span>
            <span>Why it exists</span>
          </div>
          <ol className="m-0 p-0 list-none border-t border-[var(--border-light)]">
            {practices.map((p, i) => (
              <li
                key={p.rule}
                className="grid grid-cols-[40px_minmax(0,1fr)] md:grid-cols-[64px_minmax(0,0.85fr)_minmax(0,1.15fr)] gap-x-4 md:gap-x-8 gap-y-2 py-6 md:py-7 border-b border-[var(--border)]"
              >
                <span className="label pt-[5px] text-[var(--emerald2)] tnum">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="m-0 font-semibold text-[19px] md:text-[21px] tracking-[-0.02em] text-[var(--text)]"
                  style={{ lineHeight: 1.3 }}
                >
                  {p.rule}
                </h3>
                <p className="col-start-2 md:col-start-3 md:row-start-1 m-0 text-[15px] md:text-base leading-relaxed text-[var(--muted)] [text-wrap:pretty]">
                  {p.trigger}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
