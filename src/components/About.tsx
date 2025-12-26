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
              {/* Emerald glow behind image */}
              <div
                className="absolute -inset-4 opacity-30"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

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
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 p-4 rounded-xl bg-[var(--panel)] border border-[var(--border)] shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--emerald)]/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[var(--emerald)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[var(--text)] text-sm font-medium">Founder</p>
                    <p className="text-[var(--muted)] text-xs">Skillful AI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="reveal order-1 lg:order-2">
            <p className="text-[var(--emerald)] text-sm font-medium tracking-wide mb-3">
              ABOUT
            </p>
            <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold text-[var(--text)] mb-6">
              Emanuel Hernández Castillo
            </h2>

            <p className="text-[var(--muted)] text-lg leading-relaxed mb-8">
              I build AI systems that behave reliably under real-world constraints: tool failures,
              messy data, latency, and cost ceilings. As founder of Skillful AI and a senior AI/software
              architect, I&apos;ve shipped production systems across sales automation, recruitment,
              and enterprise operations.
            </p>

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
