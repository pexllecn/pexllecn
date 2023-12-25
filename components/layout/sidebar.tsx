"use client"
import { DashboardNav } from "@/components/dashboard-nav";
import { navItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import { UserNav } from "./user-nav";
import { Moon, PanelLeftClose, PanelLeftOpen, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import React, { useState } from 'react';
import { MobileSidebar } from "./mobile-sidebar";
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"




// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export default function Sidebar({ className }: SidebarProps) {
  const { theme, setTheme } = useTheme();
  const [logo, setLogo] = React.useState("/pexlle.png");
  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage sidebar collapse
  const [canHover, setCanHover] = useState(true);
  const [disableHover, setDisableHover] = useState(false);



  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setDisableHover(true);
  
    setTimeout(() => {
      setDisableHover(false);
    }, 300); // Adjust the time based on your sidebar transition time
  };
  

  React.useEffect(() => {
    // Update the logo based on the theme
    if (theme === 'light') {
      setLogo("/pexlle.png");
    } else {
      setLogo("/pexllelight.png");
    }
  }, [theme]); // Run this effect when theme changes

  return (
    
<div className={cn("sidebar flex flex-col h-full border bg-muted", className, { 'collapsed': isCollapsed, 'disable-hover': disableHover })}>
      
      <div className="overflow-auto">

      
      <div className="space-y-4 py-4 hidden md:block">
          {/* Use the logo state for rendering */}
          <img src={logo} className="px-8 py-2" />
        </div>
        <div className="flex justify-center items-center gap-2 py-2">
            <UserNav />
            <div className="flex flex-col space-y-1">
            <p className="text-xs font-medium leading-none">Khaled Alkurdi</p>
            <p className="text-xs leading-none text-muted-foreground">
              khaled@me.com
            </p>
            </div>
            </div>
        
      <div className="overflow-auto">
        <div className="px-3 py-2">
          <div className="space-y-1">
          <Separator className="mb-4" />
            <DashboardNav items={navItems} />
            </div>  
            </div>

            <footer className="justify-end absolute bottom-0 left-0 right-0 p-3">
        {/* Set the footer to position: absolute, aligned to the bottom */}
        <TooltipProvider delayDuration={100}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
      </Button>
    </TooltipTrigger>
    <TooltipContent>Light/Dark</TooltipContent>
  </Tooltip>
</TooltipProvider>

<TooltipProvider delayDuration={100}>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button onClick={toggleCollapse} className="p-2" variant="outline" size="icon">
        {isCollapsed 
          ? <PanelLeftOpen className="h-[1.2rem] w-[1.2rem]" /> // Icon for expand
          : <PanelLeftClose className="h-[1.2rem] w-[1.2rem]" />  // Icon for collapse
        }
        </Button>
    </TooltipTrigger>
    <TooltipContent>Toggle sidebar</TooltipContent>
  </Tooltip>
</TooltipProvider>


      </footer>



          {/* <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              {playlists?.map((playlist, i) => (
                <Button
                  key={`${playlist}-${i}`}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M21 15V6" />
                    <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path d="M12 12H3" />
                    <path d="M16 6H3" />
                    <path d="M12 18H3" />
                  </svg>
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea> */}
        </div>
      </div>
    </div>
  );
}

