import { fatsecretClientService } from "@/services/fatsecretClient.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useFatsecretReset() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["fatsecret reset"],
    // Добавим типизацию для функции мутации
    mutationFn: async (userId: number) => {
      return await fatsecretClientService.resetUserData(userId);
    },
    onSuccess() {
      toast.success("Вы успешно обновили данные!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Возвращаем mutate и isPending с правильной типизацией
  return { mutate, isPending };
}
