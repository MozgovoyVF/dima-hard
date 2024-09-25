import { userClientService } from "@/services/userClient.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useResetPassword() {
  const { mutate, isPending, mutateAsync } = useMutation({
    mutationKey: ["user reset password"],
    mutationFn: async ({
      oldPassword,
      newPassword,
    }: {
      oldPassword: string;
      newPassword: string;
    }): Promise<boolean | AxiosError> => {
      return await userClientService.resetPassword(oldPassword, newPassword);
    },
    onSuccess(data) {
      if (typeof data === "boolean") {
        toast.success("Вы успешно обновили пароль!");
      } else {
        toast.error("Возникла ошибка!");
      }
    },
  });

  // Возвращаем mutate и isPending с правильной типизацией
  return { mutate, isPending, mutateAsync };
}
