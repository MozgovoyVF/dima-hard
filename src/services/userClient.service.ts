import { axiosWithAuth } from "@/app/api/interceptors";
import { DeepPartial, IUser, IUserLock } from "@/types/auth.types";
import { PutBlobResult } from "@vercel/blob";

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
  async update(user: DeepPartial<IUser>): Promise<IUser> {
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

  async uploadAvatar(file: File, id: number): Promise<PutBlobResult> {
    const formData = new FormData();

    // Добавляем файл в FormData
    formData.append("file", file); // 'file' - это имя поля на сервере

    try {
      // Отправляем POST-запрос с FormData
      const response = await axiosWithAuth.post(
        `${BASE_URL}/avatars?filename=${id}.${file.name.split(".")[1]}&id=${id}`,
        formData, // Используем FormData как тело запроса
        {
          headers: {
            "Content-Type": "multipart/form-data", // Устанавливаем заголовок Content-Type
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.message;
    }
  },
};
