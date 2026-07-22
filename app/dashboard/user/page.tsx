"use client";

import {
  BadgeCheckIcon,
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
import { Field, FieldLabel } from "@/components/ui/field";
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
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toastManager } from "@/components/ui/toast";
import { users } from "@/lib/data";

const statusFilters = [
  { label: "All statuses", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function UserPage() {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<string>("all");

  const filtered = users.filter((user) => {
    const matchesQuery = `${user.name} ${user.company} ${user.role}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesStatus = status === "all" || user.status === status;
    return matchesQuery && matchesStatus;
  });

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { href: "/dashboard", label: "Dashboard" },
          { label: "User" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Users ({users.length})</CardTitle>
            <CardDescription>Manage users and their roles.</CardDescription>
            <CardAction>
              <Sheet>
                <SheetTrigger render={<Button />}>
                  <UserPlusIcon />
                  Add New
                </SheetTrigger>
                <SheetPopup>
                  <SheetHeader>
                    <SheetTitle>Add user</SheetTitle>
                    <SheetDescription>
                      Invite a new user to your workspace.
                    </SheetDescription>
                  </SheetHeader>
                  <SheetPanel className="space-y-4">
                    <Field>
                      <FieldLabel>Full name</FieldLabel>
                      <Input placeholder="Jane Doe" />
                    </Field>
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input placeholder="jane@company.com" type="email" />
                    </Field>
                    <Field>
                      <FieldLabel>Company</FieldLabel>
                      <Input placeholder="Acme Inc" />
                    </Field>
                    <Field>
                      <FieldLabel>Role</FieldLabel>
                      <Input placeholder="Product Designer" />
                    </Field>
                  </SheetPanel>
                  <SheetFooter>
                    <SheetClose render={<Button variant="outline" />}>
                      Cancel
                    </SheetClose>
                    <SheetClose
                      render={<Button />}
                      onClick={() =>
                        toastManager.add({
                          description: "Invites are disabled in this demo.",
                          title: "User invited",
                        })
                      }
                    >
                      Invite user
                    </SheetClose>
                  </SheetFooter>
                </SheetPopup>
              </Sheet>
            </CardAction>
          </CardHeader>
          <CardPanel className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full max-w-64">
                <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2.5 size-4 text-muted-foreground" />
                <Input
                  className="ps-8"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search users…"
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
                  <EmptyTitle>No users found</EmptyTitle>
                  <EmptyDescription>
                    Try adjusting your search or filters.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback>
                              {initialsOf(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.company}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.role}
                      </TableCell>
                      <TableCell>
                        {user.verified ? (
                          <span className="inline-flex items-center gap-1 text-success-foreground">
                            <BadgeCheckIcon className="size-4" />
                            Verified
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "Active" ? "success" : "secondary"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Menu>
                          <MenuTrigger
                            render={
                              <Button
                                aria-label={`Open menu for ${user.name}`}
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
                              Update
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
              Showing {filtered.length} of {users.length} users
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
