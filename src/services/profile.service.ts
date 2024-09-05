import { axiosWithAuth } from "@/app/api/interceptors";
import { IProfile } from "@/types/auth.types";
import { CalculatorType } from "@/types/calculator.types";
import { IProfileUser } from "@/types/user.types";

export interface IProfileResponse extends IProfileUser {}

const BASE_URL = "/user/profile";

export const profileService = {
  async getProfile() {
    const response = await axiosWithAuth.get<IProfileResponse>(BASE_URL);
    return response.data;
  },
  async updateProfile(type: CalculatorType, result: number) {
    const response = await axiosWithAuth.put<{ id: string }>(BASE_URL + "/update", { type, result });
    return response.data;
  },
};
