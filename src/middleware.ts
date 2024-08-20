import { NextRequest, NextResponse } from "next/server";
import { DASHBOARD_PAGES } from "./config/pages-url.config";
import { EnumTokens } from "./services/auth.service";

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request;

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
  console.log(refreshToken);

  const isAuthPage = url.includes("/auth");

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(
      new URL(DASHBOARD_PAGES.PERSONAL_ACCOUNT, url)
    );
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/auth", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/i/:path*", "/auth/:path"],
};
