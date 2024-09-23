import { userClientService } from "@/services/userClient.service";
import { useQuery } from "@tanstack/react-query";

export function useGetAllUsers() {
  const { data, isLoading, error, isRefetching } = useQuery({
    queryKey: ["users"],
    queryFn: () => userClientService.getAllUsers(),
    retry: false,
  });

  return { data, isLoading, error, isRefetching };
}
