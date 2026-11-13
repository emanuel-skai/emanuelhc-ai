import Image from 'next/image';
import { CALENDAR_HOUR } from '@/lib/site';

const credentials = ['Intel', 'Apple', 'ex-CTO, Skillful AI', 'Building potenci'];

function Rings({ className }: { className?: string }) {
  // Fine concentric linework that frames the portrait from behind. Static, decorative.
  const radii = [120, 150, 180, 210, 240, 270, 300];
  return (
    <svg aria-hidden="true" viewBox="0 0 640 640" className={className} fill="none">
      {radii.map((r, i) => (
        <circle
          key={r}
          cx="320"
          cy="320"
          r={r}
          stroke={i === 2 ? 'var(--emerald-line)' : 'var(--border)'}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div className="frame relative grid gap-12 pt-[clamp(40px,7vw,104px)] pb-[clamp(72px,9vw,128px)] lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-center lg:gap-[clamp(48px,6vw,96px)]">
        <div className="hero-in flex flex-col items-start">
          {/* Mobile: compact identity row. Desktop shows the portrait column instead. */}
          <div className="flex items-center gap-4 lg:hidden">
            <Image
              src="/images/PFP_EMANUEL.jpeg"
              alt="Emanuel Hernández Castillo"
              width={56}
              height={56}
              priority
              className="w-14 h-14 rounded-full object-cover border border-[var(--border-light)]"
            />
            <div>
              <p className="m-0 text-[15px] font-semibold text-[var(--text)]">Emanuel Hernández Castillo</p>
              <p className="m-0 mt-0.5 text-sm text-[var(--muted)]">Fractional CTO · Costa Rica</p>
            </div>
          </div>

          <p className="eyebrow m-0 hidden lg:inline-flex">
            <span aria-hidden="true" className="eyebrow-rule" />
            <span>Fractional CTO &amp; AI systems architect</span>
          </p>

          <h1
            id="hero-heading"
            className="mt-9 lg:mt-6 mb-0 font-semibold text-[clamp(40px,5.4vw,76px)] tracking-[-0.045em] text-[var(--text)]"
            style={{ lineHeight: 1.02 }}
          >
            Tech leadership for companies building with AI.
          </h1>

          <p className="mt-7 mb-0 max-w-[560px] text-[18px] md:text-[19px] leading-[1.6] text-[var(--text-secondary)] [text-wrap:pretty]">
            Fractional CTO, technical interviews, architecture reviews and AI agents in production,
            for founders who need senior engineering judgment before they need a full-time hire.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a href="#discovery" className="btn-primary">
              Book a free 15-min call
            </a>
            <a href={CALENDAR_HOUR} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Book an hour · $200
            </a>
          </div>

          <ul
            aria-label="Background"
            className="mt-12 mb-0 p-0 list-none flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] text-[var(--muted)]"
          >
            {credentials.map((c, i) => (
              <li key={c} className="flex items-center gap-3 whitespace-nowrap">
                <span className={i === credentials.length - 1 ? 'text-[var(--text-secondary)]' : undefined}>{c}</span>
                {i < credentials.length - 1 && (
                  <span aria-hidden="true" className="w-1 h-1 rounded-full bg-[var(--faint)]" />
                )}
              </li>
            ))}
          </ul>
        </div>

        <figure className="hero-in hero-in-late relative hidden lg:block m-0">
          <Rings className="absolute left-1/2 top-1/2 w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="relative overflow-hidden rounded-[20px] border border-[var(--border-light)] bg-[var(--panel)] aspect-[4/5]">
            <Image
              src="/images/PFP_EMANUEL.jpeg"
              alt="Emanuel Hernández Castillo"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 0px"
              className="object-cover object-[50%_30%] [filter:saturate(0.85)]"
            />
          </div>
          <figcaption className="relative mt-5 flex items-baseline justify-between gap-4">
            <span className="text-[15px] font-semibold text-[var(--text)]">Emanuel Hernández Castillo</span>
            <span className="label label-sm">Costa Rica · ES / EN</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
