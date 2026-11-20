
interface SHMonogramProps {
  size?: number
  className?: string
}

export default function SHMonogram({
  size = 40,
  className = '',
}: SHMonogramProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <polygon
        points="24,2 44,13 44,35 24,46 4,35 4,13"
        stroke="#72ff75"
        strokeWidth="1.5"
        fill="rgba(114,255,117,0.05)"
        style={{
          filter: 'drop-shadow(0 0 5px rgba(114,255,117,0.55))',
        }}
      />

      <path
        d="M9,13 H21 M9,13 V24 M9,24 H21 M21,24 V35 M9,35 H21"
        stroke="#72ff75"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <path
        d="M27,13 V35 M39,13 V35 M27,24 H39"
        stroke="#72ff75"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
