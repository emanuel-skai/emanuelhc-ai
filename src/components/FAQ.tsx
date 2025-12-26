'use client';

import { useState, useRef, useEffect } from 'react';

const faqs = [
  {
    question: 'What types of projects are a good fit?',
    answer:
      'Projects that involve production AI systems: agent workflows, RAG pipelines, multimodal processing, or automation for real business channels. I focus on systems that need to work reliably under constraints like latency, cost, and failure handling.',
  },
  {
    question: 'Can you work with our in-house team?',
    answer:
      'Yes. I often work embedded with engineering teams—pairing on architecture, reviewing PRs, and unblocking technical decisions. I can also work independently and deliver complete features.',
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      'Yes, NDAs are available on request. I handle sensitive projects across industries and understand confidentiality requirements.',
  },
  {
    question: 'What do I get after a paid session?',
    answer:
      'Session notes documenting what we covered, decisions made, and an action plan for next steps. For implementation sessions, you get working code and any relevant documentation.',
  },
  {
    question: 'Can you implement end-to-end or only advise?',
    answer:
      'Both. I can advise on architecture and review existing systems, or I can implement complete features from design through deployment. The 50-hour block is ideal for end-to-end delivery.',
  },
  {
    question: 'Which stacks do you prefer?',
    answer:
      'Python (FastAPI) for backends, AWS for infrastructure, and modern LLM tooling (LangChain, LlamaIndex, or custom). I also work with Next.js, PostgreSQL, Redis, and various vector databases.',
  },
  {
    question: 'How do you handle scope and change requests?',
    answer:
      'We define scope upfront and document acceptance criteria. For hourly work, changes are straightforward—we adjust as needed. For blocks, we maintain a backlog and reprioritize together during weekly syncs.',
  },
  {
    question: "What if the project isn't a good fit?",
    answer:
      "I'll tell you directly and recommend next steps or refer you to someone better suited. The discovery call exists to ensure we're aligned before any commitment.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
    <section id="faq" ref={sectionRef} className="section relative bg-[var(--bg2)]">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--emerald)]/30 to-transparent" />

      <div className="container max-w-3xl">
        {/* Section Header */}
        <div className="reveal text-center mb-12">
          <p className="text-[var(--emerald)] text-sm font-medium tracking-wide mb-3">FAQs</p>
          <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold text-[var(--text)] mb-4">
            Common questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="reveal space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-[var(--border)] bg-[var(--panel)] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-[var(--text)] font-medium pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-[var(--muted)] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5 pt-0">
                  <p className="text-[var(--muted)] text-[15px] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
