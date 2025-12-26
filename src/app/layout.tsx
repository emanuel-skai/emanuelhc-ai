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
  title: "Emanuel Hernández Castillo — AI & Software Consulting",
  description: "Production-grade AI systems: agents, RAG, automation, AWS, FastAPI. I help teams ship reliable AI software designed for real constraints.",
  icons: {
    icon: "/images/emanuehc-logo.jpeg",
    apple: "/images/emanuehc-logo.jpeg",
  },
  openGraph: {
    title: "Emanuel Hernández Castillo — AI & Software Consulting",
    description: "Production-grade AI systems: agents, RAG, automation, AWS, FastAPI.",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
