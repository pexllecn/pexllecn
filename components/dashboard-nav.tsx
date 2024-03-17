import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={50}>
      <nav className="grid items-start gap-2">
        {items.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];
          const isHome = item.href === "/dashboard" && path === "/dashboard";
          const isActive =
            item.href !== "/dashboard" && path.startsWith(item.href ?? "");

          const link = (
            <Link
              key={index}
              href={item.disabled ? "/" : item.href!} // Use the non-null assertion operator here
              onClick={() => setOpen?.(false)}
            >
              <span
                className={cn(
                  "text-muted-foreground group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/10",
                  isHome || isActive
                    ? "text-primary bg-primary/10 font-black hover:bg-primary/10 rounded-md justify-start"
                    : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="icon-element mr-2 h-5 w-4" />
                {isCollapsed ? null : (
                  <span className="text-element h-5">{item.title}</span>
                )}
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
                      <span className="text-element ml-auto bg-[#50e3c1] text-black text-xs px-2 rounded-md">
                        {item.tag}
                      </span>
                    )}
              </span>
            </Link>
          );

          return (
            item.href &&
            (isCollapsed ? (
              <Tooltip key={index}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right">{item.title}</TooltipContent>
              </Tooltip>
            ) : (
              link
            ))
          );
        })}
      </nav>
    </TooltipProvider>
  );
}
