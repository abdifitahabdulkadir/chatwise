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

      const previousTodos = queryClient.getQueryData<{
        success: boolean;
        data: ChatTitleI[];
      }>(["sidebars"]);

      const index = previousTodos?.data.findIndex(
        (item) =>
          item.chatId === newItem.chatTitleId && item.userId === newItem.userId,
      );

      if (index !== -1 && index !== undefined) {
        if (previousTodos && previousTodos.data) {
          previousTodos.data[index].title = newItem?.newTitile;
        }
      }
      return { previousTodos };
    },

    onError: (__, _, context) => {
      queryClient.setQueryData(["sidebars"], context?.previousTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sidebars"] });
    },
  });
}
