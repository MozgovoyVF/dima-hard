import { headers } from "next/headers";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";
import { calculatorService } from "@/services/calculator.service";
import { userService } from "@/services/user.service";

export async function PUT(req: Request) {
  const { type, result, desiredResult } = await req.json();

  const header = headers();
  const authToken = (header.get("authorization") || "").split("Bearer ").at(1);

  if (!authToken) {
    return new Response(JSON.stringify({ error: "jwt must be provided" }), {
      status: 401,
    });
  }

  const decodedToken = jwt.decode(authToken) as UserIDJwtPayload;
  const userId = decodedToken.id;

  if (type === "tdee") {
    const { id } = await calculatorService.saveResult(type, result, userId, desiredResult);
    await userService.createChange(userId, "Пользователь привязал новые данные через калькулятор калорий");
    return new Response(JSON.stringify(id), {
      status: 200,
    });
  } else {
    const { id } = await calculatorService.saveResult(type, result, userId);
    return new Response(JSON.stringify(id), {
      status: 200,
    });
  }
}
