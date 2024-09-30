import { axiosWithAuth } from "@/app/api/interceptors";
import { DeepPartial, IGalery, IUser, IUserLock } from "@/types/auth.types";
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

  async createGalery(urls: string[]): Promise<IGalery[]> {
    try {
      const response = await axiosWithAuth.post<IGalery[]>(BASE_URL + "/galery/create", {
        body: {
          urls,
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.message;
    }
  },

  async deletePhoto(galery: IGalery): Promise<boolean | string> {
    try {
      const response = await axiosWithAuth.post<boolean>(BASE_URL + "/galery/delete", {
        body: {
          photo: galery.photoUrl,
          photoId: galery.id,
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.message;
    }
  },

  async resetPassword(oldPassword: string, newPassword: string): Promise<boolean> {
    try {
      const response = await axiosWithAuth.post<boolean>(BASE_URL + "/resetPassword", {
        body: {
          oldPassword,
          newPassword,
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error;
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

  async uploadGalery(files: File[]): Promise<PutBlobResult[]> {
    const formData = new FormData();

    // Добавляем файл в FormData
    for (const file of files) {
      formData.append("files", file); // 'file' - это имя поля на сервере
    }

    try {
      // Отправляем POST-запрос с FormData
      const response = await axiosWithAuth.post(
        `${BASE_URL}/uploadGalery`,
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

  async getUserGalery(): Promise<IGalery[] | { error: string }> {
    try {
      const response = await axiosWithAuth.get<IGalery[] | { error: string }>(BASE_URL + "/galery");
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.message;
    }
  },
};
