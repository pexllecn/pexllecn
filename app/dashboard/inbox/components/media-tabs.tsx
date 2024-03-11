"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MediaTabs() {
  return (
    <Tabs defaultValue="media" className="w-[400px]">
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
            className="rounded-md object-cover"
          />
          <img
            src="/sample.jpeg"
            alt="avater"
            className="rounded-md object-cover"
          />
        </div>
      </TabsContent>
      <TabsContent value="links"></TabsContent>
    </Tabs>
  );
}
