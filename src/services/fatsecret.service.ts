import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { CONSUMER_KEY, CONSUMER_SECRET } from "../constants/global.constants";
import { cryptoService } from "../services/crypto.service";
import prisma from "./prisma.service";

export class FatSecretOauth1 {
  public requestUrl: string;
  public httpMethod: string;
  public inputParameters: Record<string, string | number>;
  public paramString: string;
  public signature: string;
  public secret?: string;

  constructor(httpMethod: string, url: string, inputParameters: Record<string, string>, secret?: string) {
    this.requestUrl = url;
    this.httpMethod = httpMethod.toUpperCase();
    this.inputParameters = {
      ...inputParameters,
      oauth_consumer_key: CONSUMER_KEY,
      oauth_nonce: uuidv4(),
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: Math.floor(new Date().getTime()),
      oauth_version: "1.0",
    };
    this.paramString = this.buildRequestParameterString();

    if (secret) this.secret = secret;

    this.signature = this.buildSignature();

    // @ts-ignore
    return { paramString: this.paramString, signature: this.signature };
  }

  buildSignature() {
    let method = encodeURIComponent(this.httpMethod);
    let url = encodeURIComponent(this.requestUrl);
    let params = encodeURIComponent(this.paramString);
    let secret = this.secret ? encodeURIComponent(this.secret) : "";
    let signature = crypto
      .createHmac("sha1", `${CONSUMER_SECRET}&${secret}`)
      .update(`${method}&${url}&${params}`)
      .digest()
      .toString("base64");
    return encodeURIComponent(signature);
  }

  buildRequestParameterString() {
    let params = "";
    Object.entries(this.inputParameters)
      .sort()
      .forEach((cur) => (params += `&${encodeURI(cur[0])}=${encodeURI(cur[1] as any)}`));
    params = params.substring(1);
    return params;
  }
}

export const fatsecretService = {
  async saveTokens(userId: string, token: string, secret: string) {
    const tokenHash = cryptoService.encrypt(token);
    const secretHash = cryptoService.encrypt(secret);

    return prisma.fatsecret.update({
      where: { userId: userId },
      data: {
        token: tokenHash,
        secret: secretHash,
      },
      select: {
        userId: true,
      },
    });
  },

  async existsToken(userId: string) {
    const fatsecret = await prisma.fatsecret.findFirst({
      where: {
        userId,
      },
    });

    return !!(fatsecret?.token && fatsecret.secret);
  },

  async getFatsecretUsers() {
    const fatsecretUsers = await prisma.user.findMany({
      where: {
        fatsecret: {
          token: {
            not: null,
          },
        },
      },
      include: {
        fatsecret: true,
      },
    });

    return fatsecretUsers;
  },
};
