import { WhatsAppIcon } from "@/components/shared/Icons";

/** Always-visible "chat on WhatsApp" button — how most customers actually place orders. */
export function WhatsAppFloat({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with Kapila Dairy Farm on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full bg-whatsapp pl-4 pr-4 text-white shadow-[0_14px_30px_-12px_rgba(20,90,50,0.8)] transition-[padding,transform] duration-300 hover:-translate-y-0.5 sm:bottom-7 sm:right-7 sm:hover:pr-5"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-[max-width] duration-300 group-hover:max-w-40 sm:inline">
        Chat with us
      </span>
    </a>
  );
}
