import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

// Fraunces: a warm, slightly old-style display serif — heritage without feeling dated.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

// DM Sans: a clean geometric sans that echoes the geometric KAPILA wordmark.
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.SITE_URL ?? "https://www.kapiladairyfarm.com";

// Only metadataBase lives here — it's shared, but the title template and default
// description belong to (public)/layout.tsx so that /admin/* (a sibling segment,
// not a descendant of the public layout) isn't affected by the public site's template.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

/**
 * Bare application shell only — fonts, global styles, <html>/<body>. The public
 * Header/Footer live in src/app/(public)/layout.tsx, not here, so /admin/* renders
 * inside its own AdminShell instead of the public site chrome.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream text-ink antialiased">{children}</body>
    </html>
  );
}
