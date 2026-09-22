import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ArrowRightIcon, SealIcon } from "@/components/shared/Icons";
import { FSSAI_LICENSE_NUMBER, LAB_HIGHLIGHTS, LAB_REPORT } from "@/lib/lab-report";

/**
 * "Pure" backed by numbers: the headline results from Kapila's independent lab report,
 * each explained in plain language next to the FSSAI limit it was tested against.
 */
export function PurityProof({ showLink = true }: { showLink?: boolean }) {
  return (
    <Section tone="dark" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(242,194,61,0.12),transparent_65%)]"
      />
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            tone="cream"
            eyebrow="Tested, not just claimed"
            title="Purity you can verify"
            description={`Our ghee was independently tested by ${LAB_REPORT.lab} against the ${LAB_REPORT.standard}. It passed every one.`}
          />
          <p className="flex items-center gap-3 text-sm text-cream/60">
            <SealIcon className="h-8 w-8 text-kapila-gold" />
            <span>
              FSSAI licensed
              <span className="block text-cream/90">Lic. No. {FSSAI_LICENSE_NUMBER}</span>
            </span>
          </p>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
          {LAB_HIGHLIGHTS.map((item) => (
            <li key={item.label} className="reveal flex flex-col bg-cocoa p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/55">{item.label}</p>
              <p className="mt-4 font-heading text-[2.6rem] leading-none text-kapila-gold">{item.value}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/70">{item.note}</p>
              <p className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-cream/[0.07] px-3 py-1 text-xs text-cream/75">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#7fc26b]" />
                Passed &middot; {item.limitLabel}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col justify-between gap-4 text-sm text-cream/55 sm:flex-row sm:items-center">
          <p>
            Report no. {LAB_REPORT.reportNumber} &middot; Issued {LAB_REPORT.issued}
          </p>
          {showLink ? (
            <Link href="/quality" className="group inline-flex items-center gap-2 font-medium text-kapila-gold">
              See the full report &amp; license
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
