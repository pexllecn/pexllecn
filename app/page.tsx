import {
  ArrowRightIcon,
  BarChart3Icon,
  CommandIcon,
  FolderKanbanIcon,
  LayoutDashboardIcon,
  SparklesIcon,
  WalletIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const appCards: {
  href: string;
  name: string;
  tagline: string;
  accent: string;
  icon: LucideIcon;
  pages: string;
  shell: string;
}[] = [
  {
    href: "/dashboard",
    name: "Workspace",
    tagline: "Dashboard, chat, inbox, kanban and tables — the all-in-one starter.",
    accent: "",
    icon: LayoutDashboardIcon,
    pages: "14 pages",
    shell: "Collapsible sidebar",
  },
  {
    href: "/crm",
    name: "Atlas CRM",
    tagline: "Leads, deals and pipeline in a focused top-navigation sales workspace.",
    accent: "accent-blue",
    icon: BarChart3Icon,
    pages: "10 pages",
    shell: "Top navigation",
  },
  {
    href: "/projects",
    name: "Trak Projects",
    tagline: "Boards, backlog, sprints and releases with a floating sidebar.",
    accent: "accent-violet",
    icon: FolderKanbanIcon,
    pages: "10 pages",
    shell: "Floating sidebar",
  },
  {
    href: "/finance",
    name: "Ledger Finance",
    tagline: "Accounts, transactions, budgets and cards in an inset-sidebar bank.",
    accent: "accent-emerald",
    icon: WalletIcon,
    pages: "10 pages",
    shell: "Inset sidebar",
  },
];

const metrics = [
  { value: "4", label: "Complete apps" },
  { value: "44", label: "Unique pages" },
  { value: "53", label: "Components used" },
  { value: "100%", label: "coss ui" },
];

export default function HomePage() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Ambient hero backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="accent-orb accent-blue absolute -top-32 -left-24 size-[32rem] animate-float" />
        <div className="accent-orb accent-violet absolute -top-16 right-0 size-[30rem] animate-float-slow" />
        <div className="accent-orb accent-emerald absolute top-1/2 left-1/3 size-[28rem] animate-float" />
      </div>

      <header className="relative z-10 flex h-16 items-center justify-between px-4 lg:px-8">
        <span className="flex items-center gap-2 font-medium">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <CommandIcon className="size-4" />
          </div>
          Pexllecn
        </span>
        <ThemeToggle />
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-14 px-4 py-16 lg:px-8">
        <div className="flex max-w-2xl flex-col items-start gap-5 animate-rise">
          <Badge className="gap-1.5" variant="outline">
            <SparklesIcon className="size-3.5" />
            Four apps · one design system
          </Badge>
          <h1 className="font-heading font-semibold text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            Beautiful products,
            <br />
            built entirely with{" "}
            <span className="accent-blue text-gradient">coss ui</span>.
          </h1>
          <p className="max-w-xl text-balance text-lg text-muted-foreground">
            A suite of complete applications composed only from coss ui on Base
            UI and Tailwind CSS — every component in the library, working
            together in a real product.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button render={<Link href="/dashboard" />} size="lg">
              Open Workspace
              <ArrowRightIcon />
            </Button>
            <Button render={<Link href="/crm" />} size="lg" variant="outline">
              Explore Atlas CRM
            </Button>
          </div>
        </div>

        <div className="grid gap-4 stagger sm:grid-cols-2">
          {appCards.map((app) => (
            <Link
              className={cn(
                "lift group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-xs/5",
                app.accent,
              )}
              href={app.href}
              key={app.href}
            >
              <div
                aria-hidden="true"
                className="-right-16 -top-16 absolute size-40 rounded-full bg-[var(--accent-soft)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="relative flex items-start justify-between">
                <div className="flex size-11 items-center justify-center rounded-xl accent-gradient text-white shadow-xs">
                  <app.icon className="size-5" />
                </div>
                <ArrowRightIcon className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--accent-text)]" />
              </div>
              <div className="relative mt-4 grid gap-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-semibold text-lg">{app.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{app.tagline}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge size="sm" variant="secondary">
                    {app.pages}
                  </Badge>
                  <Badge size="sm" variant="outline">
                    {app.shell}
                  </Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-4 animate-fade">
          {metrics.map((metric) => (
            <div className="bg-card px-6 py-5 text-center" key={metric.label}>
              <div className="font-heading font-semibold text-3xl tracking-tight">
                {metric.value}
              </div>
              <div className="mt-0.5 text-muted-foreground text-sm">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 flex h-14 items-center justify-center border-t text-muted-foreground text-sm">
        Built with
        <a
          className="mx-1 text-foreground underline-offset-4 hover:underline"
          href="https://coss.com/ui"
          rel="noreferrer"
          target="_blank"
        >
          coss ui
        </a>
        — the design system of Cal.com.
      </footer>
    </div>
  );
}
