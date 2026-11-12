'use client';

import { useState, useRef, useEffect } from 'react';

const channels = ['WhatsApp', 'Web', 'Email', 'API', 'Other'];
const timelines = ['Immediately', '2-4 weeks', '1-2 months', '3+ months', 'Just exploring'];
const budgets = ['< $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '$50,000+', 'Not sure yet'];

const DISCOVERY_CALENDAR = 'https://calendar.app.google/g3v7PbEf9fkuWCRs7';

const fieldClass =
  'w-full px-4 py-3 rounded-[var(--radius-md)] bg-black border border-[var(--border-light)] text-[var(--text)] text-[15px] placeholder:text-[var(--muted2)] transition-colors hover:border-[var(--border-bright)] focus:outline-none focus-visible:outline-none focus:border-[var(--emerald)] focus:ring-1 focus:ring-[var(--emerald)]';
const labelClass = 'block mb-2 text-sm font-medium text-[var(--text-secondary)]';

export default function DiscoveryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
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
          if (entry.isIntersecting) {
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

  const toggleChannel = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

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
      projectDescription: formData.get('projectDescription'),
      outcomeMetric: formData.get('outcomeMetric'),
      currentStack: formData.get('currentStack'),
      channels: selectedChannels,
      timeline: formData.get('timeline'),
      budget: formData.get('budget'),
      readyToStart: formData.get('readyToStart') === 'on',
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

  if (submitted) {
    return (
      <section
        id="discovery-form"
        ref={sectionRef}
        aria-labelledby="discovery-done-heading"
        className="border-t border-[var(--border)] bg-black"
      >
        <div className="frame section-pad">
          <div className="reveal max-w-[640px] mx-auto panel panel-accent p-8 md:p-10" role="status">
            <p className="flex items-center gap-2.5 m-0 label text-[var(--emerald2)]">
              <span className="status-dot is-static" aria-hidden="true" />
              Received
            </p>
            <h2
              id="discovery-done-heading"
              className="mt-5 mb-0 font-bold text-[clamp(28px,3.4vw,38px)] tracking-[-0.035em] text-[var(--text)]"
              style={{ lineHeight: 1.1 }}
            >
              Now pick a time for the call.
            </h2>
            <p className="mt-4 mb-0 text-base leading-relaxed text-[var(--muted)]">
              I read every form before the call, so the fifteen minutes go to your problem, not to
              introductions.
            </p>
            <a
              href={DISCOVERY_CALENDAR}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full mt-8"
            >
              Schedule the 15-min call
            </a>
            <p className="mt-3 mb-0 label label-sm text-center">Opens Google Calendar</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="discovery-form"
      ref={sectionRef}
      aria-labelledby="discovery-form-heading"
      className="border-t border-[var(--border)] bg-black scroll-mt-[var(--nav-h)]"
    >
      <div className="frame section-pad grid gap-[clamp(36px,6vw,88px)] lg:grid-cols-[minmax(240px,340px)_minmax(0,1fr)] items-start">
        <div className="reveal lg:sticky lg:top-[calc(var(--nav-h)+40px)]">
          <p className="eyebrow m-0">
            <span aria-hidden="true" className="eyebrow-rule" />
            <span>Free discovery</span>
          </p>
          <h2
            id="discovery-form-heading"
            className="mt-6 mb-0 font-bold text-[clamp(30px,3.4vw,44px)] tracking-[-0.038em] text-[var(--text)]"
            style={{ lineHeight: 1.06 }}
          >
            Fifteen minutes to check fit.
          </h2>
          <p className="mt-5 mb-0 text-base leading-[1.65] text-[var(--muted)] [text-wrap:pretty]">
            A few answers so I come prepared. Specific beats long: what the system does today, what
            breaks, and what number should move.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="reveal panel p-5 md:p-8 flex flex-col gap-6">
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
                Company or project <span className="text-[var(--muted2)]">*</span>
              </label>
              <input id="df-company" type="text" name="company" required autoComplete="organization" className={fieldClass} placeholder="Company name" />
            </div>
            <div>
              <label htmlFor="df-role" className={labelClass}>
                Role <span className="text-[var(--muted2)]">*</span>
              </label>
              <input id="df-role" type="text" name="role" required autoComplete="organization-title" className={fieldClass} placeholder="Your role" />
            </div>
          </div>

          <div>
            <label htmlFor="df-website" className={labelClass}>
              Website <span className="text-[var(--muted2)] font-normal">(optional)</span>
            </label>
            <input id="df-website" type="text" name="website" autoComplete="url" className={fieldClass} placeholder="yourcompany.com" />
          </div>

          <div className="h-px bg-[var(--border)]" />

          <div>
            <label htmlFor="df-project" className={labelClass}>
              What should the system do, and what breaks today? <span className="text-[var(--muted2)]">*</span>
            </label>
            <textarea
              id="df-project"
              name="projectDescription"
              required
              rows={4}
              className={`${fieldClass} resize-y min-h-[112px]`}
              placeholder="e.g. Our WhatsApp agent books appointments but double-books on Saturdays, and we only find out when a customer complains."
            />
          </div>

          <div>
            <label htmlFor="df-metric" className={labelClass}>
              The number that should move
            </label>
            <input
              id="df-metric"
              type="text"
              name="outcomeMetric"
              className={fieldClass}
              placeholder="e.g. first-reply time, unanswered chats, bookings per week"
            />
          </div>

          <div>
            <label htmlFor="df-stack" className={labelClass}>
              Current stack
            </label>
            <textarea
              id="df-stack"
              name="currentStack"
              rows={2}
              className={`${fieldClass} resize-y`}
              placeholder="e.g. Python, FastAPI, PostgreSQL, AWS"
            />
          </div>

          <fieldset className="m-0 p-0 border-0">
            <legend className={`${labelClass} mb-3`}>Channels involved</legend>
            <div className="flex flex-wrap gap-2">
              {channels.map((channel) => {
                const on = selectedChannels.includes(channel);
                return (
                  <button
                    key={channel}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleChannel(channel)}
                    className={`min-h-[40px] px-4 rounded-full text-sm font-medium border transition-colors ${
                      on
                        ? 'bg-[var(--emerald)] border-[var(--emerald)] text-[var(--on-emerald)]'
                        : 'bg-black border-[var(--border-light)] text-[var(--muted)] hover:border-[var(--border-bright)] hover:text-[var(--text)]'
                    }`}
                  >
                    {channel}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="h-px bg-[var(--border)]" />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="df-timeline" className={labelClass}>
                Timeline <span className="text-[var(--muted2)]">*</span>
              </label>
              <select id="df-timeline" name="timeline" required className={fieldClass} defaultValue="">
                <option value="">Select timeline</option>
                {timelines.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="df-budget" className={labelClass}>
                Budget range
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

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="readyToStart" className="w-[18px] h-[18px] accent-[var(--emerald)]" />
              <span className="text-sm text-[var(--muted)]">Ready to start in the next 2–4 weeks</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="w-[18px] h-[18px] mt-0.5 accent-[var(--emerald)]" />
              <span className="text-sm text-[var(--muted)]">I agree to be contacted about this request.</span>
            </label>
          </div>

          <div>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? 'Sending…' : 'Send and book the free call'}
            </button>
            {error && (
              <p role="alert" className="mt-3 mb-0 text-sm text-[var(--danger)]">
                That didn’t go through. Try again, or email{' '}
                <a href="mailto:emanuel@skillfulai.io" className="underline underline-offset-2">
                  emanuel@skillfulai.io
                </a>
                .
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
