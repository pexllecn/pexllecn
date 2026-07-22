"use client";

import { CommandIcon } from "lucide-react";
import Link from "next/link";
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
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-sidebar p-4">
      <Link
        className="flex items-center gap-2 font-medium text-foreground"
        href="/"
      >
        <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <CommandIcon className="size-4" />
        </div>
        Acme Inc
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Sign in to your account to continue.
          </CardDescription>
        </CardHeader>
        <CardPanel className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">
              <GoogleIcon />
              Google
            </Button>
            <Button variant="outline">
              <GitHubIcon />
              GitHub
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-xs uppercase">or</span>
            <Separator className="flex-1" />
          </div>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              toastManager.add({
                description: "Authentication is disabled in this template.",
                title: "Signed in",
              });
            }}
          >
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                autoComplete="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </Field>
            <Field>
              <div className="flex w-full items-center justify-between">
                <FieldLabel>Password</FieldLabel>
                <Link
                  className="text-muted-foreground text-sm underline-offset-4 hover:text-foreground hover:underline"
                  href="#"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                autoComplete="current-password"
                placeholder="••••••••"
                required
                type="password"
              />
            </Field>
            <div className="flex items-center gap-2">
              <Checkbox defaultChecked id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </form>
        </CardPanel>
        <CardFooter className="justify-center text-muted-foreground text-sm">
          Don&apos;t have an account?
          <Link
            className="ms-1 text-foreground underline-offset-4 hover:underline"
            href="#"
          >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
