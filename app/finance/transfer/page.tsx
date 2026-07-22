"use client";

import { ArrowRightIcon, SendIcon } from "lucide-react";
import * as React from "react";
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
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/components/ui/combobox";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
} from "@/components/ui/number-field";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toastManager } from "@/components/ui/toast";
import { accounts, recipients } from "@/lib/apps-data";

const accountItems = accounts.map((a) => ({ label: `${a.name} · ${a.number}`, value: a.id }));

export default function TransferPage() {
  const [amount, setAmount] = React.useState<number | null>(1500);

  return (
    <FinanceShell title="Transfer">
      <div className="mx-auto grid w-full max-w-xl gap-4">
        <Card>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              toastManager.add({
                description: "Your transfer is being processed.",
                title: "Transfer submitted",
              });
            }}
          >
            <CardHeader>
              <CardTitle>Send money</CardTitle>
              <CardDescription>
                Move funds between accounts or to a recipient.
              </CardDescription>
            </CardHeader>
            <CardPanel className="space-y-4">
              <Field>
                <FieldLabel>From account</FieldLabel>
                <Select defaultValue={accountItems[0].value} items={accountItems}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectPopup>
                    {accountItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectPopup>
                </Select>
              </Field>

              <Field>
                <FieldLabel>Recipient</FieldLabel>
                <Combobox items={recipients}>
                  <ComboboxInput placeholder="Search recipients…" />
                  <ComboboxPopup>
                    <ComboboxEmpty>No recipients found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: { label: string; value: string }) => (
                        <ComboboxItem key={item.value} value={item}>
                          {item.label}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxPopup>
                </Combobox>
                <FieldDescription>
                  Start typing to find a saved recipient.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel>Amount (EUR)</FieldLabel>
                <NumberField
                  min={0}
                  onValueChange={setAmount}
                  step={50}
                  value={amount ?? undefined}
                >
                  <NumberFieldGroup>
                    <NumberFieldInput className="text-lg" />
                  </NumberFieldGroup>
                </NumberField>
              </Field>

              <Field>
                <FieldLabel>Reference</FieldLabel>
                <Input placeholder="Invoice #2042" />
              </Field>

              <Field>
                <FieldLabel>Note (optional)</FieldLabel>
                <Textarea placeholder="Add a message for your records…" />
              </Field>
            </CardPanel>
            <CardFooter className="justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">You send</span>{" "}
                <span className="font-semibold tabular-nums">
                  €{(amount ?? 0).toLocaleString()}
                </span>
              </div>
              <Button type="submit">
                <SendIcon />
                Send transfer
                <ArrowRightIcon />
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </div>
    </FinanceShell>
  );
}
