"use client";

import {
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  RefreshCwIcon,
  UnderlineIcon,
} from "lucide-react";
import * as React from "react";
import { ProjectsShell } from "@/components/apps/projects-shell";
import { Button } from "@/components/ui/button";
import { Card, CardPanel } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/ui/toolbar";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const pages = [
  { title: "Engineering handbook", active: true },
  { title: "Release process", active: false },
  { title: "Design principles", active: false },
  { title: "Onboarding", active: false },
];

const marks = [
  { icon: BoldIcon, label: "Bold" },
  { icon: ItalicIcon, label: "Italic" },
  { icon: UnderlineIcon, label: "Underline" },
];

export default function DocsPage() {
  const [loading, setLoading] = React.useState(false);

  const reload = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1400);
  };

  return (
    <ProjectsShell
      title="Docs"
      actions={
        <Button onClick={reload} size="sm" variant="outline">
          <RefreshCwIcon />
          Reload
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <Card className="h-fit">
          <CardPanel className="p-2">
            <nav className="grid gap-1">
              {pages.map((page) =>
                loading ? (
                  <Skeleton className="h-8 w-full rounded-lg" key={page.title} />
                ) : (
                  <button
                    className={`cursor-pointer rounded-lg px-3 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring ${
                      page.active ? "bg-accent font-medium" : "text-muted-foreground"
                    }`}
                    key={page.title}
                    type="button"
                  >
                    {page.title}
                  </button>
                ),
              )}
            </nav>
          </CardPanel>
        </Card>

        <Card>
          <CardPanel className="space-y-4 pt-6">
            <TooltipProvider>
              <Toolbar className="w-full">
                <ToolbarGroup>
                  {marks.map((mark) => (
                    <Tooltip key={mark.label}>
                      <TooltipTrigger
                        render={
                          <ToolbarButton
                            aria-label={mark.label}
                            render={<Toggle size="sm" />}
                          />
                        }
                      >
                        <mark.icon />
                      </TooltipTrigger>
                      <TooltipPopup>{mark.label}</TooltipPopup>
                    </Tooltip>
                  ))}
                </ToolbarGroup>
                <ToolbarSeparator />
                <ToolbarGroup>
                  <ToolbarButton
                    aria-label="Bullet list"
                    render={<Button size="icon-sm" variant="ghost" />}
                  >
                    <ListIcon />
                  </ToolbarButton>
                  <ToolbarButton
                    aria-label="Insert link"
                    render={<Button size="icon-sm" variant="ghost" />}
                  >
                    <LinkIcon />
                  </ToolbarButton>
                </ToolbarGroup>
                <ToolbarSeparator />
                <ToolbarGroup className="ms-auto">
                  <ToolbarButton render={<Button size="sm" />}>Publish</ToolbarButton>
                </ToolbarGroup>
              </Toolbar>
            </TooltipProvider>

            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-7 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <ScrollArea className="h-80">
                <article className="prose-sm space-y-3 pe-4 text-sm leading-relaxed">
                  <h2 className="font-heading font-semibold text-xl">
                    Engineering handbook
                  </h2>
                  <p className="text-muted-foreground">
                    This handbook describes how we build software at Trak. It
                    covers our workflow, code review, and release process.
                  </p>
                  <h3 className="font-medium text-base">Workflow</h3>
                  <p className="text-muted-foreground">
                    Every change starts as an issue in the current sprint. We
                    branch from <code>main</code>, open a draft PR early, and keep
                    changes small and reviewable.
                  </p>
                  <h3 className="font-medium text-base">Code review</h3>
                  <p className="text-muted-foreground">
                    At least one approval is required. Reviewers focus on
                    correctness, readability, and test coverage. Nits are
                    optional; blocking comments must be actionable.
                  </p>
                </article>
              </ScrollArea>
            )}

            <Textarea placeholder="Leave a comment on this doc…" />
          </CardPanel>
        </Card>
      </div>
    </ProjectsShell>
  );
}
