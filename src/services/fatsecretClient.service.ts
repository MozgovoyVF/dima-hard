import { axiosWithAuth } from "@/app/api/interceptors";
import type { TFatSecretMontsWeigth } from "@/types/fatsecret.types";

const BASE_URL = "/fatsecret";

interface RequestConfig<T> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
}

export interface IFatsecretRequests {
  weight_monts: RequestConfig<TFatSecretMontsWeigth>;
}

export const fatsecretClientService = {
  requests: {
    weight_monts: {
      url: "https://platform.fatsecret.com/rest/weight/month/v2",
      method: "GET",
    },
  } as IFatsecretRequests,

  async getInfo<T extends keyof IFatsecretRequests, P>(
    request: T,
    token: string,
    secret: string,
    parameters?: Record<string, any>
  ): Promise<P> {
    const response = await axiosWithAuth.get<P>(BASE_URL + "/info", {
      params: {
        request,
        token,
        secret,
        parameters: JSON.stringify(parameters),
      },
    });
    return response.data;
  },

  async resetUserData(userId: number) {
    const response = await axiosWithAuth.get(BASE_URL + "/reset", {
      params: {
        userId,
      },
    });

    return response.data;
  },
};
