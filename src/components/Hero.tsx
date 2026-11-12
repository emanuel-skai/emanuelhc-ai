import Link from 'next/link';
import HeroField from '@/components/visuals/HeroField';
import HeroReadout from '@/components/HeroReadout';

const CALENDAR = 'https://calendar.app.google/1P4C3Q9yWTBsxLv38';
const FLAGSHIP = '/writing/whatsapp-ai-agent-ten-months-production';

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Interference field held at the frame; the readout panel is opaque. */}
      <HeroField className="absolute inset-0 w-full h-full pointer-events-none opacity-70" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[240px] pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, var(--bg) 100%)' }}
      />

      <div className="frame relative z-[2] pt-[clamp(48px,8vw,112px)] pb-[clamp(64px,8vw,112px)] grid gap-[clamp(44px,5vw,72px)] lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-center">
        <div className="flex flex-col items-start">
          <p className="eyebrow m-0">
            <span aria-hidden="true" className="eyebrow-rule hidden sm:block" />
            <span>AI systems architect · Building potenci</span>
          </p>

          <h1
            id="hero-heading"
            className="mt-7 mb-0 font-bold text-[clamp(42px,5.6vw,82px)] tracking-[-0.045em] text-[var(--text)]"
            style={{ lineHeight: 1 }}
          >
            AI agents on the front desk.{' '}
            <span className="text-[var(--muted)]">Operated like infrastructure.</span>
          </h1>

          <p className="mt-8 mb-0 max-w-[580px] text-[18px] md:text-[19px] leading-[1.6] text-[var(--text-secondary)] [text-wrap:pretty]">
            I build WhatsApp agents that answer, quote and book for real businesses, and I run the
            platform under them: runtime, releases, canaries, on-call. Nothing ships until the
            bench passes.
          </p>

          <div className="mt-10 w-full sm:w-auto flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
            <a href={CALENDAR} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a paid hour — $200
            </a>
            <a href="#discovery" className="btn-secondary">
              Free 15-min discovery
            </a>
          </div>
          <p className="mt-4 mb-0 text-sm text-[var(--muted)]">
            Two consulting engagements per quarter.{' '}
            <Link href={FLAGSHIP} className="link-arrow font-medium">
              Read the ten-month case study <span aria-hidden="true" className="arrow">→</span>
            </Link>
          </p>

          <dl className="mt-12 m-0 pt-6 w-full max-w-[580px] border-t border-[var(--border)] flex flex-wrap gap-x-10 gap-y-3">
            <div className="flex items-baseline gap-3">
              <dt className="label label-sm">Before</dt>
              <dd className="m-0 label text-[var(--muted)]">Intel · Apple · Skillful AI</dd>
            </div>
            <div className="flex items-baseline gap-3">
              <dt className="label label-sm">Now</dt>
              <dd className="m-0 label">
                <a
                  href="https://potenci.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-[var(--emerald2)] transition-colors"
                >
                  potenci ↗
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <HeroReadout />
      </div>
    </section>
  );
}
