import { CheckIcon, PackageIcon, RocketIcon } from "lucide-react";
import { ProjectsShell } from "@/components/apps/projects-shell";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardPanel } from "@/components/ui/card";
import { releases } from "@/lib/apps-data";

export default function ReleasesPage() {
  return (
    <ProjectsShell
      title="Releases"
      actions={
        <Button size="sm">
          <RocketIcon />
          Draft release
        </Button>
      }
    >
      <Card>
        <CardPanel className="pt-2 pb-2">
          <Accordion className="w-full" defaultValue={["v2.4.0"]}>
            {releases.map((release) => (
              <AccordionItem key={release.version} value={release.version}>
                <AccordionTrigger>
                  <span className="flex flex-1 items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg border bg-muted/50">
                      <PackageIcon className="size-4.5" />
                    </span>
                    <span className="grid text-left leading-tight">
                      <span className="font-medium">{release.version}</span>
                      <span className="text-muted-foreground text-xs">
                        {release.date}
                      </span>
                    </span>
                    <Badge
                      className="ms-auto me-2"
                      variant={release.status === "Released" ? "success" : "warning"}
                    >
                      {release.status}
                    </Badge>
                  </span>
                </AccordionTrigger>
                <AccordionPanel>
                  <ul className="grid gap-2 ps-1">
                    {release.notes.map((note) => (
                      <li className="flex items-center gap-2 text-sm" key={note}>
                        <CheckIcon className="size-4 text-success" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </CardPanel>
      </Card>
    </ProjectsShell>
  );
}
