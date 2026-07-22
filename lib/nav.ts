import {
  CalendarRangeIcon,
  HomeIcon,
  InboxIcon,
  KanbanSquareIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  PackageIcon,
  SettingsIcon,
  SquareUserIcon,
  UserIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  tag?: string;
  count?: number;
};

export const navItems: NavItem[] = [
  { href: "/dashboard", icon: HomeIcon, title: "Home" },
  { href: "/dashboard/overview", icon: LayoutDashboardIcon, title: "Overview" },
  { href: "/dashboard/products", icon: PackageIcon, tag: "New", title: "Products" },
  { href: "/dashboard/addetails", icon: CalendarRangeIcon, title: "Ad Details" },
  { href: "/dashboard/chat", icon: MessageSquareIcon, tag: "New", title: "Chat" },
  { count: 5, href: "/dashboard/inbox", icon: InboxIcon, title: "Inbox" },
  { href: "/dashboard/user", icon: UserIcon, title: "User" },
  { href: "/dashboard/employee", icon: UsersIcon, title: "Employees" },
  { href: "/dashboard/profile", icon: SquareUserIcon, title: "Profile" },
  { href: "/dashboard/kanban", icon: KanbanSquareIcon, title: "Kanban" },
  { href: "/dashboard/settings", icon: SettingsIcon, title: "Settings" },
];
