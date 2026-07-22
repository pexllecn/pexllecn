"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type BarPoint = { label: string; value: number };

export function BarChart({
  data,
  height = 240,
  color = "var(--accent-solid)",
  valuePrefix = "",
  className,
}: {
  data: BarPoint[];
  height?: number;
  color?: string;
  valuePrefix?: string;
  className?: string;
}) {
  const id = React.useId();
  const [hover, setHover] = React.useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.value)) || 1;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="flex items-end gap-1.5 sm:gap-2.5" style={{ height }}>
        {data.map((d, i) => (
          <button
            className="group relative flex h-full flex-1 cursor-default flex-col items-center justify-end gap-2 outline-none"
            key={d.label}
            onBlur={() => setHover(null)}
            onFocus={() => setHover(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            type="button"
          >
            <span
              className="w-full max-w-6 rounded-t-[4px] transition-[filter,opacity] duration-200"
              style={{
                background: `linear-gradient(180deg, ${color}, color-mix(in srgb, ${color} 62%, transparent))`,
                height: `${(d.value / max) * 100}%`,
                opacity: hover === null || hover === i ? 1 : 0.4,
              }}
            />
            <span className="text-muted-foreground text-[.625rem] sm:text-xs">
              {d.label}
            </span>
            {hover === i && (
              <span className="-translate-x-1/2 pointer-events-none absolute bottom-[calc(100%-14px)] left-1/2 z-10 whitespace-nowrap rounded-lg border bg-popover px-2.5 py-1.5 text-popover-foreground shadow-xs">
                <span className="block font-medium text-xs">{d.label}</span>
                <span className="block font-semibold text-sm tabular-nums">
                  {valuePrefix}
                  {d.value.toLocaleString()}
                </span>
              </span>
            )}
          </button>
        ))}
      </div>
      <span className="sr-only" id={`bar-${id}`}>
        Bar chart
      </span>
    </div>
  );
}
