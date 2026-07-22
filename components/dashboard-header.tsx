import { BellIcon } from "lucide-react";
import * as React from "react";
import { CommandMenu } from "@/components/command-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

type Crumb = {
  label: string;
  href?: string;
};

const notifications = [
  { detail: "Olivia Martin invited you to Acme Inc", time: "2 min ago" },
  { detail: "Your export finished processing", time: "1 hour ago" },
  { detail: "New sign-in from Dublin, Ireland", time: "Yesterday" },
];

export function DashboardHeader({ breadcrumbs }: { breadcrumbs: Crumb[] }) {
  return (
    <header className="glass sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b px-4 lg:px-6">
      <SidebarTrigger className="-ml-1.5" />
      <Separator className="mr-1 h-4" orientation="vertical" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.label}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.href ? (
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-2">
        <CommandMenu />
        <Menu>
          <MenuTrigger
            render={
              <Button aria-label="Notifications" size="icon" variant="ghost" />
            }
          >
            <span className="relative">
              <BellIcon />
              <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-destructive" />
            </span>
          </MenuTrigger>
          <MenuPopup align="end" className="w-80">
            <MenuGroup>
              <MenuGroupLabel className="flex items-center justify-between">
                Notifications
                <Badge size="sm" variant="secondary">
                  3 new
                </Badge>
              </MenuGroupLabel>
              {notifications.map((notification) => (
                <MenuItem
                  className="flex-col items-start gap-0.5"
                  key={notification.detail}
                >
                  <span>{notification.detail}</span>
                  <span className="text-muted-foreground text-xs">
                    {notification.time}
                  </span>
                </MenuItem>
              ))}
            </MenuGroup>
            <MenuSeparator />
            <MenuItem className="justify-center text-muted-foreground">
              Mark all as read
            </MenuItem>
          </MenuPopup>
        </Menu>
        <ThemeToggle />
      </div>
    </header>
  );
}
