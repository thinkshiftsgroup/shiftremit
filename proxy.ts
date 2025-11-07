import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface JwtPayload {
  user: {
    userType: "user" | "admin" | "partner";
  };
}

export function proxy(request: NextRequest) {
  // const currentPath = request.nextUrl.pathname;
  // const authToken = request.cookies.get("shiftremit_auth_token");

  // const authPaths = ["/login", "/signup", "/forgot-password"];
  // const isAuthPath = authPaths.includes(currentPath);

  // const loginUrl = request.nextUrl.clone();
  // loginUrl.pathname = "/login";

  // if (authToken && isAuthPath) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/send-money";
  //   return NextResponse.redirect(url);
  // }

  // if (!authToken) {
  //   const unprotectedPublicPaths = ["/", "/about", "/contact"];
  //   const isPublic = unprotectedPublicPaths.includes(currentPath);

  //   if (!isPublic && !isAuthPath) {
  //     return NextResponse.redirect(loginUrl);
  //   }

  //   return NextResponse.next();
  // }

  // const payload = decodeJwtPayload(authToken.value);
  // const userType = payload?.user?.userType;

  // if (!userType) {
  //   return NextResponse.redirect(loginUrl);
  // }

  // if (currentPath.startsWith("/admin")) {
  //   if (userType === "admin") {
  //     return NextResponse.next();
  //   }
  //   return NextResponse.redirect(loginUrl);
  // }

  // if (currentPath.startsWith("/partners")) {
  //   if (userType === "partner" || userType === "admin") {
  //     return NextResponse.next();
  //   }
  //   return NextResponse.redirect(loginUrl);
  // }

  // const clientProtectedPaths = [
  //   "/profile",
  //   "/settings",
  //   "/projects",
  //   "/user",
  //   "/send-money",
  // ];
  // const isClientProtectedPath = clientProtectedPaths.some((path) =>
  //   currentPath.startsWith(path)
  // );

  // if (isClientProtectedPath) {
  //   return NextResponse.next();
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
