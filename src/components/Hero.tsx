'use client';

import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const heroElement = heroRef.current;
    heroElement?.addEventListener('mousemove', handleMouseMove);
    return () => heroElement?.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Large gradient orbs */}
      <div
        className="absolute w-[1000px] h-[1000px] pointer-events-none"
        style={{
          top: '10%',
          right: '-20%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 60%)',
          filter: 'blur(100px)',
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] pointer-events-none"
        style={{
          bottom: '20%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[var(--emerald)]"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              opacity: 0.3 + (i * 0.1),
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text Content */}
          <div className="max-w-2xl">
            {/* Status badge */}
            <div className="reveal flex items-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--panel)] border border-[var(--border)] backdrop-blur-sm">
                <span className="status-dot" />
                <span className="text-sm text-[var(--muted)]">Available for new projects</span>
              </div>
            </div>

            {/* Main headline */}
            <h1 className="reveal text-[42px] md:text-[56px] lg:text-[64px] font-bold text-[var(--text)] leading-[1.05] mb-6 tracking-tight">
              Production-grade{' '}
              <span className="text-gradient">AI systems.</span>
              <br />
              <span className="text-[var(--text-secondary)]">Built fast. Built right.</span>
            </h1>

            {/* Subheadline */}
            <p className="reveal text-[17px] md:text-[19px] text-[var(--muted)] leading-relaxed mb-10 max-w-xl">
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

          {/* Right - Tech Visual */}
          <div className="reveal hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              {/* Outer rotating ring */}
              <div
                className="absolute inset-0 rounded-full border border-[var(--border)] animate-rotate-slow"
                style={{ animationDuration: '30s' }}
              />

              {/* Second ring */}
              <div
                className="absolute inset-8 rounded-full border border-[var(--border-light)] animate-rotate-slow"
                style={{ animationDuration: '25s', animationDirection: 'reverse' }}
              />

              {/* Inner glow */}
              <div
                className="absolute inset-16 rounded-full animate-pulse-glow"
                style={{
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />

              {/* Central network diagram */}
              <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
                {/* Connection lines with gradient */}
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(16, 185, 129, 0.1)" />
                    <stop offset="50%" stopColor="rgba(16, 185, 129, 0.4)" />
                    <stop offset="100%" stopColor="rgba(16, 185, 129, 0.1)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Hexagonal connections */}
                <g stroke="url(#lineGrad)" strokeWidth="1" fill="none" opacity="0.6">
                  {/* Outer hexagon */}
                  <polygon points="200,80 280,120 280,200 200,240 120,200 120,120" />
                  {/* Inner connections */}
                  <line x1="200" y1="80" x2="200" y2="160" />
                  <line x1="280" y1="120" x2="200" y2="160" />
                  <line x1="280" y1="200" x2="200" y2="160" />
                  <line x1="200" y1="240" x2="200" y2="160" />
                  <line x1="120" y1="200" x2="200" y2="160" />
                  <line x1="120" y1="120" x2="200" y2="160" />
                  {/* Radial lines */}
                  <line x1="200" y1="80" x2="200" y2="50" />
                  <line x1="280" y1="120" x2="310" y2="100" />
                  <line x1="280" y1="200" x2="310" y2="220" />
                  <line x1="200" y1="240" x2="200" y2="270" />
                  <line x1="120" y1="200" x2="90" y2="220" />
                  <line x1="120" y1="120" x2="90" y2="100" />
                </g>

                {/* Animated data flow lines */}
                <g className="animate-pulse-glow" style={{ animationDelay: '0.5s' }}>
                  <line x1="200" y1="50" x2="200" y2="80" stroke="var(--emerald)" strokeWidth="2" opacity="0.6" />
                  <line x1="200" y1="240" x2="200" y2="270" stroke="var(--emerald)" strokeWidth="2" opacity="0.6" />
                </g>

                {/* Node points */}
                <g filter="url(#glow)">
                  {/* Center node */}
                  <circle cx="200" cy="160" r="12" fill="var(--emerald)" opacity="0.9" />
                  <circle cx="200" cy="160" r="6" fill="white" />

                  {/* Outer nodes */}
                  <circle cx="200" cy="80" r="8" fill="var(--emerald)" opacity="0.8" />
                  <circle cx="280" cy="120" r="6" fill="var(--emerald)" opacity="0.6" />
                  <circle cx="280" cy="200" r="6" fill="var(--emerald)" opacity="0.6" />
                  <circle cx="200" cy="240" r="8" fill="var(--emerald)" opacity="0.8" />
                  <circle cx="120" cy="200" r="6" fill="var(--emerald)" opacity="0.6" />
                  <circle cx="120" cy="120" r="6" fill="var(--emerald)" opacity="0.6" />

                  {/* Edge nodes */}
                  <circle cx="200" cy="50" r="4" fill="rgba(255,255,255,0.5)" />
                  <circle cx="310" cy="100" r="4" fill="rgba(255,255,255,0.5)" />
                  <circle cx="310" cy="220" r="4" fill="rgba(255,255,255,0.5)" />
                  <circle cx="200" cy="270" r="4" fill="rgba(255,255,255,0.5)" />
                  <circle cx="90" cy="220" r="4" fill="rgba(255,255,255,0.5)" />
                  <circle cx="90" cy="100" r="4" fill="rgba(255,255,255,0.5)" />
                </g>

                {/* Labels */}
                <g fill="var(--muted)" fontSize="11" fontFamily="monospace">
                  <text x="200" y="38" textAnchor="middle">INPUT</text>
                  <text x="200" y="290" textAnchor="middle">OUTPUT</text>
                  <text x="60" y="100" textAnchor="middle">TOOLS</text>
                  <text x="340" y="100" textAnchor="middle">DATA</text>
                  <text x="60" y="230" textAnchor="middle">EVAL</text>
                  <text x="340" y="230" textAnchor="middle">LOGS</text>
                </g>

                {/* Center label */}
                <text x="200" y="320" textAnchor="middle" fill="var(--emerald)" fontSize="13" fontWeight="600">
                  AGENT CORE
                </text>
              </svg>

              {/* Floating tech labels */}
              <div
                className="absolute -top-4 right-0 px-3 py-1.5 rounded-lg bg-[var(--panel)] border border-[var(--border)] text-xs font-mono text-[var(--muted)] animate-float"
                style={{ animationDelay: '0.2s' }}
              >
                FastAPI
              </div>
              <div
                className="absolute top-1/4 -left-8 px-3 py-1.5 rounded-lg bg-[var(--panel)] border border-[var(--border)] text-xs font-mono text-[var(--muted)] animate-float"
                style={{ animationDelay: '0.8s' }}
              >
                LangChain
              </div>
              <div
                className="absolute bottom-1/4 -right-4 px-3 py-1.5 rounded-lg bg-[var(--panel)] border border-[var(--border)] text-xs font-mono text-[var(--muted)] animate-float"
                style={{ animationDelay: '1.4s' }}
              >
                AWS Lambda
              </div>
              <div
                className="absolute -bottom-4 left-1/4 px-3 py-1.5 rounded-lg bg-[var(--panel)] border border-[var(--border)] text-xs font-mono text-[var(--muted)] animate-float"
                style={{ animationDelay: '2s' }}
              >
                Vector DB
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="reveal absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-xs text-[var(--muted)] tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--muted)] to-transparent" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)',
        }}
      />
    </section>
  );
}
