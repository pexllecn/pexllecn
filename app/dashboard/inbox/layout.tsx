"use client";

import { Search } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "@radix-ui/react-icons";
import { ChatCard } from "./components/chat-card";
import { usePathname } from "next/navigation";

export default function InboxPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex border h-full rounded-xl">
      <div
        className={`w-full lg:w-1/5 h-full lg:border-r ${
          pathname === "/dashboard/inbox" ? "flex" : "hidden lg:flex"
        } flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl font-semibold">Chats</h2>
          <PlusIcon className="h-6 w-6 text-foreground" />
        </div>
        <Search placeholder="Search" className="mt-8 mb-6 mx-4" />
        <Tabs defaultValue="chat" className="mx-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="call">Call</TabsTrigger>
          </TabsList>
        </Tabs>

        <ScrollArea className={`mt-6 w-full flex-grow`}>
          {[...Array(24)].map((_, index) => (
            <ChatCard key={index} />
          ))}
        </ScrollArea>
      </div>
      {/* <p>{pathname}</p> */}
      {children}
    </div>
  );
}
