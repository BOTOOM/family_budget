import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
// import { fallbackLng, languages } from './i18n/settings'

export async function middleware(request: NextRequest) {
  // let lng;
  // console.log(request.headers.get("Accept-Language"));
  // if (!lng && request.headers.get("Accept-Language") ) {
  //   const headerLng = request.headers.get("Accept-Language")?.split("-")[0] ?? ""
  //   lng = languages.includes(headerLng)?headerLng:fallbackLng;
  // }
  // console.log({lng});
  // console.log((new URL(`/${lng}${request.nextUrl.pathname}`, request.url).toString()));
  // NextResponse.redirect(new URL(`/${lng}${request.nextUrl.pathname}`, request.url))

  return await updateSession(request);
  // return await updateSession(request);
  // if (!lng) lng = fallbackLng;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|api|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
