import { FatSecretOauth1 } from "../../../../services/fatsecret.service";
import axios from "axios";
import { headers } from "next/headers";

export async function GET() {
  const header = headers();
  const authToken = (header.get("authorization") || "").split("Bearer ").at(1);

  if (!authToken) {
    return new Response(JSON.stringify({ error: "jwt must be provided" }), {
      status: 401,
    });
  }

  let url = "https://www.fatsecret.com/oauth/request_token";
  let httpMethod = "GET";

  const result = new FatSecretOauth1(httpMethod, url, { oauth_callback: "oob" });

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

  //========================================================================================================================================================

  let urlAuthorize = "https://www.fatsecret.com/oauth/authorize";
  let httpMethodAuthorize = "GET";

  const resultAuthorize = new FatSecretOauth1(httpMethodAuthorize, urlAuthorize, { oauth_token: oauth.oauth_token });

  return new Response(
    JSON.stringify({
      link: `${urlAuthorize}?${resultAuthorize.paramString}&oauth_signature=${resultAuthorize.signature}`,
      oauth_token: oauth.oauth_token,
      oauth_token_secret: oauth.oauth_token_secret,
    }),
    {
      status: 200,
    }
  );
}
