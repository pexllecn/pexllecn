import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ledger Finance",
};

export default function FinanceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
