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
    const { password, createdAt, updatedAt, ...user } = await userService.getById(id);

    if (!user) {
      const cookieStore = cookies();
      cookieStore.set(REFRESH_TOKEN_NAME, "", {
        httpOnly: true,
        domain: NEXT_DOMAIN,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      });

      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    const cookieStore = cookies();
    cookieStore.set(REFRESH_TOKEN_NAME, "", {
      httpOnly: true,
      domain: NEXT_DOMAIN,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    });

    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }
}
