import { serialize } from "cookie";
import { cookies } from "next/headers";

const REFRESH_TOKEN_NAME = "refreshToken";

export async function POST(req: Request) {
  const cookieStore = cookies();
  cookieStore.set(REFRESH_TOKEN_NAME, "", {
    httpOnly: true,
    domain: "localhost",
    expires: new Date(0),
    secure: true,
    sameSite: "none",
  });

  return new Response(JSON.stringify(true), {
    status: 200,
  });
}
