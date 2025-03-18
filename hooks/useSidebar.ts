import { fetchHandler } from "@/lib/fetch-handler";
import { useQuery } from "@tanstack/react-query";

interface Props {
  userId: string;
  enabled: boolean;
}
export function useSidebar({ userId, enabled }: Props) {
  return useQuery({
    queryKey: ["sidebars"],
    enabled: enabled,
    queryFn: () => {
      return fetchHandler<ChatTitleI[] | undefined>(`/api/sidebar`, {
        method: "POST",
        body: JSON.stringify(userId),
      });
    },
  });
}
