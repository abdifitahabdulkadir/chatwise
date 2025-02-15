"use client";
import { cn } from "@/lib/utils";
import { ArrowUp, Paperclip } from "lucide-react";
import { useEffect, useRef } from "react";

interface ChatInputProps {
  isLoading: boolean;
  hanldeOnChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  handleFormSubmit: (event?: { preventDefault?: () => void }) => void;
  inputValue: string;
}
export default function ChatInput({
  handleFormSubmit,
  hanldeOnChange,
  inputValue,
  isLoading,
}: ChatInputProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(
    function () {
      const textarea = ref.current;
      if (textarea) {
        // Reset height to auto to calculate new height
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    },
    [inputValue],
  );

  return (
    <div className="flex h-full w-full items-center justify-center px-10">
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className={cn(
          "flex max-h-[15rem] w-full max-w-[767px] flex-col gap-1 overflow-hidden rounded-lg bg-[#40414E] px-5 py-3",
        )}
      >
        <textarea
          onKeyDown={(e) => {
            if (e.code === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleFormSubmit(e);
            }
          }}
          disabled={isLoading}
          ref={ref}
          value={inputValue}
          onChange={hanldeOnChange}
          rows={1}
          placeholder="Ask Anything..."
          className={cn(
            "custom-scrollbar grow resize-none border-none bg-transparent leading-6 text-white shadow-none outline-none focus-visible:ring-0",
            "min-h-[2.5rem ] overflow-y-auto",
          )}
        />
        <div className="flex w-fit items-center justify-end gap-x-2 self-end">
          <div className="flex size-[2.3rem] items-center justify-center rounded-full bg-white/50 p-1 transition-all duration-200 hover:scale-[1.1]">
            <input type="file" id="fileInput" className="hidden" />
            <button
              className="cursor-pointer"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <Paperclip className="text-darker size-4" />
            </button>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="ml-auto cursor-pointer"
          >
            <div className="flex size-[2.3rem] items-center justify-center rounded-full bg-white/50 p-1 transition-all duration-200 hover:scale-[1.1]">
              {isLoading ? (
                <div className="bg-dark-gray size-4 animate-pulse rounded-md p-1" />
              ) : (
                <ArrowUp className="text-darker" />
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
