"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ChatInput() {
  const [inputChange, setInputChange] = useState("");
  const [rows, setRows] = useState(inputChange.length);

  const hanldeInputChnage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputChange(e.target.value);
    if (inputChange.length < 100) setRows(1);
    else if (inputChange.length < 300) setRows(2);
    else if (inputChange.length < 500) setRows(3);
    else if (inputChange.length < 800) setRows(4);
    else if (inputChange.length < 1000) setRows(5);
  };

  return (
    <div className="w-full px-10 flex items-center justify-center ">
      <form className=" w-full bg-[#40414E] px-5 max-w-[767px] flex items-center gap-1 py-2 rounded-[4px] ">
        <textarea
          value={inputChange}
          onChange={hanldeInputChnage}
          placeholder="Ask Anything..."
          rows={inputChange.length === 0 ? 1 : rows}
          className={cn("bg-transparent outline-none border-none flex-grow shadow-none overflow-y-auto resize-none text-white focus-visible:ring-0 max-h-[10rem] h-auto min-h-[2.5rem] leading-6 custom-scrollbar")}
        />

        <button className="hover:scale-[1.2] transition-all duration-200">
          <Image src={"/icons/send.svg"} alt="send icon " width={20} height={20} loading="eager" quality={90} className="object-contain" />
        </button>
      </form>
    </div>
  );
}
