import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { WhatsAppFloat } from "@/components/shared/WhatsAppFloat";
import { getBusinessSettings } from "@/lib/data";
import { buildWhatsAppHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: {
    default: "Kapila Dairy Farm — Pure A2 Gir Cow Bilona Ghee, Surat",
    template: "%s | Kapila Dairy Farm",
  },
  description:
    "Pure A2 Gir cow ghee, hand-churned by the traditional Bilona method in Surat, Gujarat. No additives, no preservatives — FSSAI licensed and independently lab tested.",
  openGraph: {
    type: "website",
    siteName: "Kapila Dairy Farm",
    locale: "en_IN",
  },
};

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getBusinessSettings();
  const whatsappHref = settings?.whatsapp
    ? buildWhatsAppHref(settings.whatsapp, "Hi Kapila Dairy Farm, I'd like to order ghee.")
    : null;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-maroon focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <Header whatsappHref={whatsappHref} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer settings={settings} />
      {whatsappHref ? <WhatsAppFloat href={whatsappHref} /> : null}
    </>
  );
}
