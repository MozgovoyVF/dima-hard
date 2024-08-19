import Error from "next/error";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import { serialize } from "cookie";
import { userService } from "../../../services/user.service";

export interface AuthDto {
  email: string;
  password: string;
}

export const authService = {
  EXPIRE_DAY_REFRESH_TOKEN: 1,
  REFRESH_TOKEN_NAME: "refreshToken",

  async login(dto: AuthDto) {
    const { password, ...user } = await this.validateUser(dto);
    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  },

  async register(dto: AuthDto) {
    const oldUser = await userService.getByEmail(dto.email, "credentials");

    if (oldUser)
      throw new Error({ statusCode: 401, title: "User already exist" });

    const { password, ...user } = await userService.create(dto, "credentials");

    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  },

  issueTokens(userId: string) {
    const data = { id: userId };

    let accessToken: string = "";
    let refreshToken: string = "";

    if (process.env.JWT_SECRET) {
      accessToken = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      refreshToken = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
    }

    return { accessToken, refreshToken };
  },

  async validateUser(dto: AuthDto) {
    const user = await userService.getByEmail(dto.email, "credentials");

    if (!user || !user.password)
      throw new Error({ title: "User does not exist", statusCode: 401 });

    const isValid = jwt.verify(user.password, dto.password);

    if (!isValid)
      throw new Error({ statusCode: 401, title: "Invalid password" });

    return user;
  },

  // async getNewTokens(refreshToken: string) {
  //   const result = jwt.verify(refreshToken, process.env.JWT_SECRET);

  //   if (!result)
  //     throw new Error({ statusCode: 401, title: "Invalid refresh token" });

  //   const { password, ...user } = await userService.getById(result.id);

  //   const tokens = this.issueTokens(user.id);

  //   return { user, ...tokens };
  // },

  addRefreshTokenToResponse(res: NextApiResponse, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.setHeader(
      "Set-Cookie",
      serialize(this.REFRESH_TOKEN_NAME, String(refreshToken), {
        httpOnly: true,
        domain: "localhost",
        expires: expiresIn,
        secure: true,
        sameSite: true,
      })
    );
  },

  removeRefreshTokenFromResponse(res: NextApiResponse) {
    res.setHeader(
      "Set-Cookie",
      serialize(this.REFRESH_TOKEN_NAME, "", {
        httpOnly: true,
        domain: "localhost",
        expires: new Date(0),
        secure: true,
        sameSite: true,
      })
    );
  },
};
