import { EXPIRE_DAY_REFRESH_TOKEN, NEXT_DOMAIN, REFRESH_TOKEN_NAME } from "@/constants/global.constants";
import { userService } from "@/services/user.service";
import { GoogleAuthDto } from "@/types/auth.types";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const profile = await req.json();
  console.log(profile);

  const dto: GoogleAuthDto = {
    name: profile?.given_name,
    email: profile?.email,
    avatarUrl: profile?.picture,
  };

  const { password, ...user } = await userService.createGoogle(dto, "credentials");

  const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
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
