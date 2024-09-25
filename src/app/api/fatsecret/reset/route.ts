import { headers } from "next/headers";
import { NextRequest } from "next/server";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";
import { userService } from "@/services/user.service";

export async function GET(req: NextRequest) {
  const header = headers();
  const authToken = (header.get("authorization") || "").split("Bearer ").at(1);

  if (!authToken) {
    return new Response(JSON.stringify({ error: "jwt must be provided" }), {
      status: 401,
    });
  }

  const decodedToken = jwt.decode(authToken) as UserIDJwtPayload;
  const role = decodedToken.role;
  const id = decodedToken.id;

  const params = new URL(req.url).searchParams;

  const fatsecretUserId = params.get("userId");

  if (!fatsecretUserId) {
    return new Response(JSON.stringify({ error: "Неверные параметры запроса" }), {
      status: 400,
    });
  }

  if (role !== "admin" && id !== fatsecretUserId) {
    return new Response(JSON.stringify({ error: "Доступ запрещен" }), {
      status: 403,
    });
  }

  try {
    const updateUser = await userService.resetFatsecretData(fatsecretUserId);

    return new Response(JSON.stringify(!!updateUser.token), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Ошибка запроса. Попробуйте снова" }), {
      status: 400,
    });
  }
}
