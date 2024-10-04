import { NextApiResponse } from "next";
import { headers } from "next/headers";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";
import { userService } from "@/services/user.service";

export async function POST(req: Request, res: NextApiResponse) {
  const { body } = await req.json();

  const userId = body.userId ?? null;
  const title = body.title ?? null;
  const description = body.description ?? null;

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
    if (userId && title) {
      const task = await userService.createTask(userId, title, description);

      return new Response(JSON.stringify(task), {
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
