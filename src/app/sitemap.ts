import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';

const BASE = 'https://emanuelhc.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles().map((a) => {
    const enSlug = a.lang === 'es' ? a.translationSlug : a.slug;
    const esSlug = a.lang === 'es' ? a.slug : a.translationSlug;
    return {
      url: `${BASE}/writing/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      ...(a.translationSlug && {
        alternates: {
          languages: {
            en: `${BASE}/writing/${enSlug}`,
            es: `${BASE}/writing/${esSlug}`,
          },
        },
      }),
    };
  });

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${BASE}/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...articles,
  ];
}
