'use client';

import { useReveal } from '@/hooks/useReveal';
import SectionHeader from '@/components/SectionHeader';
import { services } from '@/lib/site';

export default function Services() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="services" ref={ref} aria-labelledby="services-heading" className="border-t border-[var(--border)]">
      <div className="frame section-pad">
        <SectionHeader
          label="Services"
          id="services-heading"
          title="Four ways to work together."
          intro="Pick the one that matches the problem in front of you. If none does, the free call will tell us that in fifteen minutes."
        />

        <ul className="reveal cells md:grid-cols-2 mt-14 md:mt-16 mb-0 p-0 list-none">
          {services.map((s) => (
            <li key={s.id} id={s.id} className="p-7 md:p-10 flex flex-col">
              <h3
                className="m-0 font-semibold text-[24px] md:text-[26px] tracking-[-0.025em] text-[var(--text)]"
                style={{ lineHeight: 1.2 }}
              >
                {s.name}
              </h3>
              <p className="mt-3 mb-0 max-w-[460px] text-base leading-[1.65] text-[var(--text-secondary)] [text-wrap:pretty]">
                {s.summary}
              </p>

              <dl className="mt-8 mb-0 grid gap-6">
                <div>
                  <dt className="label label-sm">For</dt>
                  <dd className="m-0 mt-2 text-[15px] leading-[1.6] text-[var(--muted)] [text-wrap:pretty]">{s.forWho}</dd>
                </div>
                <div>
                  <dt className="label label-sm">You get</dt>
                  <dd className="m-0 mt-3">
                    <ul className="m-0 p-0 list-none grid gap-2">
                      {s.youGet.map((item) => (
                        <li key={item} className="flex gap-3 text-[15px] leading-[1.5] text-[var(--muted)]">
                          <span aria-hidden="true" className="mt-[0.6em] w-1.5 h-px flex-none bg-[var(--emerald)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              <div className="mt-auto pt-8">
                <p className="m-0 pt-5 border-t border-[var(--border)] flex items-baseline justify-between gap-4">
                  <span className="label label-sm">Pricing</span>
                  <span className="text-[15px] font-medium text-[var(--text)] text-right tnum">{s.pricing}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
