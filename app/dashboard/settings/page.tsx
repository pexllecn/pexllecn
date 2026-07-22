"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toastManager } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const timezones = [
  { label: "Select a timezone", value: null },
  { label: "UTC", value: "utc" },
  { label: "Europe/Dublin", value: "dublin" },
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

const sidebarItems = [
  { defaultChecked: true, id: "recents", label: "Recents" },
  { defaultChecked: true, id: "home", label: "Home" },
  { defaultChecked: false, id: "applications", label: "Applications" },
  { defaultChecked: false, id: "desktop", label: "Desktop" },
];

const themes = [
  { icon: SunIcon, label: "Light", value: "light" },
  { icon: MoonIcon, label: "Dark", value: "dark" },
  { icon: MonitorIcon, label: "System", value: "system" },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

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
          <div className="grid gap-1">
            <h1 className="font-heading font-semibold text-2xl tracking-tight">
              Settings
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your account settings and preferences.
            </p>
          </div>

          <Tabs defaultValue="general">
            <TabsList>
              <TabsTab value="general">General</TabsTab>
              <TabsTab value="appearance">Appearance</TabsTab>
              <TabsTab value="display">Display</TabsTab>
              <TabsTab value="notifications">Notifications</TabsTab>
            </TabsList>

            <TabsPanel className="space-y-4 pt-4" value="general">
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
                    <Input defaultValue="khaled@pexllecn.com" type="email" />
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
                                "Account deletion is disabled in this demo.",
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
            </TabsPanel>

            <TabsPanel className="space-y-4 pt-4" value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>
                    Select the theme for the dashboard.
                  </CardDescription>
                </CardHeader>
                <CardPanel>
                  <div className="grid grid-cols-3 gap-3">
                    {themes.map((item) => (
                      <button
                        className={cn(
                          "grid cursor-pointer justify-items-center gap-2 rounded-xl border p-4 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                          mounted && theme === item.value
                            ? "border-primary/32 bg-accent"
                            : "hover:bg-accent/50",
                        )}
                        key={item.value}
                        onClick={() => setTheme(item.value)}
                        type="button"
                      >
                        <item.icon className="size-5" />
                        <span className="font-medium text-sm">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </CardPanel>
              </Card>
            </TabsPanel>

            <TabsPanel className="space-y-4 pt-4" value="display">
              <Card>
                <CardHeader>
                  <CardTitle>Sidebar</CardTitle>
                  <CardDescription>
                    Select the items you want to display in the sidebar.
                  </CardDescription>
                </CardHeader>
                <CardPanel>
                  <CheckboxGroup className="gap-3">
                    {sidebarItems.map((item) => (
                      <div className="flex items-center gap-2" key={item.id}>
                        <Checkbox
                          defaultChecked={item.defaultChecked}
                          id={item.id}
                        />
                        <Label htmlFor={item.id}>{item.label}</Label>
                      </div>
                    ))}
                  </CheckboxGroup>
                </CardPanel>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Font size</CardTitle>
                  <CardDescription>
                    Adjust the interface font size.
                  </CardDescription>
                </CardHeader>
                <CardPanel>
                  <Slider defaultValue={50} />
                </CardPanel>
              </Card>
            </TabsPanel>

            <TabsPanel className="space-y-4 pt-4" value="notifications">
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
                        <Switch
                          defaultChecked={item.id !== "marketing"}
                          id={item.id}
                        />
                      </div>
                    </div>
                  ))}
                </CardPanel>
              </Card>
            </TabsPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}
