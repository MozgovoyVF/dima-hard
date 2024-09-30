import { userClientService } from "@/services/userClient.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PutBlobResult } from "@vercel/blob";
import { toast } from "sonner";

export function useUploadGalery() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["galery update"],
    mutationFn: async ({ files }: { files: File[] }): Promise<PutBlobResult[]> => {
      const result = await userClientService.uploadGalery(files);
      return result;
    },
    onSuccess() {
      // toast.success("Вы успешно загрузили фото!");
      // queryClient.invalidateQueries({ queryKey: ["galery"] });
    },
  });

  // Возвращаем mutate и isPending с правильной типизацией
  return { mutateAsync, isPending };
}
