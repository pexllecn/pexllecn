import { Metadata } from "next";
import Image from "next/image";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";

import { Separator } from "@/registry/new-york/ui/separator";
import { SidebarNav } from "@/app/dashboard/settings/components/sidebar-nav";

export const metadata: Metadata = {
  title: "Profile",
  description: "Advanced form example using react-hook-form and Zod.",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <div className="space-y-0.5">
          <BreadCrumb items={breadcrumbItems} />
          <Heading
            title={`Profile`}
            description=" Manage your account settings and set e-mail preferences."
          />
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5"></aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
