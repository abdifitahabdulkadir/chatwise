"use client";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import { Ellipsis } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import DropDownMenu from "../DropDownMenu";

interface SideBarItemPros {
  text: string;
  chatId: string;
  isEditing: boolean;
  changeText: (value: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  input: string;
  toggle: ({
    chatTitleId,
    newTitle,
  }: {
    chatTitleId: string;
    newTitle: string;
  }) => void;
  disable: boolean;
  handleDeleteChat: (chatId: string) => void;
  ref: React.RefObject<HTMLDivElement | null>;
}

export default function SidebarItem({
  chatId,
  handleSubmit,
  isEditing,
  changeText,
  text,
  input,
  disable,
  handleDeleteChat,
  toggle,
  ref,
}: SideBarItemPros) {
  const router = useRouter();
  const params = useParams();

  const currentActive = localStorage?.getItem("selectedSidebarItem");

  function hanleSelectedSidebar() {
    const current = localStorage.getItem("selectedSidebarItem");
    if (current === chatId && String(params?.id) === chatId) {
      return;
    }
    localStorage.setItem("selectedSidebarItem", String(chatId));
    if (ref.current) {
      const scrollTop = ref.current?.scrollTop;
      localStorage.setItem("scrollTop", String(scrollTop ? scrollTop : 0));
    }
    router.push(`/chat/${chatId}`, { scroll: true });
  }
  console.log("active sidebar", currentActive);
  return (
    <div
      onClick={disable ? () => {} : hanleSelectedSidebar}
      className={cn(
        "bg-light-darker/4 hover:bg-opacity-90 grid h-fit w-full cursor-pointer grid-cols-[9fr_1fr_1fr] items-center gap-1.5 rounded-md border-none py-3 pl-2 text-white transition-all duration-300",
        !isEditing && "hover:bg-light-gray/30",
        currentActive === chatId && "bg-light-gray/30",
      )}
    >
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
          onSubmit={(e) => handleSubmit(e)}
          className="col-span-full"
        >
          <input
            title="title change input"
            autoFocus
            disabled={disable}
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
        <p className="line-clamp-2 h-fit text-[0.9rem] font-normal text-wrap">
          {text}
        </p>
      )}
      {!isEditing && (
        <DropDownMenu
          label="Actions"
          trigger={<Ellipsis className="ml-auto cursor-pointer" />}
        >
          <DropdownMenuItem
            disabled={disable}
            onClick={(e) => {
              e.stopPropagation();
              toggle({ chatTitleId: chatId, newTitle: text });
            }}
            className="hover:bg-medium-gray/50 flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 transition-all duration-200 hover:border-none hover:outline-hidden"
          >
            <span className="text-sm font-normal">Edit the Title</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteChat(chatId);
            }}
            className="hover:bg-medium-gray/50 flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 transition-all duration-200 hover:border-none hover:outline-hidden"
          >
            <span className="text-sm font-normal">Delete The Chat</span>
          </DropdownMenuItem>
        </DropDownMenu>
      )}
    </div>
  );
}
