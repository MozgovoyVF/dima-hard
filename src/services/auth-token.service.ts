import { NEXT_DOMAIN } from "@/constants/global.constants";
import { EnumTokens } from "./auth.service";
import Cookies from "js-cookie";

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const saveTokenStorage = (accessToken: string) => {
  const now = new Date();
  let time = now.getTime();
  time += 3600 * 1000;
  now.setTime(time);

  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    domain: NEXT_DOMAIN,
    sameSite: "strict",
    expires: now,
  });
};

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN, {
    domain: NEXT_DOMAIN,
  });
};
