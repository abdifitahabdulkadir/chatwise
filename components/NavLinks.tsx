import { getChatSidebarTitles } from "@/lib/actions/chat.action";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserProfile from "./shared/UserProfile";
import SidebarItem from "./SidebarItem";
import { SheetClose } from "./ui/sheet";

interface NavLinksProps {
  isMobile?: boolean;
}

export default function NavLinks({ isMobile = false }: NavLinksProps) {
  const { data: sidebarData } = useQuery({
    queryKey: ["sidabartitles"],
    queryFn: async () => {
      const { data: sidebarTitles } = await getChatSidebarTitles();
      return sidebarTitles;
    },
  });
  const router = useRouter();

  return (
    <div
      className={cn(
        "bg-dark-gray/60 relative flex h-full w-full flex-col pt-16",
      )}
    >
      <div className="custom-scrollbar h-0 w-full grow overflow-y-auto px-4 py-10">
        <button
          onClick={() => {
            if (window.location.pathname === "/chat") return;
            localStorage.removeItem("selectedSidebarItem");
            router.push("/chat");
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
          {sidebarData?.map(({ title, _id }, index) => {
            const contnet = (
              <SidebarItem id={String(_id)} key={index} text={title} />
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
      </div>
      <div className="border-light-gray flex w-full flex-col gap-y-2 border-t px-3 py-4">
        <UserProfile />
      </div>
    </div>
  );
}
