"use client";

import {
  ArchiveIcon,
  ClockIcon,
  ForwardIcon,
  MailIcon,
  ReplyIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import * as React from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toastManager } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { mails } from "@/lib/data";
import { cn } from "@/lib/utils";

const mailActions = [
  { icon: ArchiveIcon, label: "Archive" },
  { icon: ClockIcon, label: "Snooze" },
  { icon: Trash2Icon, label: "Delete" },
];

export default function InboxPage() {
  const [filter, setFilter] = React.useState("all");
  const [activeId, setActiveId] = React.useState(mails[0].id);
  const [query, setQuery] = React.useState("");

  const filtered = mails.filter((mail) => {
    const matchesFilter = filter === "all" || !mail.read;
    const matchesQuery = `${mail.from} ${mail.subject}`
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const active = mails.find((mail) => mail.id === activeId) ?? mails[0];

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { href: "/dashboard", label: "Dashboard" },
          { label: "Inbox" },
        ]}
      />
      <div className="flex min-h-0 flex-1 gap-4 p-4 lg:p-6">
        <Card className="flex w-full shrink-0 flex-col md:w-96">
          <div className="flex items-center justify-between gap-2 p-4 pb-2">
            <h1 className="flex items-center gap-2 font-heading font-semibold text-lg tracking-tight">
              Inbox
              <Badge variant="secondary">
                {mails.filter((mail) => !mail.read).length} unread
              </Badge>
            </h1>
            <Tabs onValueChange={(value) => setFilter(value as string)} value={filter}>
              <TabsList>
                <TabsTab value="all">All</TabsTab>
                <TabsTab value="unread">Unread</TabsTab>
              </TabsList>
            </Tabs>
          </div>
          <div className="p-4 pt-2 pb-2">
            <div className="relative">
              <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2.5 size-4 text-muted-foreground" />
              <Input
                className="ps-8"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search mail…"
                value={query}
              />
            </div>
          </div>
          <ScrollArea className="min-h-0 flex-1">
            <div className="grid gap-2 p-4 pt-2">
              {filtered.map((mail) => (
                <button
                  className={cn(
                    "grid cursor-pointer gap-1 rounded-xl border p-3 text-left outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
                    mail.id === active.id && "bg-accent",
                  )}
                  key={mail.id}
                  onClick={() => setActiveId(mail.id)}
                  type="button"
                >
                  <span className="flex items-center gap-2">
                    <span className="font-medium text-sm">{mail.from}</span>
                    {!mail.read && (
                      <span className="size-2 rounded-full bg-info" />
                    )}
                    <span className="ms-auto text-muted-foreground text-xs">
                      {mail.date}
                    </span>
                  </span>
                  <span className="font-medium text-xs">{mail.subject}</span>
                  <span className="line-clamp-2 text-muted-foreground text-xs">
                    {mail.preview}
                  </span>
                  <span className="mt-1 flex gap-1.5">
                    {mail.labels.map((label) => (
                      <Badge key={label} size="sm" variant="outline">
                        {label}
                      </Badge>
                    ))}
                  </span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="hidden min-w-0 flex-1 flex-col md:flex">
          <div className="flex items-center gap-1 p-3">
            <TooltipProvider>
              {mailActions.map((action) => (
                <Tooltip key={action.label}>
                  <TooltipTrigger
                    render={
                      <Button
                        aria-label={action.label}
                        size="icon"
                        variant="ghost"
                      />
                    }
                  >
                    <action.icon />
                  </TooltipTrigger>
                  <TooltipPopup>{action.label}</TooltipPopup>
                </Tooltip>
              ))}
            </TooltipProvider>
            <Separator className="mx-1 h-4" orientation="vertical" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button aria-label="Reply" size="icon" variant="ghost" />
                  }
                >
                  <ReplyIcon />
                </TooltipTrigger>
                <TooltipPopup>Reply</TooltipPopup>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button aria-label="Forward" size="icon" variant="ghost" />
                  }
                >
                  <ForwardIcon />
                </TooltipTrigger>
                <TooltipPopup>Forward</TooltipPopup>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Separator />
          <div className="flex items-start gap-3 p-4">
            <Avatar className="size-10">
              <AvatarFallback>{active.initials}</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5 leading-tight">
              <span className="font-medium text-sm">{active.from}</span>
              <span className="text-muted-foreground text-xs">
                {active.subject}
              </span>
              <span className="text-muted-foreground text-xs">
                Reply-To: {active.from.toLowerCase().replace(" ", ".")}
                @example.com
              </span>
            </div>
            <span className="ms-auto text-muted-foreground text-xs">
              {active.date}
            </span>
          </div>
          <Separator />
          <ScrollArea className="min-h-0 flex-1">
            <div className="space-y-4 p-4 text-sm leading-relaxed">
              {active.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </ScrollArea>
          <Separator />
          <div className="grid gap-3 p-4">
            <Textarea placeholder={`Reply to ${active.from}…`} />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <MailIcon className="size-3.5" />
                Mute this thread
              </div>
              <Button
                onClick={() =>
                  toastManager.add({
                    description: "Sending mail is disabled in this demo.",
                    title: "Reply sent",
                  })
                }
                size="sm"
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
