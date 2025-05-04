import { fetchHandler } from "@/lib/fetch-handler";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { useGetSidebars } from "./useSidebar";

interface Props {
  currentParamId: string;
  userId: string;
}

export function useStoreChats({ currentParamId, userId }: Props) {
  const { refetch } = useGetSidebars({
    userId: userId,
    enabled: !!userId,
  });

  return useMutation({
    mutationKey: [currentParamId],
    mutationFn: (data: StoreChatParams) => {
      if (!data.userId)
        throw new Error("Only Authenticated User can access this feature");
      return fetchHandler(`/api/chat/${currentParamId}`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess() {
      refetch();
    },
    onError() {
      toast({
        title: "Failed to Store Chat",
        description: "Failed to store chat, try again",
        variant: "destructive",
      });
    },
  });
}
