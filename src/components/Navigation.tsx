'use client';

import { useState } from 'react';
import Logo from './Logo';

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#engage', label: 'Engage' },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) {
      setIsMobileMenuOpen(false);
      return;
    }
    e.preventDefault();
    if (window.location.pathname !== '/') {
      window.location.assign('/' + href);
      return;
    }
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 68;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border-b border-[var(--border)]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 h-[68px] flex items-center justify-between gap-8">
        {/* Logo */}
        <a href="#top" onClick={(e) => scrollToSection(e, '#top')} className="flex items-center gap-2.5 group">
          <Logo size={36} />
          <span className="text-[var(--text)] font-semibold text-lg tracking-tight hidden sm:block">
            emanuel<span className="text-[var(--emerald)]">.</span>hc
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-[30px] font-mono text-[11px] tracking-[0.16em] uppercase">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3.5">
          <a
            href="#discovery"
            onClick={(e) => scrollToSection(e, '#discovery')}
            className="text-sm font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            Discovery call
          </a>
          <a
            href="https://calendar.app.google/1P4C3Q9yWTBsxLv38"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white bg-gradient-to-br from-[#10B981] to-[#0D9668] px-[22px] py-[11px] rounded-xl transition-all hover:-translate-y-px hover:shadow-[0_10px_30px_rgba(16,185,129,0.25)]"
          >
            Book an hour
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-[var(--text)] rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-[420px]' : 'max-h-0'
        }`}
      >
        <div className="bg-black/95 backdrop-blur-xl border-b border-[var(--border)]">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="font-mono text-xs tracking-[0.16em] uppercase text-[var(--muted)] hover:text-[var(--text)] transition-colors py-3 px-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://calendar.app.google/1P4C3Q9yWTBsxLv38"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-center text-sm font-semibold text-white bg-gradient-to-br from-[#10B981] to-[#0D9668] px-[22px] py-3 rounded-xl"
            >
              Book an hour
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
