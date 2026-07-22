import {
  ActivityIcon,
  CreditCardIcon,
  DollarSignIcon,
  UsersIcon,
} from "lucide-react";
import { StatTile, type Stat } from "@/components/apps/stat-tile";

const stats: Stat[] = [
  { icon: DollarSignIcon, label: "Total Revenue", value: "$45,231.89", delta: "20.1%", trend: "up", spark: [30, 34, 32, 40, 44, 42, 50, 55, 53, 60, 66, 72] },
  { icon: UsersIcon, label: "Subscriptions", value: "+2,350", delta: "180.1%", trend: "up", spark: [10, 14, 18, 22, 30, 38, 44, 52, 60, 68, 74, 82] },
  { icon: CreditCardIcon, label: "Sales", value: "+12,234", delta: "19%", trend: "up", spark: [40, 44, 42, 48, 52, 50, 58, 62, 60, 66, 70, 74] },
  { icon: ActivityIcon, label: "Active Now", value: "+573", delta: "4.5%", trend: "down", spark: [60, 58, 62, 59, 63, 60, 64, 58, 61, 57, 55, 54] },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 stagger md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatTile key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
