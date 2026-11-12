'use client';

import Link from 'next/link';
import { useReveal } from '@/hooks/useReveal';
import SectionHeader from '@/components/SectionHeader';

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
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function LatestWriting({ articles }: { articles: LatestArticle[] }) {
  const ref = useReveal<HTMLElement>();
  if (articles.length === 0) return null;

  return (
    <section
      id="writing"
      ref={ref}
      aria-labelledby="writing-heading"
      className="border-t border-[var(--border)] bg-black"
    >
      <div className="frame section-pad">
        <SectionHeader
          index="06"
          label="Writing"
          id="writing-heading"
          title="Long-form, from production logs."
          aside={
            <>
              Case studies with the numbers, including the bad months. English and Spanish.{' '}
              <Link href="/writing" className="link-arrow">
                All writing <span aria-hidden="true" className="arrow">→</span>
              </Link>
            </>
          }
        />

        <ul className="reveal grid md:grid-cols-3 gap-3 mt-14 md:mt-16 mb-0 p-0 list-none">
          {articles.map((a) => (
            <li
              key={a.slug}
              className="relative panel p-6 md:p-7 flex flex-col min-h-[220px] transition-colors duration-200 hover:border-[var(--border-bright)] focus-within:border-[var(--border-bright)]"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 label label-sm">
                <time dateTime={a.date}>{formatDate(a.date)}</time>
                <span>{a.readTimeMinutes} min read</span>
              </div>
              <h3
                className="mt-4 mb-0 font-semibold text-[20px] tracking-[-0.015em] text-[var(--text)] [text-wrap:pretty]"
                style={{ lineHeight: 1.3 }}
              >
                <Link
                  href={`/writing/${a.slug}`}
                  className="after:absolute after:inset-0 after:rounded-[var(--radius-lg)] hover:text-[var(--emerald2)] transition-colors"
                >
                  {a.title}
                </Link>
              </h3>
              {a.translationSlug && (
                <Link
                  href={`/writing/${a.translationSlug}`}
                  hrefLang="es"
                  lang="es"
                  className="relative z-[1] mt-auto pt-8 self-start label label-sm text-[var(--muted)] hover:text-[var(--emerald2)] transition-colors"
                >
                  También en español →
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
