import { Skeleton } from "../ui/skeleton";

export function SidebarSkelton() {
  return (
    <div className="mt-5 w-full">
      <Skeleton className="!bg-medium-gray/50 h-[50px] w-full rounded-md border-none px-1 py-3 pl-2" />
    </div>
  );
}
export function UserItemSkelton() {
  return (
    <div className="flex w-full items-center gap-1">
      <Skeleton className="h-[50px] w-[50px] rounded-full border-none px-1 py-3 pl-2 opacity-20" />
      <Skeleton className="h-[50px] w-full border-none px-1 py-3 pl-2 opacity-20" />
    </div>
  );
}
export function SystemItemSkelton() {
  return (
    <div className="flex w-full gap-1">
      <Skeleton className="h-[50px] w-[50px] rounded-full border-none px-1 py-3 pl-2 opacity-20" />
      <Skeleton className="h-[200px] w-full border-none px-1 py-3 pl-2 opacity-20" />
    </div>
  );
}
