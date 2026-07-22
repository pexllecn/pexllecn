"use client";

import * as React from "react";
import { FinanceShell } from "@/components/apps/finance-shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const spendByCategory = [
  { name: "Payroll", value: 28400, color: "bg-chart-1" },
  { name: "Office & Rent", value: 4400, color: "bg-chart-2" },
  { name: "Software", value: 1840, color: "bg-chart-3" },
  { name: "Travel", value: 3120, color: "bg-chart-4" },
  { name: "Other", value: 1200, color: "bg-chart-5" },
];

const series = {
  "3m": [62, 48, 70, 65, 82, 60, 75, 68, 90, 84, 78, 92],
  "6m": [40, 55, 48, 62, 58, 70, 65, 74, 80, 76, 88, 94],
  "12m": [30, 42, 38, 50, 46, 58, 62, 55, 68, 72, 80, 90],
};

export default function AnalyticsPage() {
  const [range, setRange] = React.useState<string[]>(["6m"]);
  const key = (range[0] ?? "6m") as keyof typeof series;
  const total = spendByCategory.reduce((sum, c) => sum + c.value, 0);

  return (
    <FinanceShell
      title="Analytics"
      actions={
        <ToggleGroup
          onValueChange={(value) => value.length && setRange(value)}
          value={range}
        >
          <ToggleGroupItem value="3m">3M</ToggleGroupItem>
          <ToggleGroupItem value="6m">6M</ToggleGroupItem>
          <ToggleGroupItem value="12m">12M</ToggleGroupItem>
        </ToggleGroup>
      }
    >
      <Tabs defaultValue="cashflow">
        <TabsList>
          <TabsTab value="cashflow">Cash flow</TabsTab>
          <TabsTab value="spending">Spending</TabsTab>
        </TabsList>

        <TabsPanel className="pt-4" value="cashflow">
          <Card>
            <CardHeader>
              <CardTitle>Net cash flow</CardTitle>
              <CardDescription>
                Showing the last {key.replace("m", " months")}.
              </CardDescription>
            </CardHeader>
            <CardPanel>
              <div className="flex h-64 items-end gap-2">
                {series[key].map((value, index) => (
                  <div className="flex flex-1 flex-col items-center gap-2" key={index}>
                    <div
                      className="w-full rounded-md bg-primary"
                      style={{ height: `${value}%` }}
                    />
                    <span className="text-muted-foreground text-[.625rem]">
                      {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </CardPanel>
          </Card>
        </TabsPanel>

        <TabsPanel className="pt-4" value="spending">
          <Card>
            <CardHeader>
              <CardTitle>Spending by category</CardTitle>
              <CardDescription>Total €{total.toLocaleString()} this month.</CardDescription>
            </CardHeader>
            <CardPanel className="space-y-4">
              <div className="flex h-3 overflow-hidden rounded-full">
                {spendByCategory.map((cat) => (
                  <div
                    className={cat.color}
                    key={cat.name}
                    style={{ width: `${(cat.value / total) * 100}%` }}
                  />
                ))}
              </div>
              <div className="space-y-1">
                {spendByCategory.map((cat, index) => (
                  <div key={cat.name}>
                    {index > 0 && <Separator className="my-2" />}
                    <div className="flex items-center gap-3">
                      <span className={`size-3 rounded-full ${cat.color}`} />
                      <span className="flex-1 text-sm">{cat.name}</span>
                      <Badge size="sm" variant="secondary">
                        {Math.round((cat.value / total) * 100)}%
                      </Badge>
                      <span className="w-20 text-right font-medium text-sm tabular-nums">
                        €{cat.value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardPanel>
          </Card>
        </TabsPanel>
      </Tabs>
    </FinanceShell>
  );
}
