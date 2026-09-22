import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PageIntro } from "@/components/shared/PageIntro";
import { ChurnIcon, DropIcon, FlaskIcon } from "@/components/shared/Icons";
import { getBusinessSettings, getPageSections } from "@/lib/data";
import { findSection } from "@/lib/types";
import { RichText } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Kapila Dairy Farm makes pure A2 Gir cow ghee by the traditional Bilona method in Masma, Surat, Gujarat — with nothing added.",
  alternates: { canonical: "/our-story" },
};

const VALUES = [
  {
    icon: DropIcon,
    title: "Nothing added",
    body: "No additives, colours or preservatives. Just ghee, from Gir cow milk.",
  },
  {
    icon: ChurnIcon,
    title: "The slow way",
    body: "Curd, hand-churned in a wooden bilona, slowly heated. We don't skip steps.",
  },
  {
    icon: FlaskIcon,
    title: "Proof, not promises",
    body: "FSSAI licensed and independently lab tested — and we publish the documents.",
  },
];

export default async function OurStoryPage() {
  const [sections, settings] = await Promise.all([getPageSections("story"), getBusinessSettings()]);
  const intro = findSection(sections, "story-intro");
  const placeholder = findSection(sections, "story-placeholder");
  const image = intro?.media[0]?.media;

  return (
    <>
      <PageIntro
        eyebrow="Our story"
        title={
          <>
            Ghee, made the way <em className="font-normal italic">it always was</em>
          </>
        }
        description="A small dairy business in Masma, Surat, built on one simple standard: pure ghee, made slowly, with nothing added."
        align="center"
      />

      <Section tone="cream">
        <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <figure className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-t-full bg-sand px-8 pt-12">
              {image ? (
                <Image
                  src={image.url}
                  alt={image.altText ?? "Kapila Dairy Farm"}
                  width={image.width ?? 800}
                  height={image.height ?? 800}
                  className="h-auto w-full"
                />
              ) : (
                <Image
                  src="/images/illustrations/bilona-churning.png"
                  alt="Illustration of a woman hand-churning curd with a wooden bilona"
                  width={556}
                  height={615}
                  sizes="(min-width: 1024px) 420px, 85vw"
                  className="mx-auto h-auto w-full max-w-[420px]"
                />
              )}
            </div>
            <figcaption className="mt-4 text-center text-sm italic text-muted">
              The bilona — a wooden churn used in Indian homes for generations.
            </figcaption>
          </figure>

          <div>
            {intro?.body ? (
              <RichText
                content={intro.body}
                className="text-[17px] leading-[1.8] text-ink/80 [&>p:first-child]:font-heading [&>p:first-child]:text-[1.6rem] [&>p:first-child]:leading-snug [&>p:first-child]:text-maroon [&>p]:mb-6"
              />
            ) : null}
            {placeholder?.body ? (
              <p className="mt-6 rounded-2xl border border-dashed border-border bg-white/60 p-6 text-base leading-relaxed text-muted">
                {placeholder.body}
              </p>
            ) : null}

            {settings?.address ? (
              <div className="mt-10 rounded-3xl bg-sand p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-warm-gold">Where we are</p>
                <address className="mt-3 whitespace-pre-line font-heading text-lg not-italic leading-relaxed text-maroon">
                  {settings.address}
                </address>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section tone="white" className="pb-12 sm:pb-14 lg:pb-16">
        <Container>
          <SectionHeading align="center" eyebrow="What we stand for" title="Three things we never compromise on" />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <li key={title} className="reveal rounded-3xl border border-border bg-cream p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon text-kapila-gold">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-heading text-2xl text-maroon">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <div className="relative h-[340px] overflow-hidden rounded-[32px] sm:h-[440px]">
            <Image
              src="/images/lifestyle/kitchen-pour.jpg"
              alt="Kapila ghee being poured over a freshly cooked dish in a sunlit kitchen"
              fill
              sizes="(min-width: 1240px) 1176px, 92vw"
              className="object-cover object-[center_72%]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-dark-brown/75 via-dark-brown/10 to-transparent" />
            <p className="absolute bottom-8 left-8 right-8 max-w-lg font-heading text-2xl leading-snug text-cream sm:bottom-10 sm:left-10 sm:text-3xl">
              A spoonful of pure ghee, the way it was meant to taste.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
