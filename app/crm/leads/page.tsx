"use client";

import {
  DownloadIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardPanel,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverClose,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarSeparator,
} from "@/components/ui/toolbar";
import { leads, formatCurrency, stageMeta } from "@/lib/apps-data";

const allStages = ["New", "Qualified", "Proposal", "Won", "Lost"] as const;

export default function LeadsPage() {
  const [query, setQuery] = React.useState("");
  const [stages, setStages] = React.useState<string[]>([...allStages]);
  const [selected, setSelected] = React.useState<string[]>([]);

  const filtered = leads.filter(
    (lead) =>
      stages.includes(lead.stage) &&
      `${lead.name} ${lead.company}`.toLowerCase().includes(query.toLowerCase()),
  );

  const allChecked = selected.length === filtered.length && filtered.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid gap-1">
          <h2 className="font-heading font-semibold text-2xl tracking-tight">Leads</h2>
          <p className="text-muted-foreground text-sm">
            {filtered.length} leads · {selected.length} selected
          </p>
        </div>
        <Button>
          <PlusIcon />
          New lead
        </Button>
      </div>

      <Toolbar className="w-full">
        <ToolbarGroup className="flex-1">
          <div className="relative w-full max-w-64">
            <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2.5 z-10 size-4 text-muted-foreground" />
            <ToolbarInput
              className="ps-8"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search leads…"
              render={<Input />}
              value={query}
            />
          </div>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              <FilterIcon />
              Stage
              <Badge size="sm" variant="secondary">
                {stages.length}
              </Badge>
            </PopoverTrigger>
            <PopoverPopup align="start" className="w-52">
              <PopoverTitle className="mb-3">Filter by stage</PopoverTitle>
              <CheckboxGroup
                aria-label="Stages"
                className="gap-2.5"
                onValueChange={setStages}
                value={stages}
              >
                {allStages.map((stage) => (
                  <div className="flex items-center gap-2" key={stage}>
                    <Checkbox id={`stage-${stage}`} value={stage} />
                    <Label htmlFor={`stage-${stage}`}>{stage}</Label>
                  </div>
                ))}
              </CheckboxGroup>
              <PopoverClose
                render={<Button className="mt-4 w-full" size="sm" variant="outline" />}
              >
                Apply
              </PopoverClose>
            </PopoverPopup>
          </Popover>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarButton render={<Button size="icon" variant="ghost" />} aria-label="View options">
            <SlidersHorizontalIcon />
          </ToolbarButton>
          <ToolbarButton render={<Button size="icon" variant="ghost" />} aria-label="Export">
            <DownloadIcon />
          </ToolbarButton>
        </ToolbarGroup>
      </Toolbar>

      <Card>
        <CardPanel className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    aria-label="Select all"
                    checked={allChecked}
                    onCheckedChange={(checked) =>
                      setSelected(checked ? filtered.map((l) => l.id) : [])
                    }
                  />
                </TableHead>
                <TableHead>Lead</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <Checkbox
                      aria-label={`Select ${lead.name}`}
                      checked={selected.includes(lead.id)}
                      onCheckedChange={(checked) =>
                        setSelected((current) =>
                          checked
                            ? [...current, lead.id]
                            : current.filter((id) => id !== lead.id),
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback>{lead.initials}</AvatarFallback>
                      </Avatar>
                      <div className="grid leading-tight">
                        <span className="font-medium">{lead.name}</span>
                        <span className="text-muted-foreground text-xs">
                          {lead.company}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={stageMeta[lead.stage].variant}>{lead.stage}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lead.owner}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.source}</TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {formatCurrency(lead.value)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardPanel>
      </Card>

      <Pagination className="justify-between">
        <p className="text-muted-foreground text-sm">Page 1 of 12</p>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">12</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
