"use client";

import { CheckIcon } from "lucide-react";
import * as React from "react";
import { DashboardHeader } from "@/components/dashboard-header";
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
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/components/ui/progress";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toastManager } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const steps = [
  { description: "Your basic details", title: "Personal" },
  { description: "Where you are based", title: "Address" },
  { description: "Confirm everything", title: "Review" },
];

const countries = [
  { label: "Select a country", value: null },
  { label: "Ireland", value: "ie" },
  { label: "Germany", value: "de" },
  { label: "United Arab Emirates", value: "ae" },
  { label: "Egypt", value: "eg" },
];

export default function ProfilePage() {
  const [step, setStep] = React.useState(0);

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { href: "/dashboard", label: "Dashboard" },
          { label: "Profile" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
          <div className="grid gap-1">
            <h1 className="font-heading font-semibold text-2xl tracking-tight">
              Profile
            </h1>
            <p className="text-muted-foreground text-sm">
              Complete your profile in {steps.length} quick steps.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {steps.map((item, index) => (
              <button
                className={cn(
                  "grid cursor-pointer gap-1 rounded-xl border p-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                  index === step
                    ? "border-primary/32 bg-accent"
                    : "hover:bg-accent/50",
                )}
                key={item.title}
                onClick={() => setStep(index)}
                type="button"
              >
                <span className="flex items-center gap-2 font-medium text-sm">
                  <span
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full border text-xs",
                      index < step &&
                        "border-transparent bg-primary text-primary-foreground",
                      index === step && "border-primary",
                    )}
                  >
                    {index < step ? <CheckIcon className="size-3" /> : index + 1}
                  </span>
                  {item.title}
                </span>
                <span className="text-muted-foreground text-xs">
                  {item.description}
                </span>
              </button>
            ))}
          </div>

          <Progress value={((step + 1) / steps.length) * 100}>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>

          <Card>
            <CardHeader>
              <CardTitle>{steps[step].title}</CardTitle>
              <CardDescription>{steps[step].description}</CardDescription>
            </CardHeader>
            <CardPanel className="space-y-4">
              {step === 0 && (
                <>
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
                    <FieldLabel>I am a…</FieldLabel>
                    <RadioGroup className="flex gap-6" defaultValue="buyer">
                      <div className="flex items-center gap-2">
                        <Radio id="buyer" value="buyer" />
                        <Label htmlFor="buyer">Buyer</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Radio id="seller" value="seller" />
                        <Label htmlFor="seller">Seller</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Radio id="both" value="both" />
                        <Label htmlFor="both">Both</Label>
                      </div>
                    </RadioGroup>
                  </Field>
                </>
              )}
              {step === 1 && (
                <>
                  <Field>
                    <FieldLabel>Street address</FieldLabel>
                    <Input placeholder="1 Main Street" />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel>City</FieldLabel>
                      <Input placeholder="Dublin" />
                    </Field>
                    <Field>
                      <FieldLabel>Postcode</FieldLabel>
                      <Input placeholder="D01 F5P2" />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel>Country</FieldLabel>
                    <Select items={countries}>
                      <SelectTrigger className="w-full sm:w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectPopup>
                        {countries.map((item) => (
                          <SelectItem key={item.label} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectPopup>
                    </Select>
                  </Field>
                </>
              )}
              {step === 2 && (
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">Khaled A.</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">khaled@pexllecn.com</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Account type</span>
                    <span className="font-medium">Buyer</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">Dublin, Ireland</span>
                  </div>
                </div>
              )}
            </CardPanel>
            <CardFooter className="justify-between">
              <Button
                disabled={step === 0}
                onClick={() => setStep((current) => Math.max(0, current - 1))}
                variant="outline"
              >
                Previous
              </Button>
              {step < steps.length - 1 ? (
                <Button onClick={() => setStep((current) => current + 1)}>
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    toastManager.add({
                      description: "Your profile has been saved.",
                      title: "Profile complete",
                    })
                  }
                >
                  Finish
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
