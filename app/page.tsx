import {
  ArrowUpRightIcon,
  CheckIcon,
  CommandIcon,
  LayersIcon,
  MoveRightIcon,
  SparklesIcon,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apps } from "@/lib/apps-data";

const accentRing: Record<string, string> = {
  neutral: "bg-neutral-500/12 text-foreground",
  blue: "bg-blue-500/12 text-blue-600 dark:text-blue-400",
  violet: "bg-violet-500/12 text-violet-600 dark:text-violet-400",
  emerald: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
};

const stats = [
  { value: "44", label: "real product pages" },
  { value: "4", label: "complete applications" },
  { value: "1", label: "shared design language" },
];

export default function HomePage() {
  return (
    <div className="min-h-svh overflow-hidden bg-background">
      <header className="relative z-10 mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <CommandIcon className="size-4" />
          </span>
          <span>Pexllecn</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#apps" className="transition-colors hover:text-foreground">Applications</a>
          <a href="#principles" className="transition-colors hover:text-foreground">Principles</a>
          <a href="#stack" className="transition-colors hover:text-foreground">Stack</a>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <a href="#apps">Explore apps</a>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main>
        <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="pointer-events-none absolute -left-32 top-0 -z-10 size-[34rem] rounded-full bg-primary/[0.035] blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-20 -z-10 size-[28rem] rounded-full bg-violet-500/[0.035] blur-3xl" />

          <div className="grid items-end gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-7 gap-2 rounded-full px-3 py-1.5 text-xs font-medium">
                <SparklesIcon className="size-3.5" />
                A living showcase of modern product UI
              </Badge>

              <h1 className="max-w-3xl text-balance font-heading text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                One design system.
                <br />
                <span className="text-muted-foreground">Four products worth exploring.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
                Pexllecn is a collection of complete, production-minded applications built to show how a thoughtful component system behaves in the real world.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="rounded-full px-5">
                  <a href="#apps">
                    Explore the collection
                    <MoveRightIcon className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-5">
                  <Link href="/dashboard">Open Workspace</Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 border-t pt-5 lg:mb-2 lg:border-t-0 lg:pt-0">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-semibold tracking-tight sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 max-w-24 text-xs leading-5 text-muted-foreground sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="apps" className="border-y bg-muted/20">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">The collection</p>
                <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Choose a workspace.</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">Each app has its own information architecture, interaction model, and visual personality while sharing the same underlying design language.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {apps.map((app, index) => (
                <Link
                  href={app.href}
                  key={app.href}
                  className="group relative overflow-hidden rounded-2xl border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl hover:shadow-black/[0.04] sm:p-8"
                >
                  <div className="absolute right-0 top-0 size-40 rounded-full bg-primary/[0.025] blur-3xl transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative flex min-h-56 flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className={`flex size-11 items-center justify-center rounded-xl ${accentRing[app.accent]}`}>
                        <LayersIcon className="size-5" />
                      </div>
                      <span className="flex size-9 items-center justify-center rounded-full border text-muted-foreground transition-all group-hover:border-foreground/30 group-hover:text-foreground">
                        <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>0{index + 1}</span>
                        <span className="h-px w-6 bg-border" />
                        <span>Application</span>
                      </div>
                      <h3 className="text-2xl font-semibold tracking-tight">{app.name}</h3>
                      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{app.tagline}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="principles" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">The idea</p>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Components should disappear into the product.</h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {[
                ["01", "Real contexts", "No isolated component gallery. Every primitive is placed inside a product that has a reason to exist."],
                ["02", "Quiet by default", "The interface gets out of the way. Hierarchy, spacing, and motion do the heavy lifting."],
                ["03", "Different products", "CRM, projects, finance, and workspace apps all demand different patterns and different decisions."],
                ["04", "Shared foundations", "Consistency comes from a common language, not from making every screen look identical."],
              ].map(([number, title, description]) => (
                <div key={number} className="border-t pt-4">
                  <div className="mb-5 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{number}</span>
                    <span className="h-px w-8 bg-border" />
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="stack" className="border-t bg-muted/20">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-20">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Built with intention</p>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">Modern stack. Minimal abstraction.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Next.js, React, Tailwind CSS, Base UI, and a shared set of composable primitives. The technology stays quiet so the product can speak.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Tailwind CSS", "Base UI"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-2 text-sm">
                  <CheckIcon className="size-3.5 text-muted-foreground" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>© 2026 Pexllecn</span>
        <span>Designed as a collection, built as a system.</span>
      </footer>
    </div>
  );
}
