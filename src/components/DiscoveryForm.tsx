'use client';

import { useState, useRef, useEffect } from 'react';
import { CALENDAR_DISCOVERY, CALENDAR_HOUR, CONTACT_EMAIL, serviceOptions } from '@/lib/site';

const timelines = ['Immediately', '2-4 weeks', '1-2 months', '3+ months', 'Just exploring'];
const budgets = ['< $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '$50,000+', 'Not sure yet'];

const fieldClass =
  'w-full px-4 py-3 rounded-[var(--radius-md)] bg-black border border-[var(--border-light)] text-[var(--text)] text-[15px] placeholder:text-[var(--muted2)] transition-colors hover:border-[var(--border-bright)] focus:outline-none focus-visible:outline-none focus:border-[var(--emerald)] focus:ring-1 focus:ring-[var(--emerald)]';
const labelClass = 'block mb-2 text-sm font-medium text-[var(--text-secondary)]';

/** Final call to action and the discovery form, in one section. */
export default function DiscoveryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Re-run when the view swaps to the thank-you state so its .reveal nodes
  // get observed too; reduced-motion users get everything at once.
  useEffect(() => {
    const elements = Array.from(sectionRef.current?.querySelectorAll<HTMLElement>('.reveal') ?? []);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((el) => el.classList.add('active'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.boundingClientRect.bottom <= 0) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      company: formData.get('company'),
      role: formData.get('role'),
      website: formData.get('website'),
      service: formData.get('service'),
      projectDescription: formData.get('projectDescription'),
      timeline: formData.get('timeline'),
      budget: formData.get('budget'),
    };

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Form submission error:', err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="discovery"
      ref={sectionRef}
      aria-labelledby="discovery-heading"
      className="relative border-t border-[var(--border)] overflow-hidden"
    >
      {/* Low emerald horizon held at the bottom edge, behind the form. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[320px] pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(6,78,59,0.18) 100%)' }}
      />

      <div className="frame section-pad relative grid gap-12 lg:grid-cols-[minmax(240px,380px)_minmax(0,1fr)] lg:gap-[clamp(48px,7vw,112px)] items-start">
        <div className="reveal lg:sticky lg:top-[calc(var(--nav-h)+40px)]">
          <p className="eyebrow m-0">
            <span aria-hidden="true" className="eyebrow-rule" />
            <span>Start here</span>
          </p>
          <h2
            id="discovery-heading"
            className="mt-5 mb-0 font-semibold text-[clamp(36px,4.6vw,60px)] tracking-[-0.04em] text-[var(--text)]"
            style={{ lineHeight: 1.02 }}
          >
            Fifteen minutes, free.
          </h2>
          <p className="mt-5 mb-0 text-[17px] leading-[1.65] text-[var(--muted)] [text-wrap:pretty]">
            Tell me what you’re building and where it hurts. I read every form before the call, so
            the fifteen minutes go to your problem.
          </p>
          <ul className="mt-8 mb-0 p-0 list-none grid gap-3 text-[15px]">
            <li>
              <a href={CALENDAR_HOUR} target="_blank" rel="noopener noreferrer" className="link-arrow">
                Or book a paid hour, $200 <span aria-hidden="true" className="arrow">→</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>

        {submitted ? (
          <div className="reveal panel panel-accent p-7 md:p-10" role="status">
            <p className="flex items-center gap-2.5 m-0 label text-[var(--emerald2)]">
              <span className="status-dot is-static" aria-hidden="true" />
              Received
            </p>
            <h3
              className="mt-5 mb-0 font-semibold text-[clamp(26px,3vw,34px)] tracking-[-0.03em] text-[var(--text)]"
              style={{ lineHeight: 1.12 }}
            >
              Now pick a time for the call.
            </h3>
            <p className="mt-4 mb-0 text-base leading-relaxed text-[var(--muted)]">
              Choose any open slot. If none works, email me and we’ll find one.
            </p>
            <a
              href={CALENDAR_DISCOVERY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full mt-8"
            >
              Schedule the 15-min call
            </a>
            <p className="mt-3 mb-0 label label-sm text-center">Opens Google Calendar</p>
          </div>
        ) : (
          <form
            id="discovery-form"
            onSubmit={handleSubmit}
            aria-label="Discovery form"
            className="reveal panel p-5 md:p-8 flex flex-col gap-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="df-name" className={labelClass}>
                  Full name <span className="text-[var(--muted2)]">*</span>
                </label>
                <input id="df-name" type="text" name="fullName" required autoComplete="name" className={fieldClass} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="df-email" className={labelClass}>
                  Email <span className="text-[var(--muted2)]">*</span>
                </label>
                <input id="df-email" type="email" name="email" required autoComplete="email" className={fieldClass} placeholder="you@company.com" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="df-company" className={labelClass}>
                  Company <span className="text-[var(--muted2)]">*</span>
                </label>
                <input id="df-company" type="text" name="company" required autoComplete="organization" className={fieldClass} placeholder="Company name" />
              </div>
              <div>
                <label htmlFor="df-role" className={labelClass}>
                  Role <span className="text-[var(--muted2)]">*</span>
                </label>
                <input id="df-role" type="text" name="role" required autoComplete="organization-title" className={fieldClass} placeholder="Founder, CEO, VP Eng…" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="df-service" className={labelClass}>
                  Service you’re interested in <span className="text-[var(--muted2)]">*</span>
                </label>
                <select id="df-service" name="service" required className={fieldClass} defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="df-website" className={labelClass}>
                  Website <span className="text-[var(--muted2)] font-normal">(optional)</span>
                </label>
                <input id="df-website" type="text" name="website" autoComplete="url" className={fieldClass} placeholder="yourcompany.com" />
              </div>
            </div>

            <div>
              <label htmlFor="df-project" className={labelClass}>
                What’s going on? <span className="text-[var(--muted2)]">*</span>
              </label>
              <textarea
                id="df-project"
                name="projectDescription"
                required
                rows={4}
                className={`${fieldClass} resize-y min-h-[112px]`}
                placeholder="e.g. We’re a 6-person team, our first engineer just left, and we need to hire two backend engineers and decide whether to rebuild the API."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="df-timeline" className={labelClass}>
                  Timeline <span className="text-[var(--muted2)]">*</span>
                </label>
                <select id="df-timeline" name="timeline" required className={fieldClass} defaultValue="">
                  <option value="" disabled>
                    Select timeline
                  </option>
                  {timelines.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="df-budget" className={labelClass}>
                  Budget range <span className="text-[var(--muted2)] font-normal">(optional)</span>
                </label>
                <select id="df-budget" name="budget" className={fieldClass} defaultValue="">
                  <option value="">Select budget</option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="w-[18px] h-[18px] mt-0.5 flex-none accent-[var(--emerald)]" />
              <span className="text-sm text-[var(--muted)]">I agree to be contacted about this request.</span>
            </label>

            <div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                {isSubmitting ? 'Sending…' : 'Send and book the free call'}
              </button>
              {error && (
                <p role="alert" className="mt-3 mb-0 text-sm text-[var(--danger)]">
                  That didn’t go through. Try again, or email{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
