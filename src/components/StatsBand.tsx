'use client';

import Link from 'next/link';
import { useReveal } from '@/hooks/useReveal';

// Public numbers from the Francesca case study (one production WhatsApp agent,
// a grooming spa chain in Bogotá). Keep in sync with
// src/content/writing/whatsapp-ai-agent-ten-months-production.md.
const stats = [
  { label: 'Volume', value: '234k', accent: '+', desc: 'messages handled in ten months, across 6,300+ conversations' },
  { label: 'First reply', value: '~50', accent: ' s', desc: 'median, against ~17 minutes for the human team on the same line' },
  { label: 'Under 5 min', value: '99.7', accent: '%', desc: 'of AI replies. The team’s rate on the same line: 38.9%' },
  { label: 'Unanswered', value: '7.8', accent: '%', desc: 'of conversations get no reply, down from 72.8% in March' },
  { label: 'After hours', value: '87.4', accent: '%', desc: 'of after-hours conversations answered, up from 60.3%' },
  { label: 'Bookings', value: '377', accent: '', desc: 'appointments booked by the agent in its first seven weeks back on automatic' },
];

export default function StatsBand() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      aria-labelledby="stats-heading"
      className="border-t border-[var(--border)] bg-[var(--bg2)]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-[clamp(80px,10vw,120px)]">
        <h2
          id="stats-heading"
          className="reveal m-0 max-w-[900px] font-bold text-[clamp(32px,4vw,52px)] leading-[1.08] tracking-[-0.035em] text-[var(--text)] [text-wrap:balance]"
        >
          Demos are easy. <span className="text-[var(--muted2)]">Uptime is the product.</span>
        </h2>
        <p className="reveal mt-6 mb-0 max-w-[640px] text-lg leading-[1.65] text-[var(--muted)] [text-wrap:pretty]">
          One production WhatsApp agent, ten months in, for a grooming spa chain in Bogotá. These
          are the numbers the client checks in a daily report.
        </p>
        <dl className="reveal grid grid-cols-2 lg:grid-cols-3 gap-px mt-[52px] m-0 bg-[var(--border)] border border-[var(--border)] rounded-[20px] overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-black px-5 py-7 sm:px-[30px] sm:py-[34px] flex flex-col">
              <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
                {s.label}
              </dt>
              <dd className="m-0 mt-4 font-bold text-[clamp(30px,4vw,40px)] leading-none tracking-[-0.03em] text-[var(--text)] font-[family-name:var(--font-sora)] tabular-nums">
                {s.value}
                {s.accent && <span className="text-[var(--emerald)]">{s.accent}</span>}
              </dd>
              <dd className="m-0 mt-3 text-[14px] sm:text-[15px] leading-normal text-[var(--muted)]">
                {s.desc}
              </dd>
            </div>
          ))}
        </dl>
        <div className="reveal mt-[26px] flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
          <span>Sep 23 – Nov 10, 2026 unless noted · client anonymized</span>
          <Link
            href="/writing/whatsapp-ai-agent-ten-months-production"
            className="text-[var(--emerald2)] hover:text-[var(--emerald3)] transition-colors"
          >
            How these numbers happened →
          </Link>
        </div>
      </div>
    </section>
  );
}
