import { Metadata } from "next";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";

import { Separator } from "@/registry/new-york/ui/separator";
import { SidebarNav } from "@/app/dashboard/settings/components/sidebar-nav";

export const metadata: Metadata = {
  title: "Settings",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Account",
    href: "/dashboard/settings",
  },
  {
    title: "Appearance",
    href: "/dashboard/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/dashboard/settings/notifications",
  },
  {
    title: "Display",
    href: "/dashboard/settings/display",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const breadcrumbItems = [{ title: "Settings", link: "/dashboard/settings" }];

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6">
        <div className="space-y-0.5">
          <BreadCrumb items={breadcrumbItems} />
          <Heading
            title={`Settings`}
            description=" Manage your account settings and set e-mail preferences."
          />
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
