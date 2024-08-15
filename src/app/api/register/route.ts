import { userService } from "@/services/user.service";
import { IAuthForm } from "@/types/auth.types";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { cookies } from "next/headers";

const EXPIRE_DAY_REFRESH_TOKEN = 1;
const REFRESH_TOKEN_NAME = "refreshToken";

export async function POST(req: Request) {
  const dto: IAuthForm = await req.json();

  const oldUser = await userService.getByEmail(dto.email);

  if (oldUser)
    return new Response(JSON.stringify({ error: "User already exist" }), {
      status: 401,
    });

  const { password, ...user } = await userService.create(dto);

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const expiresIn = new Date();
  expiresIn.setDate(expiresIn.getDate() + EXPIRE_DAY_REFRESH_TOKEN);

  const cookieStore = cookies();
  cookieStore.set(REFRESH_TOKEN_NAME, String(refreshToken), {
    httpOnly: true,
    domain: "localhost",
    expires: expiresIn,
    secure: true,
    sameSite: "none",
  });

  return new Response(JSON.stringify({ user, accessToken }), {
    status: 200,
  });
}
