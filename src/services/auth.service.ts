"use client";

import { axiosClassic } from "@/app/api/interceptors";
import { IAuthForm, IAuthResponse } from "@/types/auth.types";
import { saveTokenStorage, removeFromStorage } from "./auth-token.service";

export enum EnumTokens {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export const authService = {
  async main(type: "login" | "register", data: IAuthForm) {
    const response = await axiosClassic.post<IAuthResponse>(`/${type}`, data);

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken);

    return response;
  },

  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>(
      "/login/access-token"
    );

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken);

    return response;
  },

  async logout() {
    const response = await axiosClassic.post<boolean>("/logout");

    if (response.data) removeFromStorage();

    return response;
  },
};
