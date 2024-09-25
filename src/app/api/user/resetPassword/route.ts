import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";
import { userService } from "@/services/user.service";
import { DeepPartial, IUser } from "@/types/auth.types";
import { hash, verify } from "argon2";

export async function POST(req: Request, res: NextApiResponse) {
  const { body } = await req.json();

  const oldPassword = body.oldPassword ?? null;
  const newPassword = body.newPassword ?? null;

  const header = headers();
  const authToken = (header.get("authorization") || "").split("Bearer ").at(1);

  if (!authToken) {
    return new Response(JSON.stringify({ error: "jwt must be provided" }), {
      status: 401,
    });
  }

  const decodedToken = jwt.decode(authToken) as UserIDJwtPayload;
  const id = decodedToken.id;

  if (!oldPassword || !newPassword) {
    return new Response(JSON.stringify({ error: "Неверные параметры запроса" }), {
      status: 403,
    });
  }

  try {
    const user = await userService.getById(id);

    const isValid = user?.password ? await verify(user.password, oldPassword) : null;

    if (!isValid) {
      return new Response(JSON.stringify({ error: "Неверно указан старый пароль" }), {
        status: 403,
      });
    }
    const updateUser = await userService.update({ id, password: newPassword });

    return new Response(JSON.stringify(true), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Ошибка запроса. Попробуйте снова" }), {
      status: 400,
    });
  }
}
