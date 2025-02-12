"use client";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import { Ellipsis } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import DropDownMenu from "./DropDownMenu";
import ImageIcon from "./shared/ImageIcon";

interface SideBarItemPros {
  text: string;
  id: string;
}

export default function SidebarItem({ text, id }: SideBarItemPros) {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(text);
  const router = useRouter();
  const params = useParams();
  const toggle = () => setIsEditing((prev) => !prev);
  const changeText = (value: React.ChangeEvent<HTMLInputElement>) =>
    setInput(value.target.value);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggle();
  };
  const textFormat = (input || text).substring(
    0,
    input.length > 20 ? 20 : input.length,
  );

  function hanleSelectedSidebar() {
    const current = localStorage.getItem("selectedSidebarItem");
    if (current === String(id) && params?.id === id) {
      return;
    }
    localStorage.removeItem("sselectedSidebarItemele");
    localStorage.setItem("selectedSidebarItem", String(id));
    router.replace(`/chat/${id}`, { scroll: false });
  }
  return (
    <div
      onClick={hanleSelectedSidebar}
      className={cn(
        "bg-light-darker/4 hover:bg-opacity-90 grid h-fit w-full cursor-pointer grid-cols-[1fr_8fr_1fr_1fr] items-center gap-1.5 border-none px-1 py-3 pl-2 text-white transition-all duration-300",
        !isEditing && "hover:bg-light-gray/30",
      )}
    >
      {!isEditing && (
        <ImageIcon iconUrl={"/icons/message.svg"} alt="message icon" />
      )}
      {isEditing && (
        <motion.form
          initial={{
            y: 10,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          onSubmit={handleSubmit}
          className="col-span-full"
        >
          <input
            title="title  change input"
            autoFocus
            value={input}
            onClick={(e) => e.stopPropagation()}
            onChange={changeText}
            className={cn(
              "focus-visible:ring-Purple w-full rounded-sm border-none bg-transparent py-2 text-white shadow-none focus-visible:ring-1 focus-visible:outline-hidden",
              isEditing && "ring-dark-green ring-1",
            )}
          />
        </motion.form>
      )}
      {!isEditing && (
        <p className="line-clamp-4 h-fit text-xs font-normal text-wrap">
          {textFormat}
        </p>
      )}
      {!isEditing && (
        <DropDownMenu
          label="Settings"
          trigger={<Ellipsis className="ml-auto cursor-pointer" />}
        >
          <DropdownMenuItem
            onClick={toggle}
            className="hover:bg-medium-gray/50 flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 transition-all duration-200 hover:border-none hover:outline-hidden"
          >
            <ImageIcon iconUrl={"/icons/pen.svg"} alt="edit icon" />
            <span className="text-sm font-normal">Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-medium-gray/50 mt-5 flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1 transition-all duration-200 hover:border-none hover:outline-hidden">
            <ImageIcon
              iconUrl={"/icons/delete.svg"}
              alt="delete icon"
              imageStyle="hover:scale-[1.4] transition-all  duration-400 "
            />
            <span className="text-sm font-normal">Delete</span>
          </DropdownMenuItem>
        </DropDownMenu>
      )}
    </div>
  );
}
