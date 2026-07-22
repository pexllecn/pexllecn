import {
  GitCommitHorizontalIcon,
  MessageSquareIcon,
  RocketIcon,
} from "lucide-react";
import { ProjectsShell } from "@/components/apps/projects-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardPanel } from "@/components/ui/card";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/components/ui/preview-card";
import { activity, team } from "@/lib/apps-data";

const feed = [
  ...activity,
  { who: "Amir Nasser", initials: "AM", action: "pushed 3 commits to", target: "TRAK-205", time: "6h ago" },
  { who: "Khaled A.", initials: "KA", action: "released", target: "v2.4.0", time: "1d ago" },
];

export default function ActivityPage() {
  return (
    <ProjectsShell title="Activity">
      <Card>
        <CardPanel className="pt-6">
          <ol className="space-y-5">
            {feed.map((item, index) => {
              const member = team.find((m) => m.initials === item.initials);
              const Icon = item.action.includes("commit")
                ? GitCommitHorizontalIcon
                : item.action.includes("released")
                  ? RocketIcon
                  : MessageSquareIcon;
              return (
                <li className="flex gap-3" key={index}>
                  <div className="flex flex-col items-center">
                    <PreviewCard>
                      <PreviewCardTrigger
                        render={
                          <button className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring" type="button" />
                        }
                      >
                        <Avatar className="size-8">
                          <AvatarFallback className="text-xs">
                            {item.initials}
                          </AvatarFallback>
                        </Avatar>
                      </PreviewCardTrigger>
                      <PreviewCardPopup>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-10">
                            <AvatarFallback>{item.initials}</AvatarFallback>
                          </Avatar>
                          <div className="grid leading-tight">
                            <span className="font-medium text-sm">{item.who}</span>
                            <span className="text-muted-foreground text-xs">
                              {member?.role ?? "Team member"}
                            </span>
                          </div>
                        </div>
                        {member && (
                          <p className="mt-3 text-muted-foreground text-sm">
                            {member.bio} · {member.location}
                          </p>
                        )}
                      </PreviewCardPopup>
                    </PreviewCard>
                    {index < feed.length - 1 && (
                      <span className="mt-1 w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="grid gap-0.5 pb-1 leading-snug">
                    <p className="text-sm">
                      <span className="font-medium">{item.who}</span>{" "}
                      <span className="text-muted-foreground">
                        {item.action} {item.target}
                      </span>
                    </p>
                    <span className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Icon className="size-3" />
                      {item.time}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </CardPanel>
      </Card>
    </ProjectsShell>
  );
}
