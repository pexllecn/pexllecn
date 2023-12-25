"use client"

import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function Header() {
  const { theme, setTheme } = useTheme();
  const [logo, setLogo] = React.useState("/pexlle.png"); // Initialize logo state with dark logo

  React.useEffect(() => {
    // Update the logo based on the theme
    if (theme === 'light') {
      setLogo("/pexlle.png");
    } else {
      setLogo("/pexllelight.png");
    }
  }, [theme]); // Run this effect when theme changes

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/60 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden md:block">
          {/* Use the logo state for rendering */}
          <img src={logo} className="h-7" />
        </div>
        <div className={cn("block sm:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
          <TooltipProvider delayDuration={100}>
          <Tooltip>
          <TooltipTrigger asChild>
        <Button variant="ghost">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" onClick={() => setTheme("dark")}/>
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" onClick={() => setTheme("light")}/>
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
