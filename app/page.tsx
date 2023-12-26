import Header from "@/components/layout/header";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { ExamplesNav } from "@/components/examples-nav";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { buttonVariants } from "@/registry/new-york/ui/button";
import { Separator } from "@/registry/new-york/ui/separator";

export const metadata: Metadata = {
  title: "Pexlle",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({}: {}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Header />
        <main className="flex flex-1 justify-center pt-16 overflow-x-hidden overflow-y-auto">
          <PageHeader className="pb-8">
            <Link
              href="#"
              className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
            >
              🎉 <Separator className="mx-2 h-4" orientation="vertical" />{" "}
              <span className="sm:hidden">Pexlle the best to come.</span>
              <span className="hidden sm:inline">
                Introducing you to new Pexlle.
              </span>
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
            <span className="text-center text-5xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              Build your website Beautifully.
            </span>
            <span className="max-w-[750px] text-center text-muted-foreground">
              Beautifully designed components that you can copy and paste into
              your apps. Accessible. Customizable. Open Source. Beautifully
              designed components that you can copy and paste into your apps.
              Accessible. Customizable. Open Source.
            </span>

            <div className="flex space-x-4 pb-8 pt-4 md:pb-10">
              <Link href="/dashboard" className={cn(buttonVariants())}>
                Get Started
              </Link>
              <Link
                rel="noreferrer"
                href={"#"}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                <Icons.gitHub className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </div>
          </PageHeader>
        </main>
      </div>
    </>
  );
}
