import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AlignJustify } from "lucide-react";

import NavLinks from "./NavLinks";

export default function MobileSidebar() {
  return (
    <div className="hidden max-md:block">
      <Sheet>
        <SheetTrigger>
          <AlignJustify className="text-white size-[30px]" />
        </SheetTrigger>
        <SheetContent className="bg-DarkGray border-none  " side={"left"}>
          <DialogTitle className="hidden">Sidebar of chats</DialogTitle>
          <NavLinks isMobile />
        </SheetContent>
      </Sheet>
    </div>
  );
}
