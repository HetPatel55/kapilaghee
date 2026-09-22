import type { Media, ProductVariant } from "@prisma/client";
import type { ProductWithRelations } from "@/lib/types";
import { formatVariantLabel } from "@/lib/utils";

/**
 * Presentation details for known pack sizes. Sizes themselves stay data-driven (Admin
 * adds/removes variants); this only adds a packaging name and a "who it's for" line
 * where we recognise the size. An unknown size simply renders without them.
 */
const PACK_DETAILS: Record<string, { packaging: string; bestFor: string }> = {
  "1 KG": { packaging: "Glass jar", bestFor: "Everyday home cooking" },
  "5 KG": { packaging: "Tin", bestFor: "Larger families & regular use" },
  "15 KG": { packaging: "Tin", bestFor: "Caterers, sweet shops & bulk orders" },
};

export type PackSize = {
  variant: ProductVariant;
  label: string;
  packaging?: string;
  bestFor?: string;
  /** The size's own photo, else the product's general photo. */
  image: Media | null;
};

export function getPackSizes(product: ProductWithRelations): PackSize[] {
  const general = product.images.find((pm) => pm.variantId === null)?.media ?? product.images[0]?.media ?? null;

  return product.variants.map((variant) => {
    const label = formatVariantLabel(variant.size, variant.unit);
    const own = product.images.find((pm) => pm.variantId === variant.id)?.media;
    return { variant, label, ...PACK_DETAILS[label], image: own ?? general };
  });
}

/** Message pre-filled into WhatsApp when a customer orders a specific size. */
export function orderMessage(productName: string, sizeLabel?: string) {
  return sizeLabel
    ? `Hi Kapila Dairy Farm, I'd like to order ${productName} — ${sizeLabel}.`
    : `Hi Kapila Dairy Farm, I'd like to know more about ${productName}.`;
}
