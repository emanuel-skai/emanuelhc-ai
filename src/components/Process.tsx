'use client';

import { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Goals, users, channels, data, latency and cost constraints, risk.',
    outputs: ['Requirements doc', 'Risk assessment'],
  },
  {
    number: '02',
    title: 'Architecture',
    description: 'System design, tool contracts, data flows, roadmap, acceptance criteria.',
    outputs: ['Architecture diagram', 'Task backlog'],
  },
  {
    number: '03',
    title: 'Implementation',
    description: 'Build, integrate, instrument, test for failures and edge cases.',
    outputs: ['Working prototype', 'Test coverage'],
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Monitoring, evals, cost controls, continuous improvements.',
    outputs: ['Production release', 'Observability plan'],
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="section relative bg-[var(--bg2)]">
      {/* Top hairline separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[var(--border)]" />

      <div className="container">
        {/* Section Header — left-aligned editorial */}
        <div className="reveal max-w-2xl mb-20">
          <p className="eyebrow mb-5">How I work</p>
          <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[var(--text)] mb-5 tracking-tight">
            A clear path from idea to production
          </h2>
          <p className="text-[var(--muted)] text-lg leading-relaxed">
            Reduce uncertainty with a structured process designed for AI systems. Four stages, each ending in a concrete artifact.
          </p>
        </div>

        {/* Desktop: horizontal pipeline */}
        <div className="hidden lg:block reveal">
          {/* Pipeline track */}
          <div className="relative">
            {/* Horizontal line */}
            <div className="absolute top-[22px] left-0 right-0 h-px bg-[var(--border-light)]" />

            {/* Nodes row */}
            <div className="grid grid-cols-4 gap-8 relative">
              {steps.map((step, i) => (
                <div key={step.number} className="flex flex-col items-start">
                  {/* Node */}
                  <div className="relative">
                    <div
                      className={`w-[44px] h-[44px] rounded-full border flex items-center justify-center font-mono text-xs font-semibold tracking-wider ${
                        i === 0
                          ? 'bg-[var(--emerald)] text-black border-[var(--emerald)]'
                          : 'bg-[var(--bg2)] text-[var(--text)] border-[var(--border-bright)]'
                      }`}
                    >
                      {step.number}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Titles + content row */}
            <div className="grid grid-cols-4 gap-8 mt-6">
              {steps.map((step) => (
                <div key={step.number}>
                  <h3 className="text-[var(--text)] text-[19px] font-semibold mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[var(--muted)] text-[14px] leading-relaxed mb-5">
                    {step.description}
                  </p>
                  <div className="pt-4 border-t border-[var(--border)] space-y-1.5">
                    {step.outputs.map((output) => (
                      <div key={output} className="flex items-start gap-2">
                        <span className="text-[var(--muted2)] font-mono text-[11px] mt-[3px]">→</span>
                        <span className="text-[13px] text-[var(--text-secondary)]">{output}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical pipeline */}
        <div className="lg:hidden">
          <div className="relative pl-10">
            {/* Vertical rail */}
            <div className="absolute left-[21px] top-[22px] bottom-[22px] w-px bg-[var(--border-light)]" />

            {steps.map((step, i) => (
              <div
                key={step.number}
                className="reveal relative pb-10 last:pb-0"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Node */}
                <div
                  className={`absolute left-[-40px] top-0 w-[44px] h-[44px] rounded-full border flex items-center justify-center font-mono text-xs font-semibold tracking-wider ${
                    i === 0
                      ? 'bg-[var(--emerald)] text-black border-[var(--emerald)]'
                      : 'bg-[var(--bg2)] text-[var(--text)] border-[var(--border-bright)]'
                  }`}
                >
                  {step.number}
                </div>
                <h3 className="text-[var(--text)] text-lg font-semibold mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[var(--muted)] text-[15px] leading-relaxed mb-4">
                  {step.description}
                </p>
                <div className="pt-3 border-t border-[var(--border)] space-y-1.5">
                  {step.outputs.map((output) => (
                    <div key={output} className="flex items-start gap-2">
                      <span className="text-[var(--muted2)] font-mono text-[11px] mt-[3px]">→</span>
                      <span className="text-[13px] text-[var(--text-secondary)]">{output}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
