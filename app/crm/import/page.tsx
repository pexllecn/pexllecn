"use client";

import { CheckIcon, UploadCloudIcon } from "lucide-react";
import * as React from "react";
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
import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { toastManager } from "@/components/ui/toast";

const owners = [
  { label: "Assign to me", value: "me" },
  { label: "Round robin", value: "rr" },
  { label: "Leave unassigned", value: "none" },
];

export default function ImportPage() {
  const [importing, setImporting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setImporting(true);
    setDone(false);
    setTimeout(() => {
      setImporting(false);
      setDone(true);
      toastManager.add({
        description: "248 leads imported successfully.",
        title: "Import complete",
      });
    }, 1800);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      <div className="grid gap-1">
        <h2 className="font-heading font-semibold text-2xl tracking-tight">
          Import leads
        </h2>
        <p className="text-muted-foreground text-sm">
          Bring leads in from a CSV and map how they are assigned.
        </p>
      </div>

      <Card className="max-w-2xl">
        <Form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>Upload &amp; configure</CardTitle>
            <CardDescription>
              We support CSV files up to 10&nbsp;MB.
            </CardDescription>
          </CardHeader>
          <CardPanel className="space-y-6">
            <label
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-8 text-center transition-colors hover:bg-accent/50"
              htmlFor="file"
            >
              <div className="flex size-10 items-center justify-center rounded-full border bg-muted/50">
                <UploadCloudIcon className="size-5" />
              </div>
              <span className="font-medium text-sm">
                Drop your CSV here or click to browse
              </span>
              <span className="text-muted-foreground text-xs">
                leads-export.csv · up to 10 MB
              </span>
              <input className="sr-only" id="file" type="file" />
            </label>

            <Fieldset className="space-y-4">
              <FieldsetLegend>Assignment</FieldsetLegend>
              <Field>
                <FieldLabel>Owner strategy</FieldLabel>
                <Select defaultValue="rr" items={owners}>
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectPopup>
                    {owners.map((owner) => (
                      <SelectItem key={owner.value} value={owner.value}>
                        {owner.label}
                      </SelectItem>
                    ))}
                  </SelectPopup>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Daily cap per rep</FieldLabel>
                <NumberField defaultValue={25} min={0} max={200}>
                  <NumberFieldGroup>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldGroup>
                </NumberField>
                <FieldDescription>
                  New leads beyond this cap wait in a queue.
                </FieldDescription>
              </Field>
            </Fieldset>

            <Fieldset className="space-y-3">
              <FieldsetLegend>Duplicates</FieldsetLegend>
              <RadioGroup className="grid gap-2" defaultValue="skip">
                <div className="flex items-center gap-2">
                  <Radio id="skip" value="skip" />
                  <Label htmlFor="skip">Skip duplicate emails</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="merge" value="merge" />
                  <Label htmlFor="merge">Merge into existing leads</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio id="create" value="create" />
                  <Label htmlFor="create">Create anyway</Label>
                </div>
              </RadioGroup>
            </Fieldset>

            <div className="flex items-center justify-between gap-4 rounded-xl border p-3">
              <div className="grid gap-0.5">
                <Label htmlFor="notify">Notify owners</Label>
                <span className="text-muted-foreground text-sm">
                  Email each rep when leads are assigned.
                </span>
              </div>
              <Switch defaultChecked id="notify" />
            </div>
          </CardPanel>
          <CardFooter className="justify-end gap-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button disabled={importing} loading={importing} type="submit">
              {done && !importing ? (
                <>
                  <CheckIcon />
                  Imported
                </>
              ) : importing ? (
                "Importing…"
              ) : (
                "Start import"
              )}
            </Button>
          </CardFooter>
        </Form>
      </Card>

      {importing && (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Spinner />
          Processing rows and de-duplicating…
        </div>
      )}
    </div>
  );
}
