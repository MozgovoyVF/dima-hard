import { userClientService } from "@/services/userClient.service";
import { useQuery } from "@tanstack/react-query";

export function useGalery() {
  const { data, isLoading, error, isRefetching, refetch } = useQuery({
    queryKey: ["galery"],
    queryFn: () => userClientService.getUserGalery(),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error, isRefetching, refetch };
}
