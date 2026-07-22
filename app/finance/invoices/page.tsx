"use client";

import { DownloadIcon, PlusIcon, SendIcon } from "lucide-react";
import { FinanceShell } from "@/components/apps/finance-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardPanel } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, invoiceStatusMeta, invoices } from "@/lib/apps-data";

export default function InvoicesPage() {
  return (
    <FinanceShell
      title="Invoices"
      actions={
        <Button size="sm">
          <PlusIcon />
          New invoice
        </Button>
      }
    >
      <p className="text-muted-foreground text-sm">
        Click any invoice to open its details in a drawer.
      </p>
      <Card>
        <CardPanel className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <Drawer key={invoice.id}>
                  <DrawerTrigger
                    render={
                      <TableRow className="cursor-pointer transition-colors hover:bg-accent/50" />
                    }
                  >
                    <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                    <TableCell className="font-medium">{invoice.client}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.due}</TableCell>
                    <TableCell>
                      <Badge size="sm" variant={invoiceStatusMeta[invoice.status]}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      {formatCurrency(invoice.amount)}
                    </TableCell>
                  </DrawerTrigger>
                  <DrawerPopup showBar>
                    <DrawerHeader>
                      <DrawerTitle>{invoice.id}</DrawerTitle>
                      <DrawerDescription>
                        Billed to {invoice.client}
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerPanel className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant={invoiceStatusMeta[invoice.status]}>
                          {invoice.status}
                        </Badge>
                        <span className="font-semibold text-2xl tabular-nums">
                          {formatCurrency(invoice.amount)}
                        </span>
                      </div>
                      <Separator />
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Due date</span>
                          <span className="font-medium">{invoice.due}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Line items</span>
                          <span className="font-medium">Consulting · 40h</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">VAT (23%)</span>
                          <span className="font-medium tabular-nums">
                            {formatCurrency(invoice.amount * 0.23)}
                          </span>
                        </div>
                      </div>
                    </DrawerPanel>
                    <DrawerFooter>
                      <Button>
                        <SendIcon />
                        Send reminder
                      </Button>
                      <DrawerClose render={<Button variant="outline" />}>
                        <DownloadIcon />
                        Download PDF
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerPopup>
                </Drawer>
              ))}
            </TableBody>
          </Table>
        </CardPanel>
      </Card>
    </FinanceShell>
  );
}
