"use client";

import {
  DownloadIcon,
  MoreHorizontalIcon,
  PencilIcon,
  SearchIcon,
  TrashIcon,
  UserPlusIcon,
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
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toastManager } from "@/components/ui/toast";
import { employees } from "@/lib/data";

export default function EmployeePage() {
  const [query, setQuery] = React.useState("");

  const filtered = employees.filter((employee) =>
    `${employee.firstName} ${employee.lastName} ${employee.email} ${employee.job}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { href: "/dashboard", label: "Dashboard" },
          { label: "Employees" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <Card>
          <CardHeader>
            <CardTitle>Employees ({employees.length})</CardTitle>
            <CardDescription>
              Your team across offices and departments.
            </CardDescription>
            <CardAction>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() =>
                    toastManager.add({
                      description: "Exports are disabled in this demo.",
                      title: "Export started",
                    })
                  }
                  variant="outline"
                >
                  <DownloadIcon />
                  Export
                </Button>
                <Dialog>
                  <DialogTrigger render={<Button />}>
                    <UserPlusIcon />
                    Add employee
                  </DialogTrigger>
                  <DialogPopup className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add employee</DialogTitle>
                      <DialogDescription>
                        Add a new member to your team directory.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogPanel className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field>
                          <FieldLabel>First name</FieldLabel>
                          <Input placeholder="Aoife" />
                        </Field>
                        <Field>
                          <FieldLabel>Last name</FieldLabel>
                          <Input placeholder="Byrne" />
                        </Field>
                      </div>
                      <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input placeholder="aoife@company.com" type="email" />
                      </Field>
                      <Field>
                        <FieldLabel>Job title</FieldLabel>
                        <Input placeholder="Account Manager" />
                      </Field>
                    </DialogPanel>
                    <DialogFooter>
                      <DialogClose render={<Button variant="outline" />}>
                        Cancel
                      </DialogClose>
                      <DialogClose
                        render={<Button />}
                        onClick={() =>
                          toastManager.add({
                            description:
                              "Adding employees is disabled in this demo.",
                            title: "Employee added",
                          })
                        }
                      >
                        Add employee
                      </DialogClose>
                    </DialogFooter>
                  </DialogPopup>
                </Dialog>
              </div>
            </CardAction>
          </CardHeader>
          <CardPanel className="space-y-4">
            <div className="relative w-full max-w-64">
              <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2.5 size-4 text-muted-foreground" />
              <Input
                className="ps-8"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search employees…"
                value={query}
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback>
                            {employee.firstName[0]}
                            {employee.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid leading-tight">
                          <span className="font-medium">
                            {employee.firstName} {employee.lastName}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {employee.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="tabular-nums">
                      {employee.phone}
                    </TableCell>
                    <TableCell>
                      {employee.city}, {employee.country}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{employee.job}</Badge>
                    </TableCell>
                    <TableCell>
                      <Menu>
                        <MenuTrigger
                          render={
                            <Button
                              aria-label={`Open menu for ${employee.firstName}`}
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
          </CardPanel>
          <CardFooter className="justify-between text-muted-foreground text-sm">
            <span>
              Showing {filtered.length} of {employees.length} employees
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
