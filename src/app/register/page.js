"use server";

import { getDictionary } from "@/lib/dictionary";
import { headers } from "next/headers";
import PageControl from "./pageControl";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const headersList = await headers();
  const tokenAPI = headersList.get('X-Token-API');
  const userLanguage = headersList.get("user-language") || "id";
  const headerLanguage = await getDictionary(userLanguage, "general");
  const loginLanguage = await getDictionary(userLanguage, "register");
  return (
    <>
      <PageControl headerLanguage={headerLanguage} session={session} tokenAPI={tokenAPI} loginLanguage={loginLanguage} />
    </>
  );
}
