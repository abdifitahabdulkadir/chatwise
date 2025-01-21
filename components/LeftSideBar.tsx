import React from "react";
import { motion } from "framer-motion";
import NavLinks from "./NavLinks";
import { cn } from "@/lib/utils";

export default function DesktoLeftSideBar() {
  return (
    <motion.section
      initial={{
        translateX: -40,
      }}
      animate={{
        translateX: 0,
      }}
      transition={{
        duration: 0.2,
      }}
      className={cn("h-screen sticky  top-0 max-md:hidden  ")}
    >
      <NavLinks />
    </motion.section>
  );
}
