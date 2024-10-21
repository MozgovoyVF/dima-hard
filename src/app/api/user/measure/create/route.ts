import { NextApiResponse } from "next";
import { headers } from "next/headers";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";
import { userService } from "@/services/user.service";

export async function POST(req: Request, res: NextApiResponse) {
  const { body } = await req.json();

  const userId = body.userId ?? null;
  const chest = body.chest ?? null;
  const arms = body.arms ?? null;
  const waist = body.waist ?? null;
  const lowerAbdomen = body.lowerAbdomen ?? null;
  const hips = body.hips ?? null;
  const legsUnderButtock = body.legsUnderButtock ?? null;
  const calves = body.calves ?? null;

  const header = headers();
  const authToken = (header.get("authorization") || "").split("Bearer ").at(1);

  if (!authToken) {
    return new Response(JSON.stringify({ error: "jwt must be provided" }), {
      status: 401,
    });
  }

  const decodedToken = jwt.decode(authToken) as UserIDJwtPayload;
  const id = decodedToken.id;
  const role = decodedToken.role;

  if (id !== userId && role !== "admin") {
    return new Response(JSON.stringify({ error: "Доступ к ресурсу запрещен" }), {
      status: 403,
    });
  }

  try {
    if (userId && chest && arms && waist && lowerAbdomen && hips && legsUnderButtock && calves) {
      const task = await userService.createMeasure(
        userId,
        chest,
        arms,
        waist,
        lowerAbdomen,
        hips,
        legsUnderButtock,
        calves
      );

      await userService.createChange(userId, "Пользователь добавил новые замеры тела");

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
