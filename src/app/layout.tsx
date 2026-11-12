import type { Metadata } from "next";
import { Geist_Mono, Inter, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE = 'https://emanuelhc.ai';
const TITLE = 'Emanuel Hernández Castillo — AI agents in production';
const DESCRIPTION =
  'AI systems architect building potenci. I build WhatsApp agents that answer, quote and book for real businesses, and I run the platform under them. Flagship: 234,000+ messages in ten months, ~50 s median first reply against ~17 min for the human team.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: SITE,
    types: {
      'application/rss+xml': `${SITE}/feed.xml`,
    },
  },
  authors: [{ name: 'Emanuel Hernández Castillo', url: SITE }],
  creator: 'Emanuel Hernández Castillo',
  keywords: [
    'AI agents in production',
    'WhatsApp AI agent',
    'AI systems architect',
    'agent operations',
    'LLM ops',
    'potenci',
    'Costa Rica',
    'LATAM',
  ],
  verification: {
    google: 'WkiypRy9XA2ZnZlQhMilAc5BAidxxAiQczNcShjB5gg',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE,
    siteName: 'emanuelhc.ai',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE}/#person`,
      name: 'Emanuel Hernández Castillo',
      alternateName: ['Emanuel Hernandez', 'Emanuel Hernandez Castillo'],
      jobTitle: 'AI Systems Architect',
      description:
        'Architects and operates production AI agents (WhatsApp booking, quoting and sales) and the multi-tenant platform under them. Building potenci.',
      url: SITE,
      image: `${SITE}/images/PFP_EMANUEL.jpeg`,
      worksFor: { '@id': 'https://potenci.ai/#organization' },
      founder: { '@id': 'https://potenci.ai/#organization' },
      homeLocation: { '@type': 'Country', name: 'Costa Rica' },
      sameAs: [
        'https://www.linkedin.com/in/emanuelhc/',
        'https://www.effectivesoft.com/experts/emanuel-hernandez-castillo.html',
        'https://www.crunchbase.com/person/emanuel-hern%C3%A1ndez',
      ],
      knowsAbout: [
        'AI agents in production',
        'WhatsApp AI agents',
        'Agentic AI',
        'LLM operations and evaluation',
        'Human-in-the-loop systems',
        'AWS cloud architecture',
        'Machine Learning',
      ],
      knowsLanguage: ['es', 'en'],
    },
    {
      '@type': 'Organization',
      '@id': 'https://potenci.ai/#organization',
      name: 'potenci',
      url: 'https://potenci.ai',
      description:
        'A business OS with native AI agents that serve customers on WhatsApp and other channels: they sell from the catalog, send priced quotes, book into the calendar and hand off to the team.',
      founder: { '@id': `${SITE}/#person` },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: SITE,
      name: 'emanuelhc.ai',
      inLanguage: ['en', 'es'],
      publisher: { '@id': `${SITE}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${inter.variable} ${geistMono.variable} antialiased grain-overlay`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
