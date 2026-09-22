import Image from "next/image";
import { EmptyState } from "@/components/shared/EmptyState";
import { ChurnIcon, CowIcon, CurdIcon, FlameIcon } from "@/components/shared/Icons";
import type { PageSectionWithRelations } from "@/lib/types";

// Icons follow the order of the confirmed process (milk → curd → churn → heat). If Admin
// adds more steps they cycle, and an image uploaded to a step replaces its icon.
const STEP_ICONS = [CowIcon, CurdIcon, ChurnIcon, FlameIcon];

/**
 * The confirmed production steps as a connected timeline.
 *
 * Content safety: this renders only what Admin has published under Our Process — no
 * process description is hard-coded here (docs/requirements.md §2).
 */
export function ProcessTimeline({ steps }: { steps: PageSectionWithRelations[] }) {
  if (steps.length === 0) {
    return (
      <EmptyState
        title="Our process story is being finalized"
        description="We're documenting our production process in detail. Check back soon."
      />
    );
  }

  return (
    <ol className="relative grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
      {/* Connecting line behind the step markers (desktop). */}
      <span aria-hidden="true" className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-border lg:block" />
      {steps.map((step, i) => {
        const Icon = STEP_ICONS[i % STEP_ICONS.length];
        const image = step.media[0]?.media;
        return (
          <li
            key={step.id}
            className="reveal relative grid grid-cols-[48px_1fr] gap-x-4 sm:flex sm:flex-col sm:items-start lg:items-center lg:text-center"
          >
            {/* Vertical connector between steps on phones. */}
            {i < steps.length - 1 ? (
              <span aria-hidden="true" className="absolute bottom-[-2rem] left-6 top-14 w-px bg-border sm:hidden" />
            ) : null}
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-maroon text-kapila-gold ring-4 ring-white sm:h-16 sm:w-16 sm:ring-8">
              <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
            </span>
            <div>
              <span className="block font-heading text-sm italic text-warm-gold sm:mt-6">Step {String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-0.5 font-heading text-xl text-maroon text-balance sm:mt-1 sm:text-2xl">{step.title}</h3>
              {step.body ? <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-muted sm:mt-3 lg:mx-auto">{step.body}</p> : null}
              {image ? (
                <div className="mt-5 aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={image.url}
                    alt={image.altText ?? step.title ?? ""}
                    width={image.width ?? 400}
                    height={image.height ?? 300}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
