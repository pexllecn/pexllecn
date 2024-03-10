"use client";
import { useEffect, useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input, Search } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DotsHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import { TabsContent } from "@radix-ui/react-tabs";
import {
  Bell,
  Download,
  Info,
  MoveRight,
  Phone,
  Plus,
  SearchIcon,
  Video,
  Volume2,
} from "lucide-react";

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
    <div className="flex border m-6 h-[1000px] rounded-xl">
      <div className="w-full lg:w-1/5 h-full border-r p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Chats</h2>
          <PlusIcon className="h-6 w-6 text-foreground" />
        </div>
        <Search placeholder="Search" className="mt-8 mb-6" />
        <Tabs defaultValue="chat">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="call">Call</TabsTrigger>
          </TabsList>
        </Tabs>
        <ScrollArea className="mt-6 w-full h-[780px]">
          {[...Array(12)].map((_, index) => (
            <ChatCard key={index} />
          ))}
        </ScrollArea>
      </div>
      <div className="w-[55%] flex flex-col h-full border-r">
        <div className="flex items-center w-full border-b py-4 px-4">
          <img
            src="/profile.avif"
            alt="avater"
            className="rounded-full w-11 h-11 object-cover"
          />
          <div className="flex flex-col ml-4">
            <h3 className="text-md font-semibold">PrimeTek Team</h3>
            <p className="text-muted-foreground text-sm">
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
        <div className="w-full flex flex-col gap-6 p-4">
          <Messages />
        </div>
        <div className="flex mt-auto h-[900px] px-6">
          <div className="flex gap-4 w-full items-center">
            <Button size="icon" className="rounded-full size-8">
              <Plus className="size-4" />
            </Button>
            <Input placeholder="Type a message" className="w-full" />
          </div>
        </div>
      </div>
      <div className="h-full w-[25%] px-6">
        <div className="flex flex-col h-60 items-center justify-center">
          <Avatar className="size-24">
            <AvatarImage src="/profile.avif" alt="avatar" />
          </Avatar>
          <h3 className="text-lg font-semibold mt-4">PrimeTek Team</h3>
          <p className="text-muted-foreground text-md">@primetek-team</p>
        </div>
        <div className="flex items-center w-full gap-4 justify-center">
          <Button size="icon" variant="ghost">
            <Phone className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button size="icon" variant="ghost">
            <Video className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button size="icon" variant="ghost">
            <MoveRight className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button size="icon" variant="ghost">
            <Info className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
        <div className="flex flex-col gap-4 w-full py-8">
          <SettingEntry icon={Bell} title="Notifications">
            <Switch />
          </SettingEntry>
          <SettingEntry icon={Volume2} title="Sound">
            <Switch />
          </SettingEntry>
          <SettingEntry icon={Download} title="Save to downloads">
            <Switch />
          </SettingEntry>
        </div>
        <div>
          <p className="font-semibold">Members</p>
          <div className="flex flex-col w-full my-4">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex rounded-md items-center w-full gap-4 py-3 px-1 hover:bg-muted"
              >
                <Avatar className="size-7">
                  <AvatarImage src="/profile.avif" alt="avatar" />
                </Avatar>
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold">Cody Fisher</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <MediaTabs />
        </div>
      </div>
    </div>
  );
}

function MediaTabs() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="media">Media</TabsTrigger>
        <TabsTrigger value="links">Links</TabsTrigger>
      </TabsList>
      <TabsContent value="media">
        <div className="grid grid-cols-3 gap-3 mt-4">
          <img
            src="/sample.jpeg"
            alt="avater"
            className="rounded-md object-cover"
          />
          <img
            src="/sample.jpeg"
            alt="avater"
            className="rounded-md object-cover"
          />
          <img
            src="/sample.jpeg"
            alt="avater"
            className="rounded-md object-cover"
          />
          <img
            src="/sample.jpeg"
            alt="avater"
            className="rounded-md w-20 h-20 object-cover"
          />
          <img
            src="/sample.jpeg"
            alt="avater"
            className="rounded-md w-20 h-20 object-cover"
          />
        </div>
      </TabsContent>
      <TabsContent value="links"></TabsContent>
    </Tabs>
  );
}

function ChatCard() {
  // just for demo
  const randomBoolean = () => Math.random() < 0.5;
  const showNotification = randomBoolean();

  return (
    <div className="w-full flex px-2 items-center py-4 hover:bg-muted">
      <img
        src="/profile.avif"
        alt="avater"
        className="rounded-full w-11 h-11 object-cover"
      />
      <div className="w-full px-3 flex flex-col gap-[1px]">
        <div className="flex justify-between w-full items-center">
          <h3 className="text-md font-semibold">Cody Fisher</h3>
          <p className="text-muted-foreground text-[13px]">11:30</p>
        </div>
        <div className="flex justify-between w-full items-center">
          <h3
            className={`text-sm text-muted-foreground truncate ${
              showNotification ? "w-[200px]" : "w-[240px]"
            }`}
          >
            Hey there! I have heard about Primoieoav
          </h3>
          {showNotification && (
            <span className="bg-black h-4 w-4 ml-3 text-white flex flex-col items-center justify-center rounded-full text-[12px] font-thin pb-[1px]">
              2
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingEntry({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 items-center">
      <Icon className="size-5" />
      <p className="text-md font-semibold">{title}</p>
      <div className="ml-auto">{children}</div>
    </div>
  );
}

function Messages() {
  const messages = [
    {
      name: "PrimeVue Team",
      image: null,
      message: "PrimeVue rocks! Simplifies UI dev with versatile components.",
    },
    {
      name: "PrimeTek Team",
      image: null,
      message: "Intriguing! Tell us more about its impact.",
    },
    {
      name: "PrimeTek Team",
      message:
        "Diverse content - software, AI, cybersecurity, mobile tech, and more. Ideal for all skill levels!",
      image: "/sample.jpeg",
    },
    {
      name: "Me",
      image: null,
      message: "Customizable themes, responsive design - UI excellence!",
    },
    {
      name: "PrimeTek Team",
      image: null,
      message: "Love it! Fast-tracking our development is key.",
    },
    {
      name: "PrimeTek Team",
      image: null,
      message: "Documentation rocks too - smooth integration for all.",
    },
    {
      name: "PrimeTek Team",
      image: null,
      message: "Documentation rocks too - smooth integration for all.",
    },
    {
      name: "Me",
      image: null,
      message: "Documentation rocks too - smooth integration for all.",
    },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="w-full flex flex-col gap-8 p-4 h-[800px]">
        {messages.map((message, index) =>
          message.name === "Me" ? (
            <div className="flex gap-4 flex-row-reverse ml-auto" key={index}>
              <img
                src="/profile.avif"
                alt="avatar"
                className="rounded-full w-9 h-9 object-cover"
              />
              <div className="py-2 px-4 bg-black text-white rounded-md max-w-[400px]">
                <p>{message.message}</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-4" key={index}>
              <img
                src="/profile.avif"
                alt="avatar"
                className="rounded-full w-9 h-9 object-cover"
              />
              <div className="py-2 px-4 bg-slate-100 rounded-md max-w-[400px]">
                <p>{message.message}</p>
                {message!.image && (
                  <img
                    src={message?.image}
                    alt="image"
                    className="w-full object-cover rounded-md my-2"
                  />
                )}
              </div>
            </div>
          )
        )}
      </div>
    </ScrollArea>
  );
}
