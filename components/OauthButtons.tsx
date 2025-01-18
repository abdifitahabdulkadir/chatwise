"use client";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
export function OAuthButtons() {
  return (
    <motion.div
      initial={{
        y: 20,
        opacity: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="w-fit flex-col h-full px-3 py-4 gap-3 borde flex md:flex-row"
    >
      <Button className="bg-TealGreen text-white transition-all duration-300 rounded-md px-2 py-6 hover:bg-DarkGray ">Continue with Github</Button>
      <Button className="bg-TealGreen text-white transition-colors duration-300 rounded-md px-2 py-6 hover:bg-DarkGray">Continue with Google</Button>
    </motion.div>
  );
}
