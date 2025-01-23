"use server";

import { headers } from "next/headers";
import PageControl from "./pageControl";
import { getDictionary } from "@/lib/dictionary";
export default async function Home() {
  const headersList = await headers();
  const userLanguage = headersList.get("user-language") || "id";
  const tokepAPI = headersList.get("X-Token-API");

  const [headerLanguage, verifyLanguage, footerLanguage] = await Promise.all([
    getDictionary(userLanguage, "header"),
    getDictionary(userLanguage, "verify"),
    getDictionary(userLanguage, "footer"),
  ]);
  return (
    <>
      <PageControl tokenAPI={tokepAPI} languageHeader={headerLanguage} languageFooter={footerLanguage} verifyLanguage={verifyLanguage} />
    </>
  );
}