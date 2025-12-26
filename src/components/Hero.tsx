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

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Main gradient orb */}
      <div
        className="absolute top-1/2 right-0 w-[800px] h-[800px] -translate-y-1/2 translate-x-1/4 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.04) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Secondary orb */}
      <div
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Content */}
      <div className="container relative z-10 py-12 md:py-20">
        <div className="max-w-3xl">
          {/* Status badge */}
          <div className="reveal flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--panel)]/80 border border-[var(--border)] backdrop-blur-sm">
              <span className="status-dot" />
              <span className="text-sm text-[var(--muted)]">Available for new projects</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="reveal text-[40px] md:text-[56px] lg:text-[68px] font-bold text-[var(--text)] leading-[1.05] mb-6 tracking-tight">
            Production-grade{' '}
            <span className="text-gradient">AI systems.</span>
            <br />
            <span className="text-[var(--text-secondary)]">Built fast. Built right.</span>
          </h1>

          {/* Subheadline */}
          <p className="reveal text-[17px] md:text-[19px] text-[var(--muted)] leading-relaxed mb-10 max-w-2xl">
            I help teams ship reliable AI software: agent workflows, RAG systems, and multimodal
            pipelines — designed for real constraints like tool failures, latency budgets, and
            cost ceilings.
          </p>

          {/* CTAs */}
          <div className="reveal flex flex-wrap gap-4 mb-12">
            <a href="#pricing" className="btn-primary group">
              <span>Book $200/hr</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#pricing" className="btn-secondary">
              Buy 50-hour block
            </a>
            <a href="#discovery" className="btn-ghost group">
              Free 15-min discovery
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

          {/* Proof chips */}
          <div className="reveal flex flex-wrap gap-3">
            <span className="chip">
              <svg className="w-4 h-4 text-[var(--emerald)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              Agents & tool calling
            </span>
            <span className="chip">
              <svg className="w-4 h-4 text-[var(--emerald)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
              RAG & knowledge systems
            </span>
            <span className="chip">
              <svg className="w-4 h-4 text-[var(--emerald)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              AWS-native delivery
            </span>
            <span className="chip">
              <svg className="w-4 h-4 text-[var(--emerald)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Cost + evaluation
            </span>
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
