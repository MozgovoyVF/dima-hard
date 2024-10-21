import { userClientService } from "@/services/userClient.service";
import { ITask } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const { mutate, isPending, mutateAsync } = useMutation({
    mutationKey: ["task update"],
    mutationFn: async ({
      userId,
      taskId,
      completed,
    }: {
      userId: string;
      taskId: string;
      completed: boolean;
    }): Promise<ITask> => {
      return await userClientService.updateTask(userId, taskId, completed);
    },
    onSuccess() {
      toast.success("Вы успешно обновили задачу!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  // Возвращаем mutate и isPending с правильной типизацией
  return { mutate, isPending, mutateAsync };
}
