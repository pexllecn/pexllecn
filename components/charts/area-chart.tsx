"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type AreaPoint = { label: string; value: number };

function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cx = (p0.x + p1.x) / 2;
    d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

export function AreaChart({
  data,
  height = 240,
  color = "var(--accent-solid)",
  valuePrefix = "",
  className,
}: {
  data: AreaPoint[];
  height?: number;
  color?: string;
  valuePrefix?: string;
  className?: string;
}) {
  const id = React.useId();
  const [hover, setHover] = React.useState<number | null>(null);
  const width = 720;
  const padX = 12;
  const padTop = 16;
  const padBottom = 28;
  const plotH = height - padTop - padBottom;
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(0, ...data.map((d) => d.value));
  const range = max - min || 1;

  const points = data.map((d, i) => ({
    x: padX + (i / (data.length - 1)) * (width - padX * 2),
    y: padTop + plotH - ((d.value - min) / range) * plotH,
    ...d,
  }));
  const line = smoothPath(points);
  const area = `${line} L ${points[points.length - 1].x} ${padTop + plotH} L ${points[0].x} ${padTop + plotH} Z`;
  const gridValues = [0, 0.25, 0.5, 0.75, 1];

  const active = hover !== null ? points[hover] : null;

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        className="w-full"
        height={height}
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * width;
          const idx = Math.round(
            ((x - padX) / (width - padX * 2)) * (data.length - 1),
          );
          setHover(Math.max(0, Math.min(data.length - 1, idx)));
        }}
        preserveAspectRatio="none"
        role="img"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id={`area-${id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {gridValues.map((g) => (
          <line
            key={g}
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1={padX}
            x2={width - padX}
            y1={padTop + plotH - g * plotH}
            y2={padTop + plotH - g * plotH}
          />
        ))}
        <path d={area} fill={`url(#area-${id})`} />
        <path
          d={line}
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {active && (
          <>
            <line
              stroke={color}
              strokeDasharray="3 3"
              strokeOpacity="0.5"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1={active.x}
              x2={active.x}
              y1={padTop}
              y2={padTop + plotH}
            />
            <circle
              cx={active.x}
              cy={active.y}
              fill="var(--card)"
              r="5"
              stroke={color}
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />
          </>
        )}
      </svg>

      <div className="mt-1 flex justify-between px-3 text-muted-foreground text-xs">
        {data.map((d, i) => (
          <span
            className={cn(
              i % Math.ceil(data.length / 12) !== 0 && "hidden sm:inline",
            )}
            key={d.label}
          >
            {d.label}
          </span>
        ))}
      </div>

      {active && (
        <div
          className="pointer-events-none absolute z-10 flex -translate-x-1/2 flex-col items-center"
          style={{
            left: `${(active.x / width) * 100}%`,
            top: `${(active.y / height) * 100}%`,
          }}
        >
          <div className="-translate-y-[calc(100%+10px)] whitespace-nowrap rounded-lg border bg-popover px-2.5 py-1.5 text-popover-foreground shadow-xs">
            <div className="font-medium text-xs">{active.label}</div>
            <div className="font-semibold text-sm tabular-nums">
              {valuePrefix}
              {active.value.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
