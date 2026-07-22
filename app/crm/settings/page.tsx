"use client";

import { BellIcon, MailIcon, PhoneIcon, SmartphoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toastManager } from "@/components/ui/toast";

const channels = [
  { icon: MailIcon, id: "email", label: "Email", desc: "Daily digests and mentions." },
  { icon: SmartphoneIcon, id: "push", label: "Push", desc: "Real-time deal updates." },
  { icon: PhoneIcon, id: "sms", label: "SMS", desc: "Only for hot leads." },
];

export default function CrmSettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      <div className="grid gap-1">
        <h2 className="font-heading font-semibold text-2xl tracking-tight">
          Settings
        </h2>
        <p className="text-muted-foreground text-sm">
          Configure your CRM workspace.
        </p>
      </div>

      <div className="grid max-w-3xl gap-4">
        <Card>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              toastManager.add({ title: "Workspace saved" });
            }}
          >
            <CardHeader>
              <CardTitle>Workspace</CardTitle>
              <CardDescription>Your team&apos;s CRM identity.</CardDescription>
            </CardHeader>
            <CardPanel className="space-y-4">
              <Field>
                <FieldLabel>Workspace name</FieldLabel>
                <Input defaultValue="Atlas Sales" />
              </Field>
              <Field>
                <FieldLabel>Default currency</FieldLabel>
                <Input defaultValue="EUR (€)" />
              </Field>
              <Field>
                <FieldLabel>Pipeline view</FieldLabel>
                <ToggleGroup className="w-fit" defaultValue={["board"]}>
                  <ToggleGroupItem value="board">Board</ToggleGroupItem>
                  <ToggleGroupItem value="list">List</ToggleGroupItem>
                  <ToggleGroupItem value="forecast">Forecast</ToggleGroupItem>
                </ToggleGroup>
              </Field>
            </CardPanel>
            <CardFooter className="justify-end gap-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </CardFooter>
          </Form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose how you want to be reached.</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-1">
            {channels.map((channel, index) => (
              <div key={channel.id}>
                {index > 0 && <Separator className="my-3" />}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg border bg-muted/50">
                      <channel.icon className="size-4.5" />
                    </div>
                    <div className="grid gap-0.5">
                      <Label htmlFor={channel.id}>{channel.label}</Label>
                      <span className="text-muted-foreground text-sm">
                        {channel.desc}
                      </span>
                    </div>
                  </div>
                  <Switch defaultChecked={channel.id !== "sms"} id={channel.id} />
                </div>
              </div>
            ))}
          </CardPanel>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Working hours</CardTitle>
            <CardDescription>
              Leads outside these hours queue until morning.
            </CardDescription>
          </CardHeader>
          <CardPanel className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="grid gap-0.5">
                <span className="font-medium text-sm">Focus mode</span>
                <span className="text-muted-foreground text-sm">
                  Silence non-urgent notifications.
                </span>
              </div>
              <Toggle aria-label="Focus mode">
                <BellIcon />
                Focus
              </Toggle>
            </div>
            <Separator />
            <RadioGroup className="grid gap-2" defaultValue="9-5">
              <div className="flex items-center gap-2">
                <Radio id="9-5" value="9-5" />
                <Label htmlFor="9-5">9:00 – 17:00</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="8-6" value="8-6" />
                <Label htmlFor="8-6">8:00 – 18:00</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="always" value="always" />
                <Label htmlFor="always">Always on</Label>
              </div>
            </RadioGroup>
          </CardPanel>
        </Card>
      </div>
    </div>
  );
}
