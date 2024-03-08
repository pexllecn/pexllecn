"use client";
import { Separator } from "@/registry/new-york/ui/separator";
import { ProfileForm } from "@/app/dashboard/profile/profile-form";
import { motion } from "framer-motion";

export default function SettingsProfilePage() {
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
      <div className="space-y-6">
        <ProfileForm />
      </div>
    </motion.div>
  );
}
