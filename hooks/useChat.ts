import { fetchHandler } from "@/lib/fetch-handler";
import { extractParamId } from "@/lib/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function useChats() {
  const params: Record<string, string> = useParams();
  const currentParamId = extractParamId(params);
  return useQuery({
    queryKey: [currentParamId],
    queryFn: () => fetchHandler<ChatItemI[]>(`/api/chat/${currentParamId}`, {}),
    enabled: !!currentParamId,
  });
}
