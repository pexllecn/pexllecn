import { FlagIcon } from "lucide-react";
import { ProjectsShell } from "@/components/apps/projects-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { issues, priorityMeta } from "@/lib/apps-data";

const statusMeta: Record<string, "secondary" | "info" | "warning" | "success"> = {
  Backlog: "secondary",
  Todo: "secondary",
  "In Progress": "warning",
  "In Review": "info",
  Done: "success",
};

const burndown = [36, 33, 30, 28, 22, 20, 18];

export default function SprintPage() {
  const done = issues.filter((i) => i.status === "Done").length;

  return (
    <ProjectsShell
      title="Sprint 24"
      actions={
        <Button size="sm" variant="outline">
          <FlagIcon />
          Complete sprint
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription>
              {done} of {issues.length} issues done
            </CardDescription>
          </CardHeader>
          <CardPanel>
            <Progress value={(done / issues.length) * 100}>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          </CardPanel>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Burndown</CardTitle>
            <CardDescription>Remaining points per day.</CardDescription>
          </CardHeader>
          <CardPanel>
            <div className="flex h-24 items-end gap-2">
              {burndown.map((value, index) => (
                <div className="flex flex-1 flex-col items-center gap-1" key={index}>
                  <div
                    className="w-full rounded-sm bg-primary/80"
                    style={{ height: `${(value / 36) * 100}%` }}
                  />
                  <span className="text-muted-foreground text-[.625rem]">
                    D{index + 1}
                  </span>
                </div>
              ))}
            </div>
          </CardPanel>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sprint issues</CardTitle>
          <CardDescription>Everything committed to Sprint 24.</CardDescription>
        </CardHeader>
        <CardPanel className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-mono text-muted-foreground text-xs">
                    {issue.id}
                  </TableCell>
                  <TableCell className="font-medium">{issue.title}</TableCell>
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
                  <TableCell className="text-right tabular-nums">
                    {issue.points}
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
