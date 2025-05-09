import { useDeleteChat } from "@/hooks/useDeleteChat";
import { useRenameSidebar } from "@/hooks/useRenameSidebar";
import { useGetSidebars } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { v4 as uuid } from "uuid";
import InfiniteScrollWrapper from "../InfiniteScrollWrapper";
import { SidebarSkelton } from "../shared/Skeltons";
import UserProfile from "../shared/UserProfile";
import { SheetClose } from "../ui/sheet";
import SidebarItem from "./SidebarItem";

interface NavLinksProps {
  isMobile?: boolean;
}
interface EditingItemProps {
  chatTitleId?: string;
  newTitle?: string;
  isEditing?: boolean;
}

export default function NavLinks({ isMobile = false }: NavLinksProps) {
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
    data: pages,
    isLoading,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useGetSidebars({
    enabled: !!session.data,
    userId,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { mutate: renameSidebar, isPending: isRenaming } = useRenameSidebar();
  const { mutate: deleteChat } = useDeleteChat();

  const toggle = (detials: EditingItemProps) =>
    setEditDetails({ ...detials, isEditing: true });

  const sidebars = pages?.pages.flatMap((page) => page.data, 2) ?? [];

  const changeText = (value: React.ChangeEvent<HTMLInputElement>) =>
    setEditDetails((prev) => {
      return { ...prev, newTitle: String(value.target.value) };
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggle({ isEditing: false });

    const isTitleChanged = sidebars?.find(
      (each) =>
        each?.id === editDetails.chatTitleId &&
        each?.title.trim() === editDetails.newTitle!.trim(),
    );

    if (
      !isTitleChanged &&
      (!editDetails.chatTitleId || !userId || !editDetails.newTitle)
    )
      renameSidebar({
        userId,
        newTitile: editDetails.newTitle ?? "",
        chatTitleId: editDetails.chatTitleId ?? "",
      });
  };

  // handle delete chat
  function handleDeleteChat(chatId: string) {
    deleteChat({
      chatTitleId: chatId,
      userId,
    });
  }

  // responsible for scrolling to the postion we left off
  useEffect(function () {
    const element = ref.current;
    if (element) {
      const previousScrollPosition =
        Number(localStorage.getItem("scrollTop")) || 0;
      element.scrollTop = previousScrollPosition;
    }
  }, []);
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
      <div
        ref={ref}
        className="custom-scrollbar h-0 w-full grow overflow-auto px-4 py-10"
      >
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
          <InfiniteScrollWrapper
            onBottotomReached={() =>
              !isFetching && hasNextPage && fetchNextPage()
            }
          >
            <div className="flex w-full flex-col gap-1 py-5">
              {sidebars.length > 0 &&
                sidebars.map((item, index) => {
                  const id = item?.id;
                  const title = item?.title;
                  const contnet = (
                    <SidebarItem
                      ref={ref}
                      disable={isRenaming}
                      input={
                        id === editDetails.chatTitleId
                          ? (editDetails.newTitle ?? "")
                          : (title ?? "")
                      }
                      toggle={toggle}
                      handleDeleteChat={handleDeleteChat}
                      changeText={changeText}
                      handleSubmit={handleSubmit}
                      isEditing={
                        editDetails.chatTitleId === id && editDetails.isEditing!
                      }
                      chatId={id ?? ""}
                      key={index}
                      text={title ?? ""}
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
            {isFetching && <ClipLoader color="#0fa47f" size={30} />}
          </InfiniteScrollWrapper>
        )}
      </div>
      <div className="border-light-gray flex w-full flex-col gap-y-2 border-t px-3 py-4">
        <UserProfile />
      </div>
    </div>
  );
}
