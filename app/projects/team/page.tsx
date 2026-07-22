"use client";

import { MailIcon, MapPinIcon, PlusIcon } from "lucide-react";
import { ProjectsShell } from "@/components/apps/projects-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardPanel, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { team } from "@/lib/apps-data";

const statusMeta: Record<string, { variant: "success" | "warning" | "secondary"; label: string }> = {
  online: { variant: "success", label: "Online" },
  away: { variant: "warning", label: "Away" },
  offline: { variant: "secondary", label: "Offline" },
};

export default function TeamPage() {
  return (
    <ProjectsShell
      title="Team"
      actions={
        <Button size="sm">
          <PlusIcon />
          Invite
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {team.map((member) => (
          <Drawer key={member.initials}>
            <DrawerTrigger
              render={
                <Card className="cursor-pointer text-left transition-colors hover:bg-accent/50" />
              }
            >
              <CardHeader className="items-center gap-2 p-6 text-center">
                <Avatar className="size-14">
                  <AvatarFallback className="text-lg">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-base">{member.name}</CardTitle>
                <p className="text-muted-foreground text-sm">{member.role}</p>
                <Badge size="sm" variant={statusMeta[member.status].variant}>
                  {statusMeta[member.status].label}
                </Badge>
              </CardHeader>
            </DrawerTrigger>
            <DrawerPopup showBar>
              <DrawerHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid text-left leading-tight">
                    <DrawerTitle>{member.name}</DrawerTitle>
                    <DrawerDescription>{member.role}</DrawerDescription>
                  </div>
                </div>
              </DrawerHeader>
              <DrawerPanel className="space-y-3">
                <p className="text-muted-foreground text-sm">{member.bio}</p>
                <Separator />
                <div className="flex items-center gap-2 text-sm">
                  <MapPinIcon className="size-4 text-muted-foreground" />
                  {member.location}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MailIcon className="size-4 text-muted-foreground" />
                  {member.name.split(" ")[0].toLowerCase()}@trak.dev
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Open tasks</span>
                  <Badge size="sm" variant="secondary">
                    {member.tasks}
                  </Badge>
                </div>
              </DrawerPanel>
              <DrawerFooter>
                <Button>Message</Button>
                <DrawerClose render={<Button variant="outline" />}>
                  Close
                </DrawerClose>
              </DrawerFooter>
            </DrawerPopup>
          </Drawer>
        ))}
      </div>
    </ProjectsShell>
  );
}
