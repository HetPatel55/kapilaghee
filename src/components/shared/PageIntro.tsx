import { Container } from "@/components/shared/Container";
import { Eyebrow } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

/** Opening band for inner pages: eyebrow, large title, lead, and an optional visual. */
export function PageIntro({
  eyebrow,
  title,
  description,
  visual,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  visual?: React.ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center" && !visual;

  return (
    <section className="relative overflow-hidden border-b border-border bg-sand">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(242,194,61,0.25),transparent_65%)]"
      />
      <Container
        className={cn(
          "relative grid items-center gap-8 py-11 sm:gap-10 sm:py-20",
          Boolean(visual) && "lg:grid-cols-[1.1fr_0.9fr] lg:py-16",
          centered && "text-center"
        )}
      >
        <div className={cn("animate-rise", centered && "mx-auto max-w-2xl")}>
          <Eyebrow className={cn(centered && "justify-center")}>{eyebrow}</Eyebrow>
          <h1 className="mt-4 font-heading text-[2.3rem] font-medium leading-[1.06] tracking-[-0.015em] text-maroon text-balance sm:mt-5 sm:text-[3.5rem]">
            {title}
          </h1>
          {description ? (
            <p className={cn("mt-4 max-w-xl text-base leading-relaxed text-ink/70 text-pretty sm:mt-5 sm:text-[17px]", centered && "mx-auto")}>
              {description}
            </p>
          ) : null}
        </div>
        {visual ? <div className="animate-rise [animation-delay:120ms]">{visual}</div> : null}
      </Container>
    </section>
  );
}
