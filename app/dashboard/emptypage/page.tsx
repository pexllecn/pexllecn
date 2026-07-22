"use client";

import { FolderOpenIcon, PlusIcon } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { toastManager } from "@/components/ui/toast";

export default function EmptyPage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { href: "/dashboard", label: "Dashboard" },
          { label: "Empty Page" },
        ]}
      />
      <div className="flex flex-1 flex-col p-4 lg:p-6">
        <Empty className="flex-1 rounded-2xl border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderOpenIcon />
            </EmptyMedia>
            <EmptyTitle>Nothing here yet</EmptyTitle>
            <EmptyDescription>
              This page is intentionally empty — a blank canvas for your next
              feature.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              onClick={() =>
                toastManager.add({
                  description: "This is where your feature would begin.",
                  title: "Let's build",
                })
              }
            >
              <PlusIcon />
              Create something
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </>
  );
}
