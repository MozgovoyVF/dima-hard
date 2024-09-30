import { cookies, headers } from "next/headers";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";
import { userService } from "@/services/user.service";
import { NEXT_DOMAIN, REFRESH_TOKEN_NAME } from "@/constants/global.constants";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
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
    //@ts-ignore
    const galery = await userService.getGalery(id);

    if (galery.length === 0) {
      return new Response(JSON.stringify({ error: "В Галерее нет фото" }), {
        status: 200,
      });
    }

    return new Response(JSON.stringify(galery), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }
}
