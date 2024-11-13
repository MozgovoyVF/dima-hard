import { authService } from "@/services/auth.service";
import { userClientService } from "@/services/userClient.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSendEmail() {
  const queryClient = useQueryClient();

  const { mutate, isPending, mutateAsync } = useMutation({
    mutationKey: ["send email"],
    mutationFn: async ({ name, phone, type }: { name: string; phone: string; type: string }) => {
      return await authService.sendEmail(name, phone, type);
    },
  });

  // Возвращаем mutate и isPending с правильной типизацией
  return { mutate, isPending, mutateAsync };
}
