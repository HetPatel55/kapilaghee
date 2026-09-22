import { cn } from "@/lib/utils";

type Tone = "cream" | "sand" | "white" | "maroon" | "dark";

const toneClasses: Record<Tone, string> = {
  cream: "bg-cream",
  sand: "bg-sand",
  white: "bg-white",
  maroon: "bg-maroon text-cream",
  dark: "bg-dark-brown text-cream",
};

export function Section({
  tone = "cream",
  className,
  children,
  id,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative py-14 sm:py-20 lg:py-24", toneClasses[tone], className)}>
      {children}
    </section>
  );
}
