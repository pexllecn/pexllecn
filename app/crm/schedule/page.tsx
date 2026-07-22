"use client";

import { ClockIcon, PlusIcon, VideoIcon } from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toastManager } from "@/components/ui/toast";

const meetings = [
  { time: "09:00", title: "Discovery — Globex", who: "Emma Wilson", initials: "EW", kind: "Call" },
  { time: "11:30", title: "Proposal review — Northwind", who: "Olivia Martin", initials: "OM", kind: "Video" },
  { time: "14:00", title: "Contract — Hooli", who: "William Kim", initials: "WK", kind: "Video" },
  { time: "16:30", title: "Follow-up — Umbrella", who: "Isabella Nguyen", initials: "IN", kind: "Call" },
];

export default function SchedulePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid gap-1">
          <h2 className="font-heading font-semibold text-2xl tracking-tight">
            Schedule
          </h2>
          <p className="text-muted-foreground text-sm">
            Your meetings and follow-ups.
          </p>
        </div>
        <Popover>
          <PopoverTrigger render={<Button />}>
            <PlusIcon />
            New meeting
          </PopoverTrigger>
          <PopoverPopup align="end" className="w-80">
            <PopoverTitle>Schedule a meeting</PopoverTitle>
            <PopoverDescription className="mb-4">
              Add a quick meeting to your calendar.
            </PopoverDescription>
            <div className="grid gap-3">
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input placeholder="Discovery call…" />
              </Field>
              <Field>
                <FieldLabel>Time</FieldLabel>
                <Input defaultValue="10:00" type="time" />
              </Field>
              <PopoverClose
                render={<Button />}
                onClick={() =>
                  toastManager.add({
                    description: "Meeting added to your calendar.",
                    title: "Scheduled",
                  })
                }
              >
                Add meeting
              </PopoverClose>
            </div>
          </PopoverPopup>
        </Popover>
      </div>

      <div className="grid gap-4 lg:grid-cols-[auto_1fr]">
        <Card className="w-fit">
          <CardPanel className="pt-6">
            <Calendar mode="single" onSelect={setDate} selected={date} />
          </CardPanel>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {date
                ? date.toLocaleDateString("en-IE", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })
                : "Today"}
            </CardTitle>
            <CardDescription>{meetings.length} meetings scheduled.</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-1">
            {meetings.map((meeting, index) => (
              <div key={meeting.title}>
                {index > 0 && <Separator className="my-2.5" />}
                <div className="flex items-center gap-3">
                  <div className="flex w-14 items-center gap-1 text-muted-foreground text-sm tabular-nums">
                    <ClockIcon className="size-3.5" />
                    {meeting.time}
                  </div>
                  <div className="grid flex-1 leading-tight">
                    <span className="font-medium text-sm">{meeting.title}</span>
                    <span className="text-muted-foreground text-xs">
                      {meeting.who}
                    </span>
                  </div>
                  <Badge variant={meeting.kind === "Video" ? "info" : "secondary"}>
                    {meeting.kind === "Video" ? (
                      <VideoIcon />
                    ) : (
                      <ClockIcon />
                    )}
                    {meeting.kind}
                  </Badge>
                  <Avatar className="size-8">
                    <AvatarFallback>{meeting.initials}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            ))}
          </CardPanel>
        </Card>
      </div>
    </div>
  );
}
