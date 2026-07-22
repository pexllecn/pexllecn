"use client";

import { PlusIcon } from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardPanel } from "@/components/ui/card";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/components/ui/autocomplete";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { leads, stageMeta } from "@/lib/apps-data";

const searchItems = leads.map((lead) => ({
  label: `${lead.name} — ${lead.company}`,
  value: lead.id,
}));

export default function ContactsPage() {
  const [selected, setSelected] = React.useState<string | null>(null);

  const visible = selected
    ? leads.filter((lead) => lead.id === selected)
    : leads;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid gap-1">
          <h2 className="font-heading font-semibold text-2xl tracking-tight">
            Contacts
          </h2>
          <p className="text-muted-foreground text-sm">
            {leads.length} people across {new Set(leads.map((l) => l.company)).size} companies.
          </p>
        </div>
        <Button>
          <PlusIcon />
          Add contact
        </Button>
      </div>

      <Card>
        <CardPanel className="max-w-md pt-6 pb-2">
          <Field>
            <FieldLabel>Jump to a contact</FieldLabel>
            <Autocomplete
              items={searchItems}
              onValueChange={(value) => {
                const match = searchItems.find((item) => item.label === value);
                setSelected(match ? match.value : null);
              }}
            >
              <AutocompleteInput placeholder="Type a name or company…" />
              <AutocompletePopup>
                <AutocompleteEmpty>No contacts found.</AutocompleteEmpty>
                <AutocompleteList>
                  {(item: { label: string; value: string }) => (
                    <AutocompleteItem key={item.value} value={item}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </AutocompleteList>
              </AutocompletePopup>
            </Autocomplete>
          </Field>
        </CardPanel>
        <CardPanel className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TooltipProvider>
                {visible.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback>{lead.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{lead.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{lead.company}</TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <a
                              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                              href={`mailto:${lead.email}`}
                            />
                          }
                        >
                          {lead.email}
                        </TooltipTrigger>
                        <TooltipPopup>Send an email</TooltipPopup>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Badge variant={stageMeta[lead.stage].variant}>
                        {lead.stage}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {lead.owner}
                    </TableCell>
                  </TableRow>
                ))}
              </TooltipProvider>
            </TableBody>
          </Table>
        </CardPanel>
      </Card>
    </div>
  );
}
