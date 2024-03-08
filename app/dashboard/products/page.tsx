"use client";
import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import { motion } from "framer-motion";

const breadcrumbItems = [{ title: "Products", link: "/dashboard/products" }];
export default function page() {
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.25 }}
      variants={variants1}
    >
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <Heading title={`Products`} description="" />{" "}
      </div>
    </motion.div>
  );
}
