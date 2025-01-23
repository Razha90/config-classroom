"use server";

import { getDictionary } from "@/lib/dictionary";
import { headers } from "next/headers";
import PageControl from "./pageControl";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  const headersList = await headers();
  const tokenAPI = headersList.get('X-Token-API');
  const userLanguage = headersList.get("user-language") || "id";
  const [headerLanguage, registerLanguage, footerLanguage] = await Promise.all([
    getDictionary(userLanguage, "header"),
    getDictionary(userLanguage, "register"),
    getDictionary(userLanguage, "footer"),
  ]);
  
  return (
    <>
      <PageControl headerLanguage={headerLanguage} session={session} tokenAPI={tokenAPI} registerLanguage={registerLanguage} footerLanguage={footerLanguage} />
    </>
  );
}
