"use client";

import { PlusIcon } from "lucide-react";
import * as React from "react";
import { FinanceShell } from "@/components/apps/finance-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
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
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@/components/ui/meter";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
import { Slider } from "@/components/ui/slider";
import { toastManager } from "@/components/ui/toast";
import { budgets, formatCurrency } from "@/lib/apps-data";

export default function BudgetsPage() {
  const [alertAt, setAlertAt] = React.useState(80);

  return (
    <FinanceShell
      title="Budgets"
      actions={
        <Dialog>
          <DialogTrigger render={<Button size="sm" />}>
            <PlusIcon />
            New budget
          </DialogTrigger>
          <DialogPopup className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create budget</DialogTitle>
              <DialogDescription>
                Set a monthly spending limit for a category.
              </DialogDescription>
            </DialogHeader>
            <DialogPanel className="space-y-4">
              <Field>
                <FieldLabel>Category</FieldLabel>
                <Input placeholder="e.g. Marketing" />
              </Field>
              <Field>
                <FieldLabel>Monthly limit (EUR)</FieldLabel>
                <NumberField defaultValue={2000} min={0} step={100}>
                  <NumberFieldGroup>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldGroup>
                </NumberField>
              </Field>
            </DialogPanel>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
              <DialogClose
                render={<Button />}
                onClick={() => toastManager.add({ title: "Budget created" })}
              >
                Create
              </DialogClose>
            </DialogFooter>
          </DialogPopup>
        </Dialog>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Alert threshold</CardTitle>
          <CardDescription>
            Notify me when a budget reaches {alertAt}% of its limit.
          </CardDescription>
        </CardHeader>
        <CardPanel>
          <Slider
            max={100}
            min={50}
            onValueChange={(value) =>
              setAlertAt(Array.isArray(value) ? value[0] : value)
            }
            step={5}
            value={alertAt}
          />
        </CardPanel>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {budgets.map((budget) => {
          const pct = Math.round((budget.spent / budget.limit) * 100);
          const over = budget.spent > budget.limit;
          return (
            <Card key={budget.name}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{budget.name}</CardTitle>
                  <Badge
                    size="sm"
                    variant={over ? "destructive" : pct >= alertAt ? "warning" : "success"}
                  >
                    {pct}%
                  </Badge>
                </div>
                <CardDescription>
                  {formatCurrency(budget.limit - budget.spent)} remaining
                </CardDescription>
              </CardHeader>
              <CardPanel>
                <Meter max={budget.limit} value={budget.spent}>
                  <div className="flex items-center justify-between gap-2">
                    <MeterLabel className="text-muted-foreground text-sm">
                      Spent
                    </MeterLabel>
                    <span className="font-medium text-sm tabular-nums">
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                    </span>
                  </div>
                  <MeterTrack>
                    <MeterIndicator
                      className={over ? "bg-destructive" : undefined}
                    />
                  </MeterTrack>
                </Meter>
              </CardPanel>
            </Card>
          );
        })}
      </div>
    </FinanceShell>
  );
}
