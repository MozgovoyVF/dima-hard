import { headers } from "next/headers";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";
import { fatsecretService } from "@/services/fatsecret.service";

export async function GET() {
  const header = headers();
  const authToken = (header.get("authorization") || "").split("Bearer ").at(1);

  if (!authToken) {
    return new Response(JSON.stringify({ error: "jwt must be provided" }), {
      status: 401,
    });
  }

  const decodedToken = jwt.decode(authToken) as UserIDJwtPayload;
  const userId = decodedToken.id;

  try {
    const exists = await fatsecretService.existsToken(userId);

    return new Response(JSON.stringify(exists), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Ошибка запроса. Попробуйте снова" }), {
      status: 400,
    });
  }
}
