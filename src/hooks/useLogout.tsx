import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { authService } from "@/services/auth.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogout() {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onSuccess() {
      toast.success("Вы успешно вышли из аккаунта!");
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      push(DASHBOARD_PAGES.AUTH);
    },
  });

  return { mutate };
}
