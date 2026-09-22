import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PageIntro } from "@/components/shared/PageIntro";
import { EmptyState } from "@/components/shared/EmptyState";
import { ExternalButton } from "@/components/shared/Button";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/shared/Icons";
import { EnquiryForm } from "@/components/public/EnquiryForm";
import { FaqAccordion } from "@/components/public/FaqAccordion";
import { getBusinessSettings, getProductBySlug, getVariantById, getActiveFaqs } from "@/lib/data";
import { buildWhatsAppHref, formatIndianPhone, getContactActions } from "@/lib/contact";
import { formatVariantLabel } from "@/lib/utils";
import { buildLocalBusinessJsonLd } from "@/lib/structured-data";

const siteUrl = process.env.SITE_URL ?? "https://www.kapiladairyfarm.com";

export const metadata: Metadata = {
  title: "Contact & Orders",
  description:
    "Order Kapila A2 Gir cow Bilona ghee on WhatsApp, or send us an enquiry. Based in Masma, Olpad, Surat, Gujarat.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ product?: string; variant?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { product: productSlug, variant: variantId } = await searchParams;

  const [settings, product, variant, faqs] = await Promise.all([
    getBusinessSettings(),
    productSlug ? getProductBySlug(productSlug) : Promise.resolve(null),
    variantId ? getVariantById(variantId) : Promise.resolve(null),
    getActiveFaqs(),
  ]);

  const actions = getContactActions(settings);
  const phone = actions.find((a) => a.kind === "phone");
  const email = actions.find((a) => a.kind === "email");
  const maps = actions.find((a) => a.kind === "maps");

  const contextLabel = variant
    ? `${variant.product.name} — ${formatVariantLabel(variant.size, variant.unit)}`
    : product
      ? product.name
      : undefined;

  const jsonLd = buildLocalBusinessJsonLd(settings, siteUrl);

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}

      <PageIntro
        eyebrow="Contact & orders"
        title={
          <>
            Let&rsquo;s get you some <em className="font-normal italic">pure ghee</em>
          </>
        }
        description="The quickest way to order is WhatsApp. Prefer to write? Send us a message and we'll get back to you."
        align="center"
      />

      <Section tone="cream">
        <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <div className="space-y-4">
            {settings?.whatsapp ? (
              <div className="relative overflow-hidden rounded-3xl bg-dark-brown p-8 text-cream">
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(242,194,61,0.22),transparent_70%)]"
                />
                <WhatsAppIcon className="h-9 w-9 text-kapila-gold" />
                <h2 className="mt-5 font-heading text-2xl">Order on WhatsApp</h2>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">
                  Tell us the size you need — we&rsquo;ll reply with pricing and delivery details.
                </p>
                <p className="mt-5 font-heading text-xl tracking-wide text-kapila-gold">{formatIndianPhone(settings.whatsapp)}</p>
                <ExternalButton
                  href={buildWhatsAppHref(
                    settings.whatsapp,
                    contextLabel
                      ? `Hi Kapila Dairy Farm, I'd like to order ${contextLabel}.`
                      : "Hi Kapila Dairy Farm, I'd like to order ghee."
                  )}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="light"
                  className="mt-6"
                >
                  Start a chat
                </ExternalButton>
              </div>
            ) : null}

            <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-white">
              {phone ? (
                <ContactRow icon={<PhoneIcon className="h-5 w-5" />} label="Call us" href={phone.href}>
                  {settings?.phone ? formatIndianPhone(settings.phone) : null}
                </ContactRow>
              ) : null}
              {email ? (
                <ContactRow icon={<MailIcon className="h-5 w-5" />} label="Email" href={email.href}>
                  {settings?.email}
                </ContactRow>
              ) : null}
              {settings?.address ? (
                <li className="flex gap-4 p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand text-maroon">
                    <MapPinIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Visit us</p>
                    <address className="mt-1.5 whitespace-pre-line text-[15px] not-italic leading-relaxed text-ink">
                      {settings.address}
                    </address>
                    {maps ? (
                      <a
                        href={maps.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-2 inline-block text-sm font-medium text-maroon underline-offset-4 hover:underline"
                      >
                        Open in Google Maps
                      </a>
                    ) : null}
                  </div>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-white p-7 sm:p-10">
            <h2 className="font-heading text-3xl text-maroon">Send an enquiry</h2>
            <p className="mb-8 mt-2 text-muted">We&rsquo;ll get back to you as soon as we can.</p>
            <EnquiryForm
              productId={product?.id ?? variant?.productId}
              variantId={variant?.id}
              contextLabel={contextLabel}
              whatsappNumber={settings?.whatsapp}
            />
          </div>
        </Container>
      </Section>

      <Section tone="white" id="faq" className="scroll-mt-20">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Questions, answered"
              description="Can't find what you're looking for? Send us an enquiry above."
            />
          </div>
          {faqs.length > 0 ? (
            <FaqAccordion faqs={faqs} />
          ) : (
            <EmptyState title="No FAQs available yet" description="Please check back shortly, or contact us directly." />
          )}
        </Container>
      </Section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  href,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a href={href} className="group flex items-center gap-4 p-6 transition-colors hover:bg-cream">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand text-maroon">{icon}</span>
        <span>
          <span className="block text-xs font-medium uppercase tracking-[0.16em] text-muted">{label}</span>
          <span className="mt-0.5 block text-[15px] text-ink group-hover:text-maroon">{children}</span>
        </span>
      </a>
    </li>
  );
}
