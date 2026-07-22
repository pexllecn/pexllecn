import {
  ArrowRightIcon,
  BlocksIcon,
  CommandIcon,
  MoonStarIcon,
  PaletteIcon,
} from "lucide-react";
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

const features = [
  {
    description:
      "53 copy-paste components from the coss ui registry, built on Base UI primitives and styled with Tailwind CSS v4.",
    icon: BlocksIcon,
    title: "coss ui components",
  },
  {
    description:
      "The complete coss design language — neutral palette, subtle inset shadows, and crisp typography with Inter.",
    icon: PaletteIcon,
    title: "Design tokens included",
  },
  {
    description:
      "First-class light and dark themes driven by CSS variables, with a ready-made toggle and system preference support.",
    icon: MoonStarIcon,
    title: "Dark mode built in",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex h-14 items-center justify-between px-4 lg:px-6">
        <Link className="flex items-center gap-2 font-medium" href="/">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <CommandIcon className="size-4" />
          </div>
          Acme Inc
        </Link>
        <div className="flex items-center gap-2">
          <Button render={<Link href="/login" />} variant="ghost">
            Sign in
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
          <Badge variant="outline">
            Built with coss ui
            <ArrowRightIcon />
          </Badge>
          <h1 className="font-heading font-semibold text-4xl tracking-tight sm:text-5xl">
            A full-pages template, in the coss design language
          </h1>
          <p className="max-w-xl text-balance text-lg text-muted-foreground">
            Dashboard, customers, settings, and authentication pages — all
            composed from coss ui elements on top of Base UI and Tailwind CSS.
          </p>
          <div className="flex items-center gap-3">
            <Button render={<Link href="/dashboard" />} size="lg">
              Open dashboard
              <ArrowRightIcon />
            </Button>
            <Button
              render={<Link href="/login" />}
              size="lg"
              variant="outline"
            >
              Sign in
            </Button>
          </div>
        </div>

        <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="mb-2 flex size-9 items-center justify-center rounded-lg border bg-muted/50">
                  <feature.icon className="size-4.5" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
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
