'use client';

import { useReveal } from '@/hooks/useReveal';

const stats = [
  { label: 'Scale shipped', value: '20k', accent: '+', desc: 'messages a month handled by agents in production' },
  { label: 'Reach', value: '3', accent: '', desc: 'continents — LATAM, EU, North America' },
  { label: 'Experience', value: '10 yrs', accent: '', desc: 'ML and platform work — Intel, Apple, then CTO' },
  { label: 'Verticals', value: '4', accent: '', desc: 'car rental, healthcare billing, retail, recruiting' },
];

export default function StatsBand() {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} className="border-t border-[var(--border)] bg-[var(--bg2)]">
      <div className="max-w-[1240px] mx-auto px-8 py-[clamp(80px,10vw,120px)]">
        <h2 className="reveal m-0 max-w-[900px] font-bold text-[clamp(32px,4vw,52px)] leading-[1.08] tracking-[-0.035em] text-[var(--text)] [text-wrap:balance]">
          Demos are easy. <span className="text-[var(--muted2)]">Uptime is the product.</span>
        </h2>
        <div className="reveal grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-px mt-[60px] bg-[var(--border)] border border-[var(--border)] rounded-[20px] overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-black px-[30px] py-[34px]">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
                {s.label}
              </div>
              <div className="mt-4 font-bold text-[38px] tracking-[-0.03em] text-[var(--text)] font-[family-name:var(--font-sora)]">
                {s.value}
                {s.accent && <span className="text-[var(--emerald)]">{s.accent}</span>}
              </div>
              <div className="mt-2 text-[15px] text-[var(--muted)]">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
