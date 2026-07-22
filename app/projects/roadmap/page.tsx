"use client";

import * as React from "react";
import { ProjectsShell } from "@/components/apps/projects-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardPanel, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const quarters = ["Q3 2026", "Q4 2026", "Q1 2027"];

const initiatives = [
  { title: "New marketing site", quarter: 0, progress: 80, status: "On track", team: "Design" },
  { title: "Realtime collaboration", quarter: 0, progress: 45, status: "At risk", team: "Platform" },
  { title: "Mobile app v2", quarter: 1, progress: 20, status: "On track", team: "Mobile" },
  { title: "Billing overhaul", quarter: 1, progress: 10, status: "Planned", team: "Payments" },
  { title: "AI assistant", quarter: 2, progress: 0, status: "Planned", team: "AI" },
  { title: "Enterprise SSO", quarter: 2, progress: 0, status: "Planned", team: "Security" },
];

const statusMeta: Record<string, "success" | "warning" | "secondary"> = {
  "On track": "success",
  "At risk": "warning",
  Planned: "secondary",
};

export default function RoadmapPage() {
  const [view, setView] = React.useState<string[]>(["timeline"]);
  const isTimeline = view.includes("timeline");

  return (
    <ProjectsShell
      title="Roadmap"
      actions={
        <ToggleGroup
          onValueChange={(value) => value.length && setView(value)}
          value={view}
        >
          <ToggleGroupItem value="timeline">Timeline</ToggleGroupItem>
          <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
        </ToggleGroup>
      }
    >
      {isTimeline ? (
        <div className="grid gap-4 lg:grid-cols-3">
          {quarters.map((quarter, qi) => (
            <div className="flex flex-col gap-3" key={quarter}>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm">{quarter}</h3>
                <Badge size="sm" variant="secondary">
                  {initiatives.filter((i) => i.quarter === qi).length}
                </Badge>
              </div>
              {initiatives
                .filter((i) => i.quarter === qi)
                .map((initiative) => (
                  <Card key={initiative.title}>
                    <CardHeader className="gap-2 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-sm">{initiative.title}</CardTitle>
                        <Badge size="sm" variant={statusMeta[initiative.status]}>
                          {initiative.status}
                        </Badge>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${initiative.progress}%` }}
                        />
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {initiative.team} · {initiative.progress}%
                      </span>
                    </CardHeader>
                  </Card>
                ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {initiatives.map((initiative) => (
            <Card key={initiative.title}>
              <CardHeader className="gap-2">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{initiative.title}</CardTitle>
                  <Badge size="sm" variant={statusMeta[initiative.status]}>
                    {initiative.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  {quarters[initiative.quarter]} · {initiative.team}
                </p>
              </CardHeader>
              <CardPanel>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${initiative.progress}%` }}
                  />
                </div>
              </CardPanel>
            </Card>
          ))}
        </div>
      )}
    </ProjectsShell>
  );
}
