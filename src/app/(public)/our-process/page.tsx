import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PageIntro } from "@/components/shared/PageIntro";
import { LinkButton } from "@/components/shared/Button";
import { CheckIcon } from "@/components/shared/Icons";
import { ProcessTimeline } from "@/components/public/ProcessTimeline";
import { getPageSections } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Process — The Bilona Method",
  description:
    "How Kapila ghee is made: Gir cow milk is set into curd, hand-churned in a wooden bilona into butter, then slow-heated into ghee. No additives, no shortcuts.",
  alternates: { canonical: "/our-process" },
};

// General description of the two common ways ghee is made — method, not health claims.
const COMPARISON: { aspect: string; bilona: string; cream: string }[] = [
  {
    aspect: "Starts from",
    bilona: "Whole milk, set into curd",
    cream: "Cream (malai) separated from milk",
  },
  {
    aspect: "Butter",
    bilona: "Curd is hand-churned with a wooden bilona to draw out makkhan",
    cream: "Churning step skipped, or done by machine",
  },
  {
    aspect: "Pace",
    bilona: "Slow and hands-on — the traditional way",
    cream: "Fast — built for large volumes",
  },
];

export default async function OurProcessPage() {
  const steps = await getPageSections("process");

  return (
    <>
      <PageIntro
        eyebrow="Our process"
        title={
          <>
            The Bilona method, <em className="font-normal italic">step by step</em>
          </>
        }
        description="Kapila ghee is made the way it has been in Indian homes for generations — from curd, churned by hand, and slowly heated. Nothing is added along the way."
        visual={
          <Image
            src="/images/illustrations/bilona-scene.png"
            alt="Illustration of a woman churning curd in a clay pot beside a Gir cow"
            width={720}
            height={555}
            priority
            sizes="(min-width: 1024px) 480px, 90vw"
            className="mx-auto h-auto w-full max-w-[300px] sm:max-w-[480px]"
          />
        }
      />

      <Section tone="white">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="From milk to ghee"
            title="Four steps. No shortcuts."
            className="mb-10 sm:mb-16"
          />
          <ProcessTimeline steps={steps} />
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <SectionHeading
            eyebrow="Why it matters"
            title="Bilona ghee vs. cream-method ghee"
            description="Both are called ghee, but they're made very differently. Here's what sets the Bilona way apart."
          />

          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-white sm:mt-12">
            <div className="hidden grid-cols-[0.6fr_1.2fr_1fr] border-b border-border bg-sand text-sm font-medium sm:grid">
              <span className="px-6 py-4 text-muted" />
              <span className="bg-maroon px-6 py-4 text-cream">The Bilona way — Kapila</span>
              <span className="px-6 py-4 text-muted">The common cream method</span>
            </div>
            <dl>
              {COMPARISON.map((row) => (
                <div
                  key={row.aspect}
                  className="grid border-b border-border last:border-b-0 sm:grid-cols-[0.6fr_1.2fr_1fr]"
                >
                  <dt className="px-5 pt-5 font-heading text-lg text-maroon sm:px-6 sm:py-5">{row.aspect}</dt>
                  <dd className="flex gap-3 px-5 py-3 text-[15px] text-ink sm:bg-maroon/[0.03] sm:px-6 sm:py-5">
                    <CheckIcon className="mt-0.5 h-5 w-5 text-success" />
                    <span>
                      <span className="sr-only">Bilona way: </span>
                      {row.bilona}
                    </span>
                  </dd>
                  <dd className="px-5 pb-5 text-[15px] text-muted sm:px-6 sm:py-5">
                    <span className="text-xs uppercase tracking-wide text-muted/80 sm:hidden">Cream method: </span>
                    {row.cream}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 flex flex-col items-start gap-5 rounded-3xl bg-dark-brown p-6 text-cream sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <p className="max-w-lg font-heading text-xl leading-snug sm:text-2xl">
              Taste the difference slow-made ghee makes.
            </p>
            <LinkButton href="/our-ghee" variant="light" size="lg">
              See our ghee
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
