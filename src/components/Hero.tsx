'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

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

    const elements = heroRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Generate rotated ellipses for spirograph effect
  const ellipseCount = 12;
  const ellipses = Array.from({ length: ellipseCount }, (_, i) => {
    const rotation = (i * 180) / ellipseCount;
    return rotation;
  });

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Content */}
      <div className="container relative z-10 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <div className="max-w-2xl">
            {/* Status badge */}
            <div className="reveal flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--panel)]/80 border border-[var(--border)] backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-white/60" />
                <span className="text-sm text-[var(--muted)]">Co-founder &amp; CTO · Skillful AI</span>
              </div>
            </div>

            {/* Main headline */}
            <h1 className="reveal text-[40px] md:text-[52px] lg:text-[60px] font-bold text-[var(--text)] leading-[1.05] mb-6 tracking-tight">
              Agentic AI that{' '}
              <span className="text-gradient">works</span>
              <br />
              <span className="text-[var(--text-secondary)]">in production.</span>
            </h1>

            {/* Subheadline */}
            <p className="reveal text-[17px] md:text-[19px] text-[var(--muted)] leading-relaxed mb-10 max-w-xl">
              I&apos;m the co-founder and CTO of Skillful AI — building enterprise agentic AI systems
              for companies in LATAM, Europe, and North America. I also take on a limited number of
              consulting engagements with teams working on complex AI architecture problems.
            </p>

            {/* CTAs */}
            <div className="reveal flex flex-wrap gap-4 mb-12">
              <a href="#discovery" className="btn-primary group">
                <span>Free 15-min discovery</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="https://calendar.app.google/1P4C3Q9yWTBsxLv38"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Book $200/hr
              </a>
              <a href="#process" className="btn-ghost group">
                See how I work
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Social proof */}
            <div className="reveal flex items-center gap-3 text-sm text-[var(--muted)]">
              <span>Previously at</span>
              <span className="text-[var(--text)] font-medium">Intel</span>
              <span className="text-[var(--border-bright)]">&</span>
              <span className="text-[var(--text)] font-medium">Apple</span>
              <span className="text-[var(--border-bright)]">·</span>
              <span>Now building</span>
              <span className="text-[var(--emerald)] font-medium">Skillful AI</span>
            </div>
          </div>

          {/* Right - Spirograph Visual */}
          <div className="reveal flex flex-col justify-center items-center mt-8 lg:mt-0">
            <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px]">
              {/* Outer glow */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
                  filter: 'blur(60px)',
                }}
              />

              {/* Spirograph SVG */}
              <svg
                viewBox="0 0 400 400"
                className="absolute inset-0 w-full h-full animate-spin-slow"
                style={{ animationDuration: '80s' }}
              >
                <defs>
                  <linearGradient id="spirographGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#064E3B" />
                  </linearGradient>
                </defs>

                {/* Rotated ellipses creating spirograph pattern */}
                <g fill="none" stroke="url(#spirographGradient)" strokeWidth="1.5" opacity="0.7">
                  {ellipses.map((rotation, i) => (
                    <ellipse
                      key={i}
                      cx="200"
                      cy="200"
                      rx="140"
                      ry="70"
                      transform={`rotate(${rotation} 200 200)`}
                      style={{
                        opacity: 0.5 + (i / ellipseCount) * 0.5,
                      }}
                    />
                  ))}
                </g>
              </svg>

              {/* Outer glow ring */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full animate-pulse-glow"
                style={{
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.1) 40%, transparent 70%)',
                  boxShadow: '0 0 80px 30px rgba(16, 185, 129, 0.2)',
                }}
              />

              {/* Middle glow ring */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.5) 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)',
                  boxShadow: '0 0 40px 10px rgba(16, 185, 129, 0.3)',
                }}
              />

              {/* Center bright core */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #34D399 0%, #10B981 60%, #059669 100%)',
                  boxShadow: '0 0 20px 5px rgba(16, 185, 129, 0.8), 0 0 40px 10px rgba(16, 185, 129, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.3)',
                }}
              />
            </div>

            {/* Caption below spirograph */}
            <p className="mt-4 lg:mt-6 text-center text-[var(--muted)] text-xs lg:text-sm tracking-wide max-w-[280px]">
              <span className="text-[var(--text-secondary)]">Many moving parts.</span>
              <br />
              <span className="text-[var(--emerald)]">One coherent system.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)',
        }}
      />
    </section>
  );
}
