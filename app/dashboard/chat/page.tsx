"use client";

import {
  MoreVerticalIcon,
  PaperclipIcon,
  PhoneIcon,
  SearchIcon,
  SendIcon,
  VideoIcon,
} from "lucide-react";
import * as React from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { chats } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const [activeId, setActiveId] = React.useState(chats[0].id);
  const [draft, setDraft] = React.useState("");
  const [threads, setThreads] = React.useState(chats);

  const active = threads.find((thread) => thread.id === activeId) ?? threads[0];

  const sendMessage = () => {
    if (!draft.trim()) return;
    setThreads((current) =>
      current.map((thread) =>
        thread.id === active.id
          ? {
              ...thread,
              lastMessage: draft,
              messages: [
                ...thread.messages,
                { fromMe: true, text: draft, time: "Now" },
              ],
              time: "Now",
            }
          : thread,
      ),
    );
    setDraft("");
  };

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { href: "/dashboard", label: "Dashboard" },
          { label: "Chat" },
        ]}
      />
      <div className="flex min-h-0 flex-1 gap-4 p-4 lg:p-6">
        <Card className="hidden w-72 shrink-0 flex-col md:flex">
          <div className="p-4 pb-2">
            <div className="relative">
              <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2.5 size-4 text-muted-foreground" />
              <Input className="ps-8" placeholder="Search chats…" />
            </div>
          </div>
          <ScrollArea className="min-h-0 flex-1">
            <div className="grid gap-1 p-2">
              {threads.map((thread) => (
                <button
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg p-2 text-left outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
                    thread.id === active.id && "bg-accent",
                  )}
                  key={thread.id}
                  onClick={() => setActiveId(thread.id)}
                  type="button"
                >
                  <span className="relative shrink-0">
                    <Avatar className="size-9">
                      <AvatarFallback>{thread.initials}</AvatarFallback>
                    </Avatar>
                    {thread.online && (
                      <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-card bg-success" />
                    )}
                  </span>
                  <span className="grid min-w-0 flex-1 gap-0.5 leading-tight">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate font-medium text-sm">
                        {thread.name}
                      </span>
                      <span className="shrink-0 text-muted-foreground text-xs">
                        {thread.time}
                      </span>
                    </span>
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-muted-foreground text-xs">
                        {thread.lastMessage}
                      </span>
                      {thread.unread > 0 && (
                        <Badge size="sm">{thread.unread}</Badge>
                      )}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-3 p-4">
            <span className="relative">
              <Avatar className="size-9">
                <AvatarFallback>{active.initials}</AvatarFallback>
              </Avatar>
              {active.online && (
                <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-card bg-success" />
              )}
            </span>
            <div className="grid gap-0.5 leading-tight">
              <span className="font-medium text-sm">{active.name}</span>
              <span className="text-muted-foreground text-xs">
                {active.online ? "Online" : "Offline"}
              </span>
            </div>
            <div className="ms-auto flex items-center gap-1">
              <Button aria-label="Call" size="icon" variant="ghost">
                <PhoneIcon />
              </Button>
              <Button aria-label="Video call" size="icon" variant="ghost">
                <VideoIcon />
              </Button>
              <Menu>
                <MenuTrigger
                  render={
                    <Button aria-label="More" size="icon" variant="ghost" />
                  }
                >
                  <MoreVerticalIcon />
                </MenuTrigger>
                <MenuPopup align="end">
                  <MenuItem>View profile</MenuItem>
                  <MenuItem>Mute conversation</MenuItem>
                  <MenuSeparator />
                  <MenuItem variant="destructive">Delete chat</MenuItem>
                </MenuPopup>
              </Menu>
            </div>
          </div>
          <Separator />
          <ScrollArea className="min-h-0 flex-1">
            <div className="flex flex-col gap-3 p-4">
              {active.messages.map((message, index) => (
                <div
                  className={cn(
                    "flex max-w-[75%] flex-col gap-1",
                    message.fromMe ? "self-end items-end" : "self-start items-start",
                  )}
                  key={index}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-3.5 py-2 text-sm",
                      message.fromMe
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-muted text-foreground",
                    )}
                  >
                    {message.text}
                  </div>
                  <span className="text-muted-foreground text-xs">
                    {message.time}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 pt-2">
            <InputGroup>
              <InputGroupAddon>
                <Button aria-label="Attach file" size="icon-xs" variant="ghost">
                  <PaperclipIcon />
                </Button>
              </InputGroupAddon>
              <InputGroupInput
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={`Message ${active.name}…`}
                value={draft}
              />
              <InputGroupAddon align="inline-end">
                <Button
                  aria-label="Send message"
                  onClick={sendMessage}
                  size="icon-xs"
                >
                  <SendIcon />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </Card>
      </div>
    </>
  );
}
