import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import React, { useState } from "react"; // Import useState


interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isCollapsed: boolean; // Add this line
}

export function DashboardNav({ items, setOpen, isCollapsed }: DashboardNavProps) { // Add isCollapsed here
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        const isHome = item.href === "/dashboard" && path === "/dashboard";
        const isActive = item.href !== "/dashboard" && path.startsWith(item.href ?? "");
        
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href} onClick={() => setOpen?.(false)}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent",
                  (isHome || isActive) ? "bg-primary text-primary-foreground shadow font-medium hover:bg-primary/90 rounded-md justify-start" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                {isCollapsed ? null : <span>{item.title}</span>} {/* Text appears when sidebar is extended */}
                {isCollapsed ? null : item.count && <span className="ml-auto text-xs font-semibold">{item.count}</span>}
                {isCollapsed ? null : item.tag && <span className="ml-auto bg-[#adfa1d] text-black text-xs px-2 rounded-md">{item.tag}</span>}
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
