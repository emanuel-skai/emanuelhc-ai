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
      className="border-t border-[var(--border)] bg-black scroll-mt-[68px]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 py-[clamp(80px,10vw,130px)]">
        <div className="reveal flex items-end justify-between gap-10 flex-wrap">
          <div className="max-w-[660px]">
            <div className="flex items-center gap-3.5 mb-[26px]">
              <span className="w-7 h-px bg-[var(--emerald)]" />
              <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--emerald)]">
                Writing
              </span>
            </div>
            <h2
              id="writing-heading"
              className="m-0 font-bold text-[clamp(32px,4vw,48px)] leading-[1.05] tracking-[-0.035em] text-[var(--text)]"
            >
              Production data, written up
            </h2>
          </div>
          <Link
            href="/writing"
            className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            All writing →
          </Link>
        </div>

        <ul className="reveal grid md:grid-cols-3 gap-5 mt-16 mb-0 p-0 list-none">
          {articles.map((a) => (
            <li
              key={a.slug}
              className="relative bg-gradient-to-b from-[var(--panel)] to-[var(--bg2)] border border-[var(--border)] rounded-[20px] p-6 md:p-[30px] flex flex-col transition-all duration-300 hover:border-[var(--border-bright)] hover:-translate-y-0.5"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
                <time dateTime={a.date}>{formatDate(a.date)}</time>
                <span>{a.readTimeMinutes} min read</span>
              </div>
              <h3
                className="mt-4 mb-0 font-semibold text-[20px] tracking-[-0.015em] text-[var(--text)] [text-wrap:pretty]"
                style={{ lineHeight: 1.3 }}
              >
                <Link
                  href={`/writing/${a.slug}`}
                  className="after:absolute after:inset-0 after:rounded-[20px] hover:text-[var(--emerald2)] transition-colors"
                >
                  {a.title}
                </Link>
              </h3>
              {a.translationSlug && (
                <Link
                  href={`/writing/${a.translationSlug}`}
                  hrefLang="es"
                  lang="es"
                  className="relative z-[1] mt-auto pt-8 self-start font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted)] hover:text-[var(--emerald2)] transition-colors"
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
