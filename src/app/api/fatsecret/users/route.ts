import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";
import { fatsecretService } from "@/services/fatsecret.service";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
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
    const users = await fatsecretService.getFatsecretUsers();

    return new Response(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Ошибка запроса. Попробуйте снова" }), {
      status: 400,
    });
  }
}
