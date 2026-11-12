import Link from 'next/link';

// Flagship numbers from src/content/writing/whatsapp-ai-agent-ten-months-production.md.
// Keep in sync with the article and with Flagship.tsx.
type Row = { who: string; value: string; pct: number; accent?: boolean };
type Metric = { label: string; note: string; rows: Row[] };

const metrics: Metric[] = [
  {
    label: 'Median first reply',
    note: '~20× faster',
    rows: [
      // 50 s against ~17 min (1,020 s) on the same line
      { who: 'Agent', value: '~50 s', pct: 4.9, accent: true },
      { who: 'Team', value: '~17 min', pct: 100 },
    ],
  },
  {
    label: 'Replies under 5 min',
    note: 'same line, same weeks',
    rows: [
      { who: 'Agent', value: '99.7%', pct: 99.7, accent: true },
      { who: 'Team', value: '38.9%', pct: 38.9 },
    ],
  },
  {
    label: 'Conversations left unanswered',
    note: 'March → November',
    rows: [
      { who: 'Mar', value: '72.8%', pct: 72.8 },
      { who: 'Nov', value: '7.8%', pct: 7.8, accent: true },
    ],
  },
];

export default function HeroReadout() {
  return (
    <figure
      aria-labelledby="readout-caption"
      className="m-0 w-full max-w-[560px] justify-self-center lg:justify-self-end panel bg-[var(--panel)]/95 shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
    >
      <header className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3 min-w-0">
          <span className="status-dot" aria-hidden="true" />
          <span className="label text-[var(--text-secondary)] truncate">Francesca · WhatsApp</span>
        </div>
        <span className="label label-sm px-2 py-1 rounded-[6px] border border-[var(--emerald-line)] text-[var(--emerald2)]">
          Mode: auto
        </span>
      </header>

      <div className="px-5 sm:px-6 py-2">
        {metrics.map((m, mi) => (
          <div key={m.label} className="py-5 border-b border-[var(--border)] last:border-b-0">
            <div className="flex items-baseline justify-between gap-4">
              <p className="m-0 label text-[var(--text-secondary)] tracking-[0.14em]">{m.label}</p>
              <span className="label label-sm hidden sm:inline">{m.note}</span>
            </div>
            <dl className="m-0 mt-3.5 flex flex-col gap-2.5">
              {m.rows.map((r, ri) => (
                <div key={r.who} className="grid grid-cols-[40px_minmax(0,1fr)_72px] items-center gap-3">
                  <dt className="label label-sm">{r.who}</dt>
                  <dd className="contents">
                    <span aria-hidden="true" className="block h-[6px] rounded-full bg-white/[0.04] overflow-hidden">
                      <span
                        className={`bar block h-full rounded-full ${r.accent ? 'bg-[var(--emerald)]' : 'bg-[var(--faint)]'}`}
                        style={{ width: `${Math.max(r.pct, 2)}%`, animationDelay: `${200 + mi * 140 + ri * 70}ms` }}
                      />
                    </span>
                    <span
                      className={`text-right font-[family-name:var(--font-sora)] font-semibold text-[17px] tracking-[-0.02em] tnum ${
                        r.accent ? 'text-[var(--text)]' : 'text-[var(--muted)]'
                      }`}
                    >
                      {r.value}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <figcaption
        id="readout-caption"
        className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 sm:px-6 py-4 border-t border-[var(--border)] bg-black/40 rounded-b-[var(--radius-lg)]"
      >
        <span className="label label-sm">
          Grooming spa chain, Bogotá · Sep 23 – Nov 10, 2026
        </span>
        <Link href="/writing/whatsapp-ai-agent-ten-months-production" className="label label-sm text-[var(--emerald2)] hover:text-[var(--emerald3)] transition-colors">
          Source →
        </Link>
      </figcaption>
    </figure>
  );
}
