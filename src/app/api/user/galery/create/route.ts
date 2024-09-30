import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";
import { userService } from "@/services/user.service";

export async function POST(req: Request, res: NextApiResponse) {
  const { body } = await req.json();

  const urls = (body.urls as string[]) ?? null;
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

  try {
    if (urls && urls.length !== 0) {
      const galery = await userService.createGalery(urls, id);

      return new Response(JSON.stringify(galery), {
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
