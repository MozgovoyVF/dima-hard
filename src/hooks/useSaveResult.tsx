import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalculatorType } from "@/types/calculator.types";
import { profileService } from "@/services/profile.service";

export function useSaveResult() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["update profile"],
    mutationFn: ({
      calcType,
      result,
      desiredResult,
    }: {
      calcType: CalculatorType;
      result: number;
      desiredResult?: number;
    }) => {
      if (calcType === "tdee") {
        return profileService.updateProfile(calcType, result, desiredResult);
      }
      return profileService.updateProfile(calcType, result);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  return { mutate, isPending };
}
