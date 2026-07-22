import {
  CircleDotIcon,
  GaugeIcon,
  GitPullRequestIcon,
  PlusIcon,
  TimerIcon,
} from "lucide-react";
import Link from "next/link";
import { AreaChart } from "@/components/charts/area-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { StatTile, type Stat } from "@/components/apps/stat-tile";
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
import { Separator } from "@/components/ui/separator";
import { activity, issues, priorityMeta } from "@/lib/apps-data";

const stats: Stat[] = [
  { icon: CircleDotIcon, label: "Open issues", value: "24", delta: "6", trend: "down", spark: [30, 29, 31, 28, 27, 26, 27, 25, 26, 25, 24, 24] },
  { icon: TimerIcon, label: "In progress", value: "6", delta: "2", trend: "up", spark: [3, 4, 3, 5, 4, 5, 6, 5, 6, 5, 6, 6] },
  { icon: GitPullRequestIcon, label: "In review", value: "3", delta: "1", trend: "up", spark: [1, 2, 1, 2, 3, 2, 3, 2, 3, 3, 2, 3] },
  { icon: GaugeIcon, label: "Velocity", value: "22 pts", delta: "9%", trend: "up", spark: [14, 16, 15, 18, 17, 19, 20, 18, 21, 20, 22, 22] },
];

const velocity = [
  { label: "S18", value: 16 },
  { label: "S19", value: 19 },
  { label: "S20", value: 17 },
  { label: "S21", value: 22 },
  { label: "S22", value: 20 },
  { label: "S23", value: 24 },
  { label: "S24", value: 22 },
];

const byType = [
  { label: "Feature", value: 3, color: "var(--color-violet-500)" },
  { label: "Bug", value: 3, color: "var(--color-rose-500)" },
  { label: "Chore", value: 2, color: "var(--color-sky-500)" },
];

export default function ProjectsOverview() {
  const done = issues.filter((i) => i.status === "Done").length;

  return (
    <ProjectsShell
      title="Overview"
      actions={
        <Button size="sm">
          <PlusIcon />
          New issue
        </Button>
      }
    >
      <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-xs/5 animate-rise">
        <div
          aria-hidden="true"
          className="-right-24 -top-24 absolute size-64 rounded-full accent-gradient opacity-[0.12] blur-2xl"
        />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="grid gap-1.5">
            <span className="text-muted-foreground text-sm">Sprint 24 · Website relaunch</span>
            <h2 className="font-heading font-semibold text-3xl tracking-tight">
              <span className="accent-violet text-gradient">5 days</span> left,{" "}
              {done}/{issues.length} issues done
            </h2>
          </div>
          <div className="w-full max-w-xs">
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="text-muted-foreground">Completion</span>
              <span className="font-medium tabular-nums">
                {Math.round((done / issues.length) * 100)}%
              </span>
            </div>
            <Progress value={(done / issues.length) * 100}>
              <ProgressTrack>
                <ProgressIndicator style={{ background: "var(--accent-solid)" }} />
              </ProgressTrack>
            </Progress>
          </div>
        </div>
      </div>

      <div className="grid gap-4 stagger sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatTile key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Velocity</CardTitle>
            <CardDescription>Story points completed per sprint.</CardDescription>
          </CardHeader>
          <CardPanel>
            <AreaChart data={velocity} valuePrefix="" />
          </CardPanel>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Issues by type</CardTitle>
            <CardDescription>Current sprint breakdown.</CardDescription>
          </CardHeader>
          <CardPanel>
            <DonutChart centerLabel="issues" centerValue="8" data={byType} />
          </CardPanel>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My issues</CardTitle>
            <CardDescription>Assigned across the project.</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-1">
            {issues.slice(0, 5).map((issue, index) => (
              <div key={issue.id}>
                {index > 0 && <Separator className="my-2" />}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-muted-foreground text-xs">
                    {issue.id}
                  </span>
                  <span className="flex-1 truncate text-sm">{issue.title}</span>
                  <Badge size="sm" variant={priorityMeta[issue.priority].variant}>
                    {issue.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </CardPanel>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              <Link className="underline-offset-4 hover:underline" href="/projects/activity">
                View all
              </Link>
            </CardDescription>
          </CardHeader>
          <CardPanel className="space-y-1">
            {activity.slice(0, 5).map((item, index) => (
              <div key={index}>
                {index > 0 && <Separator className="my-2" />}
                <div className="flex items-start gap-3">
                  <Avatar className="size-7">
                    <AvatarFallback className="text-xs">
                      {item.initials}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm leading-snug">
                    <span className="font-medium">{item.who}</span>{" "}
                    <span className="text-muted-foreground">
                      {item.action} {item.target}
                    </span>
                    <span className="block text-muted-foreground text-xs">
                      {item.time}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </CardPanel>
        </Card>
      </div>
    </ProjectsShell>
  );
}
