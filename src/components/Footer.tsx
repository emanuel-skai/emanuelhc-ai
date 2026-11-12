import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg2)]">
      <div className="frame pt-[64px] pb-10 grid md:grid-cols-[minmax(280px,1fr)_auto_auto] gap-[clamp(32px,6vw,80px)]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size={32} />
            <span className="text-[var(--text)] font-semibold text-lg tracking-tight">
              emanuel<span className="text-[var(--emerald)]">.</span>hc
            </span>
          </div>
          <p className="mt-5 mb-0 max-w-[380px] text-[15px] leading-relaxed text-[var(--muted)]">
            AI agents in production, and the platform that keeps them answering. Built, operated and measured from Costa Rica.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <div className="label label-sm">
            Navigate
          </div>
          <Link href="/#work" className="text-[15px] text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            Work
          </Link>
          <Link href="/#services" className="text-[15px] text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            Services
          </Link>
          <Link href="/#practice" className="text-[15px] text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            Practice
          </Link>
          <Link href="/#log" className="text-[15px] text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            Operating log
          </Link>
          <Link href="/writing" className="text-[15px] text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            Writing
          </Link>
        </nav>

        <div className="flex flex-col gap-3">
          <div className="label label-sm">
            Contact
          </div>
          <a
            href="mailto:emanuel@skillfulai.io"
            className="text-[15px] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            emanuel@skillfulai.io
          </a>
          <a
            href="https://www.linkedin.com/in/emanuelhc/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://potenci.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            potenci ↗
          </a>
        </div>
      </div>

      <div className="frame pt-6 pb-[44px] border-t border-[var(--border)] flex flex-wrap justify-between gap-4 label label-sm">
        <span>© 2026 Emanuel Hernández Castillo</span>
        <span className="flex gap-6">
          <Link href="/writing" className="text-[var(--muted2)] hover:text-[var(--text)] transition-colors">
            Writing
          </Link>
          <a
            href="https://www.linkedin.com/in/emanuelhc/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted2)] hover:text-[var(--text)] transition-colors"
          >
            LinkedIn
          </a>
        </span>
      </div>
    </footer>
  );
}
