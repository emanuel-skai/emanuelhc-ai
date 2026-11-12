'use client';

import { useReveal } from '@/hooks/useReveal';

// Each rule is paired with the real event that produced or enforced it.
const practices = [
  {
    rule: 'The bench decides the release',
    example:
      'Rule changes run against a local clone first. A red bench means the change doesn’t ship; running it after publishing only confirms damage.',
  },
  {
    rule: 'Health means AI output, not plumbing',
    example:
      'One path produced no AI replies for 43 hours while every check said healthy. The gate is now “AI replies delivered in the last window”, split from human replies.',
  },
  {
    rule: 'Rules that matter live in tools',
    example:
      'A prompt forbade quoting a cat with dog prices and the model did it anyway once. A species check inside the pricing tool closed it for good.',
  },
  {
    rule: 'Writes need an explicit yes',
    example:
      'The agent books, moves or cancels only after summarizing the change and getting a “yes”. It exists because a “cancel my appointment” once went through with no confirmation.',
  },
  {
    rule: 'One change per window, at night',
    example:
      'The database and compute cutovers ran on separate nights at low volume, each with snapshots taken and the rollback written before the change.',
  },
  {
    rule: 'Measure every change',
    example:
      'Every row in the change log gets a 48-hour readout and a rollback. One change per agent at a time, so the readout means something.',
  },
  {
    rule: 'Cheapest model that clears the bar',
    example:
      'A model about 7× cheaper per conversation failed 9 of 24 critical safety cases and stayed out. With reasoning on and the write gate in place it scored 0; on 40 replayed real turns, 18 better, 19 tied, 3 worse.',
  },
  {
    rule: 'Post-mortems name their own trigger',
    example:
      'A truncated signing key sat behind a cache for two days; our own cache flush exposed it. The fix shipped with an auth canary and write-time validation.',
  },
];

export default function Practices() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="practice"
      ref={ref}
      aria-labelledby="practice-heading"
      className="border-t border-[var(--border)] bg-[var(--bg2)] scroll-mt-[68px]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-[clamp(80px,10vw,130px)]">
        <div className="reveal flex items-end justify-between gap-10 flex-wrap">
          <div className="max-w-[700px]">
            <div className="flex items-center gap-3.5 mb-[26px]">
              <span className="w-7 h-px bg-[var(--emerald)]" />
              <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--emerald)]">
                Practice
              </span>
            </div>
            <h2
              id="practice-heading"
              className="m-0 font-bold text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.035em] text-[var(--text)]"
            >
              How I run agents in production
            </h2>
          </div>
          <p className="m-0 max-w-[380px] text-base leading-relaxed text-[var(--muted)]">
            Almost none of this year&apos;s failures came from the model. Each rule below exists
            because something broke, or nearly did.
          </p>
        </div>

        <ol className="reveal grid md:grid-cols-2 gap-px mt-16 mb-0 p-0 list-none bg-[var(--border)] border border-[var(--border)] rounded-[20px] overflow-hidden">
          {practices.map((p, i) => (
            <li
              key={p.rule}
              className="bg-black px-6 py-7 md:px-[34px] md:py-[34px] grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 transition-colors duration-300 hover:bg-[var(--panel2)]"
            >
              <span className="font-mono text-[10px] leading-[28px] tracking-[0.2em] text-[var(--muted2)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 style={{ lineHeight: 1.3 }} className="m-0 font-semibold text-[19px] leading-[1.3] tracking-[-0.015em] text-[var(--text)]">
                {p.rule}
              </h3>
              <p className="col-start-2 m-0 text-[15px] leading-relaxed text-[var(--muted)] [text-wrap:pretty]">
                {p.example}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
