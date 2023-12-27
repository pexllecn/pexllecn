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
      <div className="p-5 block sm:!hidden fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/50 border-b border-muted/80 bg-background/60 backdrop-blur z-20">
        <MainSidebar />
      </div>
      <div className="flex h-screen overflow-hidden">
        <Header />
        <CenterContent />
      </div>
    </>
  );
}
