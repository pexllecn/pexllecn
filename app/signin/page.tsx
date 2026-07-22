"use client";

import { CommandIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  OTPField,
  OTPFieldInput,
  OTPFieldSeparator,
} from "@/components/ui/otp-field";
import { Separator } from "@/components/ui/separator";
import { toastManager } from "@/components/ui/toast";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053z" />
    </svg>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export default function SignInPage() {
  const [step, setStep] = React.useState<"email" | "otp">("email");
  const [email, setEmail] = React.useState("");

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-neutral-950 p-10 text-neutral-50 lg:flex dark:border-r">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,--alpha(var(--color-white)/8%),transparent_50%),radial-gradient(ellipse_at_bottom_right,--alpha(var(--color-white)/6%),transparent_50%)]"
        />
        <Link className="relative z-10 flex items-center gap-2 font-medium" href="/">
          <div className="flex size-8 items-center justify-center rounded-lg bg-neutral-50 text-neutral-950">
            <CommandIcon className="size-4" />
          </div>
          Pexllecn
        </Link>
        <blockquote className="relative z-10 grid gap-2">
          <p className="text-lg leading-relaxed">
            &ldquo;This starter saved me countless hours of work and helped me
            deliver a polished product to my client faster than ever
            before.&rdquo;
          </p>
          <footer className="text-neutral-400 text-sm">Sofia Davis</footer>
        </blockquote>
      </div>

      <div className="relative flex flex-col items-center justify-center gap-6 p-6">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="grid gap-1 text-center">
            <h1 className="font-heading font-semibold text-2xl tracking-tight">
              {step === "email" ? "Sign in to your account" : "Check your email"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {step === "email"
                ? "Enter your email below to continue."
                : `We sent a 6-digit code to ${email || "your email"}.`}
            </p>
          </div>

          {step === "email" ? (
            <form
              className="grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                setStep("otp");
              }}
            >
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                  required
                  type="email"
                  value={email}
                />
                <FieldDescription>
                  We will send you a one-time sign-in code.
                </FieldDescription>
              </Field>
              <div className="flex items-center gap-2">
                <Checkbox defaultChecked id="remember" />
                <Label htmlFor="remember">Remember this device</Label>
              </div>
              <Button className="w-full" type="submit">
                Continue with email
              </Button>
              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-muted-foreground text-xs uppercase">
                  or continue with
                </span>
                <Separator className="flex-1" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button type="button" variant="outline">
                  <GoogleIcon />
                  Google
                </Button>
                <Button type="button" variant="outline">
                  <GitHubIcon />
                  GitHub
                </Button>
              </div>
            </form>
          ) : (
            <form
              className="grid justify-items-center gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                toastManager.add({
                  description: "Authentication is disabled in this demo.",
                  title: "Signed in",
                });
              }}
            >
              <OTPField aria-label="Verification code" length={6}>
                <OTPFieldInput />
                <OTPFieldInput aria-label="Character 2 of 6" />
                <OTPFieldInput aria-label="Character 3 of 6" />
                <OTPFieldSeparator />
                <OTPFieldInput aria-label="Character 4 of 6" />
                <OTPFieldInput aria-label="Character 5 of 6" />
                <OTPFieldInput aria-label="Character 6 of 6" />
              </OTPField>
              <Button className="w-full" type="submit">
                Verify code
              </Button>
              <Button
                onClick={() => setStep("email")}
                type="button"
                variant="ghost"
              >
                Use a different email
              </Button>
            </form>
          )}

          <p className="text-balance text-center text-muted-foreground text-xs">
            By clicking continue, you agree to our{" "}
            <Link className="underline underline-offset-4 hover:text-foreground" href="#">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link className="underline underline-offset-4 hover:text-foreground" href="#">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
