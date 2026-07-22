"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MoreHorizontalIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import * as React from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  kanbanColumns,
  type KanbanColumn,
  type KanbanTask,
} from "@/lib/data";

const priorityVariant: Record<KanbanTask["priority"], "secondary" | "warning" | "destructive"> = {
  High: "destructive",
  Low: "secondary",
  Medium: "warning",
};

const columnOrder: KanbanColumn["id"][] = ["todo", "in-progress", "done"];

const newTaskColumns = [
  { label: "Todo", value: "todo" },
  { label: "In Progress", value: "in-progress" },
  { label: "Done", value: "done" },
];

export default function KanbanPage() {
  const [columns, setColumns] = React.useState(kanbanColumns);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [targetColumn, setTargetColumn] = React.useState<string>("todo");

  const moveTask = (taskId: string, direction: -1 | 1) => {
    setColumns((current) => {
      const from = current.find((column) =>
        column.tasks.some((task) => task.id === taskId),
      );
      if (!from) return current;
      const fromIndex = columnOrder.indexOf(from.id);
      const toIndex = fromIndex + direction;
      if (toIndex < 0 || toIndex >= columnOrder.length) return current;
      const task = from.tasks.find((item) => item.id === taskId);
      if (!task) return current;
      return current.map((column) => {
        if (column.id === from.id) {
          return {
            ...column,
            tasks: column.tasks.filter((item) => item.id !== taskId),
          };
        }
        if (column.id === columnOrder[toIndex]) {
          return { ...column, tasks: [...column.tasks, task] };
        }
        return column;
      });
    });
  };

  const deleteTask = (taskId: string) => {
    setColumns((current) =>
      current.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      })),
    );
  };

  const addTask = () => {
    if (!title.trim()) return;
    const task: KanbanTask = {
      description: description.trim() || "No description yet.",
      id: `t${Date.now()}`,
      priority: "Medium",
      tag: "New",
      title: title.trim(),
    };
    setColumns((current) =>
      current.map((column) =>
        column.id === targetColumn
          ? { ...column, tasks: [...column.tasks, task] }
          : column,
      ),
    );
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { href: "/dashboard", label: "Dashboard" },
          { label: "Kanban" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="grid gap-1">
            <h1 className="font-heading font-semibold text-2xl tracking-tight">
              Kanban
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage tasks across your workflow.
            </p>
          </div>
          <Dialog>
            <DialogTrigger render={<Button />}>
              <PlusIcon />
              New task
            </DialogTrigger>
            <DialogPopup className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>New task</DialogTitle>
                <DialogDescription>
                  What do you want to get done today?
                </DialogDescription>
              </DialogHeader>
              <DialogPanel className="space-y-4">
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Todo title…"
                    value={title}
                  />
                </Field>
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Description…"
                    value={description}
                  />
                </Field>
                <Field>
                  <FieldLabel>Column</FieldLabel>
                  <Select
                    items={newTaskColumns}
                    onValueChange={(value) => setTargetColumn(value as string)}
                    value={targetColumn}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectPopup>
                      {newTaskColumns.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectPopup>
                  </Select>
                </Field>
              </DialogPanel>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>
                  Cancel
                </DialogClose>
                <DialogClose render={<Button />} onClick={addTask}>
                  Add task
                </DialogClose>
              </DialogFooter>
            </DialogPopup>
          </Dialog>
        </div>

        <ScrollArea className="flex-1">
          <div className="flex gap-4 pb-4">
            {columns.map((column, columnIndex) => (
              <div
                className="flex w-80 shrink-0 flex-col gap-3 rounded-2xl border bg-sidebar p-3"
                key={column.id}
              >
                <div className="flex items-center justify-between px-1">
                  <span className="flex items-center gap-2 font-medium text-sm">
                    {column.title}
                    <Badge size="sm" variant="secondary">
                      {column.tasks.length}
                    </Badge>
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {column.tasks.map((task) => (
                    <Card key={task.id}>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm">{task.title}</CardTitle>
                        <CardDescription className="text-xs">
                          {task.description}
                        </CardDescription>
                        <div className="mt-2 flex items-center gap-1.5">
                          <Badge size="sm" variant="outline">
                            {task.tag}
                          </Badge>
                          <Badge size="sm" variant={priorityVariant[task.priority]}>
                            {task.priority}
                          </Badge>
                        </div>
                        <Menu>
                          <MenuTrigger
                            className="absolute top-2 right-2"
                            render={
                              <Button
                                aria-label={`Open menu for ${task.title}`}
                                size="icon-xs"
                                variant="ghost"
                              />
                            }
                          >
                            <MoreHorizontalIcon />
                          </MenuTrigger>
                          <MenuPopup align="end">
                            <MenuItem
                              disabled={columnIndex === 0}
                              onClick={() => moveTask(task.id, -1)}
                            >
                              <ArrowLeftIcon />
                              Move left
                            </MenuItem>
                            <MenuItem
                              disabled={columnIndex === columnOrder.length - 1}
                              onClick={() => moveTask(task.id, 1)}
                            >
                              <ArrowRightIcon />
                              Move right
                            </MenuItem>
                            <MenuSeparator />
                            <MenuItem
                              onClick={() => deleteTask(task.id)}
                              variant="destructive"
                            >
                              <TrashIcon />
                              Delete
                            </MenuItem>
                          </MenuPopup>
                        </Menu>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}
