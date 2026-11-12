'use client';

import { useReveal } from '@/hooks/useReveal';
import SectionHeader from '@/components/SectionHeader';

const totals = [
  { value: '585', label: 'backend commits' },
  { value: '169', label: 'frontend commits' },
  { value: 'v1.3.16', label: 'latest tagged release' },
  { value: '4', label: 'businesses with agents live' },
];

type Kind = 'ship' | 'incident';
type Entry = { date: string; kind: Kind; text: string; fix?: string };

// Generalized from the 2026 change log and incident notes. No client names,
// vendors or costs. Incidents stay in, each with the fix that followed.
const entries: Entry[] = [
  { date: 'Aug 28', kind: 'ship', text: 'Three production agents go live for an online gaming platform.' },
  {
    date: 'Early Sep',
    kind: 'incident',
    text: 'A provider ran out of credits. Every agent fell back to a pricier model, silently, for about ten days.',
    fix: 'Fallbacks now alert, and the chains start cheap.',
  },
  {
    date: 'Sep 13–16',
    kind: 'ship',
    text: 'Moved the whole multi-tenant platform to a new AWS account in about four days, as a full-dump restore.',
    fix: 'What broke: three hidden configs still pointing at the old account.',
  },
  {
    date: 'Sep 18',
    kind: 'incident',
    text: 'A truncated signing key sat behind a cache for two days. Our own cache flush exposed it and logged everyone out.',
    fix: 'Auth canary, plus validation when the key is written.',
  },
  {
    date: 'Sep 19–21',
    kind: 'incident',
    text: 'The assisted path produced no AI replies for 43 hours. Every health check stayed green.',
    fix: 'Key-rotation runbook. Health now counts AI output, not inbound traffic.',
  },
  {
    date: 'Sep 23',
    kind: 'ship',
    text: 'First release tagged from main, v1.2.0. The flagship agent goes back to full automatic.',
  },
  {
    date: 'Sep 24',
    kind: 'incident',
    text: 'A cost cut removed a network path that shared infrastructure relied on. Zero replies for 46 minutes.',
    fix: 'A dependency map before every cut.',
  },
  {
    date: 'Sep 25',
    kind: 'incident',
    text: 'A cache resize left automatic agents silent for about 11 hours. A listener never reconnected.',
    fix: 'A MUTE canary, and a mandatory restart after any cache change.',
  },
  {
    date: 'Sep 26–27',
    kind: 'ship',
    text: 'Database and compute cutovers on separate nights. Run-rate down, no long-term commitments.',
  },
  {
    date: 'Oct 10–16',
    kind: 'incident',
    text: 'A client’s WhatsApp account blocked 65% of outgoing messages over a billing setting, then lost its number for about two days.',
    fix: 'Reconnected. Delivery-status alarms proposed.',
  },
  {
    date: 'Oct 20',
    kind: 'incident',
    text: 'Empty AI turns, traced to a disabled strategy that was still selectable.',
    fix: 'A platform-wide kill switch.',
  },
  { date: 'Oct 29', kind: 'ship', text: 'Operator app published on Google Play.' },
  {
    date: 'Nov 12',
    kind: 'ship',
    text: 'Two-way Google Calendar sync, idea to production in one day, so a team can move over without a cutover date. Same day: the ten-month case study.',
  },
];

const kindLabel: Record<Kind, string> = { ship: 'Shipped', incident: 'Incident' };

export default function OperatingLog() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="log"
      ref={ref}
      aria-labelledby="log-heading"
      className="border-t border-[var(--border)] bg-[var(--bg2)]"
    >
      <div className="frame section-pad">
        <SectionHeader
          index="03"
          label="Operating log · 2026"
          id="log-heading"
          title="What shipped, what broke, what changed."
          aside="August to November 2026, from the commit log and the incident notes. The incidents stay in. They are where the rules came from."
        />

        <dl className="reveal cells grid-cols-2 md:grid-cols-4 mt-14 md:mt-16 m-0">
          {totals.map((t) => (
            <div key={t.label} className="!bg-[var(--bg2)] px-5 py-5 md:px-7 md:py-6 flex flex-col gap-2">
              <dt className="order-2 label label-sm">{t.label}</dt>
              <dd className="order-1 m-0 font-[family-name:var(--font-sora)] font-bold text-[26px] md:text-[30px] leading-none tracking-[-0.03em] text-[var(--text)] tnum">
                {t.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="reveal mt-12 flex flex-wrap items-center gap-x-6 gap-y-2" aria-hidden="true">
          <span className="flex items-center gap-2 label label-sm">
            <span className="status-dot is-static" /> Shipped
          </span>
          <span className="flex items-center gap-2 label label-sm">
            <span className="status-dot is-static is-incident" /> Incident → fix
          </span>
        </div>

        <ol className="reveal mt-6 m-0 p-0 list-none">
          {entries.map((e, i) => (
            <li
              key={`${e.date}-${i}`}
              className="grid grid-cols-[20px_minmax(0,1fr)] md:grid-cols-[120px_28px_minmax(0,1fr)] gap-x-3 md:gap-x-4"
            >
              <span className="hidden md:block label pt-[18px] text-[var(--text-secondary)] tnum">{e.date}</span>

              {/* Rail and node */}
              <span aria-hidden="true" className="relative flex justify-center">
                <span
                  className={`absolute left-1/2 -translate-x-1/2 w-px bg-[var(--border-light)] ${
                    i === 0 ? 'top-[24px]' : 'top-0'
                  } ${i === entries.length - 1 ? 'h-[24px]' : 'bottom-0'}`}
                />
                <span
                  className={`relative mt-[20px] w-[9px] h-[9px] rounded-full ${
                    e.kind === 'incident'
                      ? 'bg-[var(--bg2)] border-2 border-[var(--signal)]'
                      : 'bg-[var(--emerald)]'
                  }`}
                />
              </span>

              <div className="py-4 md:py-[14px] min-w-0">
                <p className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="md:hidden label text-[var(--text-secondary)] tnum">{e.date}</span>
                  <span
                    className={`label label-sm ${
                      e.kind === 'incident' ? 'text-[var(--signal)]' : 'text-[var(--emerald2)]'
                    }`}
                  >
                    {kindLabel[e.kind]}
                  </span>
                </p>
                <p className="mt-1.5 mb-0 max-w-[720px] text-[15px] md:text-base leading-relaxed text-[var(--text-secondary)] [text-wrap:pretty]">
                  {e.text}
                </p>
                {e.fix && (
                  <p className="mt-1.5 mb-0 max-w-[720px] text-[15px] leading-relaxed text-[var(--muted)] [text-wrap:pretty]">
                    <span aria-hidden="true" className="text-[var(--emerald2)]">→ </span>
                    {e.fix}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
