import { axiosWithAuth } from "@/app/api/interceptors";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { CalculatorType } from "@/types/calculator.types";
import { IProfileUser } from "@/types/user.types";
import Router from "next/router";

export interface IProfileResponse extends IProfileUser {}

const BASE_URL = "/user/profile";

export const profileService = {
  async getProfile() {
    try {
      const response = await axiosWithAuth.get<IProfileResponse>(BASE_URL);
      return response.data;
    } catch (error) {
      Router.push(DASHBOARD_PAGES.AUTH);
    }
  },
  async updateProfile(type: CalculatorType, result: number, desiredResult?: number) {
    const response = await axiosWithAuth.put<{ id: string }>(BASE_URL + "/update", { type, result, desiredResult });
    return response.data;
  },
};
