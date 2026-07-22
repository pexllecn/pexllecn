"use client";

import { DownloadIcon, FilterIcon, SearchIcon } from "lucide-react";
import * as React from "react";
import { FinanceShell } from "@/components/apps/finance-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardPanel } from "@/components/ui/card";
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
  PopoverDescription,
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
import { formatCurrency, transactions } from "@/lib/apps-data";

const categories = ["Income", "Software", "Travel", "Food", "Payroll", "Office"];

export default function TransactionsPage() {
  const [query, setQuery] = React.useState("");
  const [cats, setCats] = React.useState<string[]>([...categories]);

  const filtered = transactions.filter(
    (txn) =>
      cats.includes(txn.category) &&
      txn.merchant.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <FinanceShell
      title="Transactions"
      actions={
        <Button size="sm" variant="outline">
          <DownloadIcon />
          Export
        </Button>
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full max-w-64">
          <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2.5 size-4 text-muted-foreground" />
          <Input
            className="ps-8"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search transactions…"
            value={query}
          />
        </div>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            <FilterIcon />
            Category
            <Badge size="sm" variant="secondary">
              {cats.length}
            </Badge>
          </PopoverTrigger>
          <PopoverPopup align="start" className="w-56">
            <PopoverTitle>Filter categories</PopoverTitle>
            <PopoverDescription className="mb-3">
              Show only the selected categories.
            </PopoverDescription>
            <CheckboxGroup
              aria-label="Categories"
              className="gap-2.5"
              onValueChange={setCats}
              value={cats}
            >
              {categories.map((category) => (
                <div className="flex items-center gap-2" key={category}>
                  <Checkbox id={`cat-${category}`} value={category} />
                  <Label htmlFor={`cat-${category}`}>{category}</Label>
                </div>
              ))}
            </CheckboxGroup>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1" onClick={() => setCats([...categories])} size="sm" variant="outline">
                Reset
              </Button>
              <PopoverClose render={<Button className="flex-1" size="sm" />}>
                Apply
              </PopoverClose>
            </div>
          </PopoverPopup>
        </Popover>
      </div>

      <Card>
        <CardPanel className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Merchant</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-medium">{txn.merchant}</TableCell>
                  <TableCell>
                    <Badge size="sm" variant="secondary">
                      {txn.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{txn.account}</TableCell>
                  <TableCell className="text-muted-foreground">{txn.date}</TableCell>
                  <TableCell>
                    <Badge size="sm" variant={txn.status === "Cleared" ? "success" : "warning"}>
                      {txn.status}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium tabular-nums ${
                      txn.amount > 0 ? "text-success-foreground" : ""
                    }`}
                  >
                    {txn.amount > 0 ? "+" : ""}
                    {formatCurrency(txn.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardPanel>
      </Card>

      <Pagination className="justify-end">
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
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">9</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </FinanceShell>
  );
}
