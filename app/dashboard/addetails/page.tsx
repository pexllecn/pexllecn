"use client";
import React, { useEffect, useState } from "react";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Heart, Flag, Share, Star } from "lucide-react";
import Link from "next/link";
import BreadCrumb from "@/components/breadcrumb";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const breadcrumbItems = [
  { title: "Apple iMac 27-inch", link: "/dashboard/addetails" },
];

const featuredAds = [
  {
    title: "MacBook Pro 2020",
    price: "€2,200",
    location: "Dublin",
    imageUrl: "/ma.jpeg",
    width: "1260", // Update these values
    height: "750", // Update these values
  },
  {
    title: "iPhone 15 pro max",
    price: "€1,200",
    location: "Cork",
    imageUrl: "/ip.jpeg",
    width: "1260", // Update these values
    height: "750", // Update these values
  },
  {
    title: "iPad 2019",
    price: "€800",
    location: "Lucan",
    imageUrl: "/ipa.jpeg",
    width: "1260", // Update these values
    height: "750", // Update these values
  },
  {
    title: "Apple iMac 27-inch",
    price: "€4,200",
    location: "Galway",
    imageUrl: "/imac.jpeg",
    width: "1260", // Update these values
    height: "750", // Update these values
  },
  {
    title: "MacBook Pro 2019",
    price: "€1,200",
    location: "Cherrywood",
    imageUrl: "/macbook.jpeg",
    width: "1260", // Update these values
    height: "750", // Update these values
  },
  {
    title: "Huawei Mateview 28",
    price: "€400",
    location: "Dublin",
    imageUrl: "/h.jpeg",
    width: "1260", // Update these values
    height: "750", // Update these values
  },
  {
    title: "Mac mini 2017",
    price: "€900",
    location: "Dublin",
    imageUrl: "/mini.jpeg",
    width: "1260", // Update these values
    height: "750", // Update these values
  },
];

export default function AdDetailsPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Gallery Panel */}
        <ResizablePanel className="w-full overflow-hidden" defaultSize={50}>
          {" "}
          <div className="flex flex-col h-full">
            {/* Breadcrumb with Blurred Background */}
            <div className="backdrop-blur bg-background/10">
              <div className="space-y-4 pl-8 pt-8">
                <BreadCrumb items={breadcrumbItems} />
              </div>
            </div>

            <div className="p-5 flex-1 overflow-auto">
              {/* Gallery Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="grid grid-rows-2 gap-2">
                  <Image
                    src="/pe4.jpeg"
                    alt="Small Image 1"
                    className="shadow-md border-4 border-white rounded-2xl w-full h-full"
                    width={1260} // Update these values
                    height={750} // Update these values
                  />
                  <Image
                    src="/pe3.png"
                    alt="Small Image 2"
                    className="shadow-md border-4 border-white rounded-2xl w-full h-full"
                    width={1260} // Update these values
                    height={750} // Update these values
                  />
                  <Image
                    src="/pe2.jpeg"
                    alt="Small Image 3"
                    className="shadow-md border-4 border-white rounded-2xl w-full h-full"
                    width={1260} // Update these values
                    height={750} // Update these values
                  />
                </div>
                {/* Large Image */}
                <div className="col-span-2">
                  <Image
                    src="/pe1.jpeg"
                    alt="Large Image"
                    className="shadow-md border-4 border-white rounded-2xl w-full h-full"
                    width={1260} // Update these values
                    height={750} // Update these values
                  />
                </div>
              </div>
              {/* Featured Ads Section */}
              <div className="pt-10">
                <h2 className="text-xl font-bold mb-4">Featured Ads</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {featuredAds.map((ad, index) => (
                    <div key={index} className="">
                      <Image
                        src={ad.imageUrl}
                        alt={ad.title}
                        className="shadow-md border-4 border-white rounded-2xl w-full h-40 object-cover"
                        width={1260} // Using width from your ad data
                        height={750} // Using height from your ad data
                      />
                      <p className="text-sm font-semibold pt-2">{ad.price}</p>
                      <p className="text-xs">{ad.title}</p>
                      <p className="text-xs text-gray-500">{ad.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        {/* Sidebar Panel */}
        <ResizablePanel
          defaultSize={50}
          className="p-4 md:w-1/3 w-full h-full overflow-y-auto"
          style={{ maxWidth: "350px", marginTop: 0 }}
        >
          <div className="rounded-3xl bg-muted p-8 h-full overflow-y-auto flex flex-col space-y-4">
            {/* Title */}
            <h1 className="font-bold text-2xl">Apple iMac 27-inch</h1>
            <span className="text-xs" style={{ marginTop: 0 }}>
              Posted: January 5, 2024 | 120 views | Dublin Co.
            </span>
            <p className="font-bold text-2xl">€1,299</p>

            {/* Buttons */}
            <div className="flex justify-between items-center">
              <Button className="text-sm">Contact Seller</Button>
              <div className="flex">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-sm py-1 px-2"
                >
                  <Heart strokeWidth={1} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-sm py-1 px-2"
                >
                  <Flag strokeWidth={1} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-sm py-1 px-2"
                >
                  <Share strokeWidth={1} />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Product Details */}
            <div>
              <h2 className="font-bold py-2">Product Details</h2>
              <p className="text-sm">
                This is a 27-inch iMac (2023 model) in excellent condition. It
                comes with a 3.3 GHz 6-core 10th-generation Intel Core i5
                processor, 8GB 2666MHz DDR4 memory, configurable up to 128GB,
                512GB SSD storage, and Radeon Pro 5300 with 4GB of GDDR6 memory.
              </p>
            </div>
            {/* Map Location */}
            <div>
              <h2 className="font-bold py-2">Map Location</h2>
              <Image
                src="/map.png"
                alt="Map Location"
                className="rounded-2xl w-full" // Full width image
                width={1260} // Update these values
                height={750} // Update these values
              />
            </div>
            {/* Seller Information */}
            <div>
              <h2 className="font-bold py-2">Seller Information</h2>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <div>
                  <p className="font-bold">Khaled Alkurdi</p>
                  <p className="text-muted-foreground text-xs">
                    Joined: April 2023
                  </p>
                  {/* Seller Rating */}
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-yellow-400"
                        size={16}
                        fill="currentColor"
                      />
                    ))}
                    <span className="text-xs text-gray-600 ml-2">(4.8)</span>
                  </div>
                  {/* Additional Details */}
                  <p className="text-xs">Response Rate: 98%</p>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
