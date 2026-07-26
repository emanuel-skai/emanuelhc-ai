'use client';

import Image from 'next/image';
import { useReveal } from '@/hooks/useReveal';
import AboutField from '@/components/visuals/AboutField';

const expertise = [
  'LLM agent design and tool contracts',
  'RAG evaluation and grounding strategy',
  'Production FastAPI and AWS delivery',
  'Multimodal pipelines for business channels',
  'Observability, cost controls, reliability testing',
  'Regulated and latency-bound environments',
];

export default function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="about" ref={ref} className="relative border-t border-[var(--border)] bg-[var(--bg2)] overflow-hidden">
      {/* Extended spirograph field bleeding off the right edge */}
      <AboutField className="hidden md:block absolute top-1/2 -right-[320px] w-[820px] h-[820px] -translate-y-1/2 pointer-events-none opacity-55" />

      <div className="relative z-[2] max-w-[1240px] mx-auto px-6 md:px-8 py-[clamp(80px,10vw,130px)] grid lg:grid-cols-[minmax(260px,340px)_minmax(320px,1fr)] gap-[clamp(40px,6vw,80px)] items-start">
        <div className="reveal">
          <div className="relative rounded-[20px] overflow-hidden border border-[var(--border-light)] bg-[var(--panel)] aspect-[4/5] grid place-items-center">
            <Image
              src="/images/PFP_EMANUEL.jpeg"
              alt="Emanuel Hernández Castillo"
              width={680}
              height={850}
              className="w-full h-full object-cover [filter:grayscale(0.25)_contrast(1.05)]"
            />
          </div>
          <div className="flex items-center gap-2.5 mt-5">
            <span className="status-dot" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-secondary)]">
              Available · 2 engagements, Q3
            </span>
          </div>
          <div className="mt-3.5 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
            Costa Rica · all time zones
          </div>
        </div>

        <div className="reveal">
          <div className="flex items-center gap-3.5 mb-[26px]">
            <span className="w-7 h-px bg-[var(--emerald)]" />
            <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--emerald)]">
              About
            </span>
          </div>
          <h2 className="m-0 font-bold text-[clamp(30px,3.6vw,44px)] leading-[1.06] tracking-[-0.035em] text-[var(--text)]">
            Emanuel Hernández Castillo
          </h2>
          <p className="mt-7 mb-0 max-w-[620px] text-lg leading-[1.65] text-[var(--text-secondary)] [text-wrap:pretty]">
            I&apos;m co-founder and CTO of{' '}
            <a
              href="https://skillful.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text)] border-b border-[rgba(16,185,129,0.5)] hover:text-[var(--emerald2)] transition-colors"
            >
              Skillful AI
            </a>
            , an enterprise AI platform serving automotive, healthcare, and digital commerce clients
            across three continents.
          </p>
          <p className="mt-5 mb-0 max-w-[620px] text-[17px] leading-[1.65] text-[var(--muted)] [text-wrap:pretty]">
            Before that: GPU software engineering at Intel, data science for App Store and Apple
            TV+ at Apple, and a decade of ML across growth-stage companies. The through-line is
            systems that hold up when the demo ends.
          </p>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-px mt-11 bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden">
            {expertise.map((e) => (
              <div key={e} className="bg-black px-[22px] py-5 text-[15px] leading-normal text-[var(--text-secondary)]">
                {e}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
