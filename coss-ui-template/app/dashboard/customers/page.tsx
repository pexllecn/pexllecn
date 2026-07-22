"use client";

import {
  CopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  SearchIcon,
  TrashIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import * as React from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toastManager } from "@/components/ui/toast";

type Status = "active" | "trialing" | "churned";

const statusVariant: Record<Status, "success" | "info" | "destructive"> = {
  active: "success",
  churned: "destructive",
  trialing: "info",
};

const customers = [
  {
    email: "olivia.martin@email.com",
    initials: "OM",
    name: "Olivia Martin",
    plan: "Enterprise",
    revenue: "$12,400.00",
    status: "active" as Status,
  },
  {
    email: "jackson.lee@email.com",
    initials: "JL",
    name: "Jackson Lee",
    plan: "Pro",
    revenue: "$4,320.00",
    status: "active" as Status,
  },
  {
    email: "isabella.nguyen@email.com",
    initials: "IN",
    name: "Isabella Nguyen",
    plan: "Pro",
    revenue: "$2,150.00",
    status: "trialing" as Status,
  },
  {
    email: "will@email.com",
    initials: "WK",
    name: "William Kim",
    plan: "Starter",
    revenue: "$860.00",
    status: "trialing" as Status,
  },
  {
    email: "sofia.davis@email.com",
    initials: "SD",
    name: "Sofia Davis",
    plan: "Starter",
    revenue: "$420.00",
    status: "churned" as Status,
  },
  {
    email: "liam.brown@email.com",
    initials: "LB",
    name: "Liam Brown",
    plan: "Enterprise",
    revenue: "$18,200.00",
    status: "active" as Status,
  },
];

const statusFilters = [
  { label: "All statuses", value: "all" },
  { label: "Active", value: "active" },
  { label: "Trialing", value: "trialing" },
  { label: "Churned", value: "churned" },
];

export default function CustomersPage() {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<string>("all");

  const filtered = customers.filter((customer) => {
    const matchesQuery = `${customer.name} ${customer.email}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesStatus = status === "all" || customer.status === status;
    return matchesQuery && matchesStatus;
  });

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { href: "/dashboard", label: "Dashboard" },
          { label: "Customers" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>
              Manage the people and companies on your workspace.
            </CardDescription>
            <CardAction>
              <Button
                onClick={() =>
                  toastManager.add({
                    description: "Invites are disabled in this template.",
                    title: "Invite customer",
                  })
                }
              >
                <UserPlusIcon />
                Invite
              </Button>
            </CardAction>
          </CardHeader>
          <CardPanel className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full max-w-64">
                <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2.5 size-4 text-muted-foreground" />
                <Input
                  className="ps-8"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search customers…"
                  value={query}
                />
              </div>
              <Select
                items={statusFilters}
                onValueChange={(value) => setStatus(value as string)}
                value={status}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectPopup>
                  {statusFilters.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectPopup>
              </Select>
            </div>

            {filtered.length === 0 ? (
              <Empty className="rounded-xl border border-dashed">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <UsersIcon />
                  </EmptyMedia>
                  <EmptyTitle>No customers found</EmptyTitle>
                  <EmptyDescription>
                    Try adjusting your search or filters.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((customer) => (
                    <TableRow key={customer.email}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback>
                              {customer.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="grid leading-tight">
                            <span className="font-medium">
                              {customer.name}
                            </span>
                            <span className="text-muted-foreground text-xs">
                              {customer.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[customer.status]}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.plan}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {customer.revenue}
                      </TableCell>
                      <TableCell>
                        <Menu>
                          <MenuTrigger
                            render={
                              <Button
                                aria-label={`Open menu for ${customer.name}`}
                                size="icon-sm"
                                variant="ghost"
                              />
                            }
                          >
                            <MoreHorizontalIcon />
                          </MenuTrigger>
                          <MenuPopup align="end">
                            <MenuItem>
                              <PencilIcon />
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                toastManager.add({
                                  description: customer.email,
                                  title: "Email copied",
                                })
                              }
                            >
                              <CopyIcon />
                              Copy email
                            </MenuItem>
                            <MenuSeparator />
                            <MenuItem variant="destructive">
                              <TrashIcon />
                              Delete
                            </MenuItem>
                          </MenuPopup>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardPanel>
          <CardFooter className="justify-between text-muted-foreground text-sm">
            <span>
              Showing {filtered.length} of {customers.length} customers
            </span>
            <div className="flex items-center gap-2">
              <Button disabled size="sm" variant="outline">
                Previous
              </Button>
              <Button disabled size="sm" variant="outline">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
