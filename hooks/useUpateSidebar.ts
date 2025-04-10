import { fetchHandler } from "@/lib/fetch-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  data: ChatTitleI;
}

export function useUpateSidebar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["sidebars"],
    mutationFn: (data: Props) => {
      return fetchHandler(`/api/sidebar/create`, {
        method: "POST",
        body: JSON.stringify({ ...data.data }),
      });
    },
    onMutate: async ({ data }: Props) => {
      await queryClient.cancelQueries({ queryKey: ["sidebars"] });
      let previousSidebars = queryClient.getQueryData<{
        success: boolean;
        data: ChatTitleI[];
      }>(["sidebars"]);

      const index = previousSidebars?.data.findIndex(
        (item) => item.chatId === data.chatId && item.userId === data.userId,
      );

      if (index === -1 || index === undefined) {
        previousSidebars?.data.push(data);
      }

      return previousSidebars;
    },

    onError: (__, _, context) => {
      queryClient.setQueryData(["sidebars"], context?.data);
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sidebars"] });
    },
  });
}
