import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";
import { userService } from "@/services/user.service";
import { DeepPartial, IUser } from "@/types/auth.types";

export async function POST(req: Request, res: NextApiResponse) {
  const { body } = await req.json();

  const user = (body.user as DeepPartial<IUser>) ?? null;
  const header = headers();
  const authToken = (header.get("authorization") || "").split("Bearer ").at(1);

  if (!authToken) {
    return new Response(JSON.stringify({ error: "jwt must be provided" }), {
      status: 401,
    });
  }

  const decodedToken = jwt.decode(authToken) as UserIDJwtPayload;
  const role = decodedToken.role;

  if (role !== "admin") {
    return new Response(JSON.stringify({ error: "Доступ к ресурсу запрещен" }), {
      status: 403,
    });
  }

  try {
    if (user) {
      const { password, ...updateUser } = await userService.update(user);

      return new Response(JSON.stringify(updateUser), {
        status: 200,
      });
    }
    return new Response(JSON.stringify({ error: "Ошибка запроса. Попробуйте снова" }), {
      status: 400,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Ошибка запроса. Попробуйте снова" }), {
      status: 400,
    });
  }
}
