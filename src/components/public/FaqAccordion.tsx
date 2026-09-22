"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@prisma/client";

export function FaqAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const open = openId === faq.id;
        const panelId = `faq-panel-${faq.id}`;
        const buttonId = `faq-button-${faq.id}`;
        return (
          <div
            key={faq.id}
            className={cn(
              "rounded-2xl border bg-white transition-colors",
              open ? "border-warm-gold/40" : "border-border"
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : faq.id)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              >
                <span className="font-heading text-lg text-ink">{faq.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,color,border-color] duration-300",
                    open ? "rotate-45 border-maroon bg-maroon text-cream" : "border-border text-maroon"
                  )}
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!open}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
