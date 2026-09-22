import type { Metadata } from "next";
import { getActiveProducts, getBusinessSettings, getPageSections } from "@/lib/data";
import { HomeHero } from "@/components/public/HomeHero";
import { PromiseBar } from "@/components/public/PromiseBar";
import { ProductRange } from "@/components/public/ProductRange";
import { BilonaFeature } from "@/components/public/BilonaFeature";
import { PurityProof } from "@/components/public/PurityProof";
import { KitchenSection } from "@/components/public/KitchenSection";
import { BrandStatement } from "@/components/public/BrandStatement";
import { buildLocalBusinessJsonLd } from "@/lib/structured-data";
import { buildWhatsAppHref } from "@/lib/contact";

const siteUrl = process.env.SITE_URL ?? "https://www.kapiladairyfarm.com";

export const metadata: Metadata = {
  title: "Kapila Dairy Farm — Pure A2 Gir Cow Bilona Ghee, Surat",
  description:
    "Pure A2 Gir cow ghee, hand-churned by the traditional Bilona method in Surat, Gujarat. No additives or preservatives — FSSAI licensed and lab tested. Available in 1 KG, 5 KG and 15 KG.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [products, settings, homeSections, processSections] = await Promise.all([
    getActiveProducts(),
    getBusinessSettings(),
    getPageSections("home"),
    getPageSections("process"),
  ]);

  const product = products[0] ?? null;
  const whatsapp = settings?.whatsapp ?? null;
  const jsonLd = buildLocalBusinessJsonLd(settings, siteUrl);

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <HomeHero
        product={product}
        sections={homeSections}
        whatsappHref={
          whatsapp ? buildWhatsAppHref(whatsapp, "Hi Kapila Dairy Farm, I'd like to order ghee.") : null
        }
      />
      <PromiseBar />
      <ProductRange product={product} whatsappNumber={whatsapp} />
      <BilonaFeature steps={processSections} />
      <PurityProof />
      <KitchenSection sections={homeSections} />
      <BrandStatement />
    </>
  );
}
