import type { Metadata } from "next";
import { CrmShell } from "@/components/apps/crm-shell";

export const metadata: Metadata = {
  title: "Atlas CRM",
};

export default function CrmLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <CrmShell>{children}</CrmShell>;
}
