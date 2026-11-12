import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Comments from '@/components/Comments';

// Article → the case card on the home page that it documents.
const relatedCase: Record<string, { href: string; en: string; es: string }> = {
  'whatsapp-ai-agent-ten-months-production': {
    href: '/#case-francesca',
    en: 'Francesca, a WhatsApp front desk for a grooming spa chain',
    es: 'Francesca, recepción por WhatsApp para una cadena de spas de grooming',
  },
  'whatsapp-ai-agent-production-case-study': {
    href: '/#case-textile',
    en: 'A sales agent that never quotes from memory',
    es: 'Una agente de ventas que nunca cotiza de memoria',
  },
};
relatedCase['agente-ia-whatsapp-diez-meses-produccion'] = relatedCase['whatsapp-ai-agent-ten-months-production'];
relatedCase['swapping-llm-production-agent-personality'] = relatedCase['whatsapp-ai-agent-ten-months-production'];
relatedCase['swapping-llm-production-agent-personality-es'] = relatedCase['whatsapp-ai-agent-ten-months-production'];
relatedCase['whatsapp-ai-agent-production-case-study-es'] = relatedCase['whatsapp-ai-agent-production-case-study'];

const CALENDAR = 'https://calendar.app.google/1P4C3Q9yWTBsxLv38';

