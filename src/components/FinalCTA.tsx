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
    <section ref={sectionRef} className="section relative border-t border-[var(--border)]">
      <div className="container relative z-10">
        <div className="reveal max-w-3xl">
          <p className="eyebrow mb-6">Ready to ship</p>
          <h2 className="text-[32px] md:text-[44px] lg:text-[52px] font-bold text-[var(--text)] mb-6 tracking-tight leading-[1.05]">
            Book time and start shipping
            <br />
            <span className="text-[var(--muted)]">this week.</span>
          </h2>
          <p className="text-[var(--muted)] text-lg md:text-xl mb-10 max-w-xl">
            Most engagements start with a single paid hour. Architecture review, debugging, or a design decision — leave with a written plan.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://calendar.app.google/1P4C3Q9yWTBsxLv38"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              <span>Book $200/hr</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#pricing" className="btn-secondary">
              See 50-hour block
            </a>
            <a href="#discovery" className="btn-ghost">
              Or start with free discovery
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
