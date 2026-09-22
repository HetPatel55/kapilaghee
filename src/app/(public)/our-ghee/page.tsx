import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { EmptyState } from "@/components/shared/EmptyState";
import { ProductPurchasePanel } from "@/components/public/ProductPurchasePanel";
import { PurityProof } from "@/components/public/PurityProof";
import { BilonaFeature } from "@/components/public/BilonaFeature";
import { getActiveProducts, getBusinessSettings, getPageSections } from "@/lib/data";
import { buildProductJsonLd } from "@/lib/structured-data";

const siteUrl = process.env.SITE_URL ?? "https://www.kapiladairyfarm.com";

export const metadata: Metadata = {
  title: "Our Ghee",
  description:
    "Kapila A2 Gir Cow Ghee — hand-churned by the Bilona method, with no additives or preservatives. Available in a 1 KG glass jar and 5 KG and 15 KG tins.",
  alternates: { canonical: "/our-ghee" },
};

export default async function OurGheePage() {
  const [products, settings, processSections] = await Promise.all([
    getActiveProducts(),
    getBusinessSettings(),
    getPageSections("process"),
  ]);
  const whatsapp = settings?.whatsapp ?? null;

  return (
    <>
      <section className="bg-cream pb-16 pt-8 sm:pb-20 sm:pt-12">
        <Container>
          {products.length > 0 ? (
            <div className="space-y-24">
              {products.map((product) => {
                const jsonLd = buildProductJsonLd(product, siteUrl);
                return (
                  <div key={product.id}>
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                    <ProductPurchasePanel product={product} whatsappNumber={whatsapp} />
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="No products available right now"
              description="Please check back shortly, or contact us directly."
            />
          )}
        </Container>
      </section>
      <PurityProof />
      <BilonaFeature steps={processSections} />
    </>
  );
}
