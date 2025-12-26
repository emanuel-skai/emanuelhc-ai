'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const caseStudies = [
  {
    title: 'Lina',
    subtitle: 'WhatsApp Lead Routing + Media AI',
    logo: '/images/SKAI-LOGO.png',
    problem:
      'A fashion retailer needed intelligent lead routing across 13 store locations, B2B wholesale, and e-commerce—plus handling images and voice in real conversations.',
    solution:
      'Built an AI assistant that routes leads to the correct WhatsApp channel, identifies fabrics from photos, and handles voice interactions.',
    metrics: [
      '~2,000 chats/month handled',
      '~20,000 messages processed',
      '13 locations routed accurately',
      'High automation success rate',
    ],
    deliverables: [
      'Conversation flows & routing policy',
      'Fabric identification module (vision)',
      'Voice interaction pipeline',
      'Evaluation + analytics dashboard',
    ],
    stack: ['FastAPI', 'AWS Lambda', 'WhatsApp API', 'LLM Vision', 'Vector DB'],
  },
  {
    title: 'Talboost',
    subtitle: 'AI-Powered Recruitment Platform',
    logo: '/images/talboost-logo.svg',
    problem:
      'A recruitment startup needed AI-driven workflows for candidate screening, feedback generation, and role-based portal management.',
    solution:
      'Designed product architecture with AI feedback loops, scalable candidate flows, and intelligent scoring systems.',
    metrics: [
      'Automated candidate scripts',
      'Real-time AI feedback',
      'Role-based access control',
      'Scalable multi-tenant design',
    ],
    deliverables: [
      'Product architecture design',
      'AI feedback loop implementation',
      'Scalability & multi-tenant plan',
      'Payment integration flows',
    ],
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'LLMs', 'Stripe'],
  },
  {
    title: 'Skillful AI',
    subtitle: 'Agent Platform & Workflow Engine',
    logo: '/images/SKAI-LOGO.png',
    problem:
      'Building a platform that combines agents, workflows, integrations, and measurable outcomes for diverse business use cases.',
    solution:
      'Created a platform approach with standardized agent templates, tool calling patterns, memory design, and comprehensive observability.',
    metrics: [
      'Reusable agent templates',
      'Standardized tool contracts',
      'Built-in observability',
      'Multi-channel support',
    ],
    deliverables: [
      'Agent template system',
      'Tool calling standards',
      'Memory design patterns',
      'Observability strategy',
    ],
    stack: ['Python', 'FastAPI', 'AWS', 'Redis', 'Vector DBs'],
  },
];

export default function CaseStudies() {
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
    <section id="case-studies" ref={sectionRef} className="section relative">
      <div className="container">
        {/* Section Header */}
        <div className="reveal max-w-2xl mb-16">
          <p className="text-[var(--emerald)] text-sm font-medium tracking-wide mb-3">
            CASE STUDIES
          </p>
          <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold text-[var(--text)] mb-4">
            Real systems, real outcomes
          </h2>
          <p className="text-[var(--muted)] text-lg">
            Production AI systems I&apos;ve designed and delivered.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <div
              key={study.title}
              className="reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="card p-8 md:p-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Left - Info */}
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[var(--panel2)] border border-[var(--border)] flex items-center justify-center overflow-hidden">
                        <Image
                          src={study.logo}
                          alt={study.title}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-[var(--text)] text-xl font-semibold">{study.title}</h3>
                        <p className="text-[var(--muted)] text-sm">{study.subtitle}</p>
                      </div>
                    </div>

                    {/* Problem */}
                    <div className="mb-6">
                      <p className="text-xs text-[var(--emerald)] font-medium tracking-wide mb-2">
                        PROBLEM
                      </p>
                      <p className="text-[var(--muted)] text-[15px] leading-relaxed">
                        {study.problem}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="mb-6">
                      <p className="text-xs text-[var(--emerald)] font-medium tracking-wide mb-2">
                        SOLUTION
                      </p>
                      <p className="text-[var(--muted)] text-[15px] leading-relaxed">
                        {study.solution}
                      </p>
                    </div>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-2">
                      {study.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono text-[var(--muted)] bg-[var(--panel2)] px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right - Metrics & Deliverables */}
                  <div className="space-y-6">
                    {/* Metrics */}
                    <div className="p-5 rounded-xl bg-[var(--bg2)] border border-[var(--border)]">
                      <p className="text-xs text-[var(--emerald)] font-medium tracking-wide mb-4">
                        OUTCOMES
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {study.metrics.map((metric) => (
                          <div key={metric} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--emerald)] mt-1.5 flex-shrink-0" />
                            <span className="text-sm text-[var(--text)]">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="p-5 rounded-xl bg-[var(--bg2)] border border-[var(--border)]">
                      <p className="text-xs text-[var(--emerald)] font-medium tracking-wide mb-4">
                        WHAT I DELIVERED
                      </p>
                      <div className="space-y-2">
                        {study.deliverables.map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-[var(--emerald)] flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-sm text-[var(--muted)]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal mt-12 text-center">
          <p className="text-[var(--muted)] mb-6">Want this for your business?</p>
          <a href="#pricing" className="btn-primary">
            Book time
          </a>
        </div>
      </div>
    </section>
  );
}
