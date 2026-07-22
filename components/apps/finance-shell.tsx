"use client";

import {
  ArrowLeftIcon,
  ArrowLeftRightIcon,
  ChartPieIcon,
  CreditCardIcon,
  LandmarkIcon,
  PiggyBankIcon,
  ReceiptTextIcon,
  SettingsIcon,
  UsersIcon,
  WalletIcon,
  TrendingUpIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navBanking = [
  { href: "/finance", icon: WalletIcon, title: "Overview" },
  { href: "/finance/accounts", icon: LandmarkIcon, title: "Accounts" },
  { href: "/finance/transactions", icon: ReceiptTextIcon, title: "Transactions" },
  { href: "/finance/transfer", icon: ArrowLeftRightIcon, title: "Transfer" },
  { href: "/finance/cards", icon: CreditCardIcon, title: "Cards" },
];

const navPlanning = [
  { href: "/finance/invoices", icon: ReceiptTextIcon, title: "Invoices" },
  { href: "/finance/budgets", icon: PiggyBankIcon, title: "Budgets" },
  { href: "/finance/analytics", icon: ChartPieIcon, title: "Analytics" },
  { href: "/finance/recipients", icon: UsersIcon, title: "Recipients" },
  { href: "/finance/settings", icon: SettingsIcon, title: "Settings" },
];

export function FinanceShell({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/finance" />}
                size="lg"
                className="group-data-[collapsible=icon]:justify-center"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <TrendingUpIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-medium text-sidebar-accent-foreground">
                    Ledger
                  </span>
                  <span className="truncate text-xs">Business account</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Banking</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navBanking.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      render={<Link href={item.href} />}
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Planning</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navPlanning.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      render={<Link href={item.href} />}
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/" />}
                size="sm"
                tooltip="All apps"
              >
                <ArrowLeftIcon />
                <span>All apps</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 px-4 lg:px-6">
          <SidebarTrigger className="-ml-1.5" />
          <Separator className="mr-1 h-4" orientation="vertical" />
          <h1 className="font-heading font-semibold text-lg tracking-tight">
            {title}
          </h1>
          <Badge className="ml-1" variant="success">
            Live
          </Badge>
          <div className="ml-auto flex items-center gap-2">
            {actions}
            <ThemeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 lg:p-6 lg:pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
