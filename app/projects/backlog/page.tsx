"use client";

import { ChevronDownIcon, PlusIcon } from "lucide-react";
import * as React from "react";
import { ProjectsShell } from "@/components/apps/projects-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardPanel } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
import { Separator } from "@/components/ui/separator";
import { issues, type Issue, priorityMeta } from "@/lib/apps-data";

const groups: { label: string; status: Issue["status"][] }[] = [
  { label: "Backlog", status: ["Backlog"] },
  { label: "Todo", status: ["Todo"] },
  { label: "Active", status: ["In Progress", "In Review"] },
];

function BacklogGroup({ label, status }: { label: string; status: Issue["status"][] }) {
  const groupIssues = issues.filter((i) => status.includes(i.status));
  const points = groupIssues.reduce((sum, i) => sum + i.points, 0);

  return (
    <Card>
      <CardPanel className="p-2">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-2 outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring data-panel-open:[&_svg]:rotate-0 [&_svg]:-rotate-90 [&_svg]:transition-transform">
            <ChevronDownIcon className="size-4 text-muted-foreground" />
            <span className="font-medium text-sm">{label}</span>
            <Badge size="sm" variant="secondary">
              {groupIssues.length}
            </Badge>
            <span className="ms-auto text-muted-foreground text-xs">
              {points} points
            </span>
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div className="pt-1">
              {groupIssues.map((issue, index) => (
                <div key={issue.id}>
                  {index > 0 && <Separator />}
                  <div className="flex items-center gap-3 px-2 py-2.5">
                    <Checkbox aria-label={`Select ${issue.id}`} />
                    <span className="font-mono text-muted-foreground text-xs">
                      {issue.id}
                    </span>
                    <span className="flex-1 truncate text-sm">{issue.title}</span>
                    <Badge size="sm" variant={priorityMeta[issue.priority].variant}>
                      {issue.priority}
                    </Badge>
                    <Avatar className="size-6">
                      <AvatarFallback className="text-[.625rem]">
                        {issue.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              ))}
            </div>
          </CollapsiblePanel>
        </Collapsible>
      </CardPanel>
    </Card>
  );
}

export default function BacklogPage() {
  return (
    <ProjectsShell
      title="Backlog"
      actions={
        <Button size="sm">
          <PlusIcon />
          New issue
        </Button>
      }
    >
      <Card>
        <CardPanel className="flex flex-wrap items-center justify-between gap-4 pt-6">
          <div className="grid gap-1">
            <span className="font-medium text-sm">Sprint capacity</span>
            <span className="text-muted-foreground text-sm">
              Points the team can commit to this sprint.
            </span>
          </div>
          <NumberField defaultValue={36} min={0} max={100} step={2}>
            <NumberFieldGroup>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldGroup>
          </NumberField>
        </CardPanel>
      </Card>

      {groups.map((group) => (
        <BacklogGroup key={group.label} label={group.label} status={group.status} />
      ))}
    </ProjectsShell>
  );
}
