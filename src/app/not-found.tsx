import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { NotFoundContent } from "@/components/public/NotFoundContent";
import { getBusinessSettings } from "@/lib/data";
import { buildWhatsAppHref } from "@/lib/contact";

export const metadata: Metadata = { title: "Page not found | Kapila Dairy Farm" };

/**
 * 404 for URLs that match no route at all. These render in the bare root layout (the
 * public layout never runs), so the site header and footer are added here explicitly.
 */
export default async function RootNotFound() {
  // A 404 must always render (and never fail the build), even if the database is briefly
  // unreachable — it just falls back to header/footer without contact details.
  const settings = await getBusinessSettings().catch(() => null);
  const whatsappHref = settings?.whatsapp
    ? buildWhatsAppHref(settings.whatsapp, "Hi Kapila Dairy Farm, I'd like to order ghee.")
    : null;

  return (
    <>
      <Header whatsappHref={whatsappHref} />
      <main id="main-content" className="flex-1">
        <NotFoundContent />
      </main>
      <Footer settings={settings} />
    </>
  );
}
