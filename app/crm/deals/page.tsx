"use client";

import {
  CopyIcon,
  LayoutGridIcon,
  PencilIcon,
  RowsIcon,
  TrashIcon,
  TrophyIcon,
} from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardPanel, CardTitle } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubPopup,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deals, formatCurrency } from "@/lib/apps-data";

const stages = ["Qualified", "Proposal", "Negotiation", "Won"] as const;

function DealCard({ deal }: { deal: (typeof deals)[number] }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        render={<Card className="cursor-default transition-colors hover:bg-accent/50" />}
      >
        <CardHeader className="p-4">
          <CardTitle className="text-sm">{deal.title}</CardTitle>
          <p className="text-muted-foreground text-xs">{deal.company}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-semibold text-sm tabular-nums">
              {formatCurrency(deal.value)}
            </span>
            <Badge size="sm" variant="secondary">
              {deal.probability}%
            </Badge>
          </div>
          <Progress className="mt-2" value={deal.probability}>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </CardHeader>
      </ContextMenuTrigger>
      <ContextMenuPopup>
        <ContextMenuItem>
          <PencilIcon />
          Edit deal
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <CopyIcon />
          Duplicate
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Move to stage</ContextMenuSubTrigger>
          <ContextMenuSubPopup>
            {stages.map((stage) => (
              <ContextMenuItem key={stage}>{stage}</ContextMenuItem>
            ))}
          </ContextMenuSubPopup>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <TrashIcon />
          Delete
        </ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenu>
  );
}

export default function DealsPage() {
  const [view, setView] = React.useState<string[]>(["board"]);
  const isBoard = view.includes("board");

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid gap-1">
          <h2 className="font-heading font-semibold text-2xl tracking-tight">Deals</h2>
          <p className="text-muted-foreground text-sm">
            {deals.length} open deals · right-click a card for actions.
          </p>
        </div>
        <TooltipProvider>
          <ToggleGroup onValueChange={(value) => value.length && setView(value)} value={view}>
            <Tooltip>
              <TooltipTrigger
                render={<ToggleGroupItem aria-label="Board view" value="board" />}
              >
                <LayoutGridIcon />
              </TooltipTrigger>
              <TooltipPopup>Board</TooltipPopup>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={<ToggleGroupItem aria-label="List view" value="list" />}
              >
                <RowsIcon />
              </TooltipTrigger>
              <TooltipPopup>List</TooltipPopup>
            </Tooltip>
          </ToggleGroup>
        </TooltipProvider>
      </div>

      {isBoard ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stages.map((stage) => {
            const stageDeals = deals.filter((deal) => deal.stage === stage);
            return (
              <div className="flex flex-col gap-3" key={stage}>
                <div className="flex items-center justify-between px-1">
                  <span className="flex items-center gap-1.5 font-medium text-sm">
                    {stage === "Won" && <TrophyIcon className="size-4 text-success" />}
                    {stage}
                  </span>
                  <Badge size="sm" variant="secondary">
                    {stageDeals.length}
                  </Badge>
                </div>
                {stageDeals.map((deal) => (
                  <DealCard deal={deal} key={deal.id} />
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardPanel className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deal</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Probability</TableHead>
                  <TableHead>Close</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell className="font-medium">{deal.title}</TableCell>
                    <TableCell className="text-muted-foreground">{deal.company}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{deal.stage}</Badge>
                    </TableCell>
                    <TableCell className="tabular-nums">{deal.probability}%</TableCell>
                    <TableCell className="text-muted-foreground">{deal.close}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      {formatCurrency(deal.value)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardPanel>
        </Card>
      )}
    </div>
  );
}
