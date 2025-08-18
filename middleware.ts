import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_API_URL,
  DEFAULT_AUTH,
  PUBLIC_ROUTES,
  ROUTES,
} from "./lib/constant";

import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  // Ambil token sesi
  const sessionToken = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isApiAuth = nextUrl.pathname.startsWith(DEFAULT_AUTH);
  const isApiRoute = nextUrl.pathname.startsWith(DEFAULT_API_URL);
  const isDashboard = nextUrl.pathname === ROUTES.AUTH.DASHBOARD;

  if (sessionToken?.exp && Date.now() >= sessionToken.exp * 1000) {
    return NextResponse.redirect(new URL(ROUTES.PUBLIC.LOGIN, request.url));
  }

  if (isPublicRoute && sessionToken) {
    return NextResponse.redirect(new URL(ROUTES.AUTH.DASHBOARD, request.url));
  }

  if (isPublicRoute && !sessionToken) {
    return NextResponse.next();
  }

  if (isApiAuth) {
    return NextResponse.next();
  }

  if (isApiRoute && !sessionToken) {
    return NextResponse.redirect(new URL(ROUTES.PUBLIC.LOGIN, request.url));
  }

  if (!sessionToken) {
    return NextResponse.redirect(new URL(ROUTES.PUBLIC.LOGIN, request.url));
  }

  if (isDashboard && !sessionToken) {
    return NextResponse.redirect(new URL(ROUTES.PUBLIC.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
