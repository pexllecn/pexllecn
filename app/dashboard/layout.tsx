import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Pexlle",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className={cn("p-5 block sm:!hidden")}>
        <MobileSidebar />
      </div>
      <div className="flex h-full overflow-hidden">
        <Sidebar className="w-64 hidden md:block" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto h-full">
          {children}
          <Toaster richColors />
          <SpeedInsights />
        </main>
      </div>
    </div>
  );
}
