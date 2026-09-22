import { cn } from "@/lib/utils";

/** Small uppercase label with a short rule — used above headings throughout the site. */
export function Eyebrow({
  children,
  tone = "ink",
  className,
}: {
  children: React.ReactNode;
  tone?: "ink" | "cream";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]",
        tone === "cream" ? "text-kapila-gold" : "text-warm-gold",
        className
      )}
    >
      <span aria-hidden="true" className="h-px w-7 bg-current opacity-70" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "ink",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "ink" | "cream";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Eyebrow tone={tone} className={cn("mb-4", align === "center" && "justify-center")}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Tag
        className={cn(
          "font-heading text-[2rem] font-medium leading-[1.1] tracking-[-0.01em] text-balance sm:text-[2.6rem]",
          tone === "cream" ? "text-cream" : "text-maroon"
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed text-pretty sm:text-[17px]",
            tone === "cream" ? "text-cream/75" : "text-muted",
            align === "center" && "mx-auto max-w-xl"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
