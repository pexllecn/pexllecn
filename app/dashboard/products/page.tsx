"use client";
import { useState } from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import BreadCrumb from "@/components/breadcrumb";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import Image from "next/image";
export default function page() {
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const FirstTabData = [
    {
      key: "all",
      title: "All",
    },
    {
      key: "electronics",
      title: " Electronics ",
    },
    {
      key: "cars",
      title: "Cars",
    },
    {
      key: "realstate",
      title: "Real State",
    },
    {
      key: "clothes",
      title: "Clothes",
    },
    {
      key: "other",
      title: "Other",
    },
  ];

  const SecondTabData = [
    {
      key: "popular",
      title: "Popular",
    },
    {
      key: "newreleases",
      title: "New  Releases",
    },
    {
      key: "recentadded",
      title: "Recent Added",
    },
    {
      key: "foryou",
      title: "For You",
    },
  ];

  const selectedTabData = [
    {
      price: "$200",
      productName: "Mac Book",
      location: "Pakistan",
      productType: "cars",
      rating: "4.7",
      imagePath: "/images/car.jpg",
      imageWidth: 200,
      imageHeight: 110,
    },
    {
      price: "$500",
      productName: "IPhone 15 pro max",
      location: "Bahrain",
      productType: "electronics",
      rating: "4.7",
      imagePath: "/images/mobile.jpg",
      imageWidth: 200,
      imageHeight: 110,
    },
    {
      price: "$2000",
      productName: "House of Dream",
      location: "Dubai",
      productType: "realstate",
      rating: "4.7",
      imagePath: "/images/realState.jpg",
      imageWidth: 200,
      imageHeight: 110,
    },
    {
      price: "$20",
      productName: "Movie",
      location: "Galway",
      productType: "other",
      rating: "4.7",
      imagePath: "/images/a.avif",
      imageWidth: 200,
      imageHeight: 110,
    },
    {
      price: "1500$",
      productName: "Beautiful House",
      location: "Maddina",
      productType: "realstate",
      rating: "4.7",
      imagePath: "/images/realState.jpg",
      imageWidth: 200,
      imageHeight: 110,
    },
    {
      price: "$20",
      productName: "Clothes",
      location: "Maka",
      productType: "clothes",
      rating: "4.7",
      imagePath: "/images/cloths.jfif",
      imageWidth: 200,
      imageHeight: 110,
    },

    // ... add more product data here
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.25 }}
      variants={variants1}
    >
      <div className="flex-1 space-y-1">
        <div className="flex w-full flex-col">
          <Tabs defaultValue="all" className="space-y-4  rounded-md p-3">
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between overflow-x-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <TabsList className="flex gap-2 mb-2 sm:mb-0">
                {FirstTabData.map((tab) => (
                  <TabsTrigger key={tab.key} value={tab.key}>
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="flex gap-2 p-2">
                <div className="flex items-center border rounded-md ">
                  <SearchIcon size={20} className="ml-2" />
                  <Input
                    type="text"
                    placeholder="Search Product"
                    className="border-none focus:outline-none focus:border-none ml-2 flex-1"
                  />
                </div>

                <Button variant="outline" size="icon">
                  <BellIcon size={20} color="currentColor" />
                </Button>

                <Button variant="outline" size="icon">
                  <Avatar className="h-5 w-5">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-black font-semibold dark:text-white">
                Featured Ads
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {FirstTabData.map((tab) => (
              <TabsContent value={tab.key} className="space-y-4  pb-8">
                <div
                  className="flex justify-start space-x-4 overflow-x-auto hide-scrollbar overflow-hidden"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "transparent transparent",
                    msOverflowStyle: "none",
                  }}
                >
                  {selectedTabData
                    .filter(
                      (product) =>
                        product.productType === tab.key || tab.key == "all"
                    )
                    .map((product) => (
                      <div
                        key={product.productType}
                        className="max-w-md rounded-lg p-1 mb-3 hover:shadow-lg hover:bg-gray-200 dark:hover:shadow-lg dark:hover:bg-gray-900"
                        style={{ width: 210, height: 190 }}
                      >
                        <div
                          className="relative flex-shrink-0 overflow-hidden"
                          style={{ width: 200, height: 110 }}
                        >
                          <Image
                            src={product.imagePath}
                            alt="Movie Poster"
                            width={product.imageWidth}
                            height={product.imageHeight}
                            className="rounded-lg object-cover"
                            style={{ width: "100%", height: "100%" }}
                          />

                          <div className="absolute top-0 right-0 m-2  from-transparent to-black rounded-sm px-2 py-1">
                            <p className="bg-white dark:bg-gray-800 rounded-sm px-1 font-bold text-xs dark:text-white">
                              {product.rating}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-1 ">
                          <div>
                            <p className="text-lg font-bold text-gray-800 dark:text-white">
                              {product.price}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-white">
                              {product.productName}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-white">
                              {product.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <Tabs defaultValue="popular" className="space-y-4 ">
                  <div
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between overflow-x-auto"
                    style={{ scrollbarWidth: "none" }}
                  >
                    <TabsList className="flex gap-2 mb-2 sm:mb-0 bg-transparent space-x-4">
                      {SecondTabData.map((tabs) => (
                        <TabsTrigger value={tabs.key} className="text-md p-1">
                          {tabs.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <Button variant="secondary" className="sm:ml-4">
                      Show All
                    </Button>
                  </div>

                  {SecondTabData.map((tabs) => (
                    <TabsContent value={tabs.key} className="space-y-4">
                      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {selectedTabData
                          .filter(
                            (product) =>
                              product.productType === tab.key ||
                              tab.key === "all"
                          )
                          .map((product) => (
                            <div
                              key={product.productType}
                              className="max-w-md rounded-lg p-1 mb-2 hover:shadow-lg hover:bg-gray-200 overflow-hidden dark:hover:shadow-lg dark:hover:bg-gray-900"
                              style={{ width: "100%", height: 300 }}
                            >
                              <div
                                className="relative flex-shrink-0 overflow-hidden"
                                style={{ width: "100%", height: 200 }}
                              >
                                <Image
                                  src={product.imagePath}
                                  alt="Movie Poster"
                                  width={product.imageWidth}
                                  height={product.imageHeight}
                                  className="rounded-lg object-cover"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                  }}
                                />
                                <div className="absolute top-0 right-0 m-2  from-transparent to-black rounded-sm px-2 py-1">
                                  <p className="bg-white dark:bg-gray-800 rounded-sm px-1 font-bold text-xs dark:text-white">
                                    {product.rating}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between p-1">
                                <div>
                                  <p className="text-lg font-bold text-gray-800 dark:text-white">
                                    {product.price}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-white">
                                    {product.productName}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-white">
                                    {product.location}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
}
