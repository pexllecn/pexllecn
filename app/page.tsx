import { ArrowRightIcon, CommandIcon, LayersIcon } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apps } from "@/lib/apps-data";

const accentRing: Record<string, string> = {
  neutral: "bg-neutral-500/12 text-foreground",
  blue: "bg-blue-500/12 text-blue-600 dark:text-blue-400",
  violet: "bg-violet-500/12 text-violet-600 dark:text-violet-400",
  emerald: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
};

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex h-14 items-center justify-between px-4 lg:px-6">
        <span className="flex items-center gap-2 font-medium">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <CommandIcon className="size-4" />
          </div>
          Pexllecn
        </span>
        <ThemeToggle />
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-10 px-4 py-16">
        <div className="flex max-w-2xl flex-col gap-4">
          <Badge className="w-fit" variant="outline">
            <LayersIcon />
            Four apps · one design system
          </Badge>
          <h1 className="font-heading font-semibold text-4xl tracking-tight sm:text-5xl">
            Built entirely with coss ui
          </h1>
          <p className="text-balance text-lg text-muted-foreground">
            A suite of complete applications — 44 pages in total — composed only
            from coss ui components on Base UI and Tailwind CSS. Every component
            in the library, used in a real product context.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {apps.map((app) => (
            <Card
              className="group transition-colors hover:bg-accent/50"
              key={app.href}
              render={<Link href={app.href} />}
            >
              <CardHeader>
                <div
                  className={`mb-2 flex size-10 items-center justify-center rounded-xl ${accentRing[app.accent]}`}
                >
                  <LayersIcon className="size-5" />
                </div>
                <CardTitle className="flex items-center justify-between">
                  {app.name}
                  <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </CardTitle>
                <CardDescription>{app.tagline}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>

      <footer className="flex h-14 items-center justify-center border-t text-muted-foreground text-sm">
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
