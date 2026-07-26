'use client';

import { useReveal } from '@/hooks/useReveal';

const stages = [
  {
    name: 'Discovery',
    desc: 'Goals, users, channels, data, latency and cost ceilings, risk surface.',
    artifacts: ['→ Requirements doc', '→ Risk assessment'],
  },
  {
    name: 'Architecture',
    desc: 'System design, tool contracts, data flows, roadmap, acceptance criteria.',
    artifacts: ['→ Architecture diagram', '→ Task backlog'],
  },
  {
    name: 'Implementation',
    desc: 'Build, integrate, instrument, and test against failures and edge cases.',
    artifacts: ['→ Working prototype', '→ Test coverage'],
  },
  {
    name: 'Launch',
    desc: 'Monitoring, evals, cost controls, and a plan for continuous improvement.',
    artifacts: ['→ Production release', '→ Observability plan'],
  },
];

export default function Process() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="process" ref={ref} className="border-t border-[var(--border)] bg-black">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-[clamp(80px,10vw,130px)]">
        <div className="reveal max-w-[700px]">
          <div className="flex items-center gap-3.5 mb-[26px]">
            <span className="w-7 h-px bg-[var(--emerald)]" />
            <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--emerald)]">
              Process
            </span>
          </div>
          <h2 className="m-0 font-bold text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.035em] text-[var(--text)]">
            Four stages. Each ends in an artifact.
          </h2>
        </div>

        <div className="reveal grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8 mt-16">
          {stages.map((st, i) => (
            <div key={st.name} className="pt-[26px] border-t border-[var(--border-light)]">
              <div className="flex items-center gap-3">
                <span className="w-[7px] h-[7px] rounded-full bg-[var(--emerald)]" />
                <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--muted2)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-5 mb-0 font-semibold text-xl tracking-[-0.015em] text-[var(--text)]">
                {st.name}
              </h3>
              <p className="mt-3 mb-0 text-[15px] leading-relaxed text-[var(--muted)]">{st.desc}</p>
              <div className="flex flex-col gap-2 mt-6">
                {st.artifacts.map((a) => (
                  <div
                    key={a}
                    className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-secondary)]"
                  >
                    {a}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
