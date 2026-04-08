import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://emanuelhc.ai"),
  title: "Emanuel Hernandez — Co-founder & CTO, Skillful AI | Agentic AI Architect",
  description: "Co-founder and CTO of Skillful AI. I design and build production-grade agentic AI systems for enterprise clients in LATAM, Europe, and North America. Available for a limited number of consulting engagements.",
  openGraph: {
    title: "Emanuel Hernandez — Co-founder & CTO, Skillful AI | Agentic AI Architect",
    description: "Co-founder and CTO of Skillful AI. I design and build production-grade agentic AI systems for enterprise clients in LATAM, Europe, and North America.",
    type: "website",
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Emanuel Hernandez',
  jobTitle: 'Co-founder & CTO',
  worksFor: {
    '@type': 'Organization',
    name: 'Skillful AI',
  },
  url: 'https://emanuelhc.ai',
  sameAs: ['https://www.linkedin.com/in/emanuelhc/'],
  knowsAbout: ['Agentic AI', 'Machine Learning', 'Enterprise AI Systems'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
