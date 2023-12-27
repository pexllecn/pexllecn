import Header from "@/components/layout/header";
import type { Metadata } from "next";
import { CenterContent } from "@/components/center";
import { MainSidebar } from "@/components/layout/main-sidebar";

export const metadata: Metadata = {
  title: "Pexlle",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({}: {}) {
  return (
    <>
      <MainSidebar />
      <div className="flex h-screen overflow-hidden">
        <Header />
        <CenterContent />
      </div>
    </>
  );
}
