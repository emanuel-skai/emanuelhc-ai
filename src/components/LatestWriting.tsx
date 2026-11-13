'use client';

import Link from 'next/link';
import { useReveal } from '@/hooks/useReveal';

export interface LatestArticle {
  slug: string;
  title: string;
  date: string;
  readTimeMinutes: number;
  translationSlug?: string;
}

function formatDate(date: string) {
  // Dates are plain YYYY-MM-DD; format in UTC so server and client agree.
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
}

export default function LatestWriting({ articles }: { articles: LatestArticle[] }) {
  const ref = useReveal<HTMLElement>();
  if (articles.length === 0) return null;

  return (
    <section id="writing" ref={ref} aria-labelledby="writing-heading" className="border-t border-[var(--border)]">
      <div className="frame py-[clamp(64px,7vw,96px)] grid gap-10 lg:grid-cols-[minmax(240px,380px)_minmax(0,1fr)] lg:gap-[clamp(48px,7vw,112px)] items-start">
        <div className="reveal">
          <p className="eyebrow m-0">
            <span aria-hidden="true" className="eyebrow-rule" />
            <span>Writing</span>
          </p>
          <h2
            id="writing-heading"
            className="mt-5 mb-0 font-semibold text-[clamp(26px,2.6vw,32px)] tracking-[-0.03em] text-[var(--text)]"
            style={{ lineHeight: 1.15 }}
          >
            Notes from production.
          </h2>
          <Link href="/writing" className="link-arrow mt-5 text-[15px]">
            All writing <span aria-hidden="true" className="arrow">→</span>
          </Link>
        </div>

        <ul className="reveal m-0 p-0 list-none border-b border-[var(--border)]">
          {articles.map((a) => (
            <li key={a.slug} className="group relative py-5 border-t border-[var(--border)] grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8 sm:items-baseline">
              <h3
                className="m-0 font-[family-name:var(--font-geist-sans)] font-medium text-[17px] tracking-[-0.01em] text-[var(--text-secondary)] [text-wrap:pretty]"
                style={{ lineHeight: 1.45 }}
              >
                <Link
                  href={`/writing/${a.slug}`}
                  className="after:absolute after:inset-0 group-hover:text-[var(--text)] transition-colors"
                >
                  {a.title}
                </Link>
              </h3>
              <p className="m-0 flex items-center gap-4 label label-sm whitespace-nowrap">
                <time dateTime={a.date}>{formatDate(a.date)}</time>
                <span>{a.readTimeMinutes} min</span>
                {a.translationSlug && (
                  <Link
                    href={`/writing/${a.translationSlug}`}
                    hrefLang="es"
                    aria-label={`Spanish version: ${a.title}`}
                    className="relative z-[1] -my-3 py-3 px-1 -mx-1 text-[var(--muted)] hover:text-[var(--emerald2)] transition-colors"
                  >
                    ES
                  </Link>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