function formatDate(date: string, lang: 'en' | 'es') {
  // Dates are plain YYYY-MM-DD; format in UTC so the day never shifts.
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(lang === 'es' ? 'es-CO' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found' };
  const enSlug = article.lang === 'es' ? article.translationSlug : slug;
  const esSlug = article.lang === 'es' ? slug : article.translationSlug;
  return {
    title: `${article.title} — Emanuel Hernández Castillo`,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: `https://emanuelhc.ai/writing/${slug}`,
      ...(article.translationSlug && {
        languages: {
          en: `https://emanuelhc.ai/writing/${enSlug}`,
          es: `https://emanuelhc.ai/writing/${esSlug}`,
        },
      }),
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: ['Emanuel Hernández Castillo'],
      url: `https://emanuelhc.ai/writing/${slug}`,
      locale: article.lang === 'es' ? 'es_CO' : 'en_US',
      tags: article.keywords,
      images: [
        article.image
          ? { url: article.image, width: 2400, height: 1254 }
          : { url: `/og/${slug}`, width: 1200, height: 630, alt: article.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.image ?? `/og/${slug}`],
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

  const url = `https://emanuelhc.ai/writing/${slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      '@id': 'https://emanuelhc.ai/#person',
      name: 'Emanuel Hernández Castillo',
      jobTitle: 'AI Systems Architect',
      url: 'https://emanuelhc.ai',
      sameAs: ['https://www.linkedin.com/in/emanuelhc/'],
    },
    publisher: {
      '@type': 'Person',
      '@id': 'https://emanuelhc.ai/#person',
      name: 'Emanuel Hernández Castillo',
      url: 'https://emanuelhc.ai',
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@type': 'Blog', '@id': 'https://emanuelhc.ai/writing', name: 'Writing' },
    url,
    articleSection: article.pillar,
    keywords: article.keywords?.join(', '),
    wordCount: article.content.trim().split(/\s+/).length,
    timeRequired: `PT${article.readTimeMinutes}M`,
    inLanguage: article.lang,
    image: `https://emanuelhc.ai${article.image ?? `/og/${slug}`}`,
    ...(article.translationSlug && {
      [article.lang === 'es' ? 'translationOfWork' : 'workTranslation']: {
        '@type': 'Article',
        '@id': `https://emanuelhc.ai/writing/${article.translationSlug}#article`,
        url: `https://emanuelhc.ai/writing/${article.translationSlug}`,
        inLanguage: article.lang === 'es' ? 'en' : 'es',
      },
    }),
  };

  const enSlug = article.lang === 'es' ? article.translationSlug : slug;
  const esSlug = article.lang === 'es' ? slug : article.translationSlug;

  const es = article.lang === 'es';
  const related = relatedCase[slug];
  const t = es
    ? {
        back: 'Escritos',
        read: 'min de lectura',
        language: 'Idioma',
        role: 'Arquitecto de sistemas de IA · Construyendo potenci',
        related: 'Sistema relacionado',
        otherLang: 'Read it in English',
        ctaTitle: 'Construyo y opero agentes como este.',
        ctaBody:
          'Si tienes un agente en producción que falla, o uno que necesita llegar a producción, empieza con una hora.',
        ctaHour: 'Agenda una hora — $200',
        ctaDiscovery: 'Llamada gratuita de 15 min',
        all: 'Todos los escritos',
      }
    : {
        back: 'Writing',
        read: 'min read',
        language: 'Language',
        role: 'AI systems architect · Building potenci',
        related: 'Related system',
        otherLang: 'Leer en español',
        ctaTitle: 'I build and operate agents like this one.',
        ctaBody:
          'If you have an agent in production that keeps failing, or one that needs to get there, start with one hour.',
        ctaHour: 'Book a paid hour — $200',
        ctaDiscovery: 'Free 15-min discovery',
        all: 'All writing',
      };

  return (
    <>
      <div className="read-progress" aria-hidden="true" />
      <Navigation />
      <main className="min-h-screen pt-[clamp(40px,7vw,88px)] pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <article className="frame" lang={article.lang}>
          <div className="max-w-[720px] mx-auto">
            <header>
              <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4">
                <Link href="/writing" className="label text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                  <span aria-hidden="true">← </span>
                  {t.back}
                </Link>
                {article.translationSlug && (
                  <div role="group" aria-label={t.language} className="inline-flex p-[3px] rounded-[10px] border border-[var(--border-light)]">
                    {(['en', 'es'] as const).map((l) => {
                      const current = article.lang === l;
                      return (
                        <Link
                          key={l}
                          href={`/writing/${l === 'en' ? enSlug : esSlug}`}
                          hrefLang={l}
                          lang={l}
                          aria-current={current ? 'page' : undefined}
                          className={`label label-sm min-w-[44px] min-h-[34px] px-2.5 grid place-items-center rounded-[7px] transition-colors ${
                            current
                              ? 'bg-[var(--panel3)] text-[var(--text)]'
                              : 'text-[var(--muted)] hover:text-[var(--text)]'
                          }`}
                        >
                          {l.toUpperCase()}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </nav>

              <p className="mt-12 mb-0 flex flex-wrap items-center gap-x-3 gap-y-1 label">
                <span className="text-[var(--emerald2)]">{article.pillar}</span>
                <span aria-hidden="true" className="text-[var(--faint)]">/</span>
                <time dateTime={article.date}>{formatDate(article.date, article.lang)}</time>
                <span aria-hidden="true" className="text-[var(--faint)]">/</span>
                <span>
                  {article.readTimeMinutes} {t.read}
                </span>
              </p>
              <h1
                className="mt-5 mb-0 font-bold text-[clamp(32px,4.6vw,54px)] tracking-[-0.04em] text-[var(--text)]"
                style={{ lineHeight: 1.06 }}
              >
                {article.title}
              </h1>
              {article.description && (
                <p className="mt-6 mb-0 text-[18px] md:text-[20px] leading-[1.55] text-[var(--muted)] [text-wrap:pretty]">
                  {article.description}
                </p>
              )}
              <div className="mt-9 pb-9 flex items-center gap-3.5 border-b border-[var(--border)]">
                <Image
                  src="/images/PFP_EMANUEL.jpeg"
                  alt=""
                  width={80}
                  height={80}
                  className="w-10 h-10 rounded-full object-cover border border-[var(--border-light)]"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-medium text-[var(--text)]">Emanuel Hernández Castillo</span>
                  <span className="label label-sm">{t.role}</span>
                </div>
              </div>
            </header>

            {/* Article body: text comes from the markdown file, untouched. */}
            <div
              className="prose mt-10"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />

            <footer className="mt-16 flex flex-col gap-3">
              {related && (
                <Link
                  href={related.href}
                  className="group panel px-5 py-5 md:px-6 flex items-center justify-between gap-6 transition-colors hover:border-[var(--border-bright)]"
                >
                  <span className="flex flex-col gap-1.5">
                    <span className="label label-sm">{t.related}</span>
                    <span className="text-base md:text-[17px] font-medium text-[var(--text)] group-hover:text-[var(--emerald2)] transition-colors">
                      {es ? related.es : related.en}
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-[var(--emerald2)]">→</span>
                </Link>
              )}

              <div className="panel panel-accent px-5 py-6 md:px-7 md:py-7">
                <p className="m-0 font-[family-name:var(--font-sora)] font-semibold text-[20px] md:text-[22px] tracking-[-0.02em] text-[var(--text)]" style={{ lineHeight: 1.25 }}>
                  {t.ctaTitle}
                </p>
                <p className="mt-2 mb-0 text-[15px] leading-relaxed text-[var(--muted)]">{t.ctaBody}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={CALENDAR} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    {t.ctaHour}
                  </a>
                  <Link href="/#discovery" className="btn-secondary">
                    {t.ctaDiscovery}
                  </Link>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <Link href="/writing" className="label text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                  <span aria-hidden="true">← </span>
                  {t.all}
                </Link>
                {article.translationSlug && (
                  <Link
                    href={`/writing/${article.translationSlug}`}
                    hrefLang={es ? 'en' : 'es'}
                    lang={es ? 'en' : 'es'}
                    className="link-arrow text-[15px]"
                  >
                    {t.otherLang} <span aria-hidden="true" className="arrow">→</span>
                  </Link>
                )}
              </div>
            </footer>

            <Comments slug={slug} lang={article.lang} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
