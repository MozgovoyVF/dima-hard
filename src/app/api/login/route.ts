import { userService } from "@/services/user.service";
import { IAuthForm } from "@/types/auth.types";
import jwt from "jsonwebtoken";
import { verify } from "argon2";
import { cookies } from "next/headers";
import {
  EXPIRE_DAY_REFRESH_TOKEN,
  NEXT_DOMAIN,
  REFRESH_TOKEN_NAME,
} from "../../../constants/global.constants";

export async function POST(req: Request) {
  const dto: IAuthForm = await req.json();

  const loginUser = await userService.getByEmail(dto.email, "credentials");

  if (!loginUser)
    return new Response(JSON.stringify({ error: "User does not exist" }), {
      status: 400,
    });

  const isValid = loginUser.password
    ? verify(loginUser.password, dto.password)
    : null;

  if (!isValid)
    return new Response(JSON.stringify({ error: "Invalid password" }), {
      status: 400,
    });

  const { password, ...user } = loginUser;

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
    domain: NEXT_DOMAIN,
    expires: expiresIn,
    secure: true,
    sameSite: "none",
  });

  return new Response(JSON.stringify({ user, accessToken }), {
    status: 200,
  });
}
