"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Mail } from "@/components/mail";
import { accounts, mails } from "@/app/data";

export default function MailPage() {
  const [defaultLayout, setDefaultLayout] = useState(undefined);
  const [defaultCollapsed, setDefaultCollapsed] = useState(undefined);

  useEffect(() => {
    const getCookieValue = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const lastPart = parts.pop();
        if (lastPart !== undefined) {
          return lastPart.split(";").shift();
        }
      }
      return undefined;
    };

    const layoutCookieValue = getCookieValue("react-resizable-panels:layout");
    const collapsedCookieValue = getCookieValue(
      "react-resizable-panels:collapsed"
    );

    console.log("layout cookie value:", layoutCookieValue);
    console.log("collapsed cookie value:", collapsedCookieValue);

    const parseCookieValue = (value: string | undefined) => {
      try {
        return value ? JSON.parse(value) : undefined;
      } catch (error) {
        console.error("Error parsing cookie value:", error);
        return undefined;
      }
    };

    setDefaultLayout(parseCookieValue(layoutCookieValue));
    setDefaultCollapsed(parseCookieValue(collapsedCookieValue));
  }, []);

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
