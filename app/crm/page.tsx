import {
  ArrowUpRightIcon,
  DollarSignIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { AreaChart } from "@/components/charts/area-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { StatTile, type Stat } from "@/components/apps/stat-tile";
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
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame";
import { Meter, MeterIndicator, MeterLabel, MeterTrack } from "@/components/ui/meter";
import { Separator } from "@/components/ui/separator";
import { deals, formatCurrency, leads, stageMeta } from "@/lib/apps-data";

const stats: Stat[] = [
  { icon: DollarSignIcon, label: "Pipeline value", value: "€224,600", delta: "12.4%", trend: "up", spark: [40, 44, 42, 50, 55, 53, 62, 68, 66, 74, 80, 88] },
  { icon: TargetIcon, label: "Win rate", value: "48%", delta: "3.1%", trend: "up", spark: [38, 40, 39, 42, 41, 44, 45, 43, 46, 47, 46, 48] },
  { icon: UsersIcon, label: "Active leads", value: "128", delta: "18", trend: "up", spark: [90, 96, 102, 98, 110, 116, 112, 120, 118, 124, 126, 128] },
  { icon: TrendingUpIcon, label: "Avg. deal size", value: "€26,400", delta: "5.2%", trend: "up", spark: [20, 22, 21, 24, 23, 25, 26, 24, 25, 26, 25, 26] },
];

const pipeline = [
  { label: "Jan", value: 142000 },
  { label: "Feb", value: 158000 },
  { label: "Mar", value: 149000 },
  { label: "Apr", value: 176000 },
  { label: "May", value: 168000 },
  { label: "Jun", value: 194000 },
  { label: "Jul", value: 224600 },
];

const byStage = [
  { label: "Qualified", value: 33500, color: "var(--color-blue-500)" },
  { label: "Proposal", value: 56800, color: "var(--color-violet-500)" },
  { label: "Negotiation", value: 88000, color: "var(--color-amber-500)" },
  { label: "Won", value: 18800, color: "var(--color-emerald-500)" },
];

const quota = [
  { name: "Khaled", closed: 82000, target: 100000 },
  { name: "Sara", closed: 61000, target: 90000 },
  { name: "Amir", closed: 44500, target: 80000 },
];

export default function CrmDashboard() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-xs/5 animate-rise">
        <div
          aria-hidden="true"
          className="-right-24 -top-24 absolute size-64 rounded-full accent-gradient opacity-[0.12] blur-2xl"
        />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div className="grid gap-1.5">
            <span className="text-muted-foreground text-sm">Good morning, Khaled</span>
            <h2 className="font-heading font-semibold text-3xl tracking-tight">
              Your pipeline is up{" "}
              <span className="accent-blue text-gradient">12.4%</span> this month
            </h2>
          </div>
          <Button render={<Link href="/crm/leads" />}>
            View all leads
            <ArrowUpRightIcon />
          </Button>
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
            <CardTitle>Pipeline value</CardTitle>
            <CardDescription>Total open pipeline over the year.</CardDescription>
          </CardHeader>
          <CardPanel>
            <AreaChart data={pipeline} valuePrefix="€" />
          </CardPanel>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Value by stage</CardTitle>
            <CardDescription>Where your pipeline sits.</CardDescription>
          </CardHeader>
          <CardPanel>
            <DonutChart
              centerLabel="pipeline"
              centerValue="€197k"
              data={byStage}
            />
          </CardPanel>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Frame className="lg:col-span-2">
          <FrameHeader>
            <FrameTitle>Rep quota attainment</FrameTitle>
            <FrameDescription>Closed vs. target this quarter.</FrameDescription>
          </FrameHeader>
          <FramePanel className="space-y-5">
            {quota.map((rep) => (
              <Meter key={rep.name} max={rep.target} value={rep.closed}>
                <div className="flex items-center justify-between gap-2">
                  <MeterLabel className="font-medium text-sm">{rep.name}</MeterLabel>
                  <span className="text-muted-foreground text-sm tabular-nums">
                    {formatCurrency(rep.closed)} / {formatCurrency(rep.target)}
                  </span>
                </div>
                <MeterTrack>
                  <MeterIndicator style={{ background: "var(--accent-solid)" }} />
                </MeterTrack>
              </Meter>
            ))}
          </FramePanel>
        </Frame>

        <Card>
          <CardHeader>
            <CardTitle>Recent leads</CardTitle>
            <CardDescription>Latest additions.</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-1">
            {leads.slice(0, 5).map((lead, index) => (
              <div key={lead.id}>
                {index > 0 && <Separator className="my-2" />}
                <Link
                  className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent/60"
                  href="/crm/lead-detail"
                >
                  <Avatar className="size-8">
                    <AvatarFallback>{lead.initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 leading-tight">
                    <span className="font-medium text-sm">{lead.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {lead.company}
                    </span>
                  </div>
                  <Badge size="sm" variant={stageMeta[lead.stage].variant}>
                    {lead.stage}
                  </Badge>
                </Link>
              </div>
            ))}
          </CardPanel>
        </Card>
      </div>
    </div>
  );
}
