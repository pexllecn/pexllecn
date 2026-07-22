import "./globals.css";

import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { fontMono, fontSans } from "@/lib/fonts";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} bg-background font-sans text-foreground antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
