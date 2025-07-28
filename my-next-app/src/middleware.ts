import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl.clone();

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (
    token &&
    (url.pathname === "/" ||
      url.pathname === "/sign-in" ||
      url.pathname === "/sign-up" ||
      url.pathname === "/verify")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is not authenticated and trying to access protected pages, redirect to sign-in
  if (
    !token &&
    (url.pathname === "/dashboard" ||
      url.pathname.startsWith("/dashboard/") ||
      url.pathname === "/profile" ||
      url.pathname.startsWith("/profile/"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/dashboard",
    "/dashboard/:path*",
    "/profile",
    "/profile/:path*",
    "/verify",
  ],
};
