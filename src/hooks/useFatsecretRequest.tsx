import { fatsecretClientService, IFatsecretRequests } from "@/services/fatsecretClient.service";
import { useMutation } from "@tanstack/react-query";

export function useFatsecretRequest<T extends keyof IFatsecretRequests, P>() {
  const { mutateAsync, isPending } = useMutation<
    P,
    Error,
    { request: T; token: string; secret: string; params?: Record<string, any> }
  >({
    mutationKey: ["fatsecret info"],
    // Добавим типизацию для функции мутации
    mutationFn: async ({ request, token, secret, params }) => {
      return await fatsecretClientService.getInfo<T, P>(request, token, secret, params);
    },
  });

  // Возвращаем mutate и isPending с правильной типизацией
  return { mutateAsync, isPending };
}
