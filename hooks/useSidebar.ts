import { fetchHandler } from "@/lib/fetch-handler";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

interface Props {
  userId: string;
  enabled: boolean;
}
export function useGetSidebars({ userId, enabled }: Props) {
  return useInfiniteQuery({
    queryKey: ["sidebars"],
    enabled: enabled,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => {
      return fetchHandler<ChatTitleI[] | undefined>(`/api/sidebar`, {
        method: "POST",
        body: JSON.stringify({ userId, cursor: pageParam }),
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const hasNextPage = lastPage.data?.length === 0;
      const cursor = allPages.flatMap((page) => page.data, 2).length;
      return !hasNextPage ? cursor : undefined;
    },
  });
}
