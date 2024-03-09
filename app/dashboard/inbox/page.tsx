"use client";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "@radix-ui/react-icons";

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
    <div className="flex flex-col border m-6 h-full rounded-xl">
      <div className="w-[350px] h-full border-r p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Chats</h2>
          <PlusIcon className="h-6 w-6 text-foreground" />
        </div>
        <Input placeholder="Search" className="mt-8 mb-6" />
        <Tabs>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Chat</TabsTrigger>
            <TabsTrigger value="password">Call</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
