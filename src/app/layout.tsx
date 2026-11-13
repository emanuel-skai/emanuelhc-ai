import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { services } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE = 'https://emanuelhc.ai';
const TITLE = 'Emanuel Hernández Castillo — Fractional CTO & AI systems architect';
const DESCRIPTION =
  'Tech leadership for companies building with AI: fractional CTO, technical interviews and hiring, architecture review and due diligence, and AI agents in production. Ex-Intel, Apple, co-founder and CTO of Skillful AI. Based in Costa Rica.';

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
    'fractional CTO',
    'technical interviews',
    'technical due diligence',
    'architecture review',
    'AI agents in production',
    'AI systems architect',
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
      jobTitle: 'Fractional CTO & AI systems architect',
      description:
        'Fractional CTO and AI systems architect. Former GPU software engineer at Intel, data scientist for Apple, and co-founder and CTO of Skillful AI. Builds potenci and runs AI agents in production for real businesses.',
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
        'Technical leadership',
        'Fractional CTO',
        'Engineering hiring and technical interviews',
        'Software architecture',
        'Technical due diligence',
        'AI agents in production',
        'Agentic AI',
        'Machine learning',
        'AWS cloud architecture',
      ],
      alumniOf: [
        { '@type': 'Organization', name: 'Intel' },
        { '@type': 'Organization', name: 'Apple' },
        { '@type': 'Organization', name: 'Skillful AI' },
      ],
      hasOfferCatalog: { '@id': `${SITE}/#offers` },
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
      '@type': 'OfferCatalog',
      '@id': `${SITE}/#offers`,
      name: 'Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Consulting hour',
          price: '200',
          priceCurrency: 'USD',
          url: SITE,
          itemOffered: { '@type': 'Service', name: 'Consulting hour', provider: { '@id': `${SITE}/#person` } },
        },
        ...services.map((s) => ({
          '@type': 'Offer',
          url: `${SITE}/#${s.id}`,
          description: s.pricing,
          ...(s.id === 'ai-agents'
            ? { price: '10000', priceCurrency: 'USD', eligibleQuantity: { '@type': 'QuantitativeValue', value: 50, unitText: 'hours' } }
            : {}),
          itemOffered: {
            '@type': 'Service',
            name: s.name,
            description: s.summary,
            serviceType: s.name,
            areaServed: 'Worldwide',
            provider: { '@id': `${SITE}/#person` },
          },
        })),
      ],
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
        className={`${sora.variable} ${geistSans.variable} ${geistMono.variable} antialiased grain-overlay`}
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
