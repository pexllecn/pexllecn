"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
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
            <Link
              key={index}
              href={item.disabled ? "/" : item.href}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
            >
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent",
                  (isHome || isActive) ? "bg-primary text-primary-foreground shadow font-medium hover:bg-primary/90 rounded-md justify-start" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
                
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
                {item.count && <span className="ml-auto text-xs font-semibold">{item.count}</span>}
                {item.tag && <span className="ml-auto bg-[#adfa1d] text-black text-xs px-2 rounded-md">{item.tag}</span>}
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}

