import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { defaultLocale, hasLocale } from "@/i18n/config";

/** Keeps the Supabase auth cookie fresh for the staff area. */
async function refreshSession(request: NextRequest, response: NextResponse) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return response;

  let res = response;
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        res = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          res.cookies.set(name, value, options);
        }
      },
    },
  });
  // Validates the JWT (and refreshes it when needed). Do not remove.
  await supabase.auth.getClaims();
  return res;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  // Portuguese is the default for visitors without a /pt or /en prefix.
  if (!hasLocale(first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  const isStaff = pathname.startsWith(`/${first}/staff`);
  const response = NextResponse.next({ request });
  return isStaff ? refreshSession(request, response) : response;
}

export const config = {
  // Skip Next internals and any file with an extension (icons, fonts, images).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
