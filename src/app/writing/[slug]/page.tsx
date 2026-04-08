import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';
import { articles } from '@/data/articles';
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
  const article = articles.find((a) => a.slug === slug && a.published);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title} — Emanuel Hernandez`,
    description: article.description,
  };
}

export function generateStaticParams() {
  return articles.filter((a) => a.published).map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug && a.published);

  if (!article) {
    notFound();
  }

  const processedContent = await remark().use(html).process(article.content);
  const contentHtml = processedContent.toString();

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container max-w-3xl">
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
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full border ${
                  pillarColors[article.pillar] || pillarColors['Agentic AI']
                }`}
              >
                {article.pillar}
              </span>
              <span className="text-[var(--muted2)] text-xs">
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
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
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
