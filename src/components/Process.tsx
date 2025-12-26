'use client';

import { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Discovery & Constraints',
    description: 'Goal, users, channels, data, latency/cost constraints, risk',
    outputs: ['Requirements doc', 'Risk assessment'],
  },
  {
    number: '02',
    title: 'Architecture & Plan',
    description: 'System design, tool contracts, data flows, roadmap, acceptance criteria',
    outputs: ['Architecture diagram', 'Task backlog'],
  },
  {
    number: '03',
    title: 'Implementation',
    description: 'Build, integrate, instrument, test for failures and edge cases',
    outputs: ['Working prototype', 'Test coverage'],
  },
  {
    number: '04',
    title: 'Launch & Iterate',
    description: 'Monitoring, evals, cost controls, continuous improvements',
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
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--emerald)]/30 to-transparent" />

      <div className="container">
        {/* Section Header */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16">
          <p className="text-[var(--emerald)] text-sm font-medium tracking-wide mb-3">
            HOW I WORK
          </p>
          <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold text-[var(--text)] mb-4">
            A clear path from idea to production
          </h2>
          <p className="text-[var(--muted)] text-lg">
            Reduce uncertainty with a structured process designed for AI systems.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="reveal relative"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%+8px)] w-[calc(100%-16px)] h-px bg-[var(--border)]">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--emerald)]/30" />
                </div>
              )}

              <div className="p-6 rounded-2xl bg-[var(--panel)] border border-[var(--border)] h-full">
                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[var(--emerald)] text-2xl font-bold font-mono">
                    {step.number}
                  </span>
                  <div className="flex-1 h-px bg-[var(--border)]" />
                </div>

                <h3 className="text-[var(--text)] text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-[var(--muted)] text-[15px] leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Outputs */}
                <div className="space-y-1.5">
                  {step.outputs.map((output) => (
                    <div key={output} className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-[var(--emerald)] flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4"
                        />
                      </svg>
                      <span className="text-sm text-[var(--muted)]">{output}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
