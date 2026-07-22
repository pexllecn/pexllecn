"use client";

import {
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  SnowflakeIcon,
  WifiIcon,
} from "lucide-react";
import * as React from "react";
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider, SliderValue } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { toastManager } from "@/components/ui/toast";

const controls = [
  { id: "online", label: "Online payments", desc: "Allow e-commerce purchases." },
  { id: "atm", label: "ATM withdrawals", desc: "Cash access worldwide." },
  { id: "intl", label: "International", desc: "Payments outside the EU." },
];

export default function CardsPage() {
  const [revealed, setRevealed] = React.useState(false);
  const [frozen, setFrozen] = React.useState(false);

  return (
    <FinanceShell
      title="Cards"
      actions={
        <Button size="sm">
          <PlusIcon />
          New card
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <div className="flex flex-col gap-4">
          <div
            className={`relative flex aspect-[1.6/1] flex-col justify-between overflow-hidden rounded-2xl bg-neutral-950 p-5 text-neutral-50 shadow-xs transition-opacity ${
              frozen ? "opacity-60" : ""
            }`}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,--alpha(var(--color-white)/12%),transparent_55%)]"
            />
            <div className="relative flex items-center justify-between">
              <span className="font-medium">Ledger</span>
              <WifiIcon className="size-5 rotate-90" />
            </div>
            <div className="relative space-y-3">
              <p className="font-mono text-lg tracking-widest tabular-nums">
                {revealed ? "4021 8890 5567 9902" : "•••• •••• •••• 9902"}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span>Khaled Alkurdi</span>
                <span className="font-mono">{revealed ? "08/28" : "••/••"}</span>
              </div>
            </div>
            {frozen && (
              <Badge className="absolute top-4 right-4" variant="info">
                <SnowflakeIcon />
                Frozen
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Toggle
              className="flex-1"
              onPressedChange={setRevealed}
              pressed={revealed}
              variant="outline"
            >
              {revealed ? <EyeOffIcon /> : <EyeIcon />}
              {revealed ? "Hide details" : "Show details"}
            </Toggle>
            <Toggle
              className="flex-1"
              onPressedChange={(pressed) => {
                setFrozen(pressed);
                toastManager.add({
                  title: pressed ? "Card frozen" : "Card unfrozen",
                });
              }}
              pressed={frozen}
              variant="outline"
            >
              <SnowflakeIcon />
              Freeze
            </Toggle>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Card controls</CardTitle>
            <CardDescription>Manage how this card can be used.</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-1">
            {controls.map((control, index) => (
              <div key={control.id}>
                {index > 0 && <Separator className="my-3" />}
                <div className="flex items-center justify-between gap-4">
                  <div className="grid gap-0.5">
                    <Label htmlFor={control.id}>{control.label}</Label>
                    <span className="text-muted-foreground text-sm">
                      {control.desc}
                    </span>
                  </div>
                  <Switch defaultChecked={control.id !== "intl"} id={control.id} />
                </div>
              </div>
            ))}
            <Separator className="my-3" />
            <Slider defaultValue={4000} max={10000} min={500} step={500}>
              <div className="mb-3 flex items-center justify-between">
                <Label>Monthly spending limit</Label>
                <SliderValue className="font-medium text-sm tabular-nums">
                  {(_, value) =>
                    `€${(Array.isArray(value) ? value[0] : value).toLocaleString()}`
                  }
                </SliderValue>
              </div>
            </Slider>
          </CardPanel>
        </Card>
      </div>
    </FinanceShell>
  );
}
