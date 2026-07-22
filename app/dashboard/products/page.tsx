"use client";

import {
  CarIcon,
  HeartIcon,
  HomeIcon,
  LaptopIcon,
  MapPinIcon,
  PackageIcon,
  PlusIcon,
  SearchIcon,
  ShirtIcon,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { toastManager } from "@/components/ui/toast";
import { products, type Product } from "@/lib/data";

const categories = [
  { label: "All", value: "all" },
  { label: "Electronics", value: "electronics" },
  { label: "Cars", value: "cars" },
  { label: "Real Estate", value: "realestate" },
  { label: "Clothes", value: "clothes" },
  { label: "Other", value: "other" },
];

const categoryIcon: Record<Product["category"], typeof LaptopIcon> = {
  cars: CarIcon,
  clothes: ShirtIcon,
  electronics: LaptopIcon,
  other: PackageIcon,
  realestate: HomeIcon,
};

export default function ProductsPage() {
  const [category, setCategory] = React.useState("all");
  const [query, setQuery] = React.useState("");

  const filtered = products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesQuery = product.title
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { href: "/dashboard", label: "Dashboard" },
          { label: "Products" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="grid gap-1">
            <h1 className="font-heading font-semibold text-2xl tracking-tight">
              Products
            </h1>
            <p className="text-muted-foreground text-sm">
              Browse listings across every category.
            </p>
          </div>
          <Button
            onClick={() =>
              toastManager.add({
                description: "Posting ads is disabled in this demo.",
                title: "Post an ad",
              })
            }
          >
            <PlusIcon />
            Post an ad
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Tabs onValueChange={(value) => setCategory(value as string)} value={category}>
            <TabsList>
              {categories.map((item) => (
                <TabsTab key={item.value} value={item.value}>
                  {item.label}
                </TabsTab>
              ))}
            </TabsList>
          </Tabs>
          <div className="relative ms-auto w-full sm:max-w-56">
            <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2.5 size-4 text-muted-foreground" />
            <Input
              className="ps-8"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products…"
              value={query}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <Empty className="min-h-72 rounded-2xl border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PackageIcon />
              </EmptyMedia>
              <EmptyTitle>No products found</EmptyTitle>
              <EmptyDescription>
                Try a different search or category.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => {
              const Icon = categoryIcon[product.category];
              return (
                <Card
                  className="transition-colors hover:bg-accent/50"
                  key={product.id}
                  render={<Link href="/dashboard/addetails" />}
                >
                  <CardPanel className="pt-6 pb-0">
                    <div className="flex h-36 items-center justify-center rounded-xl border bg-muted/50">
                      <Icon className="size-10 text-muted-foreground" />
                    </div>
                  </CardPanel>
                  <CardHeader className="pt-4">
                    <CardTitle className="flex items-center justify-between gap-2 text-base">
                      {product.title}
                      <span className="shrink-0 font-semibold tabular-nums">
                        {product.price}
                      </span>
                    </CardTitle>
                    <CardDescription className="flex w-full items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <MapPinIcon className="size-3.5" />
                        {product.location}
                      </span>
                      <span>{product.postedAt}</span>
                      <span className="ms-auto inline-flex items-center gap-2">
                        <Badge
                          variant={product.condition === "New" ? "success" : "secondary"}
                        >
                          {product.condition}
                        </Badge>
                        <HeartIcon className="size-4" />
                      </span>
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between text-muted-foreground text-sm">
          <span>
            Showing {filtered.length} of {products.length} listings
          </span>
          <div className="flex items-center gap-2">
            <Button disabled size="sm" variant="outline">
              Previous
            </Button>
            <Button disabled size="sm" variant="outline">
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
