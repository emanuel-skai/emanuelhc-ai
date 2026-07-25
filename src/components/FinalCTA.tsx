'use client';

import { useReveal } from '@/hooks/useReveal';

export default function FinalCTA() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="discovery" ref={ref} className="relative border-t border-[var(--border)] bg-black overflow-hidden">
      {/* Emerald horizon */}
      <div
        className="absolute inset-x-0 bottom-0 h-[300px] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(6,78,59,0.22) 60%, rgba(0,0,0,0.85) 100%)',
        }}
      />
      <div className="reveal relative z-[2] max-w-[900px] mx-auto px-8 py-[clamp(90px,12vw,150px)] text-center">
        <div className="flex items-center justify-center gap-3.5 mb-[30px]">
          <span className="w-7 h-px bg-[var(--emerald)]" />
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--emerald)]">
            Next step
          </span>
        </div>
        <h2 className="m-0 font-bold text-[clamp(34px,5vw,64px)] leading-[1.02] tracking-[-0.04em] text-[var(--text)] [text-wrap:balance]">
          Book the hour. Leave with a plan.
        </h2>
        <p className="mt-[26px] mx-auto mb-0 max-w-[560px] text-lg leading-[1.65] text-[var(--muted)] [text-wrap:pretty]">
          Bring the architecture problem you&apos;ve been circling. One hour, written outcome, no
          retainer required.
        </p>
        <div className="flex flex-wrap justify-center gap-3.5 mt-11">
          <a
            href="https://calendar.app.google/1P4C3Q9yWTBsxLv38"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-semibold text-white bg-gradient-to-br from-[#10B981] to-[#0D9668] px-[34px] py-4 rounded-xl transition-all hover:-translate-y-px hover:shadow-[0_14px_40px_rgba(16,185,129,0.28)]"
          >
            Book a paid hour — $200
          </a>
          <a
            href="mailto:emanuel@skillfulai.io"
            className="text-[15px] font-semibold text-[var(--text)] bg-white/[0.03] border border-[var(--border-light)] px-[34px] py-4 rounded-xl transition-colors hover:border-white/[0.22]"
          >
            Email me directly
          </a>
        </div>
        <a
          href="#discovery-form"
          className="inline-block mt-[26px] font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)] hover:text-[var(--text-secondary)] transition-colors"
        >
          Or qualify for the free 15-min call ↓
        </a>
      </div>
    </section>
  );
}
