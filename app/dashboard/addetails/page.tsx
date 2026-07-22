"use client";

import {
  FlagIcon,
  HeartIcon,
  LaptopIcon,
  MapPinIcon,
  MonitorIcon,
  ShareIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  StarIcon,
  TabletIcon,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toastManager } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const featuredAds = [
  { icon: LaptopIcon, location: "Dublin", price: "€2,200", title: "MacBook Pro 2020" },
  { icon: SmartphoneIcon, location: "Cork", price: "€1,200", title: "iPhone 15 Pro Max" },
  { icon: TabletIcon, location: "Lucan", price: "€800", title: "iPad 2019" },
];

const actions = [
  { icon: HeartIcon, label: "Save" },
  { icon: ShareIcon, label: "Share" },
  { icon: StarIcon, label: "Favourite" },
  { icon: FlagIcon, label: "Report" },
];

export default function AdDetailsPage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/dashboard/products", label: "Products" },
          { label: "Apple iMac 27-inch" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Card>
              <CardPanel className="pt-6">
                <div className="flex h-72 items-center justify-center rounded-xl border bg-muted/50">
                  <MonitorIcon className="size-16 text-muted-foreground" />
                </div>
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {[MonitorIcon, LaptopIcon, TabletIcon, SmartphoneIcon].map(
                    (Icon, index) => (
                      <div
                        className="flex h-16 items-center justify-center rounded-lg border bg-muted/50"
                        key={index}
                      >
                        <Icon className="size-5 text-muted-foreground" />
                      </div>
                    ),
                  )}
                </div>
              </CardPanel>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardPanel className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Apple iMac 27-inch (2020) in excellent condition. 3.8GHz 8-core
                  Intel Core i7, 32GB RAM, 1TB SSD, Radeon Pro 5500 XT. Comes
                  with the original box, Magic Keyboard, and Magic Mouse.
                </p>
                <p>
                  Selling because I moved to a laptop-only setup. Collection
                  preferred from Galway city centre; nationwide delivery can be
                  arranged at the buyer&apos;s cost.
                </p>
              </CardPanel>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardDescription>Asking price</CardDescription>
                <CardTitle className="font-semibold text-3xl tabular-nums">
                  €4,200
                </CardTitle>
              </CardHeader>
              <CardPanel className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPinIcon className="size-4" />
                  Galway · Posted 1 day ago
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">New</Badge>
                  <Badge variant="secondary">Electronics</Badge>
                </div>
                <Button
                  className="w-full"
                  onClick={() =>
                    toastManager.add({
                      description: "Messaging is disabled in this demo.",
                      title: "Message sent to seller",
                    })
                  }
                >
                  Contact seller
                </Button>
                <TooltipProvider>
                  <div className="grid grid-cols-4 gap-2">
                    {actions.map((action) => (
                      <Tooltip key={action.label}>
                        <TooltipTrigger
                          render={
                            <Button
                              aria-label={action.label}
                              size="icon"
                              variant="outline"
                            />
                          }
                        >
                          <action.icon />
                        </TooltipTrigger>
                        <TooltipPopup>{action.label}</TooltipPopup>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
              </CardPanel>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seller</CardTitle>
              </CardHeader>
              <CardPanel className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarFallback>NK</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5 leading-tight">
                  <span className="flex items-center gap-1.5 font-medium text-sm">
                    Niamh Kavanagh
                    <ShieldCheckIcon className="size-4 text-success" />
                  </span>
                  <span className="text-muted-foreground text-xs">
                    Member since 2021 · 48 ads
                  </span>
                </div>
              </CardPanel>
              <CardFooter className="text-muted-foreground text-sm">
                Usually responds within 2 hours
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured ads</CardTitle>
              </CardHeader>
              <CardPanel className="space-y-1">
                {featuredAds.map((ad, index) => (
                  <div key={ad.title}>
                    {index > 0 && <Separator className="my-2" />}
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                        <ad.icon className="size-4.5 text-muted-foreground" />
                      </div>
                      <div className="grid gap-0.5 leading-tight">
                        <span className="font-medium text-sm">{ad.title}</span>
                        <span className="text-muted-foreground text-xs">
                          {ad.location}
                        </span>
                      </div>
                      <span className="ms-auto font-medium text-sm tabular-nums">
                        {ad.price}
                      </span>
                    </div>
                  </div>
                ))}
              </CardPanel>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
