import { ImageResponse } from 'next/og';
import { getAllArticles } from '@/lib/articles';

// Social card for articles without a hand-made `image` in frontmatter.
// A route (not the opengraph-image file convention) so it never overrides
// the custom cards some articles already ship.

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getAllArticles().find((a) => a.slug === slug);
  const title = article?.title ?? 'Writing';
  const es = article?.lang === 'es';
  const meta = article
    ? `${article.pillar} · ${article.readTimeMinutes} ${es ? 'min de lectura' : 'min read'}`
    : 'emanuelhc.ai';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          borderBottom: '6px solid #10B981',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }} />
          <span style={{ color: '#10B981', fontSize: '22px', letterSpacing: '0.18em' }}>
            {es ? 'ESCRITOS' : 'WRITING'}
          </span>
          <span style={{ color: '#666666', fontSize: '22px', letterSpacing: '0.18em' }}>
            · {meta.toUpperCase()}
          </span>
        </div>
        <div
          style={{
            color: '#FAFAFA',
            fontSize: title.length > 80 ? '54px' : '64px',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            display: 'flex',
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#8A8A8A', fontSize: '26px' }}>Emanuel Hernández Castillo</span>
          <span style={{ display: 'flex', color: '#FAFAFA', fontSize: '26px', fontWeight: 600 }}>
            emanuelhc<span style={{ color: '#10B981' }}>.</span>ai
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
