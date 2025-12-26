'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#case-studies', label: 'Case Studies' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQs' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <Logo size={36} />
          <span className="text-[var(--text)] font-semibold text-lg tracking-tight hidden sm:block">
            emanuel<span className="text-[var(--emerald)]">.</span>hc
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[var(--muted)] text-sm font-medium px-4 py-2 rounded-lg hover:text-[var(--text)] hover:bg-white/5 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#discovery"
            onClick={(e) => scrollToSection(e, '#discovery')}
            className="text-[var(--muted)] text-sm font-medium hover:text-[var(--emerald)] transition-colors px-4 py-2"
          >
            Free discovery
          </a>
          <a
            href="https://calendar.app.google/1P4C3Q9yWTBsxLv38"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg"
          >
            <span>Book $200/hr</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
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
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-[400px]' : 'max-h-0'
        }`}
      >
        <div className="bg-[var(--bg)]/95 backdrop-blur-xl border-b border-[var(--border)]">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-[var(--muted)] text-base font-medium hover:text-[var(--text)] transition-colors py-3 px-2 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-[var(--border)]">
              <a
                href="#discovery"
                className="btn-secondary !py-3 text-center"
                onClick={(e) => scrollToSection(e, '#discovery')}
              >
                Free 15-min discovery
              </a>
              <a
                href="https://calendar.app.google/1P4C3Q9yWTBsxLv38"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !py-3 text-center"
              >
                <span>Book $200/hr</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
