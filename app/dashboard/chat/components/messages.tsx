"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { OnlineStatusAvatar } from "./online-status-avatar";

export function Messages() {
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
    <ScrollArea className="flex-grow">
      <div className="text-sm w-full flex flex-col gap-8 p-4 h-full">
        {messages.map((message, index) =>
          message.name === "Me" ? (
            <div className="flex gap-4 flex-row-reverse ml-auto" key={index}>
              <OnlineStatusAvatar status="green" className="size-9" />
              <div className="py-2 px-4 bg-black text-white dark:bg-white dark:text-black rounded-md max-w-[200px] sm:max-w-[400px]">
                <p>{message.message}</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-4" key={index}>
              <OnlineStatusAvatar status="green" className="size-9" />
              <div className="py-2 px-4 bg-muted/80 rounded-md max-w-[200px] sm:max-w-[400px]">
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
