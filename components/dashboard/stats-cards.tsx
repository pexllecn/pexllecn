import {
  ActivityIcon,
  CreditCardIcon,
  DollarSignIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    change: "+20.1%",
    description: "Compared to last month",
    icon: DollarSignIcon,
    title: "Total Revenue",
    trend: "up" as const,
    value: "$45,231.89",
  },
  {
    change: "+180.1%",
    description: "New signups this month",
    icon: UsersIcon,
    title: "Subscriptions",
    trend: "up" as const,
    value: "+2,350",
  },
  {
    change: "+19%",
    description: "Orders across all channels",
    icon: CreditCardIcon,
    title: "Sales",
    trend: "up" as const,
    value: "+12,234",
  },
  {
    change: "-4.5%",
    description: "Users active in the last hour",
    icon: ActivityIcon,
    title: "Active Now",
    trend: "down" as const,
    value: "+573",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader>
            <CardDescription className="flex items-center gap-1.5">
              <stat.icon className="size-3.5" />
              {stat.title}
            </CardDescription>
            <CardTitle className="font-semibold text-2xl tabular-nums">
              {stat.value}
            </CardTitle>
            <CardAction>
              <Badge variant={stat.trend === "up" ? "success" : "destructive"}>
                {stat.trend === "up" ? (
                  <TrendingUpIcon />
                ) : (
                  <TrendingDownIcon />
                )}
                {stat.change}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardPanel className="text-muted-foreground text-sm">
            {stat.description}
          </CardPanel>
        </Card>
      ))}
    </div>
  );
}
