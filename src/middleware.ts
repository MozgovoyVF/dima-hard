import { NextRequest, NextResponse } from "next/server";
import { DASHBOARD_PAGES } from "./config/pages-url.config";
import { EnumTokens } from "./services/auth.service";
import jwt, { UserIDJwtPayload } from "jsonwebtoken";

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request;

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const isAuthPage = url.includes("/auth");

  const isAdminPage = url.includes("/admin");

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL(DASHBOARD_PAGES.PERSONAL_ACCOUNT, url));
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/auth", url));
  }

  if (isAdminPage) {
    const token = request.cookies.get("accessToken")?.value || request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    try {
      const decodedToken = jwt.decode(token) as UserIDJwtPayload;

      if (decodedToken.role !== "admin") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({ message: "jwt must be provided" }, { status: 401 });
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/i/:path*", "/auth/:path", "/admin/:path*"],
};
