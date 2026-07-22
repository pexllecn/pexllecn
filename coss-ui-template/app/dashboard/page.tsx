"use client";

import { CalendarPlusIcon, ChartSplineIcon, DownloadIcon } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toastManager } from "@/components/ui/toast";

function ComingSoon({ title }: { title: string }) {
  return (
    <Empty className="min-h-72 rounded-2xl border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ChartSplineIcon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>
          This section is part of the template — replace it with your own
          content.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader breadcrumbs={[{ label: "Dashboard" }]} />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-heading font-semibold text-2xl tracking-tight">
            Welcome back 👋
          </h1>
          <div className="flex items-center gap-2">
            <Button
              onClick={() =>
                toastManager.add({
                  description: "Sunday, December 03 at 9:00 AM",
                  title: "Event has been created",
                })
              }
              variant="outline"
            >
              <CalendarPlusIcon />
              Add to calendar
            </Button>
            <Dialog>
              <DialogTrigger render={<Button />}>
                <DownloadIcon />
                Download
              </DialogTrigger>
              <DialogPopup className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Download report</DialogTitle>
                  <DialogDescription>
                    Choose a name for your report. We will email it to you when
                    it is ready.
                  </DialogDescription>
                </DialogHeader>
                <DialogPanel className="space-y-4">
                  <Field>
                    <FieldLabel>Report name</FieldLabel>
                    <Input placeholder="Q4 revenue report" />
                  </Field>
                  <Field>
                    <FieldLabel>Notes</FieldLabel>
                    <Textarea placeholder="Anything we should include?" />
                  </Field>
                </DialogPanel>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>
                    Cancel
                  </DialogClose>
                  <DialogClose
                    render={<Button />}
                    onClick={() =>
                      toastManager.add({
                        description: "We will email you when it is ready.",
                        title: "Report requested",
                      })
                    }
                  >
                    Download
                  </DialogClose>
                </DialogFooter>
              </DialogPopup>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTab value="overview">Overview</TabsTab>
            <TabsTab value="analytics">Analytics</TabsTab>
            <TabsTab value="reports">Reports</TabsTab>
          </TabsList>

          <TabsPanel className="space-y-4 pt-2" value="overview">
            <StatsCards />
            <div className="grid gap-4 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>
                    Monthly revenue for the current year.
                  </CardDescription>
                </CardHeader>
                <CardPanel>
                  <RevenueChart />
                </CardPanel>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardPanel>
                  <RecentSales />
                </CardPanel>
              </Card>
            </div>
          </TabsPanel>

          <TabsPanel className="pt-2" value="analytics">
            <ComingSoon title="No analytics yet" />
          </TabsPanel>
          <TabsPanel className="pt-2" value="reports">
            <ComingSoon title="No reports yet" />
          </TabsPanel>
        </Tabs>
      </div>
    </>
  );
}
