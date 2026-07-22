"use client";

import { PlusIcon } from "lucide-react";
import { ProjectsShell } from "@/components/apps/projects-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { issues, type Issue, priorityMeta } from "@/lib/apps-data";

const columns: Issue["status"][] = ["Backlog", "Todo", "In Progress", "In Review", "Done"];

function IssueCard({ issue }: { issue: Issue }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        render={<Card className="cursor-default transition-colors hover:bg-accent/50" />}
      >
        <CardHeader className="gap-2 p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-muted-foreground text-xs">{issue.id}</span>
            <Badge size="sm" variant={priorityMeta[issue.priority].variant}>
              {issue.priority}
            </Badge>
          </div>
          <CardTitle className="text-sm leading-snug">{issue.title}</CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {issue.labels.map((label) => (
                <Badge key={label} size="sm" variant="outline">
                  {label}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs">{issue.points} pts</span>
              <Avatar className="size-6">
                <AvatarFallback className="text-[.625rem]">
                  {issue.initials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardHeader>
      </ContextMenuTrigger>
      <ContextMenuPopup>
        <ContextMenuItem>
          Open issue
          <ContextMenuShortcut>↵</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuGroupLabel>Priority</ContextMenuGroupLabel>
          <ContextMenuRadioGroup value={issue.priority}>
            {(["Urgent", "High", "Medium", "Low"] as const).map((p) => (
              <ContextMenuRadioItem key={p} value={p}>
                {p}
              </ContextMenuRadioItem>
            ))}
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Watching</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete issue</ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenu>
  );
}

export default function BoardPage() {
  return (
    <ProjectsShell
      title="Board"
      actions={
        <Button size="sm">
          <PlusIcon />
          Add issue
        </Button>
      }
    >
      <p className="text-muted-foreground text-sm">
        Right-click any card to change priority or delete.
      </p>
      <ScrollArea className="flex-1">
        <div className="flex gap-4 pb-4">
          {columns.map((column) => {
            const columnIssues = issues.filter((i) => i.status === column);
            return (
              <div className="flex w-72 shrink-0 flex-col gap-3" key={column}>
                <div className="flex items-center justify-between px-1">
                  <span className="font-medium text-sm">{column}</span>
                  <Badge size="sm" variant="secondary">
                    {columnIssues.length}
                  </Badge>
                </div>
                <div className="flex flex-col gap-3">
                  {columnIssues.map((issue) => (
                    <IssueCard issue={issue} key={issue.id} />
                  ))}
                  {columnIssues.length === 0 && (
                    <div className="rounded-xl border border-dashed py-8 text-center text-muted-foreground text-xs">
                      No issues
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </ProjectsShell>
  );
}
