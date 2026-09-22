import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PageIntro } from "@/components/shared/PageIntro";
import { EmptyState } from "@/components/shared/EmptyState";
import { CheckIcon, FlaskIcon, SealIcon } from "@/components/shared/Icons";
import { DocumentCard } from "@/components/public/DocumentCard";
import { getPageSections } from "@/lib/data";
import { findSection } from "@/lib/types";
import { LAB_HIGHLIGHTS, LAB_PARAMETERS, LAB_REPORT } from "@/lib/lab-report";

export const metadata: Metadata = {
  title: "Quality & Purity",
  description:
    "Kapila ghee is FSSAI licensed and independently lab tested: 99.59% milk fat, 0.41% moisture, and a negative Baudouin test. See the full report and license.",
  alternates: { canonical: "/quality" },
};

export default async function QualityPage() {
  const sections = await getPageSections("quality");
  const intro = findSection(sections, "quality-intro");
  const compliance = findSection(sections, "quality-compliance");
  const testing = findSection(sections, "quality-testing");
  const allDocuments = sections.flatMap((s) => s.documents.map((d) => d.document));

  return (
    <>
      <PageIntro
        eyebrow="Quality & purity"
        title={
          <>
            Pure isn&rsquo;t a slogan. <em className="font-normal italic">It&rsquo;s a lab result.</em>
          </>
        }
        description={intro?.body ?? undefined}
        align="center"
      />

      <Section tone="white">
        <Container>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {LAB_HIGHLIGHTS.map((item) => (
              <li key={item.label} className="rounded-3xl bg-sand p-4 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted sm:text-[11px] sm:tracking-[0.22em]">{item.label}</p>
                <p className="mt-2 font-heading text-[1.65rem] leading-tight text-maroon sm:mt-3 sm:text-4xl">{item.value}</p>
                <p className="mt-2 text-[12.5px] leading-snug text-muted sm:mt-3 sm:text-sm sm:leading-relaxed">{item.note}</p>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid gap-8 sm:mt-20 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Independent testing"
                title="Full lab results"
                description={`Tested by ${LAB_REPORT.lab} against the ${LAB_REPORT.standard}. Every parameter is within limits.`}
              />
              <dl className="mt-8 space-y-3 text-sm">
                <div className="flex gap-3">
                  <dt className="w-28 shrink-0 text-muted">Report no.</dt>
                  <dd className="text-ink">{LAB_REPORT.reportNumber}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-28 shrink-0 text-muted">Issued</dt>
                  <dd className="text-ink">{LAB_REPORT.issued}</dd>
                </div>
              </dl>
              <a
                href={LAB_REPORT.documentUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-maroon underline-offset-4 hover:underline"
              >
                <FlaskIcon className="h-5 w-5" />
                View the original report
              </a>
            </div>

            {/* Phones: one compact row per parameter instead of a sideways-scrolling table. */}
            <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border sm:hidden">
              {LAB_PARAMETERS.map((p) => (
                <li key={p.name} className="flex items-start justify-between gap-4 px-4 py-3.5">
                  <div>
                    <p className="text-[15px] text-ink">{p.name}</p>
                    <p className="mt-0.5 text-xs text-muted">FSSAI: {p.limit}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-medium text-maroon">
                      {p.result}
                      {p.unit === "%" ? "%" : null}
                    </p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-success">
                      <CheckIcon className="h-3.5 w-3.5" />
                      Pass
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="hidden overflow-hidden rounded-3xl border border-border sm:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-sand text-xs uppercase tracking-[0.12em] text-muted">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-medium">Parameter</th>
                    <th scope="col" className="px-5 py-4 font-medium">Result</th>
                    <th scope="col" className="px-5 py-4 font-medium">FSSAI limit</th>
                    <th scope="col" className="px-5 py-4 font-medium">
                      <span className="sr-only">Status</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {LAB_PARAMETERS.map((p) => (
                    <tr key={p.name}>
                      <th scope="row" className="px-5 py-3.5 font-normal text-ink">{p.name}</th>
                      <td className="px-5 py-3.5 font-medium text-maroon">
                        {p.result}
                        {p.unit ? <span className="ml-1 font-normal text-muted">{p.unit}</span> : null}
                      </td>
                      <td className="px-5 py-3.5 text-muted">{p.limit}</td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                          <CheckIcon className="h-3.5 w-3.5" />
                          Pass
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow="Documentation" title="Certificates & reports" />
              <div className="mt-8 space-y-6">
                {[compliance, testing].map((block) =>
                  block?.body ? (
                    <div key={block.id} className="flex gap-4">
                      <SealIcon className="mt-0.5 h-6 w-6 text-warm-gold" />
                      <div>
                        <h3 className="font-heading text-lg text-maroon">{block.title}</h3>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{block.body}</p>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>

            {allDocuments.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {allDocuments.map((doc) => (
                  <DocumentCard key={doc.id} document={doc} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No documents available yet"
                description="Certificates and test reports will appear here once they're added."
              />
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
