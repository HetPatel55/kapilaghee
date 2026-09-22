import Link from "next/link";
import type { BusinessSettings } from "@prisma/client";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { NAV_LINKS } from "@/lib/nav";
import { getContactActions } from "@/lib/contact";
import { FSSAI_LICENSE_NUMBER } from "@/lib/lab-report";

export function Footer({ settings }: { settings: BusinessSettings | null }) {
  const year = new Date().getFullYear();
  const contactActions = getContactActions(settings).filter((a) => a.kind !== "maps");
  const social = [
    settings?.instagram ? { label: "Instagram", href: settings.instagram } : null,
    settings?.facebook ? { label: "Facebook", href: settings.facebook } : null,
  ].filter((v): v is { label: string; href: string } => Boolean(v));

  return (
    <footer className="bg-dark-brown text-cream/80">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12 lg:py-14">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo tone="cream" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
            Pure A2 Gir cow ghee, hand-churned by the Bilona method in Surat, Gujarat. Nothing added.
          </p>
        </div>

        <FooterColumn title="Explore">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-cream">
                {link.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        {contactActions.length > 0 || social.length > 0 ? (
          <FooterColumn title="Get in touch">
            {contactActions.map((action) => (
              <li key={action.kind}>
                <a
                  href={action.href}
                  {...(action.kind === "whatsapp" ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  className="transition-colors hover:text-cream"
                >
                  {action.label}
                </a>
              </li>
            ))}
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer noopener" className="transition-colors hover:text-cream">
                  {s.label}
                </a>
              </li>
            ))}
          </FooterColumn>
        ) : null}

        {settings?.address ? (
          <FooterColumn title="Visit us">
            <li>
              <address className="whitespace-pre-line not-italic leading-relaxed">{settings.address}</address>
            </li>
          </FooterColumn>
        ) : null}
      </Container>

      <div className="border-t border-cream/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-center text-xs text-cream/45 sm:flex-row sm:text-left">
          <p>
            &copy; {year} {settings?.businessName ?? "Kapila Dairy Farm"} &middot; FSSAI Lic. No. {FSSAI_LICENSE_NUMBER}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-cream">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-cream">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-kapila-gold/90">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}
