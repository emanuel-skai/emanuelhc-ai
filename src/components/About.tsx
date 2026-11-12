'use client';

import Image from 'next/image';
import { useReveal } from '@/hooks/useReveal';
import AboutField from '@/components/visuals/AboutField';

const workingSet = [
  'WhatsApp agents that quote, book and hand off',
  'Tool contracts, write gates, grounding',
  'Regression benches before every release',
  'Model choice by cost per conversation',
  'AWS, Terraform, tag releases, canaries',
  'Incident response and post-mortems',
];

export default function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="relative border-t border-[var(--border)] bg-[var(--bg2)] overflow-hidden"
    >
      {/* Spirograph field bleeding off the right edge, away from the text */}
      <AboutField className="hidden lg:block absolute top-1/2 -right-[360px] w-[820px] h-[820px] -translate-y-1/2 pointer-events-none opacity-40" />

      <div className="frame section-pad relative z-[2] grid gap-[clamp(40px,6vw,88px)] lg:grid-cols-[minmax(240px,320px)_minmax(0,1fr)] items-start">
        <div className="reveal max-w-[320px]">
          <div className="relative rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border-light)] bg-[var(--panel)] aspect-[4/5]">
            <Image
              src="/images/PFP_EMANUEL.jpeg"
              alt="Emanuel Hernández Castillo"
              width={640}
              height={800}
              className="w-full h-full object-cover [filter:grayscale(0.3)_contrast(1.05)]"
            />
          </div>
          <ul className="m-0 mt-5 p-0 list-none flex flex-col gap-3">
            <li className="flex items-center gap-2.5 label text-[var(--text-secondary)]">
              <span className="status-dot" aria-hidden="true" />
              Taking 2 engagements per quarter
            </li>
            <li className="pl-[17px] label label-sm">Costa Rica (UTC−6) · ES / EN</li>
          </ul>
        </div>

        <div className="reveal max-w-[720px]">
          <p className="eyebrow m-0">
            <span className="eyebrow-index">05</span>
            <span aria-hidden="true" className="eyebrow-rule" />
            <span>About</span>
          </p>
          <h2
            id="about-heading"
            className="mt-6 mb-0 font-bold text-[clamp(32px,4vw,50px)] tracking-[-0.038em] text-[var(--text)]"
            style={{ lineHeight: 1.04 }}
          >
            Emanuel Hernández Castillo
          </h2>
          <p className="mt-7 mb-0 text-[18px] md:text-[19px] leading-[1.6] text-[var(--text-secondary)] [text-wrap:pretty]">
            I build and operate AI agents that do front-desk work on WhatsApp, and the platform
            they run on. In 2026 that platform became{' '}
            <a
              href="https://potenci.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text)] underline decoration-[var(--emerald)] decoration-1 underline-offset-4 hover:text-[var(--emerald2)] transition-colors"
            >
              potenci
            </a>
            , a business OS with native AI agents. I run its releases, its infrastructure and its
            night windows myself.
          </p>
          <p className="mt-5 mb-0 text-base md:text-[17px] leading-[1.7] text-[var(--muted)] [text-wrap:pretty]">
            I move fast and I don’t ship untested. A change goes out when the bench passes, at night
            when volume is low, with the rollback written first. Clients get a daily report that
            names failures one by one, including the ones I caused.
          </p>
          <p className="mt-5 mb-0 text-base md:text-[17px] leading-[1.7] text-[var(--muted)] [text-wrap:pretty]">
            Before potenci: co-founder and CTO of Skillful AI, GPU software at Intel, data science
            for App Store and Apple TV+ at Apple, and a decade of machine learning in growth-stage
            companies. I work in Spanish and English with teams in Latin America, the US and Europe.
          </p>

          <p className="mt-11 mb-0 label">Working set</p>
          <ul className="m-0 mt-4 p-0 list-none grid sm:grid-cols-2 border-t border-[var(--border)]">
            {workingSet.map((e) => (
              <li
                key={e}
                className="py-3.5 pr-4 border-b border-[var(--border)] text-[15px] leading-snug text-[var(--text-secondary)]"
              >
                {e}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
