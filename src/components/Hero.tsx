'use client';

import HeroField from '@/components/visuals/HeroField';
import AvatarGeometry from '@/components/visuals/AvatarGeometry';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[calc(100vh-68px)] flex items-center overflow-hidden">
      {/* Mirrored interference field held at the frame */}
      <HeroField className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-[300px] pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 60%, #000 100%)' }}
      />

      <div className="relative z-[2] max-w-[1320px] mx-auto px-6 md:px-8 pt-[64px] pb-[70px] md:pt-[100px] md:pb-[90px] w-full grid lg:grid-cols-[minmax(300px,0.9fr)_minmax(340px,1fr)] gap-[clamp(24px,4vw,60px)] items-center">
        {/* Left — geometry resolving into the brand avatar */}
        <div className="relative justify-self-center w-full max-w-[420px] lg:max-w-[660px] aspect-[1.18/1] max-h-[min(40vh,360px)] lg:max-h-[min(62vh,560px)] order-2 lg:order-1">
          <AvatarGeometry className="absolute inset-0 w-full h-full pointer-events-none" />
        </div>

        {/* Right — the message */}
        <div className="max-w-[640px] flex flex-col items-start text-left order-1 lg:order-2">
          <div className="flex items-center gap-3.5 mb-[34px]">
            <span className="w-7 h-px bg-[var(--emerald)]" />
            <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--emerald)]">
              Co-founder &amp; CTO · Skillful AI
            </span>
          </div>

          <h1 className="m-0 font-bold text-[clamp(40px,4.8vw,74px)] leading-[1.03] tracking-[-0.04em] text-[var(--text)] [text-wrap:balance]">
            Agentic AI that survives production.
          </h1>

          <p className="mt-8 mb-0 max-w-[640px] text-[19px] leading-[1.65] text-[var(--text-secondary)] [text-wrap:pretty]">
            I architect enterprise agent systems for companies across LATAM, Europe, and North
            America — regulated data, latency ceilings, legacy mess, and no tolerance for a
            hallucination when money moves.
          </p>
          <p className="mt-3.5 mb-0 max-w-[620px] text-base leading-relaxed text-[var(--muted)]">
            Two consulting engagements open per quarter.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 mt-10">
            <a
              href="https://calendar.app.google/1P4C3Q9yWTBsxLv38"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-semibold text-white bg-gradient-to-br from-[#10B981] to-[#0D9668] px-[34px] py-4 rounded-xl transition-all hover:-translate-y-px hover:shadow-[0_14px_40px_rgba(16,185,129,0.28)]"
            >
              Book a paid hour — $200
            </a>
            <a
              href="#discovery"
              className="text-[15px] font-semibold text-[var(--text)] bg-white/[0.03] border border-[var(--border-light)] px-[34px] py-4 rounded-xl transition-all hover:border-white/[0.22] hover:bg-white/[0.05]"
            >
              Free 15-min discovery
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-10 md:mt-14 pt-[26px] border-t border-[var(--border)] w-full max-w-[480px] font-mono text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--muted2)]">
            <span>Track record</span>
            <span className="text-[var(--muted)]">Intel</span>
            <span className="text-[#333]">/</span>
            <span className="text-[var(--muted)]">Apple</span>
            <span className="text-[#333]">/</span>
            <a
              href="https://skillful.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--emerald2)] transition-colors"
            >
              Skillful AI ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
