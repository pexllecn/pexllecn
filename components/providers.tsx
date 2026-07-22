"use client";

import { ThemeProvider } from "next-themes";
import type * as React from "react";
import {
  AnchoredToastProvider,
  ToastProvider,
} from "@/components/ui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ToastProvider>
        <AnchoredToastProvider>{children}</AnchoredToastProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
