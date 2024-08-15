import { AuthDto } from "@/types/auth.types";
import { UserDto } from "@/types/user.types";
import { hash } from "argon2";
import prisma from "./prisma.service";

export const userService = {
  getById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },

  getByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      name: "",
      password: await hash(dto.password),
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
