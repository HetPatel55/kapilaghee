import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { ExternalButton, LinkButton } from "@/components/shared/Button";
import { Eyebrow } from "@/components/shared/SectionHeading";
import { CheckIcon, WhatsAppIcon } from "@/components/shared/Icons";
import type { ProductWithRelations, PageSectionWithRelations } from "@/lib/types";
import { getPrimaryProductImage, findSection } from "@/lib/types";

const PROOF_POINTS = ["Bilona hand-churned", "No additives or preservatives", "Lab tested for purity"];

export function HomeHero({
  product,
  sections,
  whatsappHref,
}: {
  product: ProductWithRelations | null;
  sections: PageSectionWithRelations[];
  whatsappHref: string | null;
}) {
  const hero = findSection(sections, "hero");
  const image = hero?.media[0]?.media ?? (product ? getPrimaryProductImage(product) : null);
  const title = hero?.title ?? "Pure ghee, churned the slow way.";
  const body = hero?.body ?? "A2 Gir cow ghee, hand-churned by the traditional Bilona method. Nothing added.";

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Soft warm glow behind the product — the colour of ghee in sunlight. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(242,194,61,0.28),transparent_65%)] lg:right-0"
      />

      <Container className="relative grid items-center gap-10 pb-14 pt-8 sm:gap-14 sm:pb-16 sm:pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-24 lg:pt-16">
        <div className="animate-rise">
          <Eyebrow>A2 Gir cow ghee &middot; Surat, Gujarat</Eyebrow>
          <h1 className="mt-5 max-w-xl font-heading text-[2.35rem] font-medium leading-[1.06] tracking-[-0.02em] text-maroon text-balance sm:mt-6 sm:text-6xl lg:text-[4.25rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/70 text-pretty sm:mt-6 sm:text-lg">{body}</p>

          <div className="mt-7 grid gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:items-center">
            {whatsappHref ? (
              <ExternalButton href={whatsappHref} target="_blank" rel="noreferrer noopener" size="lg">
                <WhatsAppIcon className="h-5 w-5" />
                Order on WhatsApp
              </ExternalButton>
            ) : (
              <LinkButton href="/contact" size="lg">
                Enquire now
              </LinkButton>
            )}
            <LinkButton href="/our-ghee" variant="secondary" size="lg">
              Explore our ghee
            </LinkButton>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5 border-t border-border pt-5 text-[13px] text-ink/70 sm:mt-10 sm:gap-x-6 sm:gap-y-3 sm:pt-6 sm:text-sm">
            {PROOF_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-success" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[290px] animate-rise [animation-delay:120ms] sm:max-w-[430px]">
          {/* Arch — echoes the jharokha/temple arch; the jar stands in its doorway. */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-[linear-gradient(180deg,#f3e3bf,#efd79f)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(242,194,61,0.45),transparent_60%)]"
            />
            <div aria-hidden="true" className="absolute inset-3 rounded-t-full border border-warm-gold/30" />
          </div>
          {image ? (
            <Image
              src={image.url}
              alt={image.altText ?? "Kapila A2 Gir Cow Ghee"}
              width={image.width ?? 1000}
              height={image.height ?? 1250}
              priority
              quality={92}
              sizes="(min-width: 1024px) 380px, 70vw"
              className="absolute inset-x-0 bottom-0 mx-auto h-[92%] w-auto object-contain drop-shadow-[0_30px_30px_rgba(60,30,10,0.28)]"
            />
          ) : null}
          <ChurnSeal className="absolute -left-8 top-6 h-24 w-24 sm:-left-10 sm:top-10 sm:h-32 sm:w-32" />
        </div>
      </Container>
    </section>
  );
}

/** Circular "stamp" with text set on a path — a label-style mark for the Bilona method. */
function ChurnSeal({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="h-full w-full motion-safe:animate-[spin_40s_linear_infinite]">
        <defs>
          <path id="seal-circle" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
        </defs>
        <circle cx="60" cy="60" r="58" className="fill-maroon" />
        <circle cx="60" cy="60" r="52" fill="none" className="stroke-kapila-gold/40" strokeWidth="0.8" />
        <text className="fill-cream text-[10.5px] font-medium uppercase tracking-[0.28em]">
          <textPath href="#seal-circle">Hand-churned &middot; Bilona method &middot;</textPath>
        </text>
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 m-auto h-9 w-9 text-kapila-gold"
      >
        <path d="M13.5 2.5 11 13" />
        <path d="M9.5 6.5h5" />
        <path d="M6.5 11.5h11c.7 2.2.4 4.8-1.3 6.6A6.4 6.4 0 0 1 12 20a6.4 6.4 0 0 1-4.2-1.9c-1.7-1.8-2-4.4-1.3-6.6Z" />
        <path d="M5.5 11.5h13" />
      </svg>
    </div>
  );
}
