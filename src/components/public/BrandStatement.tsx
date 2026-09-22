import Image from "next/image";
import { Container } from "@/components/shared/Container";

/** Closing brand line — a statement, deliberately not another call-to-action. */
export function BrandStatement() {
  return (
    <section className="relative overflow-hidden bg-sand pt-20 sm:pt-24">
      <Container className="relative text-center">
        <p className="reveal mx-auto max-w-3xl font-heading text-[1.9rem] leading-[1.2] text-maroon text-balance sm:text-[2.6rem]">
          No shortcuts. No additives.{" "}
          <em className="italic text-warm-gold">Just ghee</em>, made the way it always was.
        </p>
        <p className="mt-6 text-sm tracking-[0.04em] text-muted">Kapila Dairy Farm &middot; Masma, Surat</p>
        <Image
          src="/images/illustrations/bilona-scene.png"
          alt=""
          width={720}
          height={555}
          sizes="(min-width: 640px) 520px, 85vw"
          className="mx-auto mt-10 h-auto w-full max-w-[520px] opacity-80"
        />
      </Container>
    </section>
  );
}
