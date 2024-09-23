import { headers } from "next/headers";
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

  try {
    //@ts-ignore
    const users = await userService.getAllUsers();

    const newUsers = users.map((user) => {
      const { createdAt, password, updatedAt, ...newUser } = user;
      return { ...newUser, fatsecret: !!newUser.fatsecret?.token };
    });

    return new Response(JSON.stringify(newUsers), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Произошла ошибка сервера" }), {
      status: 500,
    });
  }
}
