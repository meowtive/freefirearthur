export function Flame({
  className,
  id,
}: {
  className?: string;
  id: string;
}) {
  return (
    <svg viewBox="0 0 100 240" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="50" y1="240" x2="50" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9a120f" />
          <stop offset="28%" stopColor="#ff4d00" />
          <stop offset="62%" stopColor="#ff9a00" />
          <stop offset="100%" stopColor="#ffe56a" />
        </linearGradient>
        <linearGradient id={`${id}-core`} x1="50" y1="210" x2="50" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffd15a" />
          <stop offset="100%" stopColor="#fff6c4" />
        </linearGradient>
      </defs>
      <g className="flame-flicker">
        <path
          fill={`url(#${id})`}
          d="M50 4c7 24 4 34 18 54 11 16 20 26 18 48-3 26-18 36-16 58 1 14 8 24 8 40 0 22-12 32-28 32S22 226 22 204c0-16 8-26 8-40 2-22-13-32-16-58-2-22 7-32 18-48C46 38 43 28 50 4z"
        />
        <path
          fill={`url(#${id})`}
          opacity="0.95"
          d="M18 118c8-22 6-30-2-52 10 8 16 28 12 48-2 14-8 20-10 32-2 8 0 14 0 14s-8-10-8-24c0-8 4-12 8-18z"
        />
        <path
          fill={`url(#${id})`}
          opacity="0.95"
          d="M82 118c-8-22-6-30 2-52-10 8-16 28-12 48 2 14 8 20 10 32 2 8 0 14 0 14s8-10 8-24c0-8-4-12-8-18z"
        />
        <path
          fill={`url(#${id}-core)`}
          d="M50 78c8 18 12 32 10 52-2 18-6 34-10 62-4-28-8-44-10-62-2-20 2-34 10-52z"
        />
      </g>
    </svg>
  );
}
