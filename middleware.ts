import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_API_URL,
  DEFAULT_AUTH,
  PUBLIC_ROUTES,
  ROUTES,
} from "./lib/constant";

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("authjs.session-token")?.value;
  const { nextUrl } = request;

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isApiAuth = nextUrl.pathname.startsWith(DEFAULT_AUTH);
  const isApiRoute = nextUrl.pathname.startsWith(DEFAULT_API_URL);

  if (isPublicRoute) {
    if (sessionToken) {
      return NextResponse.redirect(new URL(ROUTES.AUTH.DASHBOARD, request.url));
    }
    return NextResponse.next();
  }

  if (isApiAuth) {
    return NextResponse.next();
  } else if (!sessionToken && isApiRoute) {
    return NextResponse.redirect(new URL(ROUTES.AUTH.DASHBOARD, nextUrl));
  }

  if (!sessionToken) {
    return NextResponse.redirect(new URL(ROUTES.PUBLIC.LOGIN, nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
