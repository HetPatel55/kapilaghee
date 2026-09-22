"use client";

import { useActionState, useRef } from "react";
import { submitEnquiry, type EnquiryFormState } from "@/app/actions/enquiry";
import { Button } from "@/components/shared/Button";
import { WhatsAppIcon } from "@/components/shared/Icons";
import { buildWhatsAppHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

const initialState: EnquiryFormState = { status: "idle" };

export function EnquiryForm({
  productId,
  variantId,
  contextLabel,
  whatsappNumber,
}: {
  productId?: string;
  variantId?: string;
  contextLabel?: string;
  /** The business's own WhatsApp number, from Business Settings. If not configured, the
   * form still saves the enquiry normally but skips opening WhatsApp. */
  whatsappNumber?: string | null;
}) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmitClick() {
    if (!whatsappNumber || !formRef.current) return;
    const data = new FormData(formRef.current);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !phone || !message) return; // let normal validation handle incomplete fields

    const lines = [
      `Hi Kapila Dairy Farm, I'm ${name}.`,
      contextLabel ? `Regarding: ${contextLabel}.` : null,
      message,
      `(My WhatsApp: +91 ${phone})`,
    ].filter(Boolean);

    window.open(buildWhatsAppHref(whatsappNumber, lines.join(" ")), "_blank", "noopener,noreferrer");
    // Intentionally not preventing default — the form still submits normally underneath
    // so the enquiry is also saved for the business's records.
  }

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-success/25 bg-success/5 px-6 py-10 text-center"
      >
        <p className="font-heading text-xl text-ink">{state.message}</p>
        {whatsappNumber ? (
          <p className="mt-2 text-sm text-muted">We&rsquo;ve also opened WhatsApp for you in a new tab — send that message to reach us fastest.</p>
        ) : null}
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-5" id="enquiry-form">
      {contextLabel ? (
        <p className="rounded-xl border border-warm-gold/30 bg-kapila-gold/10 px-4 py-3 text-sm text-ink/80">
          Enquiring about: <span className="font-medium text-maroon">{contextLabel}</span>
        </p>
      ) : null}

      {/* Honeypot — hidden from real users, invisible via CSS not just off-screen text */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {productId ? <input type="hidden" name="productId" value={productId} /> : null}
      {variantId ? <input type="hidden" name="variantId" value={variantId} /> : null}

      <Field label="Name" htmlFor="name" error={state.fieldErrors?.name}>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={inputClasses(Boolean(state.fieldErrors?.name))}
        />
      </Field>

      <Field label="WhatsApp Number" htmlFor="phone" error={state.fieldErrors?.phone} hint="10-digit mobile number">
        <div className={cn("flex h-12 overflow-hidden rounded-xl border bg-white transition-colors focus-within:border-maroon focus-within:ring-3 focus-within:ring-maroon/15", state.fieldErrors?.phone ? "border-error" : "border-border")}>
          <span className="flex items-center border-r border-border bg-sand/60 px-4 text-[15px] text-muted">
            +91
          </span>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            required
            maxLength={10}
            pattern="\d{10}"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "").slice(0, 10);
            }}
            className="w-full border-0 bg-transparent px-4 text-[15px] text-ink placeholder:text-muted/60 focus:outline-none"
          />
        </div>
      </Field>

      <Field label="Message" htmlFor="message" error={state.fieldErrors?.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          defaultValue={contextLabel ? `I'd like to know more about ${contextLabel}.` : undefined}
          className={inputClasses(Boolean(state.fieldErrors?.message))}
        />
      </Field>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-sm text-error">
          {state.message}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        onClick={handleSubmitClick}
        className="w-full"
      >
        {whatsappNumber && !pending ? <WhatsAppIcon className="h-5 w-5" /> : null}
        {pending ? "Sending…" : whatsappNumber ? "Send via WhatsApp" : "Send enquiry"}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && !error ? <p className="mt-1.5 text-xs text-muted">{hint}</p> : null}
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClasses(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink transition-colors placeholder:text-muted/60 focus:border-maroon focus:outline-none focus:ring-3 focus:ring-maroon/15",
    hasError ? "border-error" : "border-border"
  );
}
