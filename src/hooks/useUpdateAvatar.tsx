import { userClientService } from "@/services/userClient.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PutBlobResult } from "@vercel/blob";
import { toast } from "sonner";

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["user update"],
    mutationFn: async ({ file, id }: { file: File; id: number }): Promise<PutBlobResult> => {
      const result = await userClientService.uploadAvatar(file, id);
      return result;
    },
    onSuccess() {
      toast.success("Вы успешно обновили данные!");
      // queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  // Возвращаем mutate и isPending с правильной типизацией
  return { mutateAsync, isPending };
}
