"use client";

import { BuildingIcon, ChevronDownIcon, MapPinIcon, PlusIcon } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardPanel } from "@/components/ui/card";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { companies } from "@/lib/apps-data";

export default function CompaniesPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid gap-1">
          <h2 className="font-heading font-semibold text-2xl tracking-tight">
            Companies
          </h2>
          <p className="text-muted-foreground text-sm">
            {companies.length} accounts · expand to see contacts.
          </p>
        </div>
        <Button>
          <PlusIcon />
          Add company
        </Button>
      </div>

      <Card>
        <CardPanel className="pt-2 pb-2">
          <Accordion className="w-full" defaultValue={["c1"]}>
            {companies.map((company) => (
              <AccordionItem key={company.id} value={company.id}>
                <AccordionTrigger>
                  <span className="flex flex-1 items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg border bg-muted/50">
                      <BuildingIcon className="size-4.5" />
                    </span>
                    <span className="grid text-left leading-tight">
                      <span className="font-medium">{company.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {company.industry} · {company.size} employees
                      </span>
                    </span>
                    <Badge className="ms-auto me-2" variant="secondary">
                      {company.deals} deals
                    </Badge>
                  </span>
                </AccordionTrigger>
                <AccordionPanel>
                  <div className="flex items-center gap-2 pb-3 text-muted-foreground text-sm">
                    <MapPinIcon className="size-4" />
                    {company.location}
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">Contacts</p>
                    {company.contacts.map((contact, index) => (
                      <div key={contact.name}>
                        {index > 0 && <Separator className="my-2" />}
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback>{contact.initials}</AvatarFallback>
                          </Avatar>
                          <div className="grid leading-tight">
                            <span className="font-medium text-sm">
                              {contact.name}
                            </span>
                            <span className="text-muted-foreground text-xs">
                              {contact.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </CardPanel>
      </Card>

      <Card>
        <CardPanel className="pt-6">
          <Collapsible>
            <CollapsibleTrigger className="inline-flex cursor-pointer items-center gap-2 font-medium text-sm outline-none data-panel-open:[&_svg]:rotate-180">
              Enrichment &amp; data sources
              <ChevronDownIcon className="size-4 transition-transform" />
            </CollapsibleTrigger>
            <CollapsiblePanel>
              <div className="grid gap-2 pt-3 text-muted-foreground text-sm">
                <p>Company data is enriched nightly from these providers:</p>
                <ul className="grid gap-1">
                  <li className="rounded-sm bg-muted px-2 py-1">Clearbit · firmographics</li>
                  <li className="rounded-sm bg-muted px-2 py-1">LinkedIn · headcount</li>
                  <li className="rounded-sm bg-muted px-2 py-1">Companies House · filings</li>
                </ul>
              </div>
            </CollapsiblePanel>
          </Collapsible>
        </CardPanel>
      </Card>
    </div>
  );
}
