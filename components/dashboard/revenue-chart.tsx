"use client";

import { BarChart } from "@/components/charts/bar-chart";

const data = [
  { label: "Jan", value: 4200 },
  { label: "Feb", value: 3100 },
  { label: "Mar", value: 5300 },
  { label: "Apr", value: 4600 },
  { label: "May", value: 3900 },
  { label: "Jun", value: 5900 },
  { label: "Jul", value: 5100 },
  { label: "Aug", value: 4400 },
  { label: "Sep", value: 6200 },
  { label: "Oct", value: 5600 },
  { label: "Nov", value: 4800 },
  { label: "Dec", value: 6800 },
];

export function RevenueChart() {
  return <BarChart data={data} height={280} valuePrefix="$" />;
}
