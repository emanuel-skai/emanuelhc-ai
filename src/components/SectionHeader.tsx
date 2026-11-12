import type { ReactNode } from 'react';

interface SectionHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  id?: string;
  intro?: ReactNode;
  /** Short note set against the title on wide screens (right column). */
  aside?: ReactNode;
}

/**
 * Section opener: mono index + label, display headline, optional intro or aside.
 * The index reads like a panel number on a console ("03 / Practice").
 */
export default function SectionHeader({ index, label, title, id, intro, aside }: SectionHeaderProps) {
  return (
    <div className="reveal grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)] lg:items-end">
      <div className="max-w-[760px]">
        <p className="eyebrow m-0">
          <span className="eyebrow-index">{index}</span>
          <span aria-hidden="true" className="eyebrow-rule" />
          <span>{label}</span>
        </p>
        <h2
          id={id}
          className="mt-6 mb-0 font-bold text-[clamp(32px,4.2vw,54px)] tracking-[-0.038em] text-[var(--text)]"
          style={{ lineHeight: 1.04 }}
        >
          {title}
        </h2>
        {intro && (
          <p className="mt-6 mb-0 max-w-[620px] text-[17px] md:text-lg leading-[1.65] text-[var(--muted)] [text-wrap:pretty]">
            {intro}
          </p>
        )}
      </div>
      {aside && (
        <p className="m-0 max-w-[420px] text-[15px] leading-[1.65] text-[var(--muted)] [text-wrap:pretty] lg:pb-2">
          {aside}
        </p>
      )}
    </div>
  );
}
