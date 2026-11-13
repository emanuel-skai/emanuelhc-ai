import type { ReactNode } from 'react';

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  id?: string;
  intro?: ReactNode;
}

/** Section opener: short emerald label, display headline, optional one-paragraph intro. */
export default function SectionHeader({ label, title, id, intro }: SectionHeaderProps) {
  return (
    <div className="reveal max-w-[760px]">
      <p className="eyebrow m-0">
        <span aria-hidden="true" className="eyebrow-rule" />
        <span>{label}</span>
      </p>
      <h2
        id={id}
        className="mt-5 mb-0 font-semibold text-[clamp(32px,4vw,52px)] tracking-[-0.035em] text-[var(--text)]"
        style={{ lineHeight: 1.06 }}
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-5 mb-0 max-w-[600px] text-[17px] md:text-lg leading-[1.65] text-[var(--muted)] [text-wrap:pretty]">
          {intro}
        </p>
      )}
    </div>
  );
}
