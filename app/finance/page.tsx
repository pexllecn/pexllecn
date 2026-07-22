import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  PlusIcon,
  WalletIcon,
} from "lucide-react";
import Link from "next/link";
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
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@/components/ui/meter";
import { Separator } from "@/components/ui/separator";
import { budgets, formatCurrency, transactions } from "@/lib/apps-data";

const flow = [55, 40, 62, 48, 70, 65, 82, 60, 75, 68, 90, 84];

export default function FinanceOverview() {
  return (
    <FinanceShell
      title="Overview"
      actions={
        <Button render={<Link href="/finance/transfer" />} size="sm">
          <PlusIcon />
          New transfer
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardDescription className="flex items-center gap-1.5">
              <WalletIcon className="size-3.5" />
              Total balance
            </CardDescription>
            <CardTitle className="font-semibold text-3xl tabular-nums">
              {formatCurrency(261989.75)}
            </CardTitle>
          </CardHeader>
          <CardPanel className="flex gap-4">
            <div className="flex items-center gap-1.5 text-sm">
              <span className="flex size-6 items-center justify-center rounded-full bg-success/12 text-success-foreground">
                <ArrowDownLeftIcon className="size-3.5" />
              </span>
              <span className="text-muted-foreground">In</span>
              <span className="font-medium tabular-nums">€21,280</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="flex size-6 items-center justify-center rounded-full bg-destructive/12 text-destructive-foreground">
                <ArrowUpRightIcon className="size-3.5" />
              </span>
              <span className="text-muted-foreground">Out</span>
              <span className="font-medium tabular-nums">€31,392</span>
            </div>
          </CardPanel>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cash flow</CardTitle>
            <CardDescription>Net movement over the last 12 months.</CardDescription>
          </CardHeader>
          <CardPanel>
            <div className="flex h-28 items-end gap-1.5">
              {flow.map((value, index) => (
                <div
                  className="flex-1 rounded-sm bg-primary/80"
                  key={index}
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
          </CardPanel>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budgets</CardTitle>
            <CardDescription>Spending against limits this month.</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-5">
            {budgets.map((budget) => (
              <Meter key={budget.name} max={budget.limit} value={budget.spent}>
                <div className="flex items-center justify-between gap-2">
                  <MeterLabel className="font-medium text-sm">
                    {budget.name}
                  </MeterLabel>
                  <span className="text-muted-foreground text-sm tabular-nums">
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                  </span>
                </div>
                <MeterTrack>
                  <MeterIndicator
                    className={budget.spent > budget.limit ? "bg-destructive" : undefined}
                  />
                </MeterTrack>
              </Meter>
            ))}
          </CardPanel>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent transactions</CardTitle>
            <CardDescription>Latest activity across accounts.</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-1">
            {transactions.slice(0, 5).map((txn, index) => (
              <div key={txn.id}>
                {index > 0 && <Separator className="my-2" />}
                <div className="flex items-center gap-3">
                  <div className="grid flex-1 leading-tight">
                    <span className="font-medium text-sm">{txn.merchant}</span>
                    <span className="text-muted-foreground text-xs">
                      {txn.category} · {txn.date}
                    </span>
                  </div>
                  <span
                    className={`font-medium text-sm tabular-nums ${
                      txn.amount > 0 ? "text-success-foreground" : ""
                    }`}
                  >
                    {txn.amount > 0 ? "+" : ""}
                    {formatCurrency(txn.amount)}
                  </span>
                </div>
              </div>
            ))}
          </CardPanel>
        </Card>
      </div>
    </FinanceShell>
  );
}
