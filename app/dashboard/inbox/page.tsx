"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Phone, Plus, SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ChatInfo } from "./components/chat-info";
import { Messages } from "./components/messages";

export default function InboxPage() {

  return (
    <>
      <div className={`w-[55%] flex-col h-full border-r hidden lg:flex`}>
        <div className="flex items-center w-full border-b py-4 px-4">
          <Avatar className="size-12">
            <AvatarImage src="/profile.avif" alt="avatar" />
          </Avatar>
          <div className="flex flex-col ml-4">
            <h3 className="text-md font-semibold">PrimeTek Team</h3>
            <p className="text-muted-foreground text-sm w-[200px] lg:w-auto">
              Ahmed, Ali, Umar, Hassan, Aqib, Zain, Saad, Aashir, Abdullah,
              Junaid
            </p>
          </div>
          <div className="flex gap-6 ml-auto">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
            <DotsHorizontalIcon className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
        <Messages />
        <div className="flex px-6 align-bottom my-4">
          <div className="flex gap-4 w-full items-center">
            <Button size="icon" className="rounded-full size-8">
              <Plus className="size-4" />
            </Button>
            <Input placeholder="Type a message" className="w-full" />
          </div>
        </div>
      </div>
      <ChatInfo />
    </>
  );
}
