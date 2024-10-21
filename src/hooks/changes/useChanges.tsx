import { userClientService } from "@/services/userClient.service";
import { useQuery } from "@tanstack/react-query";

export function useChanges(page: number) {
  const { data, isLoading, error, isRefetching, refetch } = useQuery({
    queryKey: ["changes", page],
    queryFn: () => userClientService.getChanges(page),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error, isRefetching, refetch };
}
