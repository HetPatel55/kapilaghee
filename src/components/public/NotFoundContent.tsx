import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { LinkButton } from "@/components/shared/Button";
import { Eyebrow } from "@/components/shared/SectionHeading";

/** Branded 404 body — used by both the root and the public-section not-found pages. */
export function NotFoundContent() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container className="flex flex-col items-center text-center">
        <Image
          src="/images/illustrations/gir-cow-calf.png"
          alt=""
          width={679}
          height={446}
          className="h-auto w-full max-w-[300px] opacity-80"
        />
        <Eyebrow className="mt-8 justify-center">Page not found</Eyebrow>
        <h1 className="mt-4 font-heading text-4xl text-maroon sm:text-5xl">This page wandered off</h1>
        <p className="mt-4 max-w-md text-muted">
          The page you&rsquo;re looking for may have moved. Let&rsquo;s get you back to the ghee.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href="/" size="lg">
            Back to home
          </LinkButton>
          <LinkButton href="/our-ghee" variant="secondary" size="lg">
            See our ghee
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
