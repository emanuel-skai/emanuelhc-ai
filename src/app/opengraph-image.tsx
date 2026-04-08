import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Emanuel Hernandez — Co-founder & CTO, Skillful AI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#10B981',
            }}
          />
          <span
            style={{
              color: '#8A8A8A',
              fontSize: '20px',
            }}
          >
            Co-founder &amp; CTO · Skillful AI
          </span>
        </div>
        <h1
          style={{
            color: '#FAFAFA',
            fontSize: '64px',
            fontWeight: 700,
            lineHeight: 1.1,
            margin: 0,
            marginBottom: '24px',
          }}
        >
          Emanuel Hernandez
        </h1>
        <p
          style={{
            color: '#8A8A8A',
            fontSize: '28px',
            lineHeight: 1.4,
            margin: 0,
            maxWidth: '800px',
          }}
        >
          Production-grade agentic AI systems for enterprise clients in LATAM,
          Europe, and North America.
        </p>
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              color: '#FAFAFA',
              fontSize: '22px',
              fontWeight: 600,
            }}
          >
            emanuelhc
          </span>
          <span
            style={{
              color: '#10B981',
              fontSize: '22px',
              fontWeight: 600,
            }}
          >
            .
          </span>
          <span
            style={{
              color: '#FAFAFA',
              fontSize: '22px',
              fontWeight: 600,
            }}
          >
            ai
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
