"use client";

import { ShieldCheckIcon } from "lucide-react";
import { FinanceShell } from "@/components/apps/finance-shell";
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
import {
  OTPField,
  OTPFieldInput,
  OTPFieldSeparator,
} from "@/components/ui/otp-field";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toastManager } from "@/components/ui/toast";

const security = [
  { id: "2fa", label: "Two-factor authentication", desc: "Require a code at sign-in." },
  { id: "biometric", label: "Biometric approval", desc: "Approve payments with Face ID." },
  { id: "alerts", label: "Large payment alerts", desc: "Notify on transfers over €5,000." },
];

export default function FinanceSettingsPage() {
  return (
    <FinanceShell title="Settings">
      <div className="grid max-w-3xl gap-4">
        <Card>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              toastManager.add({ title: "Business profile saved" });
            }}
          >
            <CardHeader>
              <CardTitle>Business profile</CardTitle>
              <CardDescription>Details shown on invoices and statements.</CardDescription>
            </CardHeader>
            <CardPanel className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel>Legal name</FieldLabel>
                  <Input defaultValue="Pexllecn Ltd" />
                </Field>
                <Field>
                  <FieldLabel>VAT number</FieldLabel>
                  <Input defaultValue="IE1234567X" />
                </Field>
              </div>
              <Field>
                <FieldLabel>Default currency</FieldLabel>
                <RadioGroup className="flex gap-6" defaultValue="eur">
                  <div className="flex items-center gap-2">
                    <Radio id="eur" value="eur" />
                    <Label htmlFor="eur">EUR (€)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio id="gbp" value="gbp" />
                    <Label htmlFor="gbp">GBP (£)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio id="usd" value="usd" />
                    <Label htmlFor="usd">USD ($)</Label>
                  </div>
                </RadioGroup>
              </Field>
            </CardPanel>
            <CardFooter className="justify-end gap-2">
              <Button type="button" variant="outline">Cancel</Button>
              <Button type="submit">Save changes</Button>
            </CardFooter>
          </Form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Protect your account and payments.</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-1">
            {security.map((item, index) => (
              <div key={item.id}>
                {index > 0 && <Separator className="my-3" />}
                <div className="flex items-center justify-between gap-4">
                  <div className="grid gap-0.5">
                    <Label htmlFor={item.id}>{item.label}</Label>
                    <span className="text-muted-foreground text-sm">{item.desc}</span>
                  </div>
                  <Switch defaultChecked={item.id !== "biometric"} id={item.id} />
                </div>
              </div>
            ))}
          </CardPanel>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheckIcon className="size-4.5" />
              Payment PIN
            </CardTitle>
            <CardDescription>
              Enter a 6-digit PIN to authorise transfers.
            </CardDescription>
          </CardHeader>
          <CardPanel>
            <OTPField aria-label="Payment PIN" length={6}>
              <OTPFieldInput />
              <OTPFieldInput />
              <OTPFieldInput />
              <OTPFieldSeparator />
              <OTPFieldInput />
              <OTPFieldInput />
              <OTPFieldInput />
            </OTPField>
          </CardPanel>
          <CardFooter className="justify-end">
            <Button
              onClick={() => toastManager.add({ title: "Payment PIN updated" })}
            >
              Update PIN
            </Button>
          </CardFooter>
        </Card>
      </div>
    </FinanceShell>
  );
}
