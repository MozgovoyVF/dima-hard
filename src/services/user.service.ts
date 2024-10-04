import { DeepPartial, GoogleAuthDto, IUser, RegisterDto } from "@/types/auth.types";
import { hash } from "argon2";
import prisma from "./prisma.service";
import { Provider } from "@prisma/client";

export const userService = {
  getAllUsers() {
    return prisma.user.findMany({
      where: {
        role: "user",
      },
      include: {
        profile: true,
        fatsecret: true,
        task: {
          orderBy: [
            { completed: "asc" }, // false идут первыми
            { createdAt: "desc" }, // сортировка по дате создания в порядке убывания
          ],
        },
        galery: true,
      },
    });
  },
  getById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        task: {
          orderBy: [
            { completed: "asc" }, // false идут первыми
            { createdAt: "desc" }, // сортировка по дате создания в порядке убывания
          ],
        },
      },
    });
  },

  getByEmail(email: string, provider: Provider) {
    return prisma.user.findFirst({
      where: {
        email,
        provider,
      },
      include: {
        profile: true,
      },
    });
  },

  async create(dto: RegisterDto, provider: Provider) {
    const user = {
      email: dto.email,
      name: dto.name,
      lastName: dto.lastName,
      password: await hash(dto.password),
      provider,
    };

    return prisma.user.create({
      data: { ...user, profile: { create: {} }, fatsecret: { create: {} } },
    });
  },

  async createGoogle(dto: GoogleAuthDto, provider: Provider) {
    const user = {
      email: dto.email,
      name: dto.name,
      lastName: dto.lastName,
      avatarUrl: dto.avatarUrl,
      provider,
    };

    return prisma.user.create({
      data: { ...user, profile: { create: {} }, fatsecret: { create: {} } },
    });
  },

  async getGalery(id: string) {
    return await prisma.galery.findMany({
      where: {
        userId: id,
      },
    });
  },

  async createGalery(urls: string[], userId: string) {
    return await prisma.galery.createMany({
      data: urls.map((url) => ({
        photoUrl: url,
        userId: userId,
      })),
    });
  },

  async deleteGalery(photoId: string) {
    return await prisma.galery.delete({
      where: {
        id: photoId,
      },
    });
  },

  async update(user: DeepPartial<IUser>) {
    let { id, profile, fatsecret, galery, task, ...data } = user;

    if (data.password) {
      data = { ...data, password: await hash(data.password) };
    }

    return prisma.user.update({
      where: {
        id: String(id),
      },
      data: {
        ...data,
        profile: {
          update: {
            ...profile,
          },
        },
        fatsecret: {
          update: {
            ...fatsecret,
          },
        },
      },
    });
  },

  async resetFatsecretData(userId: string) {
    return prisma.fatsecret.update({
      where: {
        userId,
      },
      data: {
        token: null,
        secret: null,
      },
    });
  },

  async createTask(userId: string, title: string, description?: string) {
    return await prisma.task.create({
      data: {
        title,
        description,
        userId,
      },
    });
  },

  async updateTask(taskId: string, completed: boolean) {
    return await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        completed,
      },
    });
  },
};
