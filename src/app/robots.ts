import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      // Explicitly welcome AI/answer-engine crawlers (GEO).
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'PerplexityBot',
          'Google-Extended',
          'CCBot',
        ],
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: 'https://emanuelhc.ai/sitemap.xml',
  };
}
