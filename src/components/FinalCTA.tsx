'use client';

import { useEffect, useRef } from 'react';

export default function FinalCTA() {
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
    <section ref={sectionRef} className="section relative">
      {/* Subtle emerald glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(16, 185, 129, 0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="container relative z-10">
        <div className="reveal text-center max-w-2xl mx-auto">
          <h2 className="text-[32px] md:text-[44px] lg:text-[52px] font-bold text-[var(--text)] mb-6">
            Let&apos;s talk about your project
          </h2>
          <p className="text-[var(--muted)] text-lg md:text-xl mb-10 max-w-lg mx-auto">
            15 minutes. No commitment. Find out if we&apos;re the right fit.
          </p>

          {/* CTA */}
          <a href="#discovery" className="btn-primary">
            <span>Start free discovery</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
