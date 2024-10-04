import { userClientService } from "@/services/userClient.service";
import { ITask } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateTask() {
  const queryClient = useQueryClient();

  const { mutate, isPending, mutateAsync } = useMutation({
    mutationKey: ["task create"],
    mutationFn: async ({
      userId,
      title,
      description,
    }: {
      userId: string;
      title: string;
      description?: string;
    }): Promise<ITask> => {
      return await userClientService.createTask(userId, title, description);
    },
    onSuccess() {
      toast.success("Вы успешно создали задачу!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // Возвращаем mutate и isPending с правильной типизацией
  return { mutate, isPending, mutateAsync };
}
