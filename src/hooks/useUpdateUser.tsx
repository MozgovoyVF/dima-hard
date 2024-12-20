import { userClientService } from "@/services/userClient.service";
import { DeepPartial, IUser } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate, isPending, mutateAsync } = useMutation({
    mutationKey: ["user update"],
    mutationFn: async (user: DeepPartial<IUser>): Promise<IUser> => {
      return await userClientService.update(user);
    },
    onSuccess() {
      toast.success("Вы успешно обновили данные!");
      queryClient.invalidateQueries({ queryKey: ["users", "profile"] });
    },
  });

  // Возвращаем mutate и isPending с правильной типизацией
  return { mutate, isPending, mutateAsync };
}
