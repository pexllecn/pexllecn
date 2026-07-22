import "./globals.css";
import "@fontsource-variable/inter";

import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: {
    default: "Pexllecn",
    template: "%s - Pexllecn",
  },
  description:
    "A complete Next.js starter rebuilt with coss ui — Base UI primitives styled with Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistMono.variable}>
      <body className="bg-background font-sans text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
