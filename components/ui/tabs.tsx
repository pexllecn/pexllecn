"use client";
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const TabsContext = React.createContext(null);

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [activeTab, setActiveTab] = React.useState(props.defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <TabsPrimitive.Root
        ref={ref}
        className={cn("relative", className)}
        {...props}
        onValueChange={(value) => {
          setActiveTab(value);
          props.onValueChange?.(value);
        }}
      />
    </TabsContext.Provider>
  );
});
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const tabsListRef = React.useRef<HTMLDivElement>(null);
  const { activeTab } = React.useContext(TabsContext);
  const [backgroundStyle, setBackgroundStyle] = React.useState({});

  React.useEffect(() => {
    const updateBackground = () => {
      const tabsList = tabsListRef.current;
      if (tabsList) {
        const activeTabElement = tabsList.querySelector(
          `[data-state="active"]`
        );
        if (activeTabElement) {
          setBackgroundStyle({
            width: `${activeTabElement.clientWidth}px`,
            transform: `translateX(${activeTabElement.offsetLeft}px)`,
            height: "calc(100% - 0.5rem)", // Subtracting 0.5rem (8px) for padding
            top: "0.25rem", // Adding 0.25rem (4px) top padding
            transition: "all 0.3s ease"
          });
        }
      }
    };

    updateBackground();
    window.addEventListener("resize", updateBackground);
    return () => window.removeEventListener("resize", updateBackground);
  }, [activeTab]);

  return (
    <TabsPrimitive.List
      ref={(el) => {
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
        tabsListRef.current = el;
      }}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-[calc(var(--radius)-0.25rem)] bg-muted p-1 text-muted-foreground relative",
        className
      )}
      {...props}
    >
      <div
        className="absolute left-0 bg-background rounded-[calc(var(--radius)-0.25rem)] transition-all duration-300 ease-in-out shadow"
        style={backgroundStyle}
      />
      {props.children}
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-[calc(var(--radius)-0.25rem)] px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground relative z-10",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
