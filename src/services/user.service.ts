import { AuthDto, GoogleAuthDto } from "@/types/auth.types";
import { UserDto } from "@/types/user.types";
import { hash } from "argon2";
import prisma from "./prisma.service";
import { Provider } from "@prisma/client";

export const userService = {
  getById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },

  getByEmail(email: string, provider: Provider) {
    return prisma.user.findUnique({
      where: {
        email,
        provider,
      },
    });
  },

  async create(dto: AuthDto, provider: Provider) {
    const user = {
      email: dto.email,
      name: "",
      password: await hash(dto.password),
      provider,
    };

    return prisma.user.create({
      data: user,
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
      data: user,
    });
  },

  async update(id: string, dto: UserDto) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        name: true,
        email: true,
      },
    });
  },
};
