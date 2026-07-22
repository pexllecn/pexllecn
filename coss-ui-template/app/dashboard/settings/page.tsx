"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toastManager } from "@/components/ui/toast";

const timezones = [
  { label: "Select a timezone", value: null },
  { label: "UTC", value: "utc" },
  { label: "Europe/Berlin", value: "berlin" },
  { label: "America/New_York", value: "new-york" },
  { label: "Asia/Riyadh", value: "riyadh" },
];

const notifications = [
  {
    description: "Product updates, tips, and occasional announcements.",
    id: "marketing",
    label: "Marketing emails",
  },
  {
    description: "Get notified when someone mentions you.",
    id: "mentions",
    label: "Mentions",
  },
  {
    description: "Weekly summary of your workspace activity.",
    id: "digest",
    label: "Weekly digest",
  },
];

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { href: "/dashboard", label: "Dashboard" },
          { label: "Settings" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                This is how others will see you on the platform.
              </CardDescription>
            </CardHeader>
            <CardPanel className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel>First name</FieldLabel>
                  <Input defaultValue="Khaled" />
                </Field>
                <Field>
                  <FieldLabel>Last name</FieldLabel>
                  <Input defaultValue="A." />
                </Field>
              </div>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input defaultValue="khaled@example.com" type="email" />
                <FieldDescription>
                  We will never share your email with anyone.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel>Bio</FieldLabel>
                <Textarea placeholder="Tell us a little about yourself" />
              </Field>
              <Field>
                <FieldLabel>Timezone</FieldLabel>
                <Select items={timezones}>
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectPopup>
                    {timezones.map((item) => (
                      <SelectItem key={item.label} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectPopup>
                </Select>
              </Field>
            </CardPanel>
            <CardFooter className="justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button
                onClick={() =>
                  toastManager.add({
                    description: "Your profile has been updated.",
                    title: "Saved",
                  })
                }
              >
                Save changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Choose what you want to hear about.
              </CardDescription>
            </CardHeader>
            <CardPanel className="space-y-1">
              {notifications.map((item, index) => (
                <div key={item.id}>
                  {index > 0 && <Separator className="my-3" />}
                  <div className="flex items-center justify-between gap-4">
                    <div className="grid gap-0.5">
                      <Label htmlFor={item.id}>{item.label}</Label>
                      <span className="text-muted-foreground text-sm">
                        {item.description}
                      </span>
                    </div>
                    <Switch defaultChecked={item.id !== "marketing"} id={item.id} />
                  </div>
                </div>
              ))}
            </CardPanel>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger zone</CardTitle>
              <CardDescription>
                Permanently delete your account and all of its data.
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-end">
              <AlertDialog>
                <AlertDialogTrigger render={<Button variant="destructive" />}>
                  Delete account
                </AlertDialogTrigger>
                <AlertDialogPopup>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently
                      delete your account and remove your data from our
                      servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogClose render={<Button variant="outline" />}>
                      Cancel
                    </AlertDialogClose>
                    <AlertDialogClose
                      render={<Button variant="destructive" />}
                      onClick={() =>
                        toastManager.add({
                          description:
                            "Account deletion is disabled in this template.",
                          title: "Nothing happened",
                        })
                      }
                    >
                      Delete account
                    </AlertDialogClose>
                  </AlertDialogFooter>
                </AlertDialogPopup>
              </AlertDialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
