'use client';

import { useState, useRef, useEffect } from 'react';

const channels = ['WhatsApp', 'Web', 'Email', 'API', 'Other'];
const timelines = ['Immediately', '2-4 weeks', '1-2 months', '3+ months', 'Just exploring'];
const budgets = ['< $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '$50,000+', 'Not sure yet'];

export default function DiscoveryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
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

  const toggleChannel = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

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
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="discovery" ref={sectionRef} className="section relative">
        <div className="container max-w-2xl">
          <div className="reveal text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--emerald)]/20 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-[var(--emerald)]"
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
            </div>
            <h2 className="text-[28px] md:text-[36px] font-bold text-[var(--text)] mb-4">
              Thank you!
            </h2>
            <p className="text-[var(--muted)] text-lg mb-8">
              I&apos;ve received your information. Book your free 15-minute discovery call below.
            </p>

            {/* Calendar Booking */}
            <div className="p-8 rounded-2xl bg-[var(--panel)] border border-[var(--border)]">
              <a
                href="https://calendar.app.google/CWAdozVLhT9LDaoF6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full !py-4 text-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Schedule 15-min Discovery Call</span>
              </a>
              <p className="text-[var(--muted)] text-sm text-center mt-4">
                Opens Google Calendar scheduling page
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="discovery" ref={sectionRef} className="section relative">
      <div className="container max-w-3xl">
        {/* Section Header */}
        <div className="reveal text-center mb-12">
          <p className="text-[var(--emerald)] text-sm font-medium tracking-wide mb-3">
            FREE DISCOVERY
          </p>
          <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-bold text-[var(--text)] mb-4">
            Let&apos;s talk about your project
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-xl mx-auto">
            Fill out this form to qualify for a free 15-minute discovery call.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="reveal space-y-6">
          <div className="card p-6 md:p-8 space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Full name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg2)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--emerald)] transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg2)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--emerald)] transition-colors"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Company / Project *
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg2)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--emerald)] transition-colors"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">Role *</label>
                <input
                  type="text"
                  name="role"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg2)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--emerald)] transition-colors"
                  placeholder="Your role"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                Website (optional)
              </label>
              <input
                type="url"
                name="website"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg2)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--emerald)] transition-colors"
                placeholder="https://yourcompany.com"
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--border)]" />

            {/* Project Details */}
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                What are you trying to build? *
              </label>
              <textarea
                name="projectDescription"
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg2)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--emerald)] transition-colors resize-none"
                placeholder="Describe your project, goals, and any specific challenges..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                Primary outcome metric
              </label>
              <input
                type="text"
                name="outcomeMetric"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg2)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--emerald)] transition-colors"
                placeholder="e.g., reduce response time, increase conversion, lower costs"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">
                Current stack
              </label>
              <textarea
                name="currentStack"
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg2)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-[var(--emerald)] transition-colors resize-none"
                placeholder="e.g., Python, FastAPI, PostgreSQL, AWS..."
              />
            </div>

            {/* Channels */}
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-3">
                Channels involved
              </label>
              <div className="flex flex-wrap gap-2">
                {channels.map((channel) => (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => toggleChannel(channel)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedChannels.includes(channel)
                        ? 'bg-[var(--emerald)] text-white'
                        : 'bg-[var(--bg2)] border border-[var(--border)] text-[var(--muted)] hover:border-[var(--emerald)] hover:text-[var(--text)]'
                    }`}
                  >
                    {channel}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--border)]" />

            {/* Timeline & Budget */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Timeline *
                </label>
                <select
                  name="timeline"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg2)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--emerald)] transition-colors"
                >
                  <option value="">Select timeline</option>
                  {timelines.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Budget range
                </label>
                <select
                  name="budget"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg2)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--emerald)] transition-colors"
                >
                  <option value="">Select budget</option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="readyToStart"
                  className="w-5 h-5 rounded border-[var(--border)] bg-[var(--bg2)] text-[var(--emerald)] focus:ring-[var(--emerald)] focus:ring-offset-0"
                />
                <span className="text-sm text-[var(--muted)]">
                  Ready to start in the next 2–4 weeks
                </span>
              </label>
            </div>

            {/* Consent */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="w-5 h-5 rounded border-[var(--border)] bg-[var(--bg2)] text-[var(--emerald)] focus:ring-[var(--emerald)] focus:ring-offset-0 mt-0.5"
                />
                <span className="text-sm text-[var(--muted)]">
                  I agree to be contacted about this request.
                </span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full !py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit and book free call'}
          </button>
        </form>
      </div>
    </section>
  );
}
