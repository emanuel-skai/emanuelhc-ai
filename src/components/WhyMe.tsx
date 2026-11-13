'use client';

import Link from 'next/link';
import { useReveal } from '@/hooks/useReveal';
import { FLAGSHIP_CASE } from '@/lib/site';

const proofs = [
  {
    title: 'Trained where engineering is unforgiving.',
    body: 'GPU software at Intel, then data science for Apple TV+, the App Store and Apple Music. Large systems, where a decision gets measured before it ships.',
  },
  {
    title: 'I have sat in the CTO chair.',
    body: 'After leading ML teams, I co-founded Skillful AI, an enterprise agentic AI platform, and ran its engineering as CTO: architecture, hiring, clients and investors.',
  },
  {
    title: 'I still run AI in production.',
    body: 'Today I build potenci, a business OS with native AI agents, and operate agents for real businesses. One of them answers customers on WhatsApp in about 50 seconds; the human team took about 17 minutes.',
    link: { href: FLAGSHIP_CASE, label: 'Read the case study' },
  },
];

export default function WhyMe() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="about" ref={ref} aria-labelledby="about-heading" className="border-t border-[var(--border)] bg-[var(--bg2)]">
      <div className="frame section-pad grid gap-12 lg:grid-cols-[minmax(240px,380px)_minmax(0,1fr)] lg:gap-[clamp(48px,7vw,112px)] items-start">
        <div className="reveal lg:sticky lg:top-[calc(var(--nav-h)+40px)]">
          <p className="eyebrow m-0">
            <span aria-hidden="true" className="eyebrow-rule" />
            <span>Why me</span>
          </p>
          <h2
            id="about-heading"
            className="mt-5 mb-0 font-semibold text-[clamp(32px,4vw,52px)] tracking-[-0.035em] text-[var(--text)]"
            style={{ lineHeight: 1.06 }}
          >
            Judgment from building, not from advising.
          </h2>
        </div>

        <ol className="m-0 p-0 list-none border-b border-[var(--border)]">
          {proofs.map((p) => (
            <li key={p.title} className="reveal py-9 md:py-10 border-t border-[var(--border)]">
              <h3
                className="m-0 font-semibold text-[21px] md:text-[23px] tracking-[-0.02em] text-[var(--text)]"
                style={{ lineHeight: 1.25 }}
              >
                {p.title}
              </h3>
              <p className="mt-3 mb-0 max-w-[620px] text-base md:text-[17px] leading-[1.7] text-[var(--muted)] [text-wrap:pretty]">
                {p.body}
              </p>
              {p.link && (
                <Link href={p.link.href} className="link-arrow mt-5 text-[15px]">
                  {p.link.label} <span aria-hidden="true" className="arrow">→</span>
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
