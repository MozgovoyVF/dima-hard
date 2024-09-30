import { userClientService } from "@/services/userClient.service";
import { IGalery } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PutBlobResult } from "@vercel/blob";
import { toast } from "sonner";

export function useDeletePhoto() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["galery delete"],
    mutationFn: async (galery: IGalery): Promise<boolean | string> => {
      const result = await userClientService.deletePhoto(galery);
      return result;
    },
    onSuccess() {
      toast.success("Вы успешно удалили фото!");
      queryClient.invalidateQueries({ queryKey: ["galery"] });
    },
  });

  // Возвращаем mutate и isPending с правильной типизацией
  return { mutateAsync, isPending };
}
