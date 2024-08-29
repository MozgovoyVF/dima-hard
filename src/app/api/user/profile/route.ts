import { headers } from "next/headers";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";
import { userService } from "@/services/user.service";

export async function GET(req: Request) {
  const header = headers();
  const authToken = (header.get("authorization") || "").split("Bearer ").at(1);

  if (!authToken) {
    return new Response(JSON.stringify({ error: "jwt must be provided" }), {
      status: 401,
    });
  }

  const decodedToken = jwt.decode(authToken) as UserIDJwtPayload;
  const id = decodedToken.id;

  // @ts-ignore
  const { provider, password, createdAt, updatedAt, ...user } = await userService.getById(id);

  return new Response(JSON.stringify(user), {
    status: 200,
  });
}
