import { Skeleton } from "@/components/ui/Skeleton";

export default function ChatMessageSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-20 w-full opacity-55" />
        <Skeleton className="h-16 w-full opacity-55" />
        <Skeleton className="h-10 w-full opacity-55" />
        <Skeleton className="h-10 w-full opacity-55" />
        <Skeleton className="h-10 w-full opacity-55" />
      </div>
    </div>
  );
}
