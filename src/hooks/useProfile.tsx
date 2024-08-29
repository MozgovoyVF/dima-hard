import { profileService } from "@/services/profile.service";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  const { data, isLoading, error, isRefetching } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.getProfile(),
  });

  return { data, isLoading, error, isRefetching };
}