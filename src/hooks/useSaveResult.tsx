import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProfile } from "./useProfile";
import { CalculatorType } from "@/types/calculator.types";
import { profileService } from "@/services/profile.service";

export function useSaveResult() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["update profile"],
    mutationFn: ({ calcType, result }: { calcType: CalculatorType; result: number }) =>
      profileService.updateProfile(calcType, result),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return { mutate, isPending };
}
