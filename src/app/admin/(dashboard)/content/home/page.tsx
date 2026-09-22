import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { SectionCard } from "@/components/admin/content/SectionCard";
import { SectionTextForm } from "@/components/admin/content/SectionTextForm";
import { SectionImageManager } from "@/components/admin/content/SectionImageManager";
import { listPageSectionsAdmin, listMediaAdmin } from "@/lib/admin-data";

export const metadata: Metadata = { title: "Homepage Content | Kapila Admin" };

// Only the sections the homepage actually renders. Older section rows (from the previous
// homepage design) stay in the database but are hidden here, so every edit made on this
// screen changes something visitors can see.
const SECTION_CONFIG: Record<string, { label: string; description: string; hasImage?: boolean; bodyRows?: number }> = {
  hero: { label: "Hero", description: "Headline, intro line and product photo at the top of the homepage.", hasImage: true },
  "benefits-intro": { label: "In Your Kitchen — Intro", description: "Heading and intro for the everyday-cooking section." },
  "benefits-point-1": { label: "In Your Kitchen — Point 1", description: "Keep it about flavour and cooking, not health claims." },
  "benefits-point-2": { label: "In Your Kitchen — Point 2", description: "Keep it about flavour and cooking, not health claims." },
  "benefits-point-3": { label: "In Your Kitchen — Point 3", description: "Keep it about flavour and cooking, not health claims." },
  "benefits-point-4": { label: "In Your Kitchen — Point 4", description: "Keep it about flavour and cooking, not health claims." },
};

export default async function AdminHomeContentPage() {
  const [sections, media] = await Promise.all([listPageSectionsAdmin("home"), listMediaAdmin("homepage")]);

  return (
    <div>
      <PageHeader
        title="Homepage Content"
        description="Edit the text and images shown on the homepage. Layout and design stay fixed — only content changes here."
      />

      <div className="space-y-4">
        {sections.filter((section) => section.key in SECTION_CONFIG).map((section, i) => {
          const config = SECTION_CONFIG[section.key];
          const currentImage = section.media[0]?.media ?? null;
          return (
            <SectionCard key={section.id} title={config.label} description={config.description} defaultOpen={i === 0}>
              <div className="space-y-6">
                <SectionTextForm sectionId={section.id} page="home" title={section.title} body={section.body} />
                {config.hasImage ? (
                  <div className="border-t border-border pt-5">
                    <SectionImageManager sectionId={section.id} page="home" currentImage={currentImage} libraryOptions={media} />
                  </div>
                ) : null}
              </div>
            </SectionCard>
          );
        })}
      </div>
    </div>
  );
}
