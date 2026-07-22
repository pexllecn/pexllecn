"use client";

import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const data = [
  { month: "Jan", value: 4200 },
  { month: "Feb", value: 3100 },
  { month: "Mar", value: 5300 },
  { month: "Apr", value: 4600 },
  { month: "May", value: 3900 },
  { month: "Jun", value: 5900 },
  { month: "Jul", value: 5100 },
  { month: "Aug", value: 4400 },
  { month: "Sep", value: 6200 },
  { month: "Oct", value: 5600 },
  { month: "Nov", value: 4800 },
  { month: "Dec", value: 6800 },
];

const max = Math.max(...data.map((d) => d.value));

export function RevenueChart() {
  return (
    <TooltipProvider>
      <div className="flex h-72 items-end gap-2 sm:gap-3">
        {data.map((d) => (
          <div
            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
            key={d.month}
          >
            <Tooltip>
              <TooltipTrigger
                render={
                  <div
                    aria-label={`${d.month}: $${d.value.toLocaleString()}`}
                    className="w-full rounded-md bg-primary transition-opacity hover:opacity-80"
                    role="img"
                    style={{ height: `${(d.value / max) * 100}%` }}
                    tabIndex={0}
                  />
                }
              />
              <TooltipPopup side="top">
                ${d.value.toLocaleString()}
              </TooltipPopup>
            </Tooltip>
            <span className="text-muted-foreground text-xs">{d.month}</span>
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
