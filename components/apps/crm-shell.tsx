"use client";

import { ChevronDownIcon, CommandIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Menu,
  MenuItem,
  MenuLinkItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/crm", title: "Dashboard" },
  { href: "/crm/leads", title: "Leads" },
  { href: "/crm/lead-detail", title: "Lead Detail" },
  { href: "/crm/contacts", title: "Contacts" },
  { href: "/crm/companies", title: "Companies" },
  { href: "/crm/deals", title: "Deals" },
  { href: "/crm/schedule", title: "Schedule" },
  { href: "/crm/reports", title: "Reports" },
  { href: "/crm/import", title: "Import" },
  { href: "/crm/settings", title: "Settings" },
];

export function CrmShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b bg-sidebar">
        <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
          <Menu>
            <MenuTrigger className="flex cursor-pointer items-center gap-2 rounded-lg p-1 font-medium outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <CommandIcon className="size-4" />
              </div>
              Atlas CRM
              <ChevronDownIcon className="size-4 text-muted-foreground" />
            </MenuTrigger>
            <MenuPopup align="start">
              <MenuLinkItem render={<Link href="/" />}>All apps</MenuLinkItem>
              <MenuSeparator />
              <MenuLinkItem render={<Link href="/dashboard" />}>
                Workspace
              </MenuLinkItem>
              <MenuLinkItem render={<Link href="/projects" />}>
                Trak Projects
              </MenuLinkItem>
              <MenuLinkItem render={<Link href="/finance" />}>
                Ledger Finance
              </MenuLinkItem>
            </MenuPopup>
          </Menu>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Menu>
              <MenuTrigger className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Avatar className="size-8">
                  <AvatarFallback>KA</AvatarFallback>
                </Avatar>
              </MenuTrigger>
              <MenuPopup align="end" className="min-w-48">
                <MenuItem>Account</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuSeparator />
                <MenuItem variant="destructive">Log out</MenuItem>
              </MenuPopup>
            </Menu>
          </div>
        </div>
        <ScrollArea className="max-w-full">
          <nav className="flex gap-1 px-4 lg:px-6">
            {nav.map((item) => (
              <Link
                className={cn(
                  "relative whitespace-nowrap px-3 py-2.5 text-muted-foreground text-sm transition-colors hover:text-foreground",
                  pathname === item.href &&
                    "font-medium text-foreground after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary",
                )}
                href={item.href}
                key={item.href}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <ScrollBar className="h-1.5" orientation="horizontal" />
        </ScrollArea>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
