import { NextResponse, type NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { defaultLocale, locales } from "@/i18n/config";
import { updateSession } from "@/lib/supabase/proxy";

function getLocale(request: NextRequest) {
  const languages = new Negotiator({
    headers: { "accept-language": request.headers.get("accept-language") ?? "" },
  }).languages();
  try {
    return match(languages, locales as unknown as string[], defaultLocale);
  } catch {
    return defaultLocale;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));

  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${getLocale(request)}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // Only the staff area needs the auth session refreshed.
  if (/^\/(pt|en)\/admin(\/|$)/.test(pathname)) {
    return updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)"],
};
