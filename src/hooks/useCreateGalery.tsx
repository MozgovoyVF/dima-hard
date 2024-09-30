import { userClientService } from "@/services/userClient.service";
import { DeepPartial, IGalery, IUser } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateGalery() {
  const queryClient = useQueryClient();

  const { mutate, isPending, mutateAsync } = useMutation({
    mutationKey: ["user update"],
    mutationFn: async (urls: string[]): Promise<IGalery[]> => {
      return await userClientService.createGalery(urls);
    },
    onSuccess() {
      toast.success("Вы успешно обновили данные!");
      queryClient.invalidateQueries({ queryKey: ["users", "profile"] });
    },
  });

  // Возвращаем mutate и isPending с правильной типизацией
  return { mutate, isPending, mutateAsync };
}
