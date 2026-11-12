'use client';

import { useReveal } from '@/hooks/useReveal';

const totals = [
  { value: '585', label: 'backend commits' },
  { value: '169', label: 'frontend commits' },
  { value: 'v1.3.16', label: 'latest tagged release' },
  { value: '4', label: 'businesses with agents live' },
];

const months = [
  {
    month: 'Aug',
    entries: [
      'Three production agents go live for an online gaming platform.',
      'A payment flow for a retailer’s sales agent ships only after parity scorecards against the old path.',
      'Found a silent fallback: a provider ran dry and every agent quietly moved to a pricier model. Fallbacks now alert.',
    ],
  },
  {
    month: 'Sep',
    entries: [
      'Moved the whole multi-tenant agent platform to a new AWS account in about four days, with a full-dump restore.',
      'Releases by tag from main, with manual migrate and deploy gates. First one: v1.2.0.',
      'Flagship agent back on full automatic after five weeks of QA fixes and gated writes.',
      'Cut the run-rate within a week, one change per night, no long-term commitments.',
    ],
  },
  {
    month: 'Oct',
    entries: [
      'Billing moved to Paddle; first client payment through it.',
      'A client’s WhatsApp account blocked most outgoing messages for days. Reconnected, and delivery alarms proposed.',
      'Empty AI turns traced to a disabled strategy that was still selectable. Shipped a platform-wide kill switch.',
      'Operator mobile app published on Google Play.',
    ],
  },
  {
    month: 'Nov',
    entries: [
      'Paddle becomes the only payment processor.',
      'Scheduling product ships two-way Google Calendar sync, so a team can migrate without a cutover day.',
      'Published the ten-month case study of the flagship agent.',
    ],
  },
];

export default function OperatingLog() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="log"
      ref={ref}
      aria-labelledby="log-heading"
      className="border-t border-[var(--border)] bg-black scroll-mt-[68px]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-[clamp(80px,10vw,130px)]">
        <div className="reveal max-w-[700px]">
          <div className="flex items-center gap-3.5 mb-[26px]">
            <span className="w-7 h-px bg-[var(--emerald)]" />
            <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--emerald)]">
              2026 operating log
            </span>
          </div>
          <h2
            id="log-heading"
            className="m-0 font-bold text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.035em] text-[var(--text)]"
          >
            Four months, one platform, real clients
          </h2>
          <p className="mt-6 mb-0 text-lg leading-[1.65] text-[var(--muted)] [text-wrap:pretty]">
            August to November 2026, from the commit log and the incident notes.
          </p>
        </div>

        <dl className="reveal grid grid-cols-2 md:grid-cols-4 gap-px mt-14 m-0 bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden">
          {totals.map((t) => (
            <div key={t.label} className="bg-[var(--bg2)] px-5 py-5 md:px-6 flex flex-col-reverse gap-2">
              <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
                {t.label}
              </dt>
              <dd className="m-0 font-bold text-[26px] leading-none tracking-[-0.03em] text-[var(--text)] font-[family-name:var(--font-sora)] tabular-nums">
                {t.value}
              </dd>
            </div>
          ))}
        </dl>

        <ol className="reveal mt-14 mb-0 p-0 list-none flex flex-col">
          {months.map((m) => (
            <li
              key={m.month}
              className="grid grid-cols-[64px_1fr] md:grid-cols-[140px_1fr] gap-x-6 py-7 border-t border-[var(--border)] last:border-b"
            >
              <div className="flex items-start gap-3 pt-1">
                <span aria-hidden="true" className="mt-[5px] w-[7px] h-[7px] flex-none rounded-full bg-[var(--emerald)]" />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)]">
                  {m.month}
                  <span className="hidden md:inline text-[var(--muted2)]"> 2026</span>
                </span>
              </div>
              <ul className="m-0 p-0 list-none grid lg:grid-cols-2 gap-x-10 gap-y-3">
                {m.entries.map((e) => (
                  <li key={e} className="text-[15px] leading-relaxed text-[var(--muted)] [text-wrap:pretty]">
                    {e}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
