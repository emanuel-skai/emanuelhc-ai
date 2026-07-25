import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg2)]">
      <div className="max-w-[1240px] mx-auto px-8 pt-[70px] pb-10 grid md:grid-cols-[minmax(280px,1fr)_auto_auto] gap-[clamp(32px,6vw,80px)]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size={32} />
            <span className="text-[var(--text)] font-semibold text-lg tracking-tight">
              emanuel<span className="text-[var(--emerald)]">.</span>hc
            </span>
          </div>
          <p className="mt-5 mb-0 max-w-[380px] text-[15px] leading-relaxed text-[var(--muted)]">
            Agentic AI systems engineered for reliability, cost control, and the day after launch.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
            Navigate
          </div>
          <a href="#work" className="text-[15px] text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            Work
          </a>
          <a href="#services" className="text-[15px] text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            Services
          </a>
          <a href="#process" className="text-[15px] text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            Process
          </a>
          <Link href="/writing" className="text-[15px] text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            Writing
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
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
            href="https://skillful.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            Skillful AI ↗
          </a>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-8 pt-6 pb-[46px] border-t border-[var(--border)] flex flex-wrap justify-between gap-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--muted2)]">
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
