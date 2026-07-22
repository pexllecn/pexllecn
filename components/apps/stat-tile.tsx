import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Sparkline } from "@/components/charts/sparkline";
import { Card, CardPanel } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Stat = {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  spark?: number[];
};

export function StatTile({
  stat,
  className,
}: {
  stat: Stat;
  className?: string;
}) {
  const positive = stat.trend === "up";
  return (
    <Card className={cn("lift overflow-hidden", className)}>
      <CardPanel className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-text)]">
            <stat.icon className="size-4.5" />
          </div>
          {stat.spark && (
            <Sparkline
              className="opacity-90"
              color="var(--accent-solid)"
              data={stat.spark}
            />
          )}
        </div>
        <div className="grid gap-1">
          <span className="text-muted-foreground text-sm">{stat.label}</span>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-2xl tracking-tight">
              {stat.value}
            </span>
            {stat.delta && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-medium text-xs",
                  positive
                    ? "text-success-foreground"
                    : "text-destructive-foreground",
                )}
              >
                {positive ? (
                  <TrendingUpIcon className="size-3.5" />
                ) : (
                  <TrendingDownIcon className="size-3.5" />
                )}
                {stat.delta}
              </span>
            )}
          </div>
        </div>
      </CardPanel>
    </Card>
  );
}
