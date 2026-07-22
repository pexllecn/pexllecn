import {
  ArrowLeftRightIcon,
  EllipsisIcon,
  LandmarkIcon,
  PlusIcon,
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
import { Group, GroupSeparator } from "@/components/ui/group";
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
import { accounts, formatCurrency } from "@/lib/apps-data";

const typeMeta: Record<string, "info" | "secondary" | "warning"> = {
  Checking: "info",
  Savings: "secondary",
  Credit: "warning",
};

export default function AccountsPage() {
  return (
    <FinanceShell
      title="Accounts"
      actions={
        <Button size="sm">
          <PlusIcon />
          Add account
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader className="gap-2">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg border bg-muted/50">
                  <LandmarkIcon className="size-4.5" />
                </div>
                <Badge size="sm" variant={typeMeta[account.type]}>
                  {account.type}
                </Badge>
              </div>
              <CardDescription>
                {account.name} · {account.number}
              </CardDescription>
              <CardTitle
                className={`font-semibold text-xl tabular-nums ${
                  account.balance < 0 ? "text-destructive-foreground" : ""
                }`}
              >
                {formatCurrency(account.balance)}
              </CardTitle>
            </CardHeader>
            <CardPanel>
              <Group aria-label={`${account.name} actions`} className="w-full">
                <Button className="flex-1" render={<Link href="/finance/transfer" />} size="sm" variant="outline">
                  <ArrowLeftRightIcon />
                  Transfer
                </Button>
                <GroupSeparator />
                <Menu>
                  <MenuTrigger
                    render={<Button aria-label="More" size="icon-sm" variant="outline" />}
                  >
                    <EllipsisIcon />
                  </MenuTrigger>
                  <MenuPopup align="end">
                    <MenuItem>Statements</MenuItem>
                    <MenuItem>Rename</MenuItem>
                    <MenuSeparator />
                    <MenuItem variant="destructive">Close account</MenuItem>
                  </MenuPopup>
                </Menu>
              </Group>
            </CardPanel>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All accounts</CardTitle>
          <CardDescription>A combined view of your balances.</CardDescription>
        </CardHeader>
        <CardPanel className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell className="font-mono text-muted-foreground text-sm">
                    {account.number}
                  </TableCell>
                  <TableCell>
                    <Badge size="sm" variant={typeMeta[account.type]}>
                      {account.type}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium tabular-nums ${
                      account.balance < 0 ? "text-destructive-foreground" : ""
                    }`}
                  >
                    {formatCurrency(account.balance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardPanel>
      </Card>
    </FinanceShell>
  );
}
