"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { ExternalButton, LinkButton } from "@/components/shared/Button";
import { WhatsAppIcon } from "@/components/shared/Icons";
import { NAV_LINKS } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** Releases the mobile-menu scroll lock immediately (the effect below re-applies it when open). */
function unlockBodyScroll() {
  document.body.style.overflow = "";
}

const PROMISES = ["Hand-churned by the Bilona method", "No additives. No preservatives.", "FSSAI licensed & lab tested"];

/**
 * @param whatsappHref Business WhatsApp chat link, or null when no number is set in
 *   Admin → Settings — the header then falls back to the enquiry form.
 */
export function Header({ whatsappHref }: { whatsappHref: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu on navigation — derived during render (React's documented pattern for
  // resetting state when a value changes) rather than in an effect.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  // Set when a page is chosen from the mobile menu, so the new page always opens at the top.
  const scrollTopOnNav = useRef(false);
  useEffect(() => {
    if (!scrollTopOnNav.current) return;
    scrollTopOnNav.current = false;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Close the menu and release the scroll lock *before* navigation, rather than after the
  // new page renders — a locked body can stop the browser scrolling the new page to the top.
  function handleMobileNav(href: string) {
    unlockBodyScroll();
    setMenuOpen(false);
    if (href === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollTopOnNav.current = true;
    }
  }

  const cta = whatsappHref ? (
    <ExternalButton href={whatsappHref} target="_blank" rel="noreferrer noopener" size="md">
      <WhatsAppIcon className="h-[18px] w-[18px]" />
      Order on WhatsApp
    </ExternalButton>
  ) : (
    <LinkButton href="/contact" size="md">
      Enquire now
    </LinkButton>
  );

  return (
    <>
      <div className="bg-maroon-dark text-cream/85">
        <ul className="mx-auto flex h-9 max-w-[1240px] items-center justify-center gap-8 px-5 text-[12px] tracking-[0.04em] sm:px-8">
          {PROMISES.map((p, i) => (
            <li key={p} className={cn("items-center gap-8", i === 0 ? "flex" : "hidden md:flex")}>
              {i > 0 ? <span aria-hidden="true" className="h-1 w-1 rounded-full bg-kapila-gold/70" /> : null}
              {p}
            </li>
          ))}
        </ul>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300",
          scrolled || menuOpen
            ? "border-border/80 bg-cream/90 shadow-[0_10px_30px_-24px_rgba(35,21,15,0.6)] backdrop-blur-md"
            : "border-transparent bg-cream"
        )}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[15px] transition-colors",
                    active ? "text-maroon" : "text-ink/70 hover:text-maroon"
                  )}
                >
                  {link.label}
                  {active ? (
                    <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 mx-auto h-1 w-1 rounded-full bg-maroon" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">{cta}</div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-maroon hover:bg-maroon/5 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            "grid overflow-hidden bg-cream transition-[grid-template-rows] duration-300 ease-out lg:hidden",
            menuOpen ? "grid-rows-[1fr] border-t border-border" : "grid-rows-[0fr]"
          )}
        >
          <nav aria-label="Mobile" inert={!menuOpen} className="min-h-0">
            <div className="flex flex-col px-5 pb-8 pt-3 sm:px-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleMobileNav(link.href)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "border-b border-border/70 py-4 font-heading text-2xl",
                    isActive(link.href) ? "text-maroon" : "text-ink/85"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 [&>*]:w-full">{cta}</div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
