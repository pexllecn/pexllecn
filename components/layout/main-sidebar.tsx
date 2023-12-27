"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PanelRightClose } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MainSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <PanelRightClose />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="flex flex-col items-center space-y-4 py-4">
            {/* Logo with Link */}
            <Link href="/">
              <span className="block">
                <Image
                  src="/pexlleh.svg"
                  alt="Logo"
                  width={150}
                  height={50}
                  className="pb-8"
                />
              </span>
            </Link>
            {/* Navigation Links */}
            <div className="flex flex-col space-y-5 pl-4">
              <Link href="/dashboard">
                <span className="block text-lg font-medium text-center">
                  Dashboard
                </span>
              </Link>
              <Link href="#">
                <span className="block text-lg font-medium text-center">
                  Components
                </span>
              </Link>
              <Link href="#">
                <span className="block text-lg font-medium text-center">
                  Themes
                </span>
              </Link>
              <Link href="#">
                <span className="block text-lg font-medium text-center">
                  Examples
                </span>
              </Link>
              <Link href="#">
                <span className="block text-lg font-medium text-center">
                  Github
                </span>
              </Link>
              {/* Add more links as needed */}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
