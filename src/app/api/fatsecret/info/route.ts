import { FatSecretOauth1 } from "../../../../services/fatsecret.service";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { fatsecretClientService, IFatsecretRequests } from "@/services/fatsecretClient.service";
import { cryptoService } from "@/services/crypto.service";

export async function GET(req: NextRequest) {
  const header = headers();
  const authToken = (header.get("authorization") || "").split("Bearer ").at(1);

  if (!authToken) {
    return new Response(JSON.stringify({ error: "jwt must be provided" }), {
      status: 401,
    });
  }

  const params = new URL(req.url).searchParams;

  const fatsecretRequest = params.get("request") as keyof IFatsecretRequests;
  const fatsecretToken = params.get("token");
  const fatsecretSecret = params.get("secret");
  const fatsecretParamsString = params.get("parameters") || null;
  let fatsecretDate = null;

  if (fatsecretParamsString) {
    try {
      const fatsecretParamsObject = JSON.parse(fatsecretParamsString) as Record<string, any>;

      if (fatsecretParamsObject.hasOwnProperty("date")) {
        fatsecretDate = fatsecretParamsObject["date"];
      }
    } catch (error) {
      console.error("Ошибка парсинга JSON:", error);
    }
  }

  if (!fatsecretRequest || !fatsecretToken || !fatsecretSecret) {
    return new Response(JSON.stringify({ error: "Неверные параметры запроса" }), {
      status: 400,
    });
  }

  const decodedToken = cryptoService.decrypt(fatsecretToken);
  const decodedSecret = cryptoService.decrypt(fatsecretSecret);

  const request = fatsecretClientService.requests[fatsecretRequest];

  const result = new FatSecretOauth1(
    request.method,
    request.url,
    { oauth_token: decodedToken, format: "json", date: fatsecretDate || "" },
    decodedSecret
  );

  try {
    const response = await axios(`${request.url}?${result.paramString}&oauth_signature=${result.signature}`, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Ошибка запроса. Попробуйте снова" }), {
      status: 400,
    });
  }
}
