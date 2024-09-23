import { axiosWithAuth } from "@/app/api/interceptors";
import { DeepPartial, IUser, IUserLock } from "@/types/auth.types";

const BASE_URL = "/user";

export const userClientService = {
  async getAllUsers(): Promise<IUserLock[]> {
    try {
      const response = await axiosWithAuth.get<IUserLock[]>(BASE_URL + "/all");
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.message;
    }
  },
  async update(user: DeepPartial<IUser>) {
    try {
      const response = await axiosWithAuth.post<IUser>(BASE_URL + "/update", {
        body: {
          user,
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.message;
    }
  },
};
