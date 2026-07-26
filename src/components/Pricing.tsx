'use client';

import { useReveal } from '@/hooks/useReveal';

export default function Pricing() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="engage" ref={ref} className="border-t border-[var(--border)] bg-black">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-[clamp(80px,10vw,130px)]">
        <div className="reveal max-w-[700px]">
          <div className="flex items-center gap-3.5 mb-[26px]">
            <span className="w-7 h-px bg-[var(--emerald)]" />
            <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--emerald)]">
              Engagement
            </span>
          </div>
          <h2 className="m-0 font-bold text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.035em] text-[var(--text)]">
            Start with one hour
          </h2>
          <p className="mt-6 mb-0 text-lg leading-[1.65] text-[var(--muted)]">
            Most engagements start with a single paid hour and a written plan. Scale up only if
            it&apos;s worth it.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 mt-[60px]">
          {/* Consulting hour */}
          <div className="reveal bg-gradient-to-b from-[var(--panel)] to-[var(--bg2)] border border-[var(--border)] rounded-[20px] p-[34px] flex flex-col transition-all duration-300 hover:border-[var(--border-bright)] hover:-translate-y-0.5">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
              Consulting hour
            </div>
            <div className="mt-[22px] font-bold text-[40px] tracking-[-0.035em] text-[var(--text)] font-[family-name:var(--font-sora)]">
              $200
              <span className="font-[family-name:var(--font-inter)] text-base font-normal text-[var(--muted)]"> / hour</span>
            </div>
            <p className="mt-[18px] mb-0 text-[15px] leading-relaxed text-[var(--muted)]">
              Architecture review, debugging, or a hard design decision. You leave with notes and an
              action plan.
            </p>
            <a
              href="https://calendar.app.google/1P4C3Q9yWTBsxLv38"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto pt-[30px] text-[15px] font-semibold text-[var(--emerald2)] hover:text-[var(--emerald3)] transition-colors"
            >
              Book an hour →
            </a>
          </div>

          {/* 50-hour block — recommended */}
          <div className="reveal relative bg-gradient-to-b from-[var(--panel2)] to-[#050505] border border-[rgba(16,185,129,0.28)] rounded-[20px] p-[34px] flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="absolute top-[22px] right-[22px] font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--emerald)]">
              Recommended
            </div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
              50-hour block
            </div>
            <div className="mt-[22px] font-bold text-[40px] tracking-[-0.035em] text-[var(--text)] font-[family-name:var(--font-sora)]">
              $10,000
              <span className="font-[family-name:var(--font-inter)] text-base font-normal text-[var(--muted)]"> / 50 hrs</span>
            </div>
            <p className="mt-[18px] mb-0 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              Ship a full feature to production. Priority scheduling, async support, weekly syncs,
              documentation.
            </p>
            <a
              href="#discovery"
              className="mt-auto pt-[30px] text-[15px] font-semibold text-[var(--emerald2)] hover:text-[var(--emerald3)] transition-colors"
            >
              Apply via discovery →
            </a>
          </div>

          {/* Discovery */}
          <div className="reveal bg-gradient-to-b from-[var(--panel)] to-[var(--bg2)] border border-[var(--border)] rounded-[20px] p-[34px] flex flex-col transition-all duration-300 hover:border-[var(--border-bright)] hover:-translate-y-0.5">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
              Discovery
            </div>
            <div className="mt-[22px] font-bold text-[40px] tracking-[-0.035em] text-[var(--text)] font-[family-name:var(--font-sora)]">
              Free
              <span className="font-[family-name:var(--font-inter)] text-base font-normal text-[var(--muted)]"> / 15 min</span>
            </div>
            <p className="mt-[18px] mb-0 text-[15px] leading-relaxed text-[var(--muted)]">
              A short qualification form, then fifteen minutes to check fit and scope. No pitch.
            </p>
            <a
              href="#discovery"
              className="mt-auto pt-[30px] text-[15px] font-semibold text-[var(--emerald2)] hover:text-[var(--emerald3)] transition-colors"
            >
              Start discovery →
            </a>
          </div>
        </div>

        <div className="mt-[26px] font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
          NDA on request · blocks paid upfront
        </div>
      </div>
    </section>
  );
}
