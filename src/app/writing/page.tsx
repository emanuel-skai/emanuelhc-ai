import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/data/articles';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Writing — Emanuel Hernandez',
  description:
    'Occasional long-form pieces on agentic AI, enterprise systems, and building in LATAM. Substantive over frequent.',
};

const pillarColors: Record<string, string> = {
  'Agentic AI': 'border-[var(--emerald)] text-[var(--emerald)]',
  Enterprise: 'border-blue-400 text-blue-400',
  LATAM: 'border-amber-400 text-amber-400',
  Frontier: 'border-purple-400 text-purple-400',
  'CTO Craft': 'border-rose-400 text-rose-400',
};

export default function WritingPage() {
  const publishedArticles = articles.filter((a) => a.published);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container max-w-3xl">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-[40px] md:text-[52px] font-bold text-[var(--text)] mb-4 tracking-tight">
              Writing
            </h1>
            <p className="text-[var(--muted)] text-lg leading-relaxed max-w-xl">
              Occasional long-form pieces on agentic AI, enterprise systems, and building in LATAM.
              Substantive over frequent.
            </p>
          </div>

          {/* Articles or Empty State */}
          {publishedArticles.length > 0 ? (
            <div className="space-y-6">
              {publishedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/writing/${article.slug}`}
                  className="block card p-6 md:p-8 group"
                >
                  <div className="flex items-center gap-3 mb-3">
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
                  <h2 className="text-xl font-semibold text-[var(--text)] mb-2 group-hover:text-[var(--emerald)] transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-[var(--muted)] text-[15px] leading-relaxed">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card p-8 md:p-12 text-center">
              <p className="text-[var(--muted)] text-lg mb-6">
                First piece coming soon. Subscribe to get notified.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-lg bg-[var(--panel)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted2)] focus:outline-none focus:border-[var(--emerald)] transition-colors text-sm"
                  readOnly
                />
                <a
                  href="mailto:emanuel@skillfulai.io?subject=Subscribe%20to%20Writing"
                  className="btn-primary !py-3 !px-6 text-center"
                >
                  Subscribe
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
