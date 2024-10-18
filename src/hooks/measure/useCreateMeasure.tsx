import { userClientService } from "@/services/userClient.service";
import { IMeasure, ITask } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateMeasure() {
  const queryClient = useQueryClient();

  const { mutate, isPending, mutateAsync } = useMutation({
    mutationKey: ["measure create"],
    mutationFn: async ({
      userId,
      chest,
      arms,
      waist,
      lowerAbdomen,
      hips,
      legsUnderButtock,
      calves,
    }: {
      userId: string;
      chest: string;
      arms: string;
      waist: string;
      lowerAbdomen: string;
      hips: string;
      legsUnderButtock: string;
      calves: string;
    }): Promise<IMeasure> => {
      return await userClientService.createMeasure(
        userId,
        chest,
        arms,
        waist,
        lowerAbdomen,
        hips,
        legsUnderButtock,
        calves
      );
    },
    onSuccess() {
      toast.success("Вы успешно создали замер!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  // Возвращаем mutate и isPending с правильной типизацией
  return { mutate, isPending, mutateAsync };
}
