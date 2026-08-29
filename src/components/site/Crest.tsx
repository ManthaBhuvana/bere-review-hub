export function Crest({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 56"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="crestG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="oklch(0.62 0.22 25)" />
          <stop offset="1" stopColor="oklch(0.42 0.18 25)" />
        </linearGradient>
      </defs>
      {/* Shield */}
      <path
        d="M24 2 L44 8 V26 C44 40 34 50 24 54 C14 50 4 40 4 26 V8 Z"
        fill="url(#crestG)"
        stroke="oklch(0.85 0.01 90)"
        strokeWidth="1"
      />
      {/* Book */}
      <path
        d="M12 24 H24 V38 H12 Z M24 24 H36 V38 H24 Z"
        fill="none"
        stroke="oklch(0.95 0.01 90)"
        strokeWidth="1.5"
      />
      <line x1="24" y1="24" x2="24" y2="38" stroke="oklch(0.95 0.01 90)" strokeWidth="1.5" />
      {/* Torch flame */}
      <path
        d="M24 8 C22 12 20 14 20 17 C20 19.5 22 21 24 21 C26 21 28 19.5 28 17 C28 14 26 12 24 8 Z"
        fill="oklch(0.95 0.01 90)"
      />
      <line x1="24" y1="21" x2="24" y2="24" stroke="oklch(0.95 0.01 90)" strokeWidth="1.5" />
    </svg>
  );
}
