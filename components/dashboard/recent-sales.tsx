import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const sales = [
  {
    amount: "+$1,999.00",
    email: "olivia.martin@email.com",
    initials: "OM",
    name: "Olivia Martin",
  },
  {
    amount: "+$39.00",
    email: "jackson.lee@email.com",
    initials: "JL",
    name: "Jackson Lee",
  },
  {
    amount: "+$299.00",
    email: "isabella.nguyen@email.com",
    initials: "IN",
    name: "Isabella Nguyen",
  },
  {
    amount: "+$99.00",
    email: "will@email.com",
    initials: "WK",
    name: "William Kim",
  },
  {
    amount: "+$39.00",
    email: "sofia.davis@email.com",
    initials: "SD",
    name: "Sofia Davis",
  },
];

export function RecentSales() {
  return (
    <div className="space-y-6">
      {sales.map((sale) => (
        <div className="flex items-center gap-4" key={sale.email}>
          <Avatar className="size-9">
            <AvatarFallback>{sale.initials}</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5 text-sm leading-tight">
            <span className="font-medium">{sale.name}</span>
            <span className="text-muted-foreground text-xs">{sale.email}</span>
          </div>
          <span className="ml-auto font-medium text-sm tabular-nums">
            {sale.amount}
          </span>
        </div>
      ))}
    </div>
  );
}
