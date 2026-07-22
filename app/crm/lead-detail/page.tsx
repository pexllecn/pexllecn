"use client";

import {
  BuildingIcon,
  CalendarIcon,
  CheckCircle2Icon,
  MailIcon,
  PhoneIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";
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
import { Group, GroupSeparator } from "@/components/ui/group";
import { Kbd } from "@/components/ui/kbd";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/components/ui/preview-card";
import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/apps-data";

const timeline = [
  { icon: MailIcon, title: "Proposal sent", detail: "Sent the €41,200 proposal", time: "Today, 09:24" },
  { icon: PhoneIcon, title: "Discovery call", detail: "45 min · discussed fleet needs", time: "Jul 18" },
  { icon: UserIcon, title: "Lead assigned", detail: "Assigned to Khaled", time: "Jul 14" },
  { icon: CheckCircle2Icon, title: "Lead created", detail: "Imported from referral", time: "Jul 12" },
];

const details = [
  { icon: BuildingIcon, label: "Company", value: "Northwind" },
  { icon: MailIcon, label: "Email", value: "olivia@northwind.co" },
  { icon: PhoneIcon, label: "Phone", value: "+353 85 123 4567" },
  { icon: CalendarIcon, label: "Next step", value: "Follow-up Aug 12" },
];

export default function LeadDetailPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarFallback className="text-lg">OM</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-semibold text-2xl tracking-tight">
                Olivia Martin
              </h2>
              <Badge variant="info">Qualified</Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              VP Operations at{" "}
              <PreviewCard>
                <PreviewCardTrigger
                  render={<Button className="h-auto p-0 align-baseline" variant="link" />}
                >
                  Northwind
                </PreviewCardTrigger>
                <PreviewCardPopup>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                        <BuildingIcon className="size-4.5" />
                      </div>
                      <div className="grid leading-tight">
                        <span className="font-medium text-sm">Northwind</span>
                        <span className="text-muted-foreground text-xs">
                          Logistics · Dublin, IE
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      201–500 employees. 3 open deals worth €71,800 combined.
                    </p>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                      <StarIcon className="size-3" /> Tier 1 account
                    </div>
                  </div>
                </PreviewCardPopup>
              </PreviewCard>
            </p>
          </div>
        </div>
        <Group aria-label="Lead actions">
          <Button variant="outline">
            <MailIcon />
            Email
          </Button>
          <GroupSeparator />
          <Button variant="outline">
            <PhoneIcon />
            Call
          </Button>
          <GroupSeparator />
          <Button variant="outline">
            Convert
            <Kbd>⌘↵</Kbd>
          </Button>
        </Group>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card>
            <CardPanel className="pt-6">
              <Tabs defaultValue="activity">
                <TabsList>
                  <TabsTab value="activity">Activity</TabsTab>
                  <TabsTab value="notes">Notes</TabsTab>
                  <TabsTab value="files">Files</TabsTab>
                </TabsList>
                <TabsPanel className="pt-4" value="activity">
                  <ol className="space-y-4">
                    {timeline.map((item, index) => (
                      <li className="flex gap-3" key={index}>
                        <div className="flex flex-col items-center">
                          <div className="flex size-8 items-center justify-center rounded-full border bg-muted/50">
                            <item.icon className="size-4" />
                          </div>
                          {index < timeline.length - 1 && (
                            <span className="mt-1 w-px flex-1 bg-border" />
                          )}
                        </div>
                        <div className="grid gap-0.5 pb-2 leading-tight">
                          <span className="font-medium text-sm">{item.title}</span>
                          <span className="text-muted-foreground text-sm">
                            {item.detail}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {item.time}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </TabsPanel>
                <TabsPanel className="pt-4 text-muted-foreground text-sm" value="notes">
                  No notes yet. Add context after your next conversation.
                </TabsPanel>
                <TabsPanel className="pt-4 text-muted-foreground text-sm" value="files">
                  Proposal-northwind-v2.pdf · 240 KB
                </TabsPanel>
              </Tabs>
            </CardPanel>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardDescription>Deal value</CardDescription>
              <CardTitle className="font-semibold text-3xl tabular-nums">
                {formatCurrency(41200)}
              </CardTitle>
            </CardHeader>
            <CardPanel className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Win probability</span>
                <span className="font-medium tabular-nums">60%</span>
              </div>
              <Progress value={60}>
                <ProgressTrack>
                  <ProgressIndicator />
                </ProgressTrack>
              </Progress>
            </CardPanel>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardPanel className="space-y-1">
              {details.map((detail, index) => (
                <div key={detail.label}>
                  {index > 0 && <Separator className="my-2.5" />}
                  <div className="flex items-center gap-3 text-sm">
                    <detail.icon className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{detail.label}</span>
                    <span className="ms-auto font-medium">{detail.value}</span>
                  </div>
                </div>
              ))}
            </CardPanel>
          </Card>
        </div>
      </div>
    </div>
  );
}
