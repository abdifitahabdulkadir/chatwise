import { fetchHandler } from "@/lib/fetch-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  chatTitleId: string;
  userId: string;
}

export function useDeleteChat() {
  const router = useRouter();

  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["sidebars"],
    mutationFn: (data: Props) => {
      return fetchHandler(`/api/sidebar`, {
        method: "DELETE",
        body: JSON.stringify({ ...data }),
      });
    },

    onSuccess() {
      localStorage.removeItem("selectedSidebarItem");
      queryClient.invalidateQueries({ queryKey: ["sidebars"] });
      router.push("/chat");
    },
  });
}
