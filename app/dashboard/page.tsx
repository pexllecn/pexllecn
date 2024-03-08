"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function SparklesPreview() {
  const { theme = "light", setTheme } = useTheme(); // Default to 'light' if theme is undefined

  // Determine particle color based on theme
  const particleColor = theme === "light" ? "#000000" : "#FFFF00";

  // Variants for motion.h1, assuming you've defined them elsewhere
  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor={particleColor} // Dynamically set based on theme
        />
      </div>
      <motion.h1
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        variants={variants1}
        className="text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
      >
        Welcome to Pexllecn
      </motion.h1>
    </div>
  );
}
