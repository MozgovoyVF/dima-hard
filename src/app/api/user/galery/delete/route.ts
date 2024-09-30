import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";
import { userService } from "@/services/user.service";
import { del, list } from "@vercel/blob";

export async function POST(req: Request, res: NextApiResponse) {
  const { body } = await req.json();

  const photo = (body.photo as string) ?? null;
  const photoId = (body.photoId as string) ?? null;
  const header = headers();
  const authToken = (header.get("authorization") || "").split("Bearer ").at(1);

  if (!authToken) {
    return new Response(JSON.stringify({ error: "jwt must be provided" }), {
      status: 401,
    });
  }

  const decodedToken = jwt.decode(authToken) as UserIDJwtPayload;
  const id = decodedToken.id;

  try {
    if (photo && photoId) {
      await del(photo);
      await userService.deleteGalery(photoId);

      return new Response(JSON.stringify(true), {
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: "Ошибка запроса. Попробуйте снова" }), {
      status: 400,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Ошибка запроса. Попробуйте снова" }), {
      status: 500,
    });
  }
}
