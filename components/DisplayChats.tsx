"use client";

import { formatMessageContent } from "@/lib/responseformatters";
import { Message } from "ai";
import { FaUser } from "react-icons/fa6";
import { SiOpenaigym } from "react-icons/si";
export const dynamic = "force-dynamic";
export default function DisplayChats({ messages }: { messages: Message[] }) {
  return (
    <div className="flex-1 h-full w-full flex flex-col  p-4 gap-y-3 whitespace-pre-wrap">
      {messages.map((mes, index) => {
        return (
          <div key={index} className="mb-2">
            {mes.role === "user" && (
              <div className="flex gap-x-3  items-center  text-xl px-2 py-3 w-fit rounded-lg">
                <FaUser className="text-5xl rounded bg-base/[.4] bx-2 py-2" />
                <p>{mes.content}</p>
              </div>
            )}
            {mes.role === "assistant" && (
              <div className=" bg-base-200 relative flex gap-x-3 text-xl px-2 py-3 w-fit rounded-lg">
                <SiOpenaigym className="w-[2rem] absolute top-3 left-3 h-[2rem] text-primary" />
                <div
                  className="mt-10 py-3 px-4 text-sm text-left leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: formatMessageContent(mes.content),
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
