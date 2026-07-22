"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type DonutSlice = { label: string; value: number; color: string };

export function DonutChart({
  data,
  size = 180,
  thickness = 18,
  centerLabel,
  centerValue,
  className,
}: {
  data: DonutSlice[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
  className?: string;
}) {
  const [hover, setHover] = React.useState<number | null>(null);
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const gap = 1.5; // percent gap between slices
  let offset = 0;

  return (
    <div className={cn("flex flex-wrap items-center gap-6", className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg height={size} viewBox={`0 0 ${size} ${size}`} width={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            fill="none"
            r={radius}
            stroke="var(--muted)"
            strokeWidth={thickness}
          />
          {data.map((slice, i) => {
            const pct = (slice.value / total) * 100;
            const dash = (Math.max(0, pct - gap) / 100) * circumference;
            const rest = circumference - dash;
            const el = (
              <circle
                cx={size / 2}
                cy={size / 2}
                fill="none"
                key={slice.label}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                r={radius}
                stroke={slice.color}
                strokeDasharray={`${dash} ${rest}`}
                strokeDashoffset={-((offset / 100) * circumference)}
                strokeLinecap="round"
                strokeWidth={hover === i ? thickness + 3 : thickness}
                style={{
                  transform: `rotate(-90deg)`,
                  transformOrigin: "center",
                  transition: "stroke-width 0.2s ease, opacity 0.2s ease",
                  opacity: hover === null || hover === i ? 1 : 0.45,
                }}
              />
            );
            offset += pct;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-semibold text-xl tracking-tight">
            {hover !== null
              ? `${Math.round((data[hover].value / total) * 100)}%`
              : centerValue}
          </span>
          <span className="text-muted-foreground text-xs">
            {hover !== null ? data[hover].label : centerLabel}
          </span>
        </div>
      </div>

      <div className="grid gap-2">
        {data.map((slice, i) => (
          <button
            className="flex cursor-default items-center gap-2 text-left outline-none"
            key={slice.label}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            style={{ opacity: hover === null || hover === i ? 1 : 0.5 }}
            type="button"
          >
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ background: slice.color }}
            />
            <span className="text-sm">{slice.label}</span>
            <span className="ms-auto ps-4 font-medium text-muted-foreground text-sm tabular-nums">
              {Math.round((slice.value / total) * 100)}%
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
