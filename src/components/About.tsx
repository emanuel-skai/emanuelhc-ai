'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const expertise = [
  'LLM agent design and tool contracts',
  'RAG evaluation and grounding strategies',
  'Production FastAPI and AWS delivery',
  'Multimodal pipelines for business channels',
  'Observability, cost controls, and reliability testing',
];

export default function About() {
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
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <div className="reveal order-2 lg:order-1">
            <div className="relative">
              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border)]">
                <Image
                  src="/images/PFP_EMANUEL.jpeg"
                  alt="Emanuel Hernández Castillo"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-50" />
              </div>

              {/* Floating card — neutral */}
              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 px-5 py-4 rounded-xl bg-[var(--panel)] border border-[var(--border-bright)] shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--emerald)] shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  <div>
                    <p className="text-[var(--text)] text-sm font-medium leading-none mb-1">Available</p>
                    <p className="text-[var(--muted)] text-xs font-mono tracking-wide">2 engagements · Q2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="reveal order-1 lg:order-2">
            <p className="eyebrow mb-5">About</p>
            <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[var(--text)] mb-6 tracking-tight">
              Emanuel Hernández Castillo
            </h2>

            <div className="text-[var(--muted)] text-lg leading-relaxed mb-8 space-y-4">
              <p>
                I&apos;m the co-founder and CTO of{' '}
                <a
                  href="https://skillfulai.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text)] hover:text-[var(--emerald)] underline underline-offset-4 decoration-[var(--border-bright)] hover:decoration-[var(--emerald)] transition-colors"
                >
                  Skillful AI
                </a>
                , an enterprise AI platform serving clients across the automotive, healthcare, and
                digital commerce verticals in LATAM, Europe, and North America.
              </p>
              <p>
                My work centers on agentic AI systems that work under real enterprise constraints —
                regulated environments, latency ceilings, messy legacy data, and the expectation that
                agents don&apos;t hallucinate when money is on the line.
              </p>
              <p>
                Before{' '}
                <a
                  href="https://skillfulai.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text)] hover:text-[var(--emerald)] underline underline-offset-4 decoration-[var(--border-bright)] hover:decoration-[var(--emerald)] transition-colors"
                >
                  Skillful AI
                </a>
                : Intel (GPU software engineering), Apple (data science for App Store and Apple TV+),
                and a decade of ML work across growth-stage companies. Based in Costa Rica. Working
                across time zones.
              </p>
              <p>
                I also architect AI systems as a consultant for a small number of teams per year —
                particularly in healthcare, mobility, and financial operations — when the problem is
                genuinely complex.
              </p>
            </div>

            {/* Expertise */}
            <div className="space-y-3 mb-8">
              {expertise.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--emerald)]" />
                  <span className="text-[var(--text)] text-[15px]">{item}</span>
                </div>
              ))}
            </div>

            {/* Logos */}
            <div className="pt-8 border-t border-[var(--border)]">
              <p className="text-[var(--muted)] text-sm mb-4">
                Projects across LATAM, US, and EU
              </p>
              <div className="flex items-center gap-6 opacity-60">
                <Image
                  src="/images/SKAI-LOGO.png"
                  alt="Skillful AI"
                  width={100}
                  height={32}
                  className="h-6 w-auto object-contain"
                />
                <Image
                  src="/images/talboost-logo.svg"
                  alt="Talboost"
                  width={100}
                  height={32}
                  className="h-6 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
