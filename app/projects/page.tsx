import {
  CircleDotIcon,
  GitPullRequestIcon,
  PlusIcon,
  TimerIcon,
} from "lucide-react";
import Link from "next/link";
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
import {
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame";
import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { activity, issues, priorityMeta } from "@/lib/apps-data";

const stats = [
  { icon: CircleDotIcon, label: "Open issues", value: "24" },
  { icon: TimerIcon, label: "In progress", value: "6" },
  { icon: GitPullRequestIcon, label: "In review", value: "3" },
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
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardDescription className="flex items-center gap-1.5">
                <stat.icon className="size-3.5" />
                {stat.label}
              </CardDescription>
              <CardTitle className="font-semibold text-2xl tabular-nums">
                {stat.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Frame className="lg:col-span-2">
          <FrameHeader>
            <FrameTitle>Sprint 24 — Website relaunch</FrameTitle>
            <FrameDescription>Jul 15 – Jul 29 · 5 days remaining</FrameDescription>
          </FrameHeader>
          <FramePanel className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Completion</span>
              <span className="font-medium tabular-nums">
                {done}/{issues.length} issues
              </span>
            </div>
            <Progress value={(done / issues.length) * 100}>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { label: "Committed", value: "36 pts" },
                { label: "Completed", value: "18 pts" },
                { label: "Velocity", value: "22 pts" },
              ].map((item) => (
                <div className="rounded-xl border p-3" key={item.label}>
                  <p className="text-muted-foreground text-xs">{item.label}</p>
                  <p className="font-semibold text-lg tabular-nums">{item.value}</p>
                </div>
              ))}
            </div>
          </FramePanel>
          <FrameFooter>
            <Button render={<Link href="/projects/sprint" />} size="sm" variant="outline">
              View sprint board
            </Button>
          </FrameFooter>
        </Frame>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardPanel className="space-y-1">
            {activity.slice(0, 4).map((item, index) => (
              <div key={index}>
                {index > 0 && <Separator className="my-2.5" />}
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

      <Card>
        <CardHeader>
          <CardTitle>My issues</CardTitle>
          <CardDescription>Assigned to you across the project.</CardDescription>
        </CardHeader>
        <CardPanel className="space-y-1">
          {issues.slice(0, 5).map((issue, index) => (
            <div key={issue.id}>
              {index > 0 && <Separator className="my-2" />}
              <div className="flex items-center gap-3">
                <span className="font-mono text-muted-foreground text-xs">
                  {issue.id}
                </span>
                <span className="flex-1 text-sm">{issue.title}</span>
                <Badge size="sm" variant={priorityMeta[issue.priority].variant}>
                  {issue.priority}
                </Badge>
                <Badge size="sm" variant="outline">
                  {issue.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardPanel>
      </Card>
    </ProjectsShell>
  );
}
