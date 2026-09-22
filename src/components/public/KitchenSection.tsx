import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { PageSectionWithRelations } from "@/lib/types";
import { findSection } from "@/lib/types";

/**
 * Ghee in everyday cooking. Copy comes from Admin (Homepage → "Why Ghee, Every Day")
 * and is deliberately about flavour and cooking, not health — therapeutic claims need
 * substantiation under FSSAI advertising rules (see docs/requirements.md §2).
 */
export function KitchenSection({ sections }: { sections: PageSectionWithRelations[] }) {
  const intro = findSection(sections, "benefits-intro");
  const points = ["benefits-point-1", "benefits-point-2", "benefits-point-3", "benefits-point-4"]
    .map((key) => findSection(sections, key))
    .filter((s): s is PageSectionWithRelations => Boolean(s));

  return (
    <Section tone="cream">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="reveal grid grid-cols-[1.1fr_1fr] gap-4">
          <div className="relative row-span-2 overflow-hidden rounded-[28px]">
            <Image
              src="/images/lifestyle/paratha-drizzle.jpg"
              alt="Warm ghee being drizzled over a stack of parathas"
              fill
              sizes="(min-width: 1024px) 300px, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[28px]">
            <Image
              src="/images/lifestyle/pan-pour.jpg"
              alt="Ghee poured over fresh rotis in a pan"
              fill
              sizes="(min-width: 1024px) 270px, 45vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[28px]">
            <Image
              src="/images/lifestyle/sweets-table.jpg"
              alt="A jar of Kapila ghee beside a plate of gulab jamun"
              fill
              sizes="(min-width: 1024px) 270px, 45vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="In your kitchen"
            title={intro?.title ?? "Why ghee, every day"}
            description={intro?.body ?? undefined}
          />
          {points.length > 0 ? (
            <dl className="mt-10 divide-y divide-border border-y border-border">
              {points.map((point) => (
                <div key={point.id} className="grid gap-1 py-5 sm:grid-cols-[200px_1fr] sm:gap-6">
                  <dt className="font-heading text-lg text-maroon">{point.title}</dt>
                  {point.body ? <dd className="text-sm leading-relaxed text-muted">{point.body}</dd> : null}
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
