'use client';

import { useReveal } from '@/hooks/useReveal';

const CALENDAR = 'https://calendar.app.google/1P4C3Q9yWTBsxLv38';

export default function FinalCTA() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="discovery"
      ref={ref}
      aria-labelledby="cta-heading"
      className="relative border-t border-[var(--border)] bg-black overflow-hidden"
    >
      {/* Low emerald horizon */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[260px] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(6,78,59,0.2) 70%, rgba(0,0,0,0.6) 100%)',
        }}
      />
      <div className="frame relative z-[2] py-[clamp(88px,11vw,152px)] grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.7fr)] lg:items-end">
        <div className="reveal">
          <p className="eyebrow m-0">
            <span aria-hidden="true" className="eyebrow-rule" />
            <span>Next step</span>
          </p>
          <h2
            id="cta-heading"
            className="mt-6 mb-0 font-bold text-[clamp(38px,5.4vw,72px)] tracking-[-0.045em] text-[var(--text)]"
            style={{ lineHeight: 1 }}
          >
            Bring the system that keeps breaking.
          </h2>
          <p className="mt-6 mb-0 max-w-[540px] text-lg leading-[1.6] text-[var(--muted)] [text-wrap:pretty]">
            One hour, $200, a written plan at the end. No retainer.
          </p>
        </div>

        <div className="reveal flex flex-col gap-3 lg:items-stretch">
          <a href={CALENDAR} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a paid hour — $200
          </a>
          <a href="mailto:emanuel@skillfulai.io" className="btn-secondary">
            Email me directly
          </a>
          <a
            href="#discovery-form"
            className="mt-2 label label-sm text-[var(--muted)] hover:text-[var(--text-secondary)] transition-colors lg:text-center"
          >
            Or qualify for the free 15-min call ↓
          </a>
        </div>
      </div>
    </section>
  );
}
