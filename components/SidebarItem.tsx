"use client";
import React, { useState } from "react";
import ImageIcon from "./shared/ImageIcon";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SideBarItemPros {
  text: string;
  iconUrl: string;
}
export default function SidebarItem({ text, iconUrl }: SideBarItemPros) {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(text);
  const toggle = () => setIsEditing((prev) => !prev);
  const changeText = (value: React.ChangeEvent<HTMLInputElement>) => setInput(value.target.value);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggle();
  };
  const textFormat = (input || text).substring(0, input.length > 20 ? 20 : input.length);
  return (
    <div className={cn("bg-LightDaker/4 px-1  duration-300   border-none  cursor-pointer transition-all hover:bg-opacity-90 items-center gap-1.5 grid grid-cols-[1fr_8fr_1fr_1fr]  py-3 w-full h-fit text-white", !isEditing && "hover:bg-LightGray/30 ")}>
      {!isEditing && <ImageIcon iconUrl={iconUrl} alt="message icon" />}
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
          className="col-span-full "
        >
          <input title="title  change input" autoFocus value={input} onChange={changeText} className={cn("w-full bg-transparent text-white border-none shadow-none focus-visible:outline-none py-2 rounded focus-visible:ring-1  focus-visible:ring-Purple", isEditing && "ring-1 ring-Purple")} />
        </motion.form>
      )}
      {!isEditing && <p className="overflow-hidden    text-xs font-normal">{textFormat}</p>}
      {!isEditing && (
        <>
          <button onClick={toggle} title="edit chat">
            <ImageIcon iconUrl={"/icons/pen.svg"} alt="edit icon" imageStyle="hover:scale-[1.4] transition-all  duration-400 " />
          </button>
          <button title="delete chat">
            <ImageIcon iconUrl={"/icons/delete.svg"} alt="delete icon" imageStyle="hover:scale-[1.4] transition-all  duration-400 " />
          </button>
        </>
      )}
    </div>
  );
}
