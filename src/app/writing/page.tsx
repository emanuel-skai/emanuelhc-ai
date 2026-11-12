import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Writing — Emanuel Hernández Castillo',
  description:
    'Long-form case studies and essays on running AI agents in production, with real data from WhatsApp agents in Latin America. Substantive over frequent.',
  alternates: { canonical: 'https://emanuelhc.ai/writing' },
  openGraph: {
    title: 'Writing — Emanuel Hernández Castillo',
    description:
      'Long-form case studies and essays on running AI agents in production, with real data from WhatsApp agents in Latin America.',
    url: 'https://emanuelhc.ai/writing',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writing — Emanuel Hernández Castillo',
    images: ['/opengraph-image'],
  },
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function WritingPage() {
  // Spanish translations are reachable via the language toggle on the article
  // page; the index lists each piece once.
  const publishedArticles = getAllArticles().filter((a) => a.lang === 'en');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://emanuelhc.ai/writing',
    name: 'Writing — Emanuel Hernández Castillo',
    description:
      'Occasional long-form pieces on agentic AI, enterprise systems, and building in LATAM.',
    url: 'https://emanuelhc.ai/writing',
    author: {
      '@type': 'Person',
      '@id': 'https://emanuelhc.ai/#person',
      name: 'Emanuel Hernández Castillo',
      url: 'https://emanuelhc.ai',
    },
    blogPost: publishedArticles.map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.description,
      datePublished: a.date,
      url: `https://emanuelhc.ai/writing/${a.slug}`,
    })),
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-[clamp(48px,8vw,96px)] pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="frame">
          <div className="max-w-[820px] mx-auto">
            <header className="pb-12 border-b border-[var(--border)]">
              <p className="eyebrow m-0">
                <span aria-hidden="true" className="eyebrow-rule" />
                <span>Writing</span>
              </p>
              <h1
                className="mt-6 mb-0 font-bold text-[clamp(38px,5vw,60px)] tracking-[-0.045em] text-[var(--text)]"
                style={{ lineHeight: 1.02 }}
              >
                Long-form, from production logs.
              </h1>
              <p className="mt-6 mb-0 max-w-[600px] text-lg leading-[1.6] text-[var(--muted)] [text-wrap:pretty]">
                Case studies with the numbers, the incidents and the fixes, including the bad
                months. Most pieces are also in Spanish.
              </p>
            </header>

            {publishedArticles.length > 0 ? (
              <ul className="m-0 p-0 list-none">
                {publishedArticles.map((article) => (
                  <li key={article.slug} className="border-b border-[var(--border)]">
                    <Link
                      href={`/writing/${article.slug}`}
                      className="group block py-9 md:py-10"
                    >
                      <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 label">
                        <span className="text-[var(--emerald2)]">{article.pillar}</span>
                        <span aria-hidden="true" className="text-[var(--faint)]">/</span>
                        <time dateTime={article.date}>{formatDate(article.date)}</time>
                        <span aria-hidden="true" className="text-[var(--faint)]">/</span>
                        <span>{article.readTimeMinutes} min read</span>
                        {article.translationSlug && (
                          <>
                            <span aria-hidden="true" className="text-[var(--faint)]">/</span>
                            <span>EN · ES</span>
                          </>
                        )}
                      </p>
                      <h2
                        className="mt-4 mb-0 font-semibold text-[clamp(22px,2.4vw,28px)] tracking-[-0.025em] text-[var(--text)] group-hover:text-[var(--emerald2)] transition-colors"
                        style={{ lineHeight: 1.2 }}
                      >
                        {article.title}
                      </h2>
                      <p className="mt-3 mb-0 max-w-[680px] text-[15px] md:text-base leading-relaxed text-[var(--muted)] [text-wrap:pretty]">
                        {article.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-12 text-[var(--muted)] text-lg">First piece coming soon.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
