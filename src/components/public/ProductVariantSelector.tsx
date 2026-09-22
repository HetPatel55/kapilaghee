"use client";

import { cn } from "@/lib/utils";
import type { PackSize } from "@/lib/pack-sizes";

/**
 * Pack sizes as selectable option cards. Sizes are data-driven (Admin manages variants).
 * Selecting a size only highlights it and lets the parent react (e.g. swap the photo) —
 * it never navigates; ordering/enquiring is a separate, explicit action.
 */
export function ProductVariantSelector({
  sizes,
  selectedId,
  onSelect,
}: {
  sizes: PackSize[];
  selectedId: string | null;
  onSelect: (variantId: string) => void;
}) {
  if (sizes.length === 0) {
    return <p className="text-sm text-muted">Pack sizes will be available shortly.</p>;
  }

  return (
    <div role="radiogroup" aria-label="Pack size" className="grid grid-cols-3 gap-3">
      {sizes.map((size) => {
        const active = selectedId === size.variant.id;
        return (
          <button
            key={size.variant.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(size.variant.id)}
            className={cn(
              "rounded-2xl border px-3 py-4 text-left transition-[border-color,background-color,box-shadow]",
              active
                ? "border-maroon bg-maroon/[0.04] shadow-[inset_0_0_0_1px_var(--color-maroon)]"
                : "border-border bg-white hover:border-maroon/40"
            )}
          >
            <span className="block font-heading text-2xl leading-none text-maroon">{size.label}</span>
            {size.packaging ? <span className="mt-1.5 block text-xs text-muted">{size.packaging}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
