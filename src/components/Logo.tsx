export default function Logo({ size = 36 }: { size?: number }) {
  // Generate rotated ellipses for spirograph effect (same as hero)
  const ellipseCount = 12;
  const ellipses = Array.from({ length: ellipseCount }, (_, i) => {
    const rotation = (i * 180) / ellipseCount;
    return rotation;
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Background */}
      <rect width="40" height="40" rx="8" fill="#080808" />

      {/* Spirograph pattern */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>
      </defs>

      <g fill="none" stroke="url(#logoGradient)" strokeWidth="0.5" opacity="0.8">
        {ellipses.map((rotation, i) => (
          <ellipse
            key={i}
            cx="20"
            cy="20"
            rx="14"
            ry="7"
            transform={`rotate(${rotation} 20 20)`}
            style={{ opacity: 0.5 + (i / ellipseCount) * 0.5 }}
          />
        ))}
      </g>

      {/* Center glow */}
      <circle cx="20" cy="20" r="3" fill="#10B981" opacity="0.6" />
      <circle cx="20" cy="20" r="1.5" fill="#10B981" />
    </svg>
  );
}
