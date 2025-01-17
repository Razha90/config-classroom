import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { createTokenAPI, verifyTokenAPI } from "./lib/tokenAPI";
import { cookies, headers } from "next/headers";
import { auth } from "./auth";

const locales = ["id", "en"];
const defaultLocale = process.env.DEFAULT_LOCALE || "id";

function getRequestLocale(request) {
  // Get accept-language header from request
  const headers = {
    "accept-language": request.headers.get("accept-language") || "",
  };
  // Get languages from accept-language header
  const languages = new Negotiator({ headers }).languages();
  if (languages.includes(defaultLocale)) {
    // If default locale is in languages, return default locale
    return defaultLocale;
  }
  // If default locale is not in languages, return the first language
  return match(languages, locales, defaultLocale);
}

async function handleUiPath(request) {
  // Check if language already has locale
  const cookieStore = await cookies();
  const userLanguage = cookieStore.get("user-language");
  const createToken = await createTokenAPI();

  let res = NextResponse.next();

  res.headers.set("X-Token-API", createToken);
  if (userLanguage) {
    return res;
  }
  const locale = getRequestLocale(request);
  res.headers.set("user-language", locale);
  res.cookies.set("user-language", locale);
  return res;
}

async function handleAPIPath(request) {
  // Get token from header
  const tokenAPI = request.headers.get("X-Token-API");
  // Verify token
  const verifiedTokenAPI = await verifyTokenAPI(tokenAPI);
  if (!verifiedTokenAPI) {
    // If token is not verified, return unauthorized access
    return NextResponse.json(
      {
        message: "Error unauthorized user",
        success: false,
        status: 401,
        details: "You are not authorized to access this resource.",
      },
      { status: 401 }
    );
  }
  // If token is verified, continue to next handler
  return NextResponse.next();
}

export async function middleware(request) {
  // Get pathname from nextUrl for checking path
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/user")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/login")) {
    const session = await auth();
    if (session) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    // Handle API path
    return await handleAPIPath(request);
  }

  // Handle UI path
  return handleUiPath(request);
}

export const config = {
  matcher: ["/user", "/((?!assets|.*\\..*|_next).*)"],
};

// import { match } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";
// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import { createTokenAPI, verifyTokenAPI } from "./lib/tokenAPI";
// import { cookies } from "next/headers";

// const locales = ["id", "en"];
// const defaultLocale = process.env.DEFAULT_LOCALE || "id";

// function getRequestLocale(request) {
//   // Get accept-language header from request
//   const headers = {
//     "accept-language": request.headers.get("accept-language") || "",
//   };
//   // Get languages from accept-language header
//   const languages = new Negotiator({ headers }).languages();
//   if (languages.includes(defaultLocale)) {
//     // If default locale is in languages, return default locale
//     return defaultLocale;
//   }
//   // If default locale is not in languages, return the first language
//   return match(languages, locales, defaultLocale);
// }

// async function handleUiPath(request) {
//   // Check if language already has locale
//   const cookieStore = await cookies();
//   const userLanguage = cookieStore.get('user-language');

//   if (userLanguage) {
//     return NextResponse.next();
//   }
//   const locale = getRequestLocale(request);
//   let res = NextResponse.next();
//   res.cookies.set("user-language", locale);
//   return res;
// }

// async function handleAPIPath(request) {
//   // Get token from header
//   const tokenAPI = request.headers.get("X-Token-API");
//   // Verify token
//   const verifiedTokenAPI = await verifyTokenAPI(tokenAPI);
//   if (!verifiedTokenAPI) {
//     // If token is not verified, return unauthorized access
//     return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
//   }
//   // If token is verified, continue to next handler
//   return NextResponse.next();
// }

// export async function middleware(request) {
//   // Get pathname from nextUrl for checking path
//   const { pathname } = request.nextUrl;

//   if (pathname.startsWith("/user")) {
//     const token = await getToken({
//       req: request,
//       secret: process.env.NEXTAUTH_SECRET,
//     });

//     if (!token) {
//       const url = request.nextUrl.clone();
//       url.pathname = "/";
//       return NextResponse.redirect(url);
//     }
//     return NextResponse.next();
//   }

//   if (pathname.startsWith("/api")) {
//     // Handle API path
//     return await handleAPIPath(request);
//     // return NextResponse.next();
//   }

//   // Handle UI path
//   return handleUiPath(request);
// }

// export const config = {
//   matcher: ["/user", "/((?!assets|.*\\..*|_next).*)"],
// };
