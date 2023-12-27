"use client";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CommandMenu } from "../command-menu";

export default function Header() {
  const pathname = usePathname();

  const { theme, setTheme } = useTheme();
  const [logo, setLogo] = React.useState("/pexlleh.svg"); // Initialize logo state with dark logo

  React.useEffect(() => {
    // Assuming the 'system' theme aligns with light mode
    const effectiveTheme = theme === "system" ? "light" : theme;

    if (effectiveTheme === "light") {
      setLogo("/pexlleh.svg"); // Path for the light theme logo
    } else {
      setLogo("/pexllelight.png"); // Path for the dark theme logo
    }
  }, [theme]);

  return (
    <div className="fixed xl:px-9 sm:px-0 top-0 left-0 right-0 supports-backdrop-blur:bg-background/50 border-b border-muted/80 bg-background/60 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className={cn("block sm:!hidden")}>
          <MainSidebar />
        </div>
        <div className="">
          {/* Use the logo state for rendering */}
          <Link href="/">
            <Image src={logo} alt="Pexlle Logo" width={150} height={50} />{" "}
            {/* Adjust width and height as needed */}
          </Link>
        </div>

        <nav className="hidden md:block flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/dashboard"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/dashboard"
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/docs/components")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Components
          </Link>
          <Link
            href="#"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/themes")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Themes
          </Link>
          <Link
            href="#"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/examples")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            Examples
          </Link>
          <Link
            href={"#"}
            className={cn(
              "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
            )}
          >
            GitHub
          </Link>
        </nav>

        <div className="flex items-center gap-2 hidden md:block">
          <CommandMenu />
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <Icons.twitter className="h-3 w-3 fill-current" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun
                    className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                    onClick={() => setTheme("dark")}
                  />
                  <Moon
                    className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                    onClick={() => setTheme("light")}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Light/Dark</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>
    </div>
  );
}
