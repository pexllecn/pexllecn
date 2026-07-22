import {
  ArrowRightIcon,
  InboxIcon,
  KanbanSquareIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  PackageIcon,
  RocketIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/ui/progress";

const shortcuts = [
  {
    description: "Browse listings by category, search, and post new ads.",
    href: "/dashboard/products",
    icon: PackageIcon,
    title: "Products",
  },
  {
    description: "Talk to your team in real time.",
    href: "/dashboard/chat",
    icon: MessageSquareIcon,
    title: "Chat",
  },
  {
    description: "Five unread conversations are waiting for you.",
    href: "/dashboard/inbox",
    icon: InboxIcon,
    title: "Inbox",
  },
  {
    description: "Track tasks across Todo, In Progress, and Done.",
    href: "/dashboard/kanban",
    icon: KanbanSquareIcon,
    title: "Kanban",
  },
  {
    description: "Revenue, subscriptions, and sales at a glance.",
    href: "/dashboard/overview",
    icon: LayoutDashboardIcon,
    title: "Overview",
  },
  {
    description: "Manage users and employees in one place.",
    href: "/dashboard/user",
    icon: UsersIcon,
    title: "People",
  },
];

const goals = [
  { label: "Monthly sales target", value: 72 },
  { label: "Onboarding completion", value: 45 },
  { label: "Support SLA", value: 93 },
];

export default function DashboardHomePage() {
  return (
    <>
      <DashboardHeader breadcrumbs={[{ label: "Home" }]} />
      <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="grid gap-1">
            <h1 className="font-heading font-semibold text-2xl tracking-tight">
              Hi Khaled, Welcome back 👋
            </h1>
            <p className="text-muted-foreground text-sm">
              Here is what is happening in your workspace today.
            </p>
          </div>
          <Button render={<Link href="/dashboard/overview" />}>
            View overview
            <ArrowRightIcon />
          </Button>
        </div>

        <Alert>
          <RocketIcon className="size-4" />
          <AlertTitle>Pexllecn has a fresh coat of paint</AlertTitle>
          <AlertDescription>
            The whole app was rebuilt with coss ui — Base UI primitives styled
            with Tailwind CSS.
          </AlertDescription>
          <AlertAction>
            <Button
              render={<a href="https://coss.com/ui" rel="noreferrer" target="_blank" />}
              size="xs"
              variant="outline"
            >
              About coss ui
            </Button>
          </AlertAction>
        </Alert>

        <div className="grid gap-4 lg:grid-cols-3">
          {goals.map((goal) => (
            <Card key={goal.label}>
              <CardPanel className="pt-6">
                <Progress value={goal.value}>
                  <div className="flex items-center justify-between">
                    <ProgressLabel className="font-medium text-sm">
                      {goal.label}
                    </ProgressLabel>
                    <ProgressValue className="text-muted-foreground text-sm" />
                  </div>
                  <ProgressTrack>
                    <ProgressIndicator />
                  </ProgressTrack>
                </Progress>
              </CardPanel>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shortcuts.map((shortcut) => (
            <Card
              className="transition-colors hover:bg-accent/50"
              key={shortcut.href}
              render={<Link href={shortcut.href} />}
            >
              <CardHeader>
                <div className="mb-2 flex size-9 items-center justify-center rounded-lg border bg-muted/50">
                  <shortcut.icon className="size-4.5" />
                </div>
                <CardTitle>{shortcut.title}</CardTitle>
                <CardDescription>{shortcut.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
