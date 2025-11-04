import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // "/dashboard"
  // add dashboard to auth routes later
  const protectedPaths = ["/profile", "/settings", "/projects"];
  const authPaths = ["/login", "/register"];
  const currentPath = request.nextUrl.pathname;

  const isProtectedPath = protectedPaths.some((path) =>
    currentPath.startsWith(path)
  );
  const isAuthPath = authPaths.includes(currentPath);

  const authToken = request.cookies.get("shiftremit_auth_token");

  if (isProtectedPath) {
    if (!authToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (authToken && isAuthPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
