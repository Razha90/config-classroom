"use server";

import { auth } from "@/auth";
import { getDictionary } from "../lib/dictionary";
import PageControl from "./pageControl.js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/app");
  }
  const headersList = await headers();
  const userLanguage = headersList.get("user-language") || "id";
  // const tokepAPI = headersList.get("X-Token-API");
  const [headerLanguage, mainLanguage, footerLanguage] = await Promise.all([
    getDictionary(userLanguage, "header"),
    getDictionary(userLanguage, "main"),
    getDictionary(userLanguage, "footer"),
  ]);
  return (
    <>
      <PageControl
        headerLanguage={headerLanguage}
        mainLanguage={mainLanguage}
        footerLanguage={footerLanguage}
        session={session}
      />
    </>
  );
}