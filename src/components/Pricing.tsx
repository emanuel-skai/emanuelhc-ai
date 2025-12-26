'use client';

import { useEffect, useRef } from 'react';

const pricingOptions = [
  {
    title: '$200/hr Consulting',
    description: 'Get unstuck today. Leave with a plan and next actions.',
    price: '$200',
    unit: '/hour',
    bestFor: 'Architecture review, debugging, design decisions, fast implementation sessions',
    includes: ['Session notes', 'Action plan', 'Follow-up support via email'],
    cta: 'Book $200/hr',
    href: 'https://calendar.app.google/CGVjezzgzrPxkhMU8',
    featured: false,
  },
  {
    title: '50-Hour Block',
    description: 'Ship a full feature with priority support and dedicated focus.',
    price: '$10,000',
    unit: '/ 50 hours',
    bestFor: 'Building a full feature, shipping to production, or iterative sprints',
    includes: ['Priority scheduling', 'Async support', 'Weekly syncs', 'Documentation'],
    cta: 'Buy 50-hour block',
    href: '#discovery',
    featured: true,
  },
  {
    title: 'Free Discovery',
    description: 'Answer a few questions to qualify, then book 15 minutes.',
    price: 'Free',
    unit: '15 min',
    bestFor: 'Qualifying fit and clarifying scope before committing',
    includes: ['Scope assessment', 'Fit evaluation', 'Recommended next steps'],
    cta: 'Start discovery form',
    href: '#discovery',
    featured: false,
  },
];

export default function Pricing() {
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
    <section id="pricing" ref={sectionRef} className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-[var(--bg2)] to-[var(--bg)]" />

      {/* Accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 50%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 separator-emerald" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="reveal text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--emerald)]" />
            <p className="text-[var(--emerald)] text-sm font-medium tracking-widest">
              PRICING
            </p>
            <div className="h-px w-12 bg-[var(--emerald)]" />
          </div>
          <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[var(--text)] mb-5 tracking-tight">
            Clear, decisive pricing
          </h2>
          <p className="text-[var(--muted)] text-lg">
            Pick the option that fits your timeline and scope.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingOptions.map((option, index) => (
            <div
              key={option.title}
              className={`reveal relative rounded-2xl transition-all duration-500 ${
                option.featured
                  ? 'bg-gradient-to-b from-[var(--panel2)] to-[var(--panel)] md:-mt-4 md:mb-4'
                  : 'bg-[var(--panel)]'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Featured border glow */}
              {option.featured && (
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[var(--emerald)] via-[var(--emerald)]/20 to-transparent opacity-50" />
              )}

              <div
                className={`relative h-full rounded-2xl p-6 md:p-8 ${
                  option.featured
                    ? 'border border-[var(--emerald)]/30'
                    : 'border border-[var(--border)]'
                }`}
              >
                {option.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--emerald)] text-white text-xs font-semibold rounded-full shadow-lg shadow-[var(--emerald)]/30">
                    RECOMMENDED
                  </div>
                )}

                <div className="flex flex-col h-full">
                  <h3 className="text-[var(--text)] text-lg font-semibold mb-2">{option.title}</h3>
                  <p className="text-[var(--muted)] text-sm mb-6">{option.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${option.featured ? 'text-gradient' : 'text-[var(--text)]'}`}>
                      {option.price}
                    </span>
                    <span className="text-[var(--muted)] text-sm ml-1">{option.unit}</span>
                  </div>

                  {/* Best for */}
                  <div className="mb-6">
                    <p className="text-xs text-[var(--emerald)] font-medium tracking-wide mb-2">
                      BEST FOR
                    </p>
                    <p className="text-[var(--muted)] text-sm leading-relaxed">{option.bestFor}</p>
                  </div>

                  {/* Includes */}
                  <div className="mb-8 flex-1">
                    <p className="text-xs text-[var(--emerald)] font-medium tracking-wide mb-3">
                      INCLUDES
                    </p>
                    <ul className="space-y-2.5">
                      {option.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-[var(--emerald)]/10 flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-3 h-3 text-[var(--emerald)]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="text-sm text-[var(--muted)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <a
                    href={option.href}
                    target={option.href.startsWith('http') ? '_blank' : undefined}
                    rel={option.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`w-full text-center py-3.5 rounded-xl font-semibold transition-all ${
                      option.featured
                        ? 'btn-primary !rounded-xl'
                        : 'border border-[var(--border)] text-[var(--text)] hover:border-[var(--emerald)] hover:text-[var(--emerald)] hover:bg-[var(--emerald)]/5'
                    }`}
                  >
                    {option.featured ? <span>{option.cta}</span> : option.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="reveal mt-12 max-w-2xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-[var(--muted)]">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--emerald)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              NDA available on request
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--emerald)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              Payment upfront for blocks
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
