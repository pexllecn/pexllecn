"use client";
import Header from "@/components/layout/header";
import type { Metadata } from "next";
import { CenterContent } from "@/components/center";
import { MainSidebar } from "@/components/layout/main-sidebar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const metadata: Metadata = {
  title: "Pexlle",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({}: {}) {
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.25 }}
      variants={variants1}
    >
      <div className="flex h-screen overflow-hidden">
        <Header />
        <CenterContent />
      </div>
    </motion.div>
  );
}
