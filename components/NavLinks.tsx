import { toast } from "@/hooks/use-toast";
import { renameChatTitle } from "@/lib/actions/chat.action";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { v4 as uuid } from "uuid";
import UserProfile from "./shared/UserProfile";
import { useSidebarProvider } from "./SidBarToggleProvider";
import SidebarItem from "./SidebarItem";
import { SheetClose } from "./ui/sheet";

interface NavLinksProps {
  isMobile?: boolean;
  sidebarLists?: ChatTitleI[];
}
interface EditingItemProps {
  chatTitleId?: string;
  newTitle?: string;
  isEditing?: boolean;
}
export default function NavLinks({
  sidebarLists,
  isMobile = false,
}: NavLinksProps) {
  const { sideBarLists: currentSidebar } = useSidebarProvider();
  const router = useRouter();
  const { id: currentPrams } = useParams();
  const [editDetails, setEditDetails] = useState<EditingItemProps>({
    chatTitleId: "",
    newTitle: "",
    isEditing: false,
  });
  const [isRenaming, startTranstion] = useTransition();
  const currentPath = usePathname();
  const toggle = (detials: EditingItemProps) =>
    setEditDetails({ ...detials, isEditing: true });
  const changeText = (value: React.ChangeEvent<HTMLInputElement>) =>
    setEditDetails((prev) => {
      return { ...prev, newTitle: String(value.target.value) };
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggle({ isEditing: false });

    const isTitleChanged = sidebarLists?.find(
      (each) =>
        each.chatId === editDetails.chatTitleId &&
        each.title.trim() === editDetails.newTitle!.trim(),
    );
    if (isTitleChanged) return;

    startTranstion(async () => {
      const result = await renameChatTitle({
        chatTitleId: editDetails.chatTitleId!,
        newTitile: editDetails.newTitle!,
        currentPath: currentPath,
      });

      if (result.success) {
        toast({
          title: "Successfully Edited ",
          description: "Edited the title successfully",
        });
        return;
      }
      toast({
        title: "Failed to chnage",
        description: "Failed while changing title Name",
        variant: "destructive",
      });
    });
  };
  return (
    <div
      onMouseLeave={() => {
        if (editDetails.chatTitleId) {
          setEditDetails({});
        }
      }}
      className={cn(
        "bg-dark-gray/60 relative flex h-full w-full flex-col pt-16",
      )}
    >
      <div className="custom-scrollbar h-0 w-full grow overflow-y-auto px-4 py-10">
        <button
          onClick={() => {
            if (Array.isArray(currentPrams) && currentPrams.length > 1) return;
            const id = uuid();
            localStorage.removeItem("selectedSidebarItem");
            router.push(`/chat/new/${id}`);
          }}
          className="border-light-gray hover:!bg-light-darker hover:bg-opacity-90 transtion-colors flex h-fit w-full cursor-pointer items-center justify-start gap-4 rounded-[6px] border bg-transparent px-5 py-3 text-white outline-hidden duration-200"
        >
          <Image
            src={"/icons/plus.svg"}
            alt="plus icon"
            width={10}
            height={10}
            className="object-contain"
          />
          <span className="text-xs lg:text-sm">New chat</span>
        </button>
        <div className="flex w-full flex-col gap-1 py-5">
          {[...currentSidebar, ...(sidebarLists || [])]?.map(
            ({ title, chatId }, index) => {
              const contnet = (
                <SidebarItem
                  disable={isRenaming}
                  input={
                    chatId === editDetails.chatTitleId
                      ? (editDetails.newTitle ?? "")
                      : title
                  }
                  toggle={toggle}
                  changeText={changeText}
                  handleSubmit={handleSubmit}
                  isEditing={
                    editDetails.chatTitleId === chatId && editDetails.isEditing!
                  }
                  chatId={chatId}
                  key={index}
                  text={title}
                />
              );
              return isMobile ? (
                <SheetClose asChild key={index}>
                  {contnet}
                </SheetClose>
              ) : (
                contnet
              );
            },
          )}
        </div>
      </div>
      <div className="border-light-gray flex w-full flex-col gap-y-2 border-t px-3 py-4">
        <UserProfile />
      </div>
    </div>
  );
}
