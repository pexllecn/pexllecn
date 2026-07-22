"use client";

import { PlusIcon } from "lucide-react";
import * as React from "react";
import { ProjectsShell } from "@/components/apps/projects-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardPanel } from "@/components/ui/card";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/components/ui/combobox";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { issues, priorityMeta } from "@/lib/apps-data";

const assigneeItems = [
  { label: "All assignees", value: null },
  ...Array.from(new Set(issues.map((i) => i.assignee))).map((name) => ({
    label: name,
    value: name,
  })),
];

const statusMeta: Record<string, "secondary" | "info" | "warning" | "success"> = {
  Backlog: "secondary",
  Todo: "secondary",
  "In Progress": "warning",
  "In Review": "info",
  Done: "success",
};

export default function IssuesPage() {
  const [assignee, setAssignee] = React.useState<string | null>(null);

  const filtered = assignee
    ? issues.filter((i) => i.assignee === assignee)
    : issues;

  return (
    <ProjectsShell
      title="Issues"
      actions={
        <Button size="sm">
          <PlusIcon />
          New issue
        </Button>
      }
    >
      <Card>
        <CardPanel className="max-w-xs pt-6 pb-2">
          <Field>
            <FieldLabel>Filter by assignee</FieldLabel>
            <Combobox
              items={assigneeItems}
              onValueChange={(value: { label: string; value: string | null } | null) =>
                setAssignee(value?.value ?? null)
              }
            >
              <ComboboxInput placeholder="Select assignee…" />
              <ComboboxPopup>
                <ComboboxEmpty>No assignees found.</ComboboxEmpty>
                <ComboboxList>
                  {(item: { label: string; value: string | null }) => (
                    <ComboboxItem key={item.label} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxPopup>
            </Combobox>
          </Field>
        </CardPanel>
        <CardPanel className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-mono text-muted-foreground text-xs">
                    {issue.id}
                  </TableCell>
                  <TableCell className="font-medium">{issue.title}</TableCell>
                  <TableCell className="text-muted-foreground">{issue.type}</TableCell>
                  <TableCell>
                    <Badge size="sm" variant={priorityMeta[issue.priority].variant}>
                      {issue.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge size="sm" variant={statusMeta[issue.status]}>
                      {issue.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarFallback className="text-[.625rem]">
                          {issue.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground text-sm">
                        {issue.assignee}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardPanel>
      </Card>
    </ProjectsShell>
  );
}
