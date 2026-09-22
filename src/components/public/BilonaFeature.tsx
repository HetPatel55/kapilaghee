import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ArrowRightIcon } from "@/components/shared/Icons";
import type { PageSectionWithRelations } from "@/lib/types";

/**
 * Homepage introduction to the Bilona method. The step list is the confirmed process
 * content from Admin → Our Process, so it never drifts from the full Process page.
 */
export function BilonaFeature({ steps }: { steps: PageSectionWithRelations[] }) {
  return (
    <Section tone="white" className="overflow-hidden">
      <Container className="grid items-center gap-10 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="reveal relative mx-auto w-full max-w-[250px] sm:max-w-[460px]">
          <div aria-hidden="true" className="absolute inset-x-6 bottom-0 top-10 rounded-t-full bg-sand" />
          <Image
            src="/images/illustrations/bilona-churning.png"
            alt="Illustration of a woman hand-churning curd in a clay pot with a wooden bilona"
            width={556}
            height={615}
            sizes="(min-width: 1024px) 460px, 85vw"
            className="relative h-auto w-full"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="The Bilona method"
            title={
              <>
                Made from curd, <em className="font-normal italic">churned by hand</em>
              </>
            }
            description="Much of the ghee sold today is made quickly from cream. Kapila takes the older, slower way — the one Indian homes have followed for generations."
          />

          {steps.length > 0 ? (
            <ol className="mt-8 grid gap-x-10 gap-y-5 sm:mt-10 sm:grid-cols-2 sm:gap-y-7">
              {steps.slice(0, 4).map((step, i) => (
                <li key={step.id} className="border-t border-border pt-4 sm:pt-5">
                  <span className="font-heading text-sm italic text-warm-gold">Step {i + 1}</span>
                  <h3 className="mt-1 font-heading text-xl text-maroon">{step.title}</h3>
                  {step.body ? <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p> : null}
                </li>
              ))}
            </ol>
          ) : null}

          <Link
            href="/our-process"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-maroon"
          >
            See how our ghee is made
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
