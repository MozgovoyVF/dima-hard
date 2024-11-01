import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";
import { userService } from "../../../../services/user.service";
import { User } from "@prisma/client";
import { NEXT_DOMAIN } from "../../../../constants/global.constants";

const REFRESH_TOKEN_NAME = "refreshToken";
const EXPIRE_DAY_REFRESH_TOKEN = 1;

export async function POST(req: Request, res: NextResponse) {
  const cookieStore = cookies();

  const refreshTokenFromCookies = cookieStore.get(REFRESH_TOKEN_NAME)?.value;

  if (!refreshTokenFromCookies) {
    cookieStore.set(REFRESH_TOKEN_NAME, "", {
      httpOnly: true,
      domain: NEXT_DOMAIN,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    });

    return new Response(JSON.stringify({ error: "Refresh token not passed" }), {
      status: 403,
    });
  }

  const result = process.env.JWT_SECRET
    ? (jwt.verify(refreshTokenFromCookies, process.env.JWT_SECRET) as UserIDJwtPayload)
    : null;

  if (!result)
    return new Response(JSON.stringify({ error: "Invalid refresh token" }), {
      status: 403,
    });

  const { password, ...user } = (await userService.getById(result.id)) as User;

  let accessToken = "";
  let refreshToken = "";

  if (process.env.JWT_SECRET) {
    accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    refreshToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  }

  const expiresIn = new Date();
  expiresIn.setDate(expiresIn.getDate() + EXPIRE_DAY_REFRESH_TOKEN);

  cookieStore.set(REFRESH_TOKEN_NAME, String(refreshToken), {
    httpOnly: true,
    domain: NEXT_DOMAIN,
    expires: expiresIn,
    secure: true,
    sameSite: "none",
  });

  return new Response(JSON.stringify({ user, accessToken }), {
    status: 200,
  });
}
