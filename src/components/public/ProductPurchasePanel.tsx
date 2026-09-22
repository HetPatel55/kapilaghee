"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalButton, LinkButton } from "@/components/shared/Button";
import { Eyebrow } from "@/components/shared/SectionHeading";
import { ChurnIcon, DropIcon, FlaskIcon, WhatsAppIcon } from "@/components/shared/Icons";
import { ProductGallery } from "@/components/public/ProductGallery";
import { ProductVariantSelector } from "@/components/public/ProductVariantSelector";
import { buildWhatsAppHref } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { FSSAI_LICENSE_NUMBER } from "@/lib/lab-report";
import { getPackSizes, orderMessage } from "@/lib/pack-sizes";
import type { ProductWithRelations } from "@/lib/types";

const BADGES = [
  { icon: ChurnIcon, label: "Bilona churned" },
  { icon: DropIcon, label: "Nothing added" },
  { icon: FlaskIcon, label: "Lab tested" },
];

/**
 * Product page panel: gallery + size choice + ordering.
 * - Choosing a size highlights it and (if that size has its own photo) swaps the gallery
 *   to it. It never navigates by itself.
 * - "Order on WhatsApp" / "Send an enquiry" carry the selected size with them.
 */
export function ProductPurchasePanel({
  product,
  whatsappNumber,
}: {
  product: ProductWithRelations;
  whatsappNumber: string | null;
}) {
  const images = useMemo(() => product.images.map((pm) => pm.media), [product.images]);
  const sizes = useMemo(() => getPackSizes(product), [product]);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(product.variants[0]?.id ?? null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const selected = sizes.find((s) => s.variant.id === selectedVariantId);

  function handleSelectVariant(variantId: string) {
    setSelectedVariantId(variantId);
    const matchIndex = product.images.findIndex((pm) => pm.variantId === variantId);
    if (matchIndex !== -1) {
      setActiveImageIndex(matchIndex);
      return;
    }
    // No photo of its own (e.g. 1 KG) — fall back to the general photo rather than leaving
    // the previous size's photo up, which made the gallery look stuck.
    const generalIndex = product.images.findIndex((pm) => pm.variantId === null);
    setActiveImageIndex(generalIndex !== -1 ? generalIndex : 0);
  }

  // Phones: once the main order buttons scroll out of view (upwards), show a slim sticky
  // order bar — hidden again while the footer is on screen so it never covers it.
  // Measured on scroll rather than with IntersectionObserver: observers only fire when an
  // edge is crossed, so a fast flick past the buttons could leave the bar hidden.
  const ctaRef = useRef<HTMLDivElement>(null);
  const [pastCta, setPastCta] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  useEffect(() => {
    const footer = document.querySelector("footer");
    let frame = 0;
    const measure = () => {
      frame = 0;
      const cta = ctaRef.current;
      if (!cta) return;
      setPastCta(cta.getBoundingClientRect().bottom < 0);
      setFooterVisible(footer ? footer.getBoundingClientRect().top < window.innerHeight : false);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  const showStickyBar = pastCta && !footerVisible;

  const orderHref = whatsappNumber ? buildWhatsAppHref(whatsappNumber, orderMessage(product.name, selected?.label)) : null;

  const enquireHref = selectedVariantId
    ? `/contact?product=${product.slug}&variant=${selectedVariantId}`
    : `/contact?product=${product.slug}`;

  const packaging = Array.from(new Set(sizes.map((s) => s.packaging).filter(Boolean)))
    .map((p) => `${p} (${sizes.filter((s) => s.packaging === p).map((s) => s.label).join(", ")})`)
    .join(" · ");

  const details: [string, string][] = [
    ["Ingredients", "Ghee made from Gir cow milk"],
    ["Method", "Traditional Bilona — curd hand-churned into butter, then slow-heated"],
    ["Additives & preservatives", "None"],
    ...(packaging ? ([["Packaging", packaging]] as [string, string][]) : []),
    ["Made in", "Masma, Surat, Gujarat"],
    ["FSSAI Lic. No.", FSSAI_LICENSE_NUMBER],
  ];

  return (
    <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <ProductGallery
          images={images}
          productName={product.name}
          activeIndex={activeImageIndex}
          onActiveIndexChange={setActiveImageIndex}
        />
      </div>

      <div className="lg:pt-4">
        <Eyebrow>A2 Gir cow ghee</Eyebrow>
        <h1 className="mt-5 font-heading text-[2.6rem] font-medium leading-[1.05] tracking-[-0.015em] text-maroon text-balance sm:text-5xl">
          {product.name}
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-ink/70">{product.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {BADGES.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full bg-sand px-3.5 py-1.5 text-sm text-maroon"
            >
              <Icon className="h-4 w-4" />
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <p className="mb-3 text-sm font-medium text-ink">
            Choose a size
            {selected?.bestFor ? <span className="font-normal text-muted"> — {selected.bestFor.toLowerCase()}</span> : null}
          </p>
          <ProductVariantSelector sizes={sizes} selectedId={selectedVariantId} onSelect={handleSelectVariant} />
        </div>

        <div ref={ctaRef} className="mt-8 flex flex-col gap-3 sm:flex-row">
          {orderHref ? (
            <ExternalButton
              href={orderHref}
              target="_blank"
              rel="noreferrer noopener"
              size="lg"
              className="sm:flex-1"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Order {selected?.label ?? ""} on WhatsApp
            </ExternalButton>
          ) : null}
          <LinkButton
            href={enquireHref}
            variant={whatsappNumber ? "secondary" : "primary"}
            size="lg"
            className={whatsappNumber ? undefined : "sm:flex-1"}
          >
            Send an enquiry
          </LinkButton>
        </div>
        <p className="mt-3 text-sm text-muted">Our team will reply with pricing and delivery details.</p>

        <dl className="mt-10 divide-y divide-border border-y border-border text-sm">
          {details.map(([term, value]) => (
            <div key={term} className="grid grid-cols-[140px_1fr] gap-4 py-3.5 sm:grid-cols-[180px_1fr]">
              <dt className="text-muted">{term}</dt>
              <dd className="text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        aria-hidden={!showStickyBar}
        inert={!showStickyBar}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-cream/95 px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-20px_rgba(35,21,15,0.5)] backdrop-blur-md transition-transform duration-300 lg:hidden",
          showStickyBar ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="mx-auto flex max-w-lg items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted">{product.name}</p>
            <p className="font-heading text-lg leading-tight text-maroon">
              {selected?.label}
              {selected?.packaging ? <span className="text-sm text-muted"> &middot; {selected.packaging}</span> : null}
            </p>
          </div>
          {orderHref ? (
            <ExternalButton href={orderHref} target="_blank" rel="noreferrer noopener" className="shrink-0">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Order
            </ExternalButton>
          ) : (
            <LinkButton href={enquireHref} className="shrink-0">
              Enquire
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  );
}
