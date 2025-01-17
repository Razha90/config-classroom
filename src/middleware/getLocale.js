import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

const locales = ["id", "en"];
const defaultLocale = process.env.DEFAULT_LOCALE || "id";

function getRequestLocale(request) {
  const headers = {
    "accept-language": request.headers.get("accept-language") || "",
  };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale) || defaultLocale;
}

export function handleLocale(request, pathname) {
  const pathnameHasLocale = /^\/(id|en)(\/|$)/.test(pathname);

  if (!pathnameHasLocale) {
    const locale = getRequestLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }
  return NextResponse.next();
}
