import { capabilites, examples, limitations } from "@/constants/emptychats";
import Image from "next/image";
import React from "react";

export default function EmptyChats() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center overflow-y-auto overflow-x-hidden px-5 py-10">
      <div className="grid h-full grid-rows-[auto_1fr] gap-y-4 pt-10">
        <Image
          src="/icons/logo.svg"
          alt="logo image"
          width={10}
          height={10}
          className="h-24 w-24 place-self-center md:h-32 md:w-32"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex w-full flex-col gap-y-3">
            {examples.map(({ text }, index) => {
              return <EmptyChatItem key={index} text={text} />;
            })}
          </div>
          <div className="flex w-full flex-col gap-y-3">
            {capabilites.map(({ text }, index) => {
              return <EmptyChatItem key={index} text={text} />;
            })}
          </div>
          <div className="flex w-full flex-col gap-y-3">
            {limitations.map(({ text }, index) => {
              return <EmptyChatItem key={index} text={text} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyChatItem({ text }: { text: string }) {
  return (
    <button className="text-wh max-h-[140px] w-[330px] rounded-[4px] bg-Daker px-2 py-3 text-center text-white transition-all duration-300 hover:bg-DarkGray">
      {text}
    </button>
  );
}
