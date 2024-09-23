import { useQuery } from "@tanstack/react-query";
import { axiosWithAuth } from "../app/api/interceptors";
import { IProfileUser } from "@/types/user.types";

export function useFatsecretUsers() {
  const { data, isLoading, error, isRefetching } = useQuery({
    queryKey: ["fatsecret_users"],
    queryFn: async () => {
      const response = await axiosWithAuth.get<IProfileUser[]>("/fatsecret/users");
      return response.data;
    },
    retry: false,
  });

  return { data, isLoading, error, isRefetching };
}
