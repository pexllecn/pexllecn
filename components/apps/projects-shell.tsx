"use client";

import {
  ActivityIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  CalendarRangeIcon,
  KanbanSquareIcon,
  LayersIcon,
  LayoutDashboardIcon,
  ListTodoIcon,
  MapIcon,
  RocketIcon,
  SquareChartGanttIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
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
import { Separator } from "@/components/ui/separator";

const nav = [
  { href: "/projects", icon: LayoutDashboardIcon, title: "Overview" },
  { href: "/projects/board", icon: KanbanSquareIcon, title: "Board" },
  { href: "/projects/backlog", icon: ListTodoIcon, title: "Backlog" },
  { href: "/projects/sprint", icon: SquareChartGanttIcon, title: "Sprint" },
  { href: "/projects/roadmap", icon: MapIcon, title: "Roadmap" },
  { href: "/projects/issues", icon: LayersIcon, title: "Issues" },
  { href: "/projects/docs", icon: BookOpenIcon, title: "Docs" },
  { href: "/projects/releases", icon: RocketIcon, title: "Releases" },
  { href: "/projects/activity", icon: ActivityIcon, title: "Activity" },
  { href: "/projects/team", icon: UsersIcon, title: "Team" },
];

export function ProjectsShell({
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
    <SidebarProvider className="accent-violet">
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href="/projects" />}
                size="lg"
                className="group-data-[collapsible=icon]:justify-center"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg accent-gradient text-white shadow-xs">
                  <SquareChartGanttIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-medium text-sidebar-accent-foreground">
                    Trak
                  </span>
                  <span className="truncate text-xs">Website relaunch</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Project</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => (
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
        <header className="glass sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 rounded-t-xl border-b px-4 lg:px-6">
          <SidebarTrigger className="-ml-1.5" />
          <Separator className="mr-1 h-4" orientation="vertical" />
          <h1 className="font-heading font-semibold text-lg tracking-tight">
            {title}
          </h1>
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
