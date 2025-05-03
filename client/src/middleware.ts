import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked async if using await inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path == "/";

  const token = request.cookies.get("accessToken")?.value || "";

  // if (isPublicPath && token) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  // await new Promise((resolve) => setTimeout(resolve, 300));
  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // if (!isPublicPath && !token) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
