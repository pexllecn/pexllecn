"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import {
  Command,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function CommandMenu({ className }: { className?: string }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger
        className={cn(
          "inline-flex h-8 cursor-pointer items-center gap-2 rounded-lg border border-input bg-popover px-2.5 text-muted-foreground text-sm shadow-xs/5 outline-none transition-shadow hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring dark:bg-input/32 dark:hover:bg-input/64",
          className,
        )}
      >
        <SearchIcon className="size-4 opacity-80" />
        <span className="hidden sm:inline">Search…</span>
        <KbdGroup className="hidden sm:inline-flex">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command>
          <CommandInput placeholder="Type a page name…" />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandGroupLabel>Pages</CommandGroupLabel>
              {navItems.map((item) => (
                <CommandItem
                  key={item.href}
                  onClick={() => {
                    setOpen(false);
                    router.push(item.href);
                  }}
                  value={item.title}
                >
                  <item.icon />
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandFooter>
            <span className="text-muted-foreground text-xs">
              Navigate with ↑↓, open with ↵
            </span>
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
