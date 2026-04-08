import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const pillarColors: Record<string, string> = {
  'Agentic AI': 'border-[var(--emerald)] text-[var(--emerald)]',
  Enterprise: 'border-blue-400 text-blue-400',
  LATAM: 'border-amber-400 text-amber-400',
  Frontier: 'border-purple-400 text-purple-400',
  'CTO Craft': 'border-rose-400 text-rose-400',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title} — Emanuel Hernandez`,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `https://emanuelhc.ai/writing/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: ['Emanuel Hernandez'],
      tags: article.keywords,
    },
  };
}

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: 'Emanuel Hernandez',
      jobTitle: 'Co-founder & CTO',
      url: 'https://emanuelhc.ai',
    },
    publisher: {
      '@type': 'Person',
      name: 'Emanuel Hernandez',
      url: 'https://emanuelhc.ai',
    },
    url: `https://emanuelhc.ai/writing/${slug}`,
    keywords: article.keywords?.join(', '),
    wordCount: article.content.trim().split(/\s+/).length,
    timeRequired: `PT${article.readTimeMinutes}M`,
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="container max-w-3xl">
          {/* Back link */}
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-[var(--muted)] text-sm hover:text-[var(--emerald)] transition-colors mb-10"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Writing
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full border ${
                  pillarColors[article.pillar] || pillarColors['Agentic AI']
                }`}
              >
                {article.pillar}
              </span>
              <time
                dateTime={article.date}
                className="text-[var(--muted2)] text-xs"
              >
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className="text-[var(--muted2)] text-xs">
                {article.readTimeMinutes} min read
              </span>
            </div>
            <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[var(--text)] leading-tight tracking-tight">
              {article.title}
            </h1>
          </header>

          {/* Article Body */}
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
