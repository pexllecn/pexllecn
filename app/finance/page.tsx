import {
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  PiggyBankIcon,
  PlusIcon,
  ReceiptTextIcon,
  WalletIcon,
} from "lucide-react";
import Link from "next/link";
import { AreaChart } from "@/components/charts/area-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { StatTile, type Stat } from "@/components/apps/stat-tile";
import { FinanceShell } from "@/components/apps/finance-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { Meter, MeterIndicator, MeterLabel, MeterTrack } from "@/components/ui/meter";
import { Separator } from "@/components/ui/separator";
import { budgets, formatCurrency, transactions } from "@/lib/apps-data";

const stats: Stat[] = [
  { icon: WalletIcon, label: "Total balance", value: "€261,990", delta: "4.2%", trend: "up", spark: [55, 58, 56, 60, 62, 61, 66, 70, 68, 72, 78, 84] },
  { icon: ArrowDownLeftIcon, label: "Income (30d)", value: "€21,280", delta: "8.1%", trend: "up", spark: [12, 14, 13, 16, 18, 17, 19, 20, 18, 21, 20, 21] },
  { icon: ArrowUpRightIcon, label: "Spending (30d)", value: "€31,392", delta: "2.4%", trend: "down", spark: [30, 28, 32, 29, 33, 30, 34, 31, 33, 32, 30, 31] },
  { icon: PiggyBankIcon, label: "Saved this month", value: "€8,640", delta: "12%", trend: "up", spark: [4, 5, 5, 6, 7, 6, 7, 8, 7, 8, 8, 9] },
];

const cashflow = [
  { label: "Jan", value: 4200 },
  { label: "Feb", value: 3100 },
  { label: "Mar", value: 5300 },
  { label: "Apr", value: 4600 },
  { label: "May", value: 3900 },
  { label: "Jun", value: 5900 },
  { label: "Jul", value: 5100 },
  { label: "Aug", value: 4400 },
  { label: "Sep", value: 6200 },
  { label: "Oct", value: 5600 },
  { label: "Nov", value: 4800 },
  { label: "Dec", value: 6800 },
];

const spend = [
  { label: "Payroll", value: 28400, color: "var(--color-emerald-500)" },
  { label: "Office", value: 4400, color: "var(--color-teal-500)" },
  { label: "Travel", value: 3120, color: "var(--color-amber-500)" },
  { label: "Software", value: 1840, color: "var(--color-sky-500)" },
];

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
      <div className="relative overflow-hidden rounded-2xl border accent-gradient p-6 text-white shadow-xs animate-rise">
        <div
          aria-hidden="true"
          className="-right-16 -top-20 absolute size-64 rounded-full bg-white/20 blur-3xl"
        />
        <div className="relative grid gap-1.5">
          <span className="text-sm text-white/80">Total balance</span>
          <span className="font-heading font-semibold text-4xl tracking-tight">
            {formatCurrency(261989.75)}
          </span>
          <div className="mt-2 flex gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <ArrowDownLeftIcon className="size-4" /> €21,280 in
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ArrowUpRightIcon className="size-4" /> €31,392 out
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 stagger sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatTile key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cash flow</CardTitle>
            <CardDescription>Net movement across the year.</CardDescription>
          </CardHeader>
          <CardPanel>
            <AreaChart data={cashflow} valuePrefix="€" />
          </CardPanel>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending</CardTitle>
            <CardDescription>By category this month.</CardDescription>
          </CardHeader>
          <CardPanel>
            <DonutChart centerLabel="total" centerValue="€37.8k" data={spend} />
          </CardPanel>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budgets</CardTitle>
            <CardDescription>Spending against limits.</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-5">
            {budgets.map((budget) => {
              const over = budget.spent > budget.limit;
              return (
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
                      style={{
                        background: over
                          ? "var(--destructive)"
                          : "var(--accent-solid)",
                      }}
                    />
                  </MeterTrack>
                </Meter>
              );
            })}
          </CardPanel>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent transactions</CardTitle>
            <CardDescription>
              <Link className="underline-offset-4 hover:underline" href="/finance/transactions">
                View all
              </Link>
            </CardDescription>
          </CardHeader>
          <CardPanel className="space-y-1">
            {transactions.slice(0, 5).map((txn, index) => (
              <div key={txn.id}>
                {index > 0 && <Separator className="my-2" />}
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <ReceiptTextIcon className="size-4" />
                  </div>
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
