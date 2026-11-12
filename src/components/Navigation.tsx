'use client';

import { useState } from 'react';
import Logo from './Logo';

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#practice', label: 'Practice' },
  { href: '#log', label: 'Log' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '/writing', label: 'Writing' },
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
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-[var(--border)]">
      <div className="frame h-[var(--nav-h)] flex items-center justify-between gap-8">
        {/* Logo */}
        <a href="#top" onClick={(e) => scrollToSection(e, '#top')} aria-label="Emanuel Hernández Castillo, home" className="flex items-center gap-2.5 group">
          <Logo size={32} />
          <span className="text-[var(--text)] font-semibold text-lg tracking-tight hidden sm:block">
            emanuel<span className="text-[var(--emerald)]">.</span>hc
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 label">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[var(--muted)] hover:text-[var(--text)] transition-colors py-2"
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
            className="btn-primary !min-h-[40px] !px-[18px] !text-sm"
          >
            Book an hour
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-11 h-11 -mr-2 flex items-center justify-center text-[var(--text)] rounded-lg hover:bg-white/5 transition-colors"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
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
        id="mobile-menu"
        inert={!isMobileMenuOpen}
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-[420px]' : 'max-h-0'
        }`}
      >
        <div className="bg-black/95 backdrop-blur-xl border-b border-[var(--border)]">
          <div className="frame py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="label text-[var(--muted)] hover:text-[var(--text)] transition-colors py-3"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://calendar.app.google/1P4C3Q9yWTBsxLv38"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-3"
            >
              Book an hour
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
