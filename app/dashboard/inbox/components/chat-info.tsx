"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  Bell,
  Download,
  Info,
  MoveRight,
  Phone,
  Video,
  Volume2,
} from "lucide-react";
import { MediaTabs } from "./media-tabs";

export function ChatInfo() {
  return (
    <div className="h-full w-[25%] lg:flex lg:flex-col hidden">
      <ScrollArea className="flex-grow">
        <div className="flex flex-col h-60 items-center justify-center">
          <Avatar className="size-20">
            <AvatarImage src="/profile.avif" alt="avatar" />
          </Avatar>
          <h3 className="text-lg font-semibold mt-4">PrimeTek Team</h3>
          <p className="text-muted-foreground text-md">@primetek-team</p>
        </div>
        <div className="flex items-center w-full gap-4 justify-center">
          <Button size="icon" variant="ghost">
            <Phone className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button size="icon" variant="ghost">
            <Video className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button size="icon" variant="ghost">
            <MoveRight className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button size="icon" variant="ghost">
            <Info className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
        <div className="flex flex-col gap-4 w-full py-8 px-4 lg:px-8">
          <SettingEntry icon={Bell} title="Notifications">
            <Switch />
          </SettingEntry>
          <SettingEntry icon={Volume2} title="Sound">
            <Switch />
          </SettingEntry>
          <SettingEntry icon={Download} title="Save to downloads">
            <Switch />
          </SettingEntry>
        </div>
        <div className="px-4 lg:px-8">
          <p className="font-semibold">Members</p>
          <div className="flex flex-col w-full my-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex rounded-md items-center w-full gap-4 py-3 px-1 hover:bg-muted"
              >
                <Avatar className="size-7">
                  <AvatarImage src="/profile.avif" alt="avatar" />
                </Avatar>
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold">Cody Fisher</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6">
          <MediaTabs />
        </div>
      </ScrollArea>
    </div>
  );
}

function SettingEntry({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2 items-center w-full">
      <Icon className="size-5" />
      <p className="text-md font-semibold mr-auto">{title}</p>
      <div className="">{children}</div>
    </div>
  );
}
