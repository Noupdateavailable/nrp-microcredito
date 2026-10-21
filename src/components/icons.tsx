// Stroke icons from the NRP design. All decorative: callers give the text.
type P = { size?: number; color?: string; width?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function CheckIcon({ size = 24, color = "currentColor", width = 2.5, className }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={width} className={className}>
      <path d="M5 12l5 5 9-10" />
    </svg>
  );
}

export function PhoneIcon({ size = 22, color = "currentColor", width = 2, className }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={width} className={className}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

export function PinIcon({ size = 22, color = "currentColor", width = 2, className }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={width} className={className}>
      <path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function MailIcon({ size = 22, color = "currentColor", width = 2, className }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={width} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function ClockIcon({ size = 22, color = "currentColor", width = 2, className }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={width} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function PersonIcon({ size = 28, color = "#FFFFFF", width = 2, className }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={width} className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

export function StoreIcon({ size = 28, color = "#FFFFFF", width = 2, className }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={width} className={className}>
      <path d="M3 9l1-5h16l1 5" />
      <path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z" />
      <path d="M5 13v7h14v-7" />
    </svg>
  );
}

export function GrowthIcon({ size = 28, color = "#FFFFFF", width = 2, className }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={width} className={className}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

export function MenuIcon({ size = 24, color = "currentColor", className }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={2.5} className={className}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </svg>
  );
}

export function CloseIcon({ size = 24, color = "currentColor", className }: P) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={2.5} className={className}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}
