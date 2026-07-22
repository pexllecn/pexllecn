"use client";

import { PlusIcon, SendIcon } from "lucide-react";
import { FinanceShell } from "@/components/apps/finance-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { toastManager } from "@/components/ui/toast";
import { recipients } from "@/lib/apps-data";

function initialsOf(label: string) {
  return label.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

export default function RecipientsPage() {
  return (
    <FinanceShell
      title="Recipients"
      actions={
        <Button size="sm">
          <PlusIcon />
          Add recipient
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              toastManager.add({
                description: "A batch payment run has been queued.",
                title: "Batch created",
              });
            }}
          >
            <CardHeader>
              <CardTitle>New batch payment</CardTitle>
              <CardDescription>
                Pay several recipients at once.
              </CardDescription>
            </CardHeader>
            <CardPanel>
              <Field name="recipients">
                <FieldLabel>Recipients</FieldLabel>
                <Combobox items={recipients} multiple>
                  <ComboboxChips>
                    <ComboboxValue>
                      {(value: { value: string; label: string }[]) => (
                        <>
                          {value?.map((item) => (
                            <ComboboxChip aria-label={item.label} key={item.value}>
                              {item.label.split(" · ")[0]}
                            </ComboboxChip>
                          ))}
                          <ComboboxChipsInput
                            placeholder={value.length > 0 ? undefined : "Select recipients…"}
                          />
                        </>
                      )}
                    </ComboboxValue>
                  </ComboboxChips>
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
                  Selected recipients appear as chips above.
                </FieldDescription>
              </Field>
            </CardPanel>
            <CardFooter className="justify-end">
              <Button type="submit">
                <SendIcon />
                Create batch
              </Button>
            </CardFooter>
          </Form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saved recipients</CardTitle>
            <CardDescription>{recipients.length} beneficiaries on file.</CardDescription>
          </CardHeader>
          <CardPanel className="space-y-1">
            {recipients.map((recipient, index) => (
              <div key={recipient.value}>
                {index > 0 && <Separator className="my-2" />}
                <div className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback>{initialsOf(recipient.label)}</AvatarFallback>
                  </Avatar>
                  <div className="grid leading-tight">
                    <span className="font-medium text-sm">
                      {recipient.label.split(" · ")[0]}
                    </span>
                    <span className="font-mono text-muted-foreground text-xs">
                      {recipient.label.split(" · ")[1]}
                    </span>
                  </div>
                  <Button className="ms-auto" size="sm" variant="ghost">
                    Pay
                  </Button>
                </div>
              </div>
            ))}
          </CardPanel>
        </Card>
      </div>
    </FinanceShell>
  );
}
