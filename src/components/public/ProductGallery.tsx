"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Media } from "@prisma/client";

/**
 * Uncontrolled by default (manages its own active image). Pass `activeIndex` +
 * `onActiveIndexChange` to control it from a parent — used on the product page so
 * selecting a pack size can jump the gallery to that size's photo (see ProductPurchasePanel).
 */
export function ProductGallery({
  images,
  productName,
  activeIndex: controlledIndex,
  onActiveIndexChange,
}: {
  images: Media[];
  productName: string;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
}) {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = onActiveIndexChange ? (controlledIndex ?? 0) : internalIndex;
  const setActiveIndex = onActiveIndexChange ?? setInternalIndex;
  const active = images[activeIndex] ?? images[0];

  return (
    <div>
      <div className="relative flex aspect-square items-end justify-center overflow-hidden rounded-[32px] bg-[radial-gradient(ellipse_at_50%_80%,#f6e0a8,#f3e8d2_68%)]">
        <div aria-hidden="true" className="absolute inset-4 rounded-[24px] border border-warm-gold/25" />
        {active ? (
          <Image
            key={active.id}
            src={active.url}
            alt={active.altText ?? productName}
            width={active.width ?? 900}
            height={active.height ?? 1600}
            priority
            quality={92}
            sizes="(min-width: 1024px) 560px, 92vw"
            className="relative h-[96%] w-auto translate-y-[5%] object-contain drop-shadow-[0_28px_28px_rgba(60,30,10,0.25)] animate-rise"
          />
        ) : (
          <p className="m-auto font-heading text-2xl text-maroon/50">{productName}</p>
        )}
      </div>

      {images.length > 1 ? (
        <div role="tablist" aria-label={`${productName} photos`} className="mt-4 flex gap-3">
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show photo ${i + 1} of ${images.length}`}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border bg-sand p-1.5 transition-colors",
                i === activeIndex ? "border-maroon ring-2 ring-maroon/15" : "border-border hover:border-warm-gold"
              )}
            >
              <Image
                src={image.url}
                alt=""
                width={image.width ?? 200}
                height={image.height ?? 200}
                sizes="80px"
                className="h-full w-auto object-contain"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
