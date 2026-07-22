"use client";

import { DownloadIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@/components/ui/meter";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/apps-data";

const ranges = [
  { label: "This quarter", value: "q" },
  { label: "This month", value: "m" },
  { label: "This year", value: "y" },
];

const sources = [
  { name: "Referral", value: 82000, max: 120000 },
  { name: "Website", value: 61000, max: 120000 },
  { name: "Events", value: 44500, max: 120000 },
  { name: "Cold outreach", value: 21000, max: 120000 },
];

const funnel = [
  { stage: "Leads created", count: 420, pct: 100 },
  { stage: "Qualified", count: 236, pct: 56 },
  { stage: "Proposal sent", count: 128, pct: 30 },
  { stage: "Won", count: 61, pct: 15 },
];

const monthly = [40, 62, 51, 73, 68, 90, 84, 96];

export default function ReportsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid gap-1">
          <h2 className="font-heading font-semibold text-2xl tracking-tight">
            Reports
          </h2>
          <p className="text-muted-foreground text-sm">
            Pipeline performance and conversion.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="q" items={ranges}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {ranges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
          <Button variant="outline">
            <DownloadIcon />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="revenue">
        <TabsList>
          <TabsTab value="revenue">Revenue</TabsTab>
          <TabsTab value="sources">Sources</TabsTab>
          <TabsTab value="funnel">Funnel</TabsTab>
        </TabsList>

        <TabsPanel className="pt-4" value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Closed revenue</CardTitle>
              <CardDescription>Monthly won deals for the period.</CardDescription>
            </CardHeader>
            <CardPanel>
              <div className="flex h-56 items-end gap-3">
                {monthly.map((value, index) => (
                  <div className="flex flex-1 flex-col items-center gap-2" key={index}>
                    <div
                      className="w-full rounded-md bg-primary"
                      style={{ height: `${value}%` }}
                    />
                    <span className="text-muted-foreground text-xs">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </CardPanel>
          </Card>
        </TabsPanel>

        <TabsPanel className="pt-4" value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by source</CardTitle>
              <CardDescription>Where your won deals came from.</CardDescription>
            </CardHeader>
            <CardPanel className="space-y-5">
              {sources.map((source) => (
                <Meter key={source.name} max={source.max} value={source.value}>
                  <div className="flex items-center justify-between gap-2">
                    <MeterLabel className="font-medium text-sm">
                      {source.name}
                    </MeterLabel>
                    <span className="text-muted-foreground text-sm tabular-nums">
                      {formatCurrency(source.value)}
                    </span>
                  </div>
                  <MeterTrack>
                    <MeterIndicator />
                  </MeterTrack>
                </Meter>
              ))}
            </CardPanel>
          </Card>
        </TabsPanel>

        <TabsPanel className="pt-4" value="funnel">
          <Card>
            <CardHeader>
              <CardTitle>Conversion funnel</CardTitle>
              <CardDescription>From new lead to closed won.</CardDescription>
            </CardHeader>
            <CardPanel className="space-y-3">
              {funnel.map((step) => (
                <div className="flex items-center gap-4" key={step.stage}>
                  <span className="w-32 text-sm">{step.stage}</span>
                  <div className="h-9 flex-1 overflow-hidden rounded-lg bg-muted">
                    <div
                      className="flex h-full items-center justify-end rounded-lg bg-primary px-3 font-medium text-primary-foreground text-xs"
                      style={{ width: `${step.pct}%` }}
                    >
                      {step.count}
                    </div>
                  </div>
                  <Badge variant="secondary">{step.pct}%</Badge>
                </div>
              ))}
            </CardPanel>
          </Card>
        </TabsPanel>
      </Tabs>
    </div>
  );
}
