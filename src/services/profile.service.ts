import { axiosWithAuth } from "@/app/api/interceptors";
import { IProfileUser } from "@/types/user.types";

export interface IProfileResponse extends IProfileUser {}

const BASE_URL = "/user/profile";

export const profileService = {
  async getProfile() {
    const response = await axiosWithAuth.get<IProfileResponse>(BASE_URL);
    return response.data;
  },
};
