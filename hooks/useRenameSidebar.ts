import { sidebarKey } from "@/constants";
import { fetchHandler } from "@/lib/fetch-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  chatTitleId: string;
  newTitile: string;
  userId: string;
}

export function useRenameSidebar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["sidebars"],
    mutationFn: (data: Props) => {
      return fetchHandler(`/api/sidebar`, {
        method: "PUT",
        body: JSON.stringify({ ...data }),
      });
    },
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["sidebars"] });

      const previousSidabrs = queryClient.getQueryData<{
        success: boolean;
        data: ChatTitleI[];
      }>(["sidebars"]);

      const index = previousSidabrs?.data.findIndex(
        (item) =>
          item.id === newItem.chatTitleId && item.userId === newItem.userId,
      );

      if (index !== -1 && index !== undefined) {
        if (previousSidabrs && previousSidabrs.data) {
          previousSidabrs.data[index].title = newItem?.newTitile;
        }
      }
      return { previousSidabrs };
    },

    onError: (__, _, context) => {
      queryClient.setQueryData([sidebarKey], context?.previousSidabrs);
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sidebars"] });
    },
  });
}
