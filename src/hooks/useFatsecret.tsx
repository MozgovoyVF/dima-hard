import { useQuery } from "@tanstack/react-query";
import { axiosWithAuth } from "../app/api/interceptors";

export function useFatsecret() {
  const { data, isLoading, error, isRefetching } = useQuery({
    queryKey: ["fatsecret"],
    queryFn: async () => {
      const response = await axiosWithAuth.get("/fatsecret/exists");
      return response.data;
    },
    retry: false,
  });

  return { data, isLoading, error, isRefetching };
}
