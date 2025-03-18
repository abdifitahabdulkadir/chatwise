import { fetchHandler } from "@/lib/fetch-handler";
import { useQuery } from "@tanstack/react-query";

interface Props {
  currentParamId: string;
  enabled: boolean;
}

export function useChats({ currentParamId, enabled }: Props) {
  return useQuery({
    queryKey: [currentParamId],
    queryFn: () => fetchHandler<ChatItemI[]>(`/api/chat/${currentParamId}`),
    enabled: enabled,
  });
}
