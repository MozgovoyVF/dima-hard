import { headers } from "next/headers";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";
import { userService } from "@/services/user.service";
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

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "10");
  const page = parseInt(searchParams.get("page") || "1");
  const offset = (page - 1) * limit;

  try {
    const { changes, total } = await userService.getChanges(limit, offset);

    return new Response(JSON.stringify({ changes, total }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify("Ошибка базы данных"), {
      status: 404,
    });
  }
}
