
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "shiftremit_auth_token";
const LOGIN_PATH = "/login";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;

  if (!token) {
    const loginUrl = new URL(LOGIN_PATH, req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/partner/:path*",
    "/customer/:path*",
    "/account/:path*",
    "/all-logs/:path*",
    "/conversion/:path*",
    "/notifications/:path*",
    "/recipients/:path*",
    "/request-money/:path*",
    "/send-money/:path*",
    "/track-transfer/:path*",
  ],
};
