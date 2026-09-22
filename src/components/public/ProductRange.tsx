import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ExternalButton, LinkButton } from "@/components/shared/Button";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/shared/Icons";
import { buildWhatsAppHref } from "@/lib/contact";
import { getPackSizes, orderMessage } from "@/lib/pack-sizes";
import type { ProductWithRelations } from "@/lib/types";

export function ProductRange({
  product,
  whatsappNumber,
}: {
  product: ProductWithRelations | null;
  whatsappNumber: string | null;
}) {
  if (!product || product.variants.length === 0) return null;
  const sizes = getPackSizes(product);

  return (
    <Section tone="cream">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our ghee"
            title="One pure ghee, in the size you need"
            description={product.description}
          />
          <Link
            href="/our-ghee"
            className="group hidden shrink-0 items-center gap-2 text-sm font-medium text-maroon md:inline-flex"
          >
            View product details
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Phones: a swipeable row (each card ~80% wide so the next one peeks in).
            Tablet/desktop: a regular grid. */}
        <ul className="scrollbar-none -mx-5 mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {sizes.map((size) => {
            const enquireHref = `/contact?product=${product.slug}&variant=${size.variant.id}`;
            return (
              <li
                key={size.variant.id}
                className="group flex w-[80%] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-border bg-white transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(60,30,10,0.45)] sm:w-auto"
              >
                <div className="relative flex aspect-[5/4] items-end justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_85%,#f6e3b4,#f3e8d2_70%)] px-8 pt-8">
                  {size.image ? (
                    <Image
                      src={size.image.url}
                      alt={size.image.altText ?? `${product.name} — ${size.label}`}
                      width={size.image.width ?? 900}
                      height={size.image.height ?? 1600}
                      quality={92}
                      sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 80vw"
                      className="h-[122%] w-auto translate-y-[8%] object-contain drop-shadow-[0_18px_18px_rgba(60,30,10,0.22)] transition-transform duration-500 group-hover:-translate-y-0"
                    />
                  ) : null}
                  <span className="absolute left-5 top-5 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-maroon ring-1 ring-border">
                    {size.packaging ?? "Pack"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="font-heading text-[1.7rem] text-maroon sm:text-3xl">{size.label}</p>
                  {size.bestFor ? <p className="mt-1.5 text-sm text-muted">{size.bestFor}</p> : null}
                  <div className="mt-6 flex-1" />
                  {whatsappNumber ? (
                    <ExternalButton
                      href={buildWhatsAppHref(whatsappNumber, orderMessage(product.name, size.label))}
                      target="_blank"
                      rel="noreferrer noopener"
                      variant="secondary"
                      className="w-full"
                    >
                      <WhatsAppIcon className="h-[18px] w-[18px]" />
                      Order {size.label}
                    </ExternalButton>
                  ) : (
                    <LinkButton href={enquireHref} variant="secondary" className="w-full">
                      Enquire about {size.label}
                    </LinkButton>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <Link
          href="/our-ghee"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-maroon md:hidden"
        >
          View product details
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Container>
    </Section>
  );
}
