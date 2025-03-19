import { useRenameSidebar } from "@/hooks/useRenameSidebar";
import { useGetSidebars } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import UserProfile from "./shared/UserProfile";
import { useSidebarProvider } from "./SidBarToggleProvider";
import SidebarItem from "./SidebarItem";
import { SidebarSkelton } from "./Skeltons";
import { SheetClose } from "./ui/sheet";

interface NavLinksProps {
  isMobile?: boolean;
}
interface EditingItemProps {
  chatTitleId?: string;
  newTitle?: string;
  isEditing?: boolean;
}
export default function NavLinks({ isMobile = false }: NavLinksProps) {
  const { sideBarLists: currentSidebar } = useSidebarProvider();
  const router = useRouter();
  const { id: currentPrams } = useParams();
  const session = useSession();
  const userId = (session.data && session?.data?.user?.id) ?? "";
  const [editDetails, setEditDetails] = useState<EditingItemProps>({
    chatTitleId: "",
    newTitle: "",
    isEditing: false,
  });

  const {
    data: sidebars,
    isFetchedAfterMount,
    isLoading,
  } = useGetSidebars({
    enabled: !!session.data,
    userId,
  });

  const { mutate, isPending: isRenaming } = useRenameSidebar();

  const toggle = (detials: EditingItemProps) =>
    setEditDetails({ ...detials, isEditing: true });

  const changeText = (value: React.ChangeEvent<HTMLInputElement>) =>
    setEditDetails((prev) => {
      return { ...prev, newTitle: String(value.target.value) };
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggle({ isEditing: false });

    const isTitleChanged = sidebars?.data?.find(
      (each) =>
        each.chatId === editDetails.chatTitleId &&
        each.title.trim() === editDetails.newTitle!.trim(),
    );

    if (isTitleChanged) return;
    if (!editDetails.chatTitleId || !userId || !editDetails.newTitle) return;

    mutate({
      userId,
      newTitile: editDetails.newTitle ?? "",
      chatTitleId: editDetails.chatTitleId ?? "",
    });
  };

  const data = isFetchedAfterMount
    ? sidebars?.data
    : [...currentSidebar, ...(sidebars?.data ?? [])];

  return (
    <div
      onMouseLeave={
        isLoading
          ? () => {}
          : () => {
              if (editDetails.chatTitleId) {
                setEditDetails({});
              }
            }
      }
      className={cn(
        "bg-dark-gray/60 relative flex h-full w-full flex-col pt-16",
      )}
    >
      <div className="custom-scrollbar h-0 w-full grow overflow-y-auto px-4 py-10">
        <button
          disabled={isLoading}
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
        {isLoading ? (
          Array.from({ length: 6 }, (_, index) => {
            return <SidebarSkelton key={index} />;
          })
        ) : (
          <div className="flex w-full flex-col gap-1 py-5">
            {data &&
              data.map(({ title, chatId }, index) => {
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
                      editDetails.chatTitleId === chatId &&
                      editDetails.isEditing!
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
              })}
          </div>
        )}
      </div>
      <div className="border-light-gray flex w-full flex-col gap-y-2 border-t px-3 py-4">
        <UserProfile />
      </div>
    </div>
  );
}
