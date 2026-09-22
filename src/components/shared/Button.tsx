import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse" | "light" | "whatsapp";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-maroon text-cream shadow-[0_8px_20px_-10px_rgba(134,26,20,0.8)] hover:bg-maroon-dark",
  secondary: "border border-maroon/35 text-maroon hover:border-maroon hover:bg-maroon/[0.04]",
  ghost: "text-maroon underline-offset-4 hover:underline",
  // On dark/maroon backgrounds.
  inverse: "border border-cream/40 text-cream hover:border-cream hover:bg-cream/10",
  light: "bg-cream text-maroon hover:bg-white",
  whatsapp: "bg-whatsapp text-white shadow-[0_8px_20px_-10px_rgba(31,143,78,0.9)] hover:brightness-110",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], variant === "ghost" ? "h-auto px-0" : sizes[size], className);
}

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/** A submit/action button. For navigation, use `LinkButton` instead. */
export function Button({ variant, size, className, ...rest }: ButtonProps) {
  return <button {...rest} className={buttonClasses(variant, size, className)} />;
}

type LinkButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & React.ComponentProps<typeof Link>;

/** A link styled as a button. For form submission/actions, use `Button` instead. */
export function LinkButton({ variant, size, className, ...rest }: LinkButtonProps) {
  return <Link {...rest} className={buttonClasses(variant, size, className)} />;
}

type ExternalButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

/** A button-styled plain <a> for off-site links (WhatsApp, tel:, mailto:). */
export function ExternalButton({ variant, size, className, ...rest }: ExternalButtonProps) {
  return <a {...rest} className={buttonClasses(variant, size, className)} />;
}
