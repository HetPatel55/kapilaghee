import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The KAPILA wordmark, redrawn as SVG from the brand logo (images/KAPILALOGO.pdf): a
 * geometric sans where each "A" is an open chevron with a thin left and heavy right leg.
 * Vector, so it stays sharp at any size and takes its colour from `currentColor`.
 */
function Wordmark({ className }: { className?: string }) {
  return (
    // Strokes deliberately overshoot the top/bottom edges; the SVG viewport clips them,
    // which gives the diagonals the flat, horizontal terminals of the original wordmark.
    <svg viewBox="0 0 434 100" className={className} aria-hidden="true" fill="none" stroke="currentColor">
      <g strokeLinejoin="miter">
        {/* K */}
        <path d="M5.5 -5V105" strokeWidth="11" />
        <path d="M5.5 62L66 -4" strokeWidth="10" />
        <path d="M25 40L68 106" strokeWidth="11" />
        {/* A */}
        <path d="M84 106L119.5 -6" strokeWidth="6.5" />
        <path d="M119.5 -6L156 106" strokeWidth="12" />
        {/* P */}
        <path d="M182 -5V105" strokeWidth="11" />
        <path d="M182 5.5H213A24 24 0 0 1 213 53.5H182" strokeWidth="11" />
        {/* I */}
        <path d="M264 -5V105" strokeWidth="11" />
        {/* L */}
        <path d="M291.5 -5V94.5H340" strokeWidth="11" />
        {/* A */}
        <path d="M357 106L392.5 -6" strokeWidth="6.5" />
        <path d="M392.5 -6L429 106" strokeWidth="12" />
      </g>
    </svg>
  );
}

export function Logo({
  tone = "maroon",
  className,
}: {
  tone?: "maroon" | "cream";
  className?: string;
}) {
  const color = tone === "maroon" ? "text-maroon" : "text-cream";
  const rule = tone === "maroon" ? "bg-maroon/50" : "bg-cream/50";

  return (
    <Link
      href="/"
      aria-label="Kapila Dairy Farm — Home"
      className={cn("inline-flex w-[124px] flex-col items-stretch sm:w-[138px]", color, className)}
    >
      <Wordmark className="h-auto w-full" />
      <span className="mt-[5px] flex items-center gap-1.5">
        <span className={cn("h-px flex-1", rule)} aria-hidden="true" />
        <span className="text-[8.5px] font-medium tracking-[0.34em] sm:text-[9.5px]">DAIRY FARM</span>
        <span className={cn("h-px flex-1", rule)} aria-hidden="true" />
      </span>
    </Link>
  );
}
