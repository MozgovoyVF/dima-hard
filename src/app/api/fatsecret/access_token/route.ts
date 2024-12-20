import { headers } from "next/headers";
import { FatSecretOauth1, fatsecretService } from "../../../../services/fatsecret.service";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";
import axios from "axios";
import { userService } from "@/services/user.service";

export async function POST(req: Request, res: Response) {
  const { body } = await req.json();

  const header = headers();
  const authToken = (header.get("authorization") || "").split("Bearer ").at(1);

  if (!authToken) {
    return new Response(JSON.stringify({ error: "jwt must be provided" }), {
      status: 401,
    });
  }

  const decodedToken = jwt.decode(authToken) as UserIDJwtPayload;
  const userId = decodedToken.id;

  //========================================================================================================================================================

  const code = body.code;
  const token = body.token;
  const secret = body.secret;

  if (!code || !token || !secret) {
    return new Response(JSON.stringify({ error: "Параметры запроса некорректны. Попробуйте снова" }), {
      status: 400,
    });
  }

  let url = "https://www.fatsecret.com/oauth/access_token";
  let httpMethod = "GET";

  const result = new FatSecretOauth1(
    httpMethod,
    url,
    { oauth_token: token, oauth_verifier: code },
    secret ?? undefined
  );

  const response = await axios(`${url}?${result.paramString}&oauth_signature=${result.signature}`, {
    method: httpMethod,
  });

  if (response.status === 400) {
    return new Response(JSON.stringify({ error: "Ошибка запроса. Попробуйте снова" }), {
      status: 400,
    });
  }

  const data = response.data;

  const oauth = { oauth_token: "", oauth_token_secret: "" };

  data.split("&").forEach((e: string) => {
    if (e.startsWith("oauth_token_secret")) {
      oauth.oauth_token_secret = e.split("=")[1];
      return;
    }
    if (e.startsWith("oauth_token")) {
      oauth.oauth_token = e.split("=")[1];
      return;
    }
  });

  if (!oauth.oauth_token || !oauth.oauth_token_secret) {
    return new Response(
      JSON.stringify({ error: "Ошибка ответа FatSecret. Перезагрузите страницу и попробуйте заново" }),
      {
        status: 400,
      }
    );
  }

  try {
    await fatsecretService.saveTokens(userId, oauth.oauth_token, oauth.oauth_token_secret);
    await userService.createChange(userId, "Пользователь привязал свой аккаунт Fatsecret");

    return new Response(JSON.stringify("OK"), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Ошибка базы данных. Попробуйте заново" }), {
      status: 400,
    });
  }
}
