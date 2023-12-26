import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isCollapsed?: boolean; // Make it optional
}

export function DashboardNav({
  items,
  setOpen,
  isCollapsed,
}: DashboardNavProps) {
  // Add isCollapsed here
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        const isHome = item.href === "/dashboard" && path === "/dashboard";
        const isActive =
          item.href !== "/dashboard" && path.startsWith(item.href ?? "");

        return (
          item.href && (
            <Link
              key={index}
              href={item.disabled ? "/" : item.href}
              onClick={() => setOpen?.(false)}
            >
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-primary/10",
                  isHome || isActive
                    ? "bg-primary text-primary-foreground shadow font-medium hover:bg-primary/90 rounded-md justify-start"
                    : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="icon-element mr-2 h-4 w-4" />
                {isCollapsed ? null : (
                  <span className="text-element">{item.title}</span>
                )}{" "}
                {/* Text appears when sidebar is extended */}
                {isCollapsed
                  ? null
                  : item.count && (
                      <span className="text-element ml-auto text-xs font-semibold">
                        {item.count}
                      </span>
                    )}
                {isCollapsed
                  ? null
                  : item.tag && (
                      <span className="text-element ml-auto bg-[#79ffe1] text-black text-xs px-2 rounded-md">
                        {item.tag}
                      </span>
                    )}
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
