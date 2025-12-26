export default function Logo({ size = 36 }: { size?: number }) {
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

      {/* Hexagonal network pattern */}
      <g opacity="0.6">
        {/* Connection lines */}
        <line x1="20" y1="8" x2="20" y2="20" stroke="#10B981" strokeWidth="1" />
        <line x1="20" y1="20" x2="20" y2="32" stroke="#10B981" strokeWidth="1" />
        <line x1="20" y1="20" x2="10" y2="14" stroke="#10B981" strokeWidth="1" />
        <line x1="20" y1="20" x2="30" y2="14" stroke="#10B981" strokeWidth="1" />
        <line x1="20" y1="20" x2="10" y2="26" stroke="#10B981" strokeWidth="1" />
        <line x1="20" y1="20" x2="30" y2="26" stroke="#10B981" strokeWidth="1" />

        {/* Outer hexagon hints */}
        <line x1="10" y1="14" x2="10" y2="26" stroke="#10B981" strokeWidth="0.5" opacity="0.5" />
        <line x1="30" y1="14" x2="30" y2="26" stroke="#10B981" strokeWidth="0.5" opacity="0.5" />
      </g>

      {/* Nodes */}
      <circle cx="20" cy="20" r="4" fill="#10B981" />
      <circle cx="20" cy="20" r="2" fill="white" />

      <circle cx="20" cy="8" r="2.5" fill="#10B981" opacity="0.8" />
      <circle cx="20" cy="32" r="2.5" fill="#10B981" opacity="0.8" />
      <circle cx="10" cy="14" r="2" fill="#10B981" opacity="0.6" />
      <circle cx="30" cy="14" r="2" fill="#10B981" opacity="0.6" />
      <circle cx="10" cy="26" r="2" fill="#10B981" opacity="0.6" />
      <circle cx="30" cy="26" r="2" fill="#10B981" opacity="0.6" />
    </svg>
  );
}
