"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, Phone, Plus, SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChatInfo } from "./components/chat-info";
import { Messages } from "./components/messages";

export default function InboxPage() {
  const [showInfo, setShowInfo] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`w-full ${
        pathname !== "/dashboard/inbox" ? "" : "hidden lg:flex lg:w-[78%]"
      }`}
    >
      <div
        className={`flex-col h-full lg:border-r transition-all duration-500 ease-in-out ${
          showInfo ? "lg:w-4/6 hidden lg:flex" : "lg:w-full w-full flex"
        }`}
      >
        <div className="flex items-center w-full border-b py-4 px-4">
          <Avatar className="size-12">
            <AvatarImage src="/profile.avif" alt="avatar" />
          </Avatar>
          <div className="flex flex-col ml-4">
            <h3 className="text-md font-semibold">PrimeTek Team</h3>
            <p className="text-muted-foreground text-sm w-auto lg:w-auto">
              Ahmed, Ali, Umar, Hassan, Aqib, Zain, Saad, Aashir, Abdullah,
              Junaid
            </p>
          </div>
          <div className="flex gap-6 ml-auto items-center">
            <Phone className="w-5 h-5 text-muted-foreground hidden lg:block" />
            <SearchIcon className="w-5 h-5 text-muted-foreground hidden lg:block" />
            <Button
              size="icon"
              variant="ghost"
              className=""
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <Messages />
        <div className="flex px-2 lg:px-6 align-bottom my-4 bottom-0">
          <div className="flex gap-2 lg:gap-4 w-full items-center">
            <Button size="icon" className="rounded-lg">
              <Plus className="size-4" />
            </Button>
            <Input placeholder="Type a message" className="w-full" />
          </div>
        </div>
      </div>
      <div
        className={`lg:flex lg:flex-col transition-all duration-500 ease-in-out ${
          showInfo
            ? "translate-x-0 lg:w-2/6 w-full flex"
            : "translate-x-full lg:w-0 w-0 hidden"
        }`}
      >
        <ChatInfo />
      </div>
    </div>
  );
}
