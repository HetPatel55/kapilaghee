import { cn } from "@/lib/utils";

/**
 * Small line-icon set drawn for the site (24px grid, 1.6 stroke, currentColor).
 * Decorative by default — pair with visible text rather than relying on the icon alone.
 */
type IconProps = { className?: string };

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-6 w-6 shrink-0", className)}
    >
      {children}
    </svg>
  );
}

/** A single drop — purity, nothing added. */
export function DropIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3.5c3.2 4 5.5 7.2 5.5 10.2a5.5 5.5 0 0 1-11 0c0-3 2.3-6.2 5.5-10.2Z" />
      <path d="M9.4 14.6a2.7 2.7 0 0 0 2.6 2.4" />
    </Svg>
  );
}

/** Clay pot with a churning stick — the bilona. */
export function ChurnIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M13.5 2.5 11 13" />
      <path d="M9.5 6.5h5" />
      <path d="M6.5 11.5h11c.7 2.2.4 4.8-1.3 6.6A6.4 6.4 0 0 1 12 20a6.4 6.4 0 0 1-4.2-1.9c-1.7-1.8-2-4.4-1.3-6.6Z" />
      <path d="M5.5 11.5h13" />
    </Svg>
  );
}

/** Cow head — Gir cow milk. */
export function CowIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 6.5c1.2 1.8 2.8 2.4 4.3 2.2M20 6.5c-1.2 1.8-2.8 2.4-4.3 2.2" />
      <path d="M8.3 8.7C8 12 8.6 15 9.3 17.3c.4 1.4 1.5 2.2 2.7 2.2s2.3-.8 2.7-2.2c.7-2.3 1.3-5.3 1-8.6-1-1-2.3-1.5-3.7-1.5s-2.7.5-3.7 1.5Z" />
      <path d="M10.3 17h3.4" />
      <path d="M10.2 12.2h.01M13.8 12.2h.01" />
    </Svg>
  );
}

/** Seal with a check — licensed / certified. */
export function SealIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 2.8l2.1 1.5 2.6-.1.8 2.5 2.1 1.5-.8 2.5.8 2.5-2.1 1.5-.8 2.5-2.6-.1L12 18.6l-2.1-1.5-2.6.1-.8-2.5-2.1-1.5.8-2.5-.8-2.5 2.1-1.5.8-2.5 2.6.1Z" />
      <path d="m9.2 10.7 1.9 1.9 3.7-3.7" />
    </Svg>
  );
}

/** Lab flask — independently tested. */
export function FlaskIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M9.5 3h5M10.5 3v5.5L5.3 17.4A2.4 2.4 0 0 0 7.4 21h9.2a2.4 2.4 0 0 0 2.1-3.6L13.5 8.5V3" />
      <path d="M7.6 14.5h8.8" />
    </Svg>
  );
}

/** Bowl of set curd. */
export function CurdIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3.5 11h17a8.5 8.5 0 0 1-17 0Z" />
      <path d="M6.5 11c.6-1.6 2.1-2.5 3.6-2.2.7-1.3 2.3-1.9 3.7-1.3 1.5.6 2.3 2 2.2 3.5" />
      <path d="M9 19.5h6" />
    </Svg>
  );
}

/** Flame — slow heating. */
export function FlameIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 21a6 6 0 0 0 6-6c0-3.6-2.6-5.7-4-8.9-.4 2.3-1.6 3.6-2.9 4.3C10.5 8.8 10 7.4 10 6c-2.4 2.1-4 5.1-4 9a6 6 0 0 0 6 6Z" />
      <path d="M12 21a2.5 2.5 0 0 1-2.5-2.5c0-1.6 1.3-2.4 2.5-4 1.2 1.6 2.5 2.4 2.5 4A2.5 2.5 0 0 1 12 21Z" />
    </Svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="m5 12.5 4.2 4.2L19 7" />
    </Svg>
  );
}

export function ArrowRightIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function PhoneIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M6.6 3.5h2.6l1.5 4-2 1.3a11 11 0 0 0 6.5 6.5l1.3-2 4 1.5v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
    </Svg>
  );
}

export function MailIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Svg>
  );
}

export function MapPinIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </Svg>
  );
}

/** Chat bubble with a handset — WhatsApp, drawn in the same line style as the set. */
export function WhatsAppIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3.2a8.8 8.8 0 0 0-7.6 13.2L3.2 20.8l4.5-1.2A8.8 8.8 0 1 0 12 3.2Z" />
      <path d="M9.1 8.2c-.3 0-.6.1-.8.4-.5.6-.6 1.5-.2 2.6.8 2.1 2.6 3.9 4.7 4.7 1.1.4 2 .3 2.6-.2.3-.2.4-.5.4-.8l-.1-.7-1.8-.8-.9 1c-1.1-.5-2-1.4-2.5-2.5l1-.9-.8-1.8-.7-.1Z" />
    </Svg>
  );
}
