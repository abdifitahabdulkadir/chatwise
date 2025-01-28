import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import NavLinks from "./NavLinks";

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
        duration: 0.3,
      }}
      className={cn("sticky top-0 h-screen max-md:hidden")}
    >
      <NavLinks />
    </motion.section>
  );
}
