import {
  ArrowUpRightIcon,
  DollarSignIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
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
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@/components/ui/meter";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deals, formatCurrency, leads, stageMeta } from "@/lib/apps-data";

const stats = [
  { icon: DollarSignIcon, label: "Pipeline value", value: "€224,600", delta: "+12.4%" },
  { icon: TargetIcon, label: "Win rate", value: "48%", delta: "+3.1%" },
  { icon: UsersIcon, label: "Active leads", value: "128", delta: "+18" },
  { icon: TrendingUpIcon, label: "Avg. deal size", value: "€26,400", delta: "+5.2%" },
];

const quota = [
  { name: "Khaled", closed: 82000, target: 100000 },
  { name: "Sara", closed: 61000, target: 90000 },
  { name: "Amir", closed: 44500, target: 80000 },
];

export default function CrmDashboard() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid gap-1">
          <h2 className="font-heading font-semibold text-2xl tracking-tight">
            Sales overview
          </h2>
          <p className="text-muted-foreground text-sm">
            Your pipeline at a glance for July 2026.
          </p>
        </div>
        <Button render={<Link href="/crm/leads" />}>
          View all leads
          <ArrowUpRightIcon />
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
            <CardPanel>
              <Badge variant="success">{stat.delta}</Badge>
            </CardPanel>
          </Card>
        ))}
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
                  <MeterIndicator />
                </MeterTrack>
              </Meter>
            ))}
          </FramePanel>
        </Frame>

        <Card>
          <CardHeader>
            <CardTitle>Closing soon</CardTitle>
            <CardDescription>Deals with the nearest close dates.</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-1">
            {deals.slice(0, 4).map((deal, index) => (
              <div key={deal.id}>
                {index > 0 && <Separator className="my-2.5" />}
                <div className="flex items-center justify-between gap-2">
                  <div className="grid gap-0.5 leading-tight">
                    <span className="font-medium text-sm">{deal.title}</span>
                    <span className="text-muted-foreground text-xs">
                      {deal.company} · {deal.close}
                    </span>
                  </div>
                  <span className="font-medium text-sm tabular-nums">
                    {formatCurrency(deal.value)}
                  </span>
                </div>
              </div>
            ))}
          </CardPanel>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent leads</CardTitle>
          <CardDescription>The latest additions to your pipeline.</CardDescription>
        </CardHeader>
        <CardPanel>
          <TooltipProvider>
            <div className="flex flex-wrap gap-3">
              {leads.slice(0, 6).map((lead) => (
                <Tooltip key={lead.id}>
                  <TooltipTrigger
                    render={
                      <Link
                        className="flex items-center gap-2.5 rounded-xl border p-2.5 pe-4 transition-colors hover:bg-accent/50"
                        href="/crm/lead-detail"
                      />
                    }
                  >
                    <Avatar className="size-9">
                      <AvatarFallback>{lead.initials}</AvatarFallback>
                    </Avatar>
                    <span className="grid gap-0.5 text-left leading-tight">
                      <span className="font-medium text-sm">{lead.name}</span>
                      <Badge size="sm" variant={stageMeta[lead.stage].variant}>
                        {lead.stage}
                      </Badge>
                    </span>
                  </TooltipTrigger>
                  <TooltipPopup>
                    {lead.company} · {formatCurrency(lead.value)}
                  </TooltipPopup>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </CardPanel>
      </Card>
    </div>
  );
}
