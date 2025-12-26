'use client';

import { useEffect, useRef } from 'react';

const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Machine Learning & Analytics',
    description:
      'Predictive models that drive decisions — forecasting, classification, recommendations, anomaly detection.',
    deliverables: ['Model development', 'Feature engineering', 'Validation pipeline', 'Deployment'],
    timeline: '2-6 weeks',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: 'LLM Applications & Agents',
    description:
      'Chatbots, RAG systems, agent workflows, and AI-powered features built on foundation models.',
    deliverables: ['Prompt engineering', 'Tool integration', 'Memory patterns', 'Guardrails'],
    timeline: '1-4 weeks',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    title: 'Data Engineering & Pipelines',
    description:
      'ETL workflows, data lakes, feature stores, and the infrastructure that feeds your models.',
    deliverables: ['Pipeline architecture', 'Data validation', 'Orchestration', 'Monitoring'],
    timeline: '2-4 weeks',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: 'Cloud Architecture & Backend',
    description:
      'Scalable APIs, serverless patterns, CI/CD, and production infrastructure on AWS.',
    deliverables: ['System design', 'IaC templates', 'Security hardening', 'Cost optimization'],
    timeline: '1-4 weeks',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Intelligent Automation',
    description:
      'Workflow automation, business process AI, and channel integrations that reduce manual work.',
    deliverables: ['Process mapping', 'Integration design', 'Handoff logic', 'Analytics'],
    timeline: '2-6 weeks',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Full-stack Development',
    description:
      'End-to-end product development — from database to UI — when AI is just one piece of the puzzle.',
    deliverables: ['Architecture', 'API development', 'Frontend', 'Testing & deployment'],
    timeline: '2-8 weeks',
  },
];

export default function Services() {
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
    <section id="services" ref={sectionRef} className="section relative">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg-large opacity-30" />

      {/* Gradient accents */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.04) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="reveal max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[var(--emerald)]" />
            <p className="text-[var(--emerald)] text-sm font-medium tracking-widest">
              SERVICES
            </p>
          </div>
          <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[var(--text)] mb-5 tracking-tight">
            Engineering that spans<br />
            <span className="text-gradient">the full stack</span>
          </h2>
          <p className="text-[var(--muted)] text-lg leading-relaxed">
            From ML models to production infrastructure. I build systems designed for real constraints—not demos.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="reveal group"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="card h-full group-hover:border-[var(--emerald)]/30">
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[var(--emerald)]/10 border border-[var(--emerald)]/20 flex items-center justify-center text-[var(--emerald)] mb-5 group-hover:bg-[var(--emerald)]/20 transition-colors">
                    {service.icon}
                  </div>

                  <h3 className="text-[var(--text)] text-lg font-semibold mb-3 group-hover:text-[var(--emerald)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[var(--muted)] text-[15px] leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-5">
                      {service.deliverables.map((item) => (
                        <span
                          key={item}
                          className="text-xs text-[var(--muted)] bg-white/5 px-2.5 py-1 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-2 pt-4 border-t border-[var(--border)]">
                      <svg
                        className="w-4 h-4 text-[var(--emerald)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm text-[var(--muted)]">
                        {service.timeline}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Not sure where to start */}
        <div className="reveal mt-12">
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[var(--panel)] to-[var(--panel2)] border border-[var(--border)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--emerald)]/10 border border-[var(--emerald)]/20 flex items-center justify-center text-[var(--emerald)] flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[var(--text)] text-lg font-semibold mb-1">Not sure where to start?</h3>
                  <p className="text-[var(--muted)] text-[15px]">
                    Start with an Architecture Review (2 hours). Leave with a written plan.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <a href="#pricing" className="btn-primary whitespace-nowrap">
                  <span>Book $200/hr</span>
                </a>
                <a href="#discovery" className="btn-ghost whitespace-nowrap">
                  Free discovery
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
